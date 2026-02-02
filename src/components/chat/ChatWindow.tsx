import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [isOpen, messages]);

    const handleSendMessage = (text: string, isFromFAQ = false) => {
        if (!text.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        if (!isFromFAQ) setInputValue('');
        // Keep FAQ chips visible after interaction

        // Find FAQ response or default
        const faq = FAQs.find(f => f.question === text);
        const responseText = faq ? faq.answer : 'Cảm ơn bạn đã nhắn tin. Chuyên viên của chúng tôi sẽ phản hồi bạn trong giây lát.';

        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
        }, 800);
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSendMessage(inputValue);
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
                    <div className="bg-navy-900 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-white">RT-FRIS Support</h3>
                                <p className="text-xs text-navy-100 flex items-center">
                                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                    Đang trực tuyến
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
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
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                                        ? 'bg-navy-900 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                                        }`}
                                >
                                    {msg.text}
                                    <div className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-navy-200' : 'text-gray-400'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* FAQ Selection Chips - Always visible */}
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
                                placeholder="Nhập tin nhắn..."
                                className="flex-grow p-2.5 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-navy-900 transition-all outline-none"
                            />
                            <button
                                type="submit"
                                className="p-2.5 bg-navy-900 text-white rounded-xl hover:bg-navy-800 transition-colors shadow-md disabled:opacity-50"
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
