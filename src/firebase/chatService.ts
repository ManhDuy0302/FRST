import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
    doc,
    updateDoc,
    where,
    Timestamp,
    Unsubscribe
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface ChatMessage {
    id?: string;
    text: string;
    sender: 'customer' | 'agent';
    timestamp: Timestamp | null;
}

export interface ChatSession {
    id: string;
    customerName: string;
    status: 'active' | 'closed';
    createdAt: Timestamp | null;
    lastMessage: string;
    typing?: { customer?: boolean; agent?: boolean };
}

export const createChatSession = async (customerName: string = 'Khách hàng'): Promise<string> => {
    const docRef = await addDoc(collection(db, 'chatSessions'), {
        customerName,
        status: 'active',
        createdAt: serverTimestamp(),
        lastMessage: '',
        typing: { customer: false, agent: false }
    });
    return docRef.id;
};

export const sendMessage = async (
    sessionId: string,
    text: string,
    sender: 'customer' | 'agent'
): Promise<void> => {
    await addDoc(collection(db, 'chatSessions', sessionId, 'messages'), {
        text,
        sender,
        timestamp: serverTimestamp()
    });
    const sessionRef = doc(db, 'chatSessions', sessionId);
    await updateDoc(sessionRef, { lastMessage: text });
};

export const setTypingStatus = async (
    sessionId: string,
    role: 'customer' | 'agent',
    isTyping: boolean
): Promise<void> => {
    const sessionRef = doc(db, 'chatSessions', sessionId);
    await updateDoc(sessionRef, { [`typing.${role}`]: isTyping });
};

export const subscribeToTypingStatus = (
    sessionId: string,
    callback: (typing: { customer?: boolean; agent?: boolean }) => void
): Unsubscribe => {
    const sessionRef = doc(db, 'chatSessions', sessionId);
    return onSnapshot(sessionRef, (snapshot) => {
        const data = snapshot.data();
        callback(data?.typing || {});
    });
};

export const subscribeToMessages = (
    sessionId: string,
    callback: (messages: ChatMessage[]) => void
): Unsubscribe => {
    const messagesRef = collection(db, 'chatSessions', sessionId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => {
        const messages: ChatMessage[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as ChatMessage[];
        callback(messages);
    }, (error) => {
        console.error('Error subscribing to messages:', error);
    });
};

export const subscribeToActiveSessions = (
    callback: (sessions: ChatSession[]) => void
): Unsubscribe => {
    const sessionsRef = collection(db, 'chatSessions');
    const q = query(sessionsRef, where('status', '==', 'active'));
    return onSnapshot(q, (snapshot) => {
        const sessions: ChatSession[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as ChatSession[];
        sessions.sort((a, b) => {
            const timeA = a.createdAt?.toMillis() || 0;
            const timeB = b.createdAt?.toMillis() || 0;
            return timeB - timeA;
        });
        callback(sessions);
    }, (error) => {
        console.error('Error subscribing to sessions:', error);
    });
};

export const closeChatSession = async (sessionId: string): Promise<void> => {
    const sessionRef = doc(db, 'chatSessions', sessionId);
    await updateDoc(sessionRef, { status: 'closed' });
};
