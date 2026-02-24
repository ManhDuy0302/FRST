import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    createChatSession,
    sendMessage,
    subscribeToMessages,
    setTypingStatus,
    subscribeToTypingStatus,
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
    onUnreadChange?: (count: number) => void;
}

const FAQs = [
    { question: 'Làm thế nào để mua hàng?', answer: 'Bạn có thể chọn sản phẩm trong danh mục Sản phẩm, thêm vào giỏ hàng và tiến hành thanh toán, hoặc gọi hotline để được hỗ trợ nhanh nhất.' },
    { question: 'Chính sách bảo hành như thế nào?', answer: 'Chúng tôi bảo hành chính hãng 12-24 tháng cho mọi sản phẩm. Bạn có thể xem chi tiết trong phần chính sách ở chân trang.' },
    { question: 'Bạn có giao hàng tận nơi không?', answer: 'RT-FRIS hỗ trợ giao hàng toàn quốc. Miễn phí vận chuyển cho đơn hàng trên 2.000.000đ.' },
    { question: 'Địa chỉ showrooms?', answer: 'Chúng tôi có showroom tại TP. Hồ Chí Minh và Hà Nội. Bạn có thể xem địa chỉ chi tiết trong trang Liên hệ.' }
];

const STORAGE_KEY = 'rtfris_chat_session';

const playNotificationSound = () => {
    try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.1;
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.stop(ctx.currentTime + 0.3);
    } catch (_) { }
};

const formatTimeGroup = (date: Date): string => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) return 'Hôm nay';
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return 'Hôm qua';
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

const shouldShowTimeGroup = (messages: Message[], index: number): boolean => {
    if (index === 0) return true;
    const prev = messages[index - 1].timestamp;
    const curr = messages[index].timestamp;
    return curr.getTime() - prev.getTime() > 5 * 60 * 1000 || prev.toDateString() !== curr.toDateString();
};

