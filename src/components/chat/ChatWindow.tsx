import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    createChatSession,
    sendMessage,
    subscribeToMessages,
    ChatMessage
} from '../../firebase/chatService';

interface Message {
    id: number | string;
    text: string;
    sender: 'user' | 'bot' | 'agent';
    timestamp: Date;
}

interface ChatWindowProps {
    isOpen: boolean;
    onClose: () => void;
}

const FAQs = [
    {
        question: 'Làm thế nào để mua hàng?',
        answer: 'Bạn có thể chọn sản phẩm trong danh mục Sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán, hoặc gọi hotline để được hỗ trợ nhanh nhất.'
    },
    {
        question: 'Chính sách bảo hành như thế nào?',
        answer: 'Chúng tôi bảo hành chính hãng 12-24 tháng cho mọi sản phẩm. Bạn có thể xem chi tiết trong phần chính sách ở chân trang.'
    },
    {
        question: 'Bạn có giao hàng tận nơi không?',
        answer: 'RT-FRIS hỗ trợ giao hàng toàn quốc. Miễn phí vận chuyển cho đơn hàng trên 2.000.000đ.'
    },
    {
        question: 'Địa chỉ showrooms?',
        answer: 'Chúng tôi có showroom tại TP. Hồ Chí Minh và Hà Nội. Bạn có thể xem địa chỉ chi tiết trong trang Liên hệ.'
    }
];

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [chatMode, setChatMode] = useState<'bot' | 'agent'>('bot');
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const unsubscribeRef = useRef<(() => void) | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [isOpen, messages]);

    // Cleanup subscription on unmount
    useEffect(() => {
        return () => {
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
        };
    }, []);

    const handleConnectToAgent = async () => {
        setIsConnecting(true);
        try {
            const newSessionId = await createChatSession('Khách hàng');
            setSessionId(newSessionId);
            setChatMode('agent');

            // Add system message
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: '🟢 Bạn đã được kết nối với nhân viên tư vấn. Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện!',
                sender: 'bot',
                timestamp: new Date()
            }]);

            // Subscribe to real-time messages from agent
            const seenAgentMsgIds = new Set<string>();
            const unsub = subscribeToMessages(newSessionId, (firebaseMessages: ChatMessage[]) => {
                // Only show agent messages (customer messages are shown locally)
                const newAgentMsgs: Message[] = firebaseMessages
                    .filter(m => m.sender === 'agent' && m.id && !seenAgentMsgIds.has(m.id))
                    .map(m => {
                        seenAgentMsgIds.add(m.id!);
                        return {
                            id: m.id || Date.now(),
                            text: m.text,
                            sender: 'agent' as const,
                            timestamp: m.timestamp?.toDate() || new Date()
                        };
                    });

                if (newAgentMsgs.length > 0) {
                    setMessages(prev => [...prev, ...newAgentMsgs]);
                }
            });

            unsubscribeRef.current = unsub;
        } catch (error) {
            console.error('Error connecting to agent:', error);
            setMessages(prev => [...prev, {
                id: Date.now(),
                text: '❌ Không thể kết nối với nhân viên tư vấn. Vui lòng thử lại sau.',
                sender: 'bot',
                timestamp: new Date()
            }]);
        }
        setIsConnecting(false);
    };

    const handleBackToBot = () => {
        setChatMode('bot');
        if (unsubscribeRef.current) {
            unsubscribeRef.current();
            unsubscribeRef.current = null;
        }
        setSessionId(null);
        setMessages([{
            id: 1,
            text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
            sender: 'bot',
            timestamp: new Date()
        }]);
    };

    const handleSendMessage = async (text: string, isFromFAQ = false) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        if (!isFromFAQ) setInputValue('');

        if (chatMode === 'bot') {
            // FAQ bot mode — same as before
            const faq = FAQs.find(f => f.question === text);
            const responseText = faq ? faq.answer : 'Cảm ơn bạn đã nhắn tin. Bạn có thể nhấn "Chat với nhân viên" để được hỗ trợ trực tiếp.';

            setTimeout(() => {
                const botResponse: Message = {
                    id: Date.now() + 1,
                    text: responseText,
                    sender: 'bot',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
            }, 800);
        } else if (chatMode === 'agent' && sessionId) {
            // Live agent mode — send to Firestore
            try {
                await sendMessage(sessionId, text, 'customer');
            } catch (error) {
                console.error('Error sending message:', error);
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    text: '❌ Gửi tin nhắn thất bại. Vui lòng thử lại.',
                    sender: 'bot',
                    timestamp: new Date()
                }]);
            }
        }
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
    };

    const getSenderStyle = (sender: string) => {
        switch (sender) {
            case 'user':
                return 'bg-navy-900 text-white rounded-tr-none';
            case 'agent':
                return 'bg-emerald-600 text-white rounded-tl-none';
            case 'bot':
            default:
                return 'bg-white text-gray-800 rounded-tl-none border border-gray-100';
        }
    };

    const getSenderTimeStyle = (sender: string) => {
        switch (sender) {
            case 'user':
                return 'text-navy-200';
            case 'agent':
                return 'text-emerald-100';
            case 'bot':
            default:
                return 'text-gray-400';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
                >
                    {/* Header */}
                    <div className={`p-4 flex justify-between items-center text-white ${chatMode === 'agent' ? 'bg-emerald-700' : 'bg-navy-900'} transition-colors duration-300`}>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                {chatMode === 'agent' ? (
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                    </svg>
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-white">
                                    {chatMode === 'agent' ? 'Nhân viên tư vấn' : 'RT-FRIS Support'}
                                </h3>
                                <p className="text-xs text-white/80 flex items-center">
                                    <span className={`w-2 h-2 rounded-full mr-2 ${chatMode === 'agent' ? 'bg-green-300 animate-pulse' : 'bg-green-400'}`}></span>
                                    {chatMode === 'agent' ? 'Đang chat trực tiếp' : 'Đang trực tuyến'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            {chatMode === 'agent' && (
                                <button
                                    onClick={handleBackToBot}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-xs flex items-center space-x-1"
                                    title="Quay lại Bot"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span>Bot</span>
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((msg) => (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={msg.id}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    {/* Agent avatar */}
                                    {msg.sender === 'agent' && (
                                        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                    <div className={`p-3 rounded-2xl text-sm shadow-sm ${getSenderStyle(msg.sender)}`}>
                                        {msg.sender === 'agent' && (
                                            <div className="text-[10px] font-semibold text-emerald-100 mb-1">Nhân viên tư vấn</div>
                                        )}
                                        {msg.text}
                                        <div className={`text-[10px] mt-1 ${getSenderTimeStyle(msg.sender)}`}>
                                            {msg.timestamp instanceof Date
                                                ? msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                : ''}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* FAQ Selection Chips — only in bot mode */}
                        {chatMode === 'bot' && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {FAQs.map((faq, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2 + index * 0.1 }}
                                        onClick={() => handleSendMessage(faq.question, true)}
                                        className="text-[11px] bg-white text-navy-900 border border-navy-100 px-3 py-1.5 rounded-full hover:bg-navy-50 hover:border-navy-300 transition-all duration-200 shadow-sm text-left"
                                    >
                                        {faq.question}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Connect to Agent button — only in bot mode */}
                        {chatMode === 'bot' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="flex justify-center mt-3"
                            >
                                <button
                                    onClick={handleConnectToAgent}
                                    disabled={isConnecting}
                                    className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-medium rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isConnecting ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            <span>Đang kết nối...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>💬 Chat với nhân viên tư vấn</span>
                                        </>
                                    )}
                                </button>
                            </motion.div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Facebook Link */}
                    <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex justify-center">
                        <a
                            href="https://www.facebook.com/profile.php?id=61556264085318&mibextid=wwXIfr&rdid=eUPl34KuGknFjTkI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E1KnuPj6z%2F%3Fmibextid%3DwwXIfr#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                            </svg>
                            <span>Chat qua Facebook Page</span>
                        </a>
                    </div>

                    {/* Input Area */}
                    <form onSubmit={onFormSubmit} className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={chatMode === 'agent' ? 'Nhắn tin cho nhân viên...' : 'Nhập tin nhắn...'}
                                className="flex-grow p-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-navy-900 transition-all outline-none"
                            />
                            <button
                                type="submit"
                                className={`p-2.5 text-white rounded-xl transition-colors shadow-md disabled:opacity-50 ${chatMode === 'agent' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-navy-900 hover:bg-navy-800'}`}
                                disabled={!inputValue.trim()}
                            >
                                <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatWindow;
