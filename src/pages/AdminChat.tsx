import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    subscribeToActiveSessions,
    subscribeToMessages,
    sendMessage,
    closeChatSession,
    setTypingStatus,
    subscribeToTypingStatus,
    ChatSession,
    ChatMessage
} from '../firebase/chatService';

const ADMIN_PASSWORD = 'duy123';

const AdminChat: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [sessions, setSessions] = useState<ChatSession[]>([]);
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [customerTyping, setCustomerTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const unsubMessagesRef = useRef<(() => void) | null>(null);
    const unsubTypingRef = useRef<(() => void) | null>(null);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isAuthenticated) return;
        const unsub = subscribeToActiveSessions((activeSessions) => {
            setSessions(activeSessions);
        });
        return () => unsub();
    }, [isAuthenticated]);

    useEffect(() => {
        if (!selectedSessionId) return;

        unsubMessagesRef.current?.();
        unsubTypingRef.current?.();

        const unsub = subscribeToMessages(selectedSessionId, (msgs) => {
            setMessages(msgs);
        });
        unsubMessagesRef.current = unsub;

        const unsubTyping = subscribeToTypingStatus(selectedSessionId, (typing) => {
            setCustomerTyping(!!typing.customer);
        });
        unsubTypingRef.current = unsubTyping;

        return () => {
            unsubMessagesRef.current?.();
            unsubTypingRef.current?.();
        };
    }, [selectedSessionId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setPasswordError('');
        } else {
            setPasswordError('Mật khẩu sai. Vui lòng thử lại.');
        }
    };

    const handleAgentTyping = useCallback(() => {
        if (!selectedSessionId) return;
        setTypingStatus(selectedSessionId, 'agent', true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            if (selectedSessionId) setTypingStatus(selectedSessionId, 'agent', false);
        }, 2000);
    }, [selectedSessionId]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !selectedSessionId) return;
        try {
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            await setTypingStatus(selectedSessionId, 'agent', false);
            await sendMessage(selectedSessionId, inputValue, 'agent');
            setInputValue('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleCloseSession = async (sessionId: string) => {
        try {
            await closeChatSession(sessionId);
            if (selectedSessionId === sessionId) {
                setSelectedSessionId(null);
                setMessages([]);
            }
        } catch (error) {
            console.error('Error closing session:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 w-full max-w-md border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white">Admin Chat Panel</h1>
                        <p className="text-gray-400 mt-2 text-sm">Đăng nhập để quản lý tin nhắn khách hàng</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Nhập mật khẩu..."
                                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                            {passwordError && (
                                <p className="text-red-400 text-sm mt-2">{passwordError}</p>
                            )}
                        </div>
                        <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg">
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 bg-emerald-700 text-white">
                    <h2 className="font-bold text-lg">💬 Quản lý Chat</h2>
                    <p className="text-emerald-100 text-xs mt-1">{sessions.length} cuộc hội thoại đang mở</p>
                </div>
                <div className="flex-grow overflow-y-auto">
                    {sessions.length === 0 ? (
                        <div className="p-6 text-center text-gray-400">
                            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-sm">Chưa có cuộc hội thoại nào</p>
                            <p className="text-xs mt-1">Khi khách hàng nhấn "Chat với nhân viên", cuộc hội thoại sẽ hiển thị ở đây.</p>
                        </div>
                    ) : (
                        sessions.map((session) => (
                            <div
                                key={session.id}
                                onClick={() => setSelectedSessionId(session.id)}
                                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedSessionId === session.id ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''}`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-sm text-gray-800">{session.customerName}</h4>
                                            <p className="text-xs text-gray-500 truncate max-w-[160px]">
                                                {session.lastMessage || 'Chưa có tin nhắn'}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleCloseSession(session.id); }}
                                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                        title="Đóng phiên chat"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                {session.createdAt && (
                                    <p className="text-[10px] text-gray-400 mt-1 ml-13">
                                        {session.createdAt.toDate().toLocaleString('vi-VN')}
                                    </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="flex-grow flex flex-col">
                {!selectedSessionId ? (
                    <div className="flex-grow flex items-center justify-center bg-gray-50">
                        <div className="text-center text-gray-400">
                            <svg className="w-20 h-20 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-lg font-medium">Chọn cuộc hội thoại để bắt đầu</p>
                            <p className="text-sm mt-1">Chọn một khách hàng từ danh sách bên trái</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {sessions.find(s => s.id === selectedSessionId)?.customerName || 'Khách hàng'}
                                    </h3>
                                    <p className="text-xs text-green-500 flex items-center">
                                        <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                                        {customerTyping ? 'Đang nhập...' : 'Đang trực tuyến'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[60%] p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'agent'
                                        ? 'bg-emerald-600 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                                        }`}>
                                        {msg.text}
                                        <div className={`text-[10px] mt-1 ${msg.sender === 'agent' ? 'text-emerald-100' : 'text-gray-400'}`}>
                                            {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || ''}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {customerTyping && (
                                <div className="flex justify-start">
                                    <div className="p-3 rounded-2xl bg-white text-gray-500 text-sm border border-gray-200 shadow-sm rounded-tl-none">
                                        <div className="flex space-x-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        handleAgentTyping();
                                    }}
                                    placeholder="Nhập tin nhắn trả lời..."
                                    className="flex-grow px-4 py-3 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-md disabled:opacity-50"
                                >
                                    Gửi
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
