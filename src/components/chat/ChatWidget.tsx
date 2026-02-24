import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import ChatWindow from './ChatWindow';

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const handleUnreadChange = useCallback((count: number) => {
        setUnreadCount(count);
    }, []);

    const handleOpen = () => {
        setIsOpen(!isOpen);
        if (!isOpen) setUnreadCount(0);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3">
            <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} onUnreadChange={handleUnreadChange} />
            <motion.a
                href="https://www.facebook.com/profile.php?id=61556264085318&mibextid=wwXIfr&rdid=eUPl34KuGknFjTkI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1E1KnuPj6z%2F%3Fmibextid%3DwwXIfr#"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-xl hover:bg-[#166FE5] transition-colors"
                aria-label="Facebook"
            >
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
            </motion.a>
            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors duration-300 ${isOpen ? 'bg-white text-navy-900 border border-gray-100' : 'bg-navy-900 text-white'}`}
                aria-label="Chat with us"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                ) : (
                    <div className="relative">
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        {unreadCount > 0 ? (
                            <span className="absolute -top-2 -right-2 min-w-[20px] h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full px-1 animate-bounce">
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </span>
                        ) : (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                            </span>
                        )}
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