const ChatWindow: React.FC<ChatWindowProps> = ({ isOpen, onClose, onUnreadChange }) => {
    const [messages, setMessages] = useState<Message[]>([
        { id: 'welcome', text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?', sender: 'bot', timestamp: new Date() }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [chatMode, setChatMode] = useState<'bot' | 'agent'>('bot');
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [agentTyping, setAgentTyping] = useState(false);
    const [showFAQ, setShowFAQ] = useState(true);
    const unreadCountRef = useRef(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const unsubscribeRef = useRef<(() => void) | null>(null);
    const unsubTypingRef = useRef<(() => void) | null>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isAtBottomRef = useRef(true);
    const prevMsgCountRef = useRef(messages.length);

    const smartScroll = useCallback(() => {
        if (isAtBottomRef.current) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    const handleScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    }, []);

    useEffect(() => {
        if (isOpen) {
            unreadCountRef.current = 0;
            onUnreadChange?.(0);
            messagesEndRef.current?.scrollIntoView({ behavior: 'auto' });
        }
    }, [isOpen, onUnreadChange]);

    useEffect(() => {
        if (messages.length > prevMsgCountRef.current) {
            const lastMsg = messages[messages.length - 1];
            if (isOpen) {
                smartScroll();
            } else if (lastMsg.sender === 'agent') {
                unreadCountRef.current += 1;
                onUnreadChange?.(unreadCountRef.current);
                playNotificationSound();
            }
        }
        prevMsgCountRef.current = messages.length;
    }, [messages, isOpen, smartScroll, onUnreadChange]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const { sessionId: savedId, chatMode: savedMode } = JSON.parse(saved);
                if (savedId && savedMode === 'agent') {
                    setSessionId(savedId);
                    setChatMode('agent');
                    setMessages([
                        { id: 'welcome', text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?', sender: 'bot', timestamp: new Date() }
                        // { id: 'reconnect', text: 'Đã kết nối lại phiên chat trước đó.', sender: 'bot', timestamp: new Date() }
                    ]);
                    reconnectSession(savedId);
                }
            } catch (_) {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        return () => {
            unsubscribeRef.current?.();
            unsubTypingRef.current?.();
        };
    }, []);

    const reconnectSession = (sid: string) => {
        const unsub = subscribeToMessages(sid, (firebaseMessages: ChatMessage[]) => {
            const firebaseMsgs: Message[] = firebaseMessages
                .filter(m => m.timestamp)
                .map(m => ({
                    id: m.id || String(Date.now()),
                    text: m.text,
                    sender: (m.sender === 'customer' ? 'user' : 'agent') as 'user' | 'agent',
                    timestamp: m.timestamp!.toDate()
                }));
            setMessages(prev => {
                const botMsgs = prev.filter(m => m.sender === 'bot');
                return [...botMsgs, ...firebaseMsgs].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
            });
        });
        unsubscribeRef.current = unsub;

        const unsubTyping = subscribeToTypingStatus(sid, (typing) => {
            setAgentTyping(!!typing.agent);
        });
        unsubTypingRef.current = unsubTyping;
    };

    const handleConnectToAgent = async () => {
        setIsConnecting(true);
        try {
            const newSessionId = await createChatSession('Khách hàng');
            setSessionId(newSessionId);
            setChatMode('agent');
            setShowFAQ(false);
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ sessionId: newSessionId, chatMode: 'agent' }));

            setMessages(prev => [...prev, {
                id: Date.now(),
                text: '🟢 Bạn đã được kết nối với nhân viên tư vấn. Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện!',
                sender: 'bot',
                timestamp: new Date()
            }]);

            reconnectSession(newSessionId);
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
        unsubscribeRef.current?.();
        unsubscribeRef.current = null;
        unsubTypingRef.current?.();
        unsubTypingRef.current = null;
        setSessionId(null);
        setAgentTyping(false);
        setShowFAQ(true);
        localStorage.removeItem(STORAGE_KEY);
        setMessages([{ id: 'welcome', text: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?', sender: 'bot', timestamp: new Date() }]);
    };

    const handleCustomerTyping = useCallback(() => {
        if (!sessionId) return;
        setTypingStatus(sessionId, 'customer', true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            if (sessionId) setTypingStatus(sessionId, 'customer', false);
        }, 2000);
    }, [sessionId]);

    const handleSendMessage = async (text: string, isFromFAQ = false) => {
        if (!text.trim()) return;

        if (chatMode === 'bot' || !sessionId) {
            setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' as const, timestamp: new Date() }]);
        }
        if (!isFromFAQ) setInputValue('');
        if (isFromFAQ) setShowFAQ(false);

        if (chatMode === 'bot') {
            const faq = FAQs.find(f => f.question === text);
            const responseText = faq ? faq.answer : 'Cảm ơn bạn đã nhắn tin. Bạn có thể nhấn "Chat với nhân viên" để được hỗ trợ trực tiếp.';
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'bot', timestamp: new Date() }]);
            }, 800);
        } else if (chatMode === 'agent' && sessionId) {
            try {
                if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
                await setTypingStatus(sessionId, 'customer', false);
                await sendMessage(sessionId, text, 'customer');
            } catch (error) {
                console.error('Error sending message:', error);
                setMessages(prev => [...prev, { id: Date.now() + 1, text: '❌ Gửi tin nhắn thất bại. Vui lòng thử lại.', sender: 'bot', timestamp: new Date() }]);
            }
        }
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
    };

    const getSenderStyle = (sender: string) => {
        switch (sender) {
            case 'user': return 'bg-navy-900 text-white rounded-tr-none';
            case 'agent': return 'bg-emerald-600 text-white rounded-tl-none';
            default: return 'bg-white text-gray-800 rounded-tl-none border border-gray-100';
        }
    };

    const getSenderTimeStyle = (sender: string) => {
        switch (sender) {
            case 'user': return 'text-navy-200';
            case 'agent': return 'text-emerald-100';
            default: return 'text-gray-400';
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
                                    {agentTyping ? 'Đang nhập...' : chatMode === 'agent' ? 'Đang chat trực tiếp' : 'Đang trực tuyến'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1">
                            {chatMode === 'agent' && (
                                <button onClick={handleBackToBot} className="p-2 hover:bg-white/10 rounded-full transition-colors text-xs flex items-center space-x-1" title="Quay lại Bot">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    <span>Bot</span>
                                </button>
                            )}
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div ref={scrollContainerRef} onScroll={handleScroll} className="flex-grow overflow-y-auto p-4 space-y-2 bg-gray-50/50">
                        {messages.map((msg, index) => (
                            <React.Fragment key={msg.id}>
                                {shouldShowTimeGroup(messages, index) && (
                                    <div className="flex justify-center my-2">
                                        <span className="text-[10px] text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                            {formatTimeGroup(msg.timestamp)} {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                )}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
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
                                            {!shouldShowTimeGroup(messages, index) && (
                                                <div className={`text-[10px] mt-1 ${getSenderTimeStyle(msg.sender)}`}>
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </React.Fragment>
                        ))}

                        {agentTyping && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                                <div className="flex items-end space-x-2">
                                    <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-white text-gray-500 text-sm border border-gray-100 shadow-sm">
                                        <div className="flex space-x-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {chatMode === 'bot' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex justify-center mt-3">
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

                    {chatMode === 'bot' && (
                        <div className="border-t border-gray-100 bg-white">
                            {showFAQ ? (
                                <div className="px-3 py-2 flex gap-2 overflow-x-auto scrollbar-hide">
                                    {FAQs.map((faq, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSendMessage(faq.question, true)}
                                            className="text-[11px] bg-gray-50 text-navy-900 border border-navy-100 px-3 py-1.5 rounded-full hover:bg-navy-50 hover:border-navy-300 transition-all duration-200 whitespace-nowrap flex-shrink-0"
                                        >
                                            {faq.question}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <button onClick={() => setShowFAQ(true)} className="w-full px-3 py-1.5 text-[11px] text-gray-400 hover:text-gray-600 transition-colors">
                                    Câu hỏi thường gặp
                                </button>
                            )}
                        </div>
                    )}


                    <form onSubmit={onFormSubmit} className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => {
                                    setInputValue(e.target.value);
                                    if (chatMode === 'agent') handleCustomerTyping();
                                }}
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
