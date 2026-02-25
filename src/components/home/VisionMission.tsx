import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Vision and Mission section - Vietnamese with animations
 */
const VisionMission: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Vision */}
                    <Link to="/about#tam-nhin" className="block">
                        <div className="group bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-10 hover:shadow-xl transition-all duration-500 animate-fade-in-left h-full">
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 bg-gradient-to-br from-navy-900 to-navy-700 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Tầm Nhìn</h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Trở thành nhà cung cấp hàng đầu các giải pháp thị giác thông minh giúp các tổ chức
                                an toàn hơn và hiệu quả hơn. Chúng tôi hướng tới tương lai nơi các hệ thống an ninh
                                và nhận dạng được hỗ trợ bởi AI có thể tiếp cận, đáng tin cậy và tích hợp liền mạch
                                vào mọi môi trường doanh nghiệp.
                            </p>
                            <div className="mt-6 flex items-center text-navy-900 font-medium">
                                <span>Tìm hiểu thêm</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>

                    {/* Mission */}
                    <Link to="/about#su-menh" className="block">
                        <div className="group bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-8 md:p-10 hover:shadow-xl transition-all duration-500 animate-fade-in-right delay-200 h-full">
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                                    <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white">Sứ Mệnh</h3>
                            </div>
                            <p className="text-gray-300 leading-relaxed text-lg">
                                Cung cấp các giải pháp Thị giác Máy tính và AI tiên tiến giải quyết các thách thức
                                an ninh và vận hành trong thế giới thực. Chúng tôi cam kết đổi mới, chất lượng và
                                thành công của khách hàng, cung cấp công nghệ mà doanh nghiệp và tổ chức chính phủ
                                có thể tin tưởng cho các ứng dụng quan trọng nhất.
                            </p>
                            <div className="mt-6 flex items-center text-white font-medium">
                                <span>Khám phá ngay</span>
                                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;
