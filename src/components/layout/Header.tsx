import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Navigation items - Vietnamese
 */
const navItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Về chúng tôi', path: '/about' },
    { label: 'Sản phẩm', path: '/products' },
    { label: 'Giải pháp', path: '/solutions' },
    { label: 'Liên hệ', path: '/contact' }
];

/**
 * Header component with logo and navigation - Vietnamese
 */
const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <img
                            src="/logo.svg"
                            alt="RT-FRIS Logo"
                            className="h-8 md:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-all duration-300 relative ${isActive
                                        ? 'text-navy-900'
                                        : 'text-gray-600 hover:text-navy-900'
                                    } after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-navy-900 after:transform after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100 ${isActive ? 'after:scale-x-100' : ''}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-navy-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-500 transition-all duration-300"
                        onClick={toggleMobileMenu}
                        aria-expanded={isMobileMenuOpen}
                        aria-label="Mở menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="h-6 w-6 transform rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <nav className="py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-1">
                            {navItems.map((item, index) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-3 text-base font-medium rounded-md transition-all duration-300 transform ${isActive
                                            ? 'text-navy-900 bg-navy-50'
                                            : 'text-gray-600 hover:text-navy-900 hover:bg-gray-50'
                                        }`
                                    }
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
