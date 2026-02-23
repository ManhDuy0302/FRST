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
}

/**
 * Create a new chat session for a customer
 */
export const createChatSession = async (customerName: string = 'Khách hàng'): Promise<string> => {
    const docRef = await addDoc(collection(db, 'chatSessions'), {
        customerName,
        status: 'active',
        createdAt: serverTimestamp(),
        lastMessage: ''
    });
    return docRef.id;
};

/**
 * Send a message in a chat session
 */
export const sendMessage = async (
    sessionId: string,
    text: string,
    sender: 'customer' | 'agent'
): Promise<void> => {
    // Add the message to the messages subcollection
    await addDoc(collection(db, 'chatSessions', sessionId, 'messages'), {
        text,
        sender,
        timestamp: serverTimestamp()
    });

    // Update the lastMessage on the session
    const sessionRef = doc(db, 'chatSessions', sessionId);
    await updateDoc(sessionRef, {
        lastMessage: text
    });
};

/**
 * Subscribe to real-time messages for a chat session
 */
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

/**
 * Subscribe to active chat sessions (for admin panel)
 * Note: Only uses where() without orderBy() to avoid needing a composite Firestore index.
 * Sessions are sorted client-side instead.
 */
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
        // Sort client-side: newest first
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

/**
 * Close a chat session
 */
export const closeChatSession = async (sessionId: string): Promise<void> => {
    const sessionRef = doc(db, 'chatSessions', sessionId);
    await updateDoc(sessionRef, {
        status: 'closed'
    });
};
