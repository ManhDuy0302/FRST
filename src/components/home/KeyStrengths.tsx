import React from 'react';
import { SectionTitle, Card } from '../ui';

/**
 * Strength item data - Vietnamese
 */
const strengths = [
    {
        title: 'Công Nghệ AI Tiên Tiến',
        description: 'Thuật toán học sâu mang lại độ chính xác hàng đầu ngành trong nhận dạng khuôn mặt và thị giác máy tính, được huấn luyện trên bộ dữ liệu đa dạng cho hiệu suất đáng tin cậy trong mọi điều kiện.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-blue-500 to-cyan-500'
    },
    {
        title: 'Xử Lý Thời Gian Thực',
        description: 'Đạt được thời gian phản hồi dưới một giây với các thuật toán được tối ưu hóa cho ứng dụng thời gian thực. Xử lý nhiều luồng video đồng thời mà không giảm hiệu suất.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        color: 'from-yellow-500 to-orange-500'
    },
    {
        title: 'Tích Hợp Doanh Nghiệp',
        description: 'Tích hợp liền mạch với các hệ thống doanh nghiệp hiện có bao gồm HR, kiểm soát truy cập và nền tảng an ninh. API và SDK toàn diện cho phát triển tùy chỉnh.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
        ),
        color: 'from-green-500 to-emerald-500'
    },
    {
        title: 'Bảo Mật & Tuân Thủ',
        description: 'Kiến trúc ưu tiên bảo mật. Mã hóa dữ liệu đầy đủ, kiểm soát quyền riêng tư và tuân thủ các tiêu chuẩn quốc tế cho xử lý dữ liệu sinh trắc học nhạy cảm.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        color: 'from-purple-500 to-pink-500'
    }
];

/**
 * Key Strengths section - Vietnamese with animations
 */
const KeyStrengths: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-fade-in-up">
                    <SectionTitle
                        title="Tại Sao Chọn RT-FRIS"
                        subtitle="Chúng tôi kết hợp công nghệ AI tiên tiến với độ tin cậy cấp doanh nghiệp để cung cấp các giải pháp đáp ứng tiêu chuẩn cao nhất."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {strengths.map((strength, index) => (
                        <div
                            key={index}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Card className="h-full flex flex-col group cursor-pointer">
                                <div className={`w-16 h-16 bg-gradient-to-br ${strength.color} rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                    {strength.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-navy-900 transition-colors duration-300">
                                    {strength.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed flex-grow">
                                    {strength.description}
                                </p>
                                <div className="mt-4 flex items-center text-navy-900 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-sm">Tìm hiểu thêm</span>
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyStrengths;
