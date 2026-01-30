import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component with company info - Vietnamese
 */
const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="lg:col-span-2 animate-fade-in-up">
                        <img
                            src="/logo.svg"
                            alt="RT-FRIS Logo"
                            className="h-10 w-auto mb-4 brightness-0 invert"
                        />
                        <p className="text-gray-400 mb-4 max-w-md">
                            RT-FRIS là nhà cung cấp hàng đầu các giải pháp Thị giác Máy tính và Trí tuệ Nhân tạo,
                            chuyên về công nghệ nhận dạng khuôn mặt cho an ninh doanh nghiệp
                            và quản lý nhân sự.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Thành lập năm 2025
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="animate-fade-in-up delay-200">
                        <h4 className="text-lg font-semibold mb-4">Liên kết nhanh</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Về chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link to="/solutions" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Giải pháp
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block">
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="animate-fade-in-up delay-300">
                        <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
                        <ul className="space-y-3 text-gray-400">
                            <li className="flex items-start group">
                                <svg className="h-5 w-5 mr-2 mt-0.5 text-gray-500 group-hover:text-navy-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="group-hover:text-white transition-colors duration-300">Hà Nội, Việt Nam</span>
                            </li>
                            <li className="flex items-center group">
                                <svg className="h-5 w-5 mr-2 text-gray-500 group-hover:text-navy-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="group-hover:text-white transition-colors duration-300">contact@rt-fris.com</span>
                            </li>
                            <li className="flex items-center group">
                                <svg className="h-5 w-5 mr-2 text-gray-500 group-hover:text-navy-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="group-hover:text-white transition-colors duration-300">+84 (24) 1234 5678</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} RT-FRIS. Đã đăng ký bản quyền.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors duration-300">
                                Điều khoản dịch vụ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
