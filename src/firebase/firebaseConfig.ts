import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAtL05o9786MP9YWidvM459HwHM6i9wEv8",
    authDomain: "exe-chat-3b341.firebaseapp.com",
    projectId: "exe-chat-3b341",
    storageBucket: "exe-chat-3b341.firebasestorage.app",
    messagingSenderId: "842633796024",
    appId: "1:842633796024:web:e78b5684fb1246fbc4d74d",
    measurementId: "G-LMXP6DHZ56"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
