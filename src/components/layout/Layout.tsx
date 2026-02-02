import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { ChatWidget } from '../chat';

interface LayoutProps {
    children: React.ReactNode;
}

/**
 * Main layout wrapper component
 * Includes Header, main content area, Footer, and Chat Widget
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
};

export default Layout;
