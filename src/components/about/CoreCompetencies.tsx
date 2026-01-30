import React from 'react';
import { SectionTitle, Card } from '../ui';

/**
 * Core competencies data - Vietnamese
 */
const competencies = [
    {
        title: 'Nhận Dạng Khuôn Mặt',
        description: 'Thuật toán phát hiện, căn chỉnh và nhận dạng khuôn mặt tiên tiến với tỷ lệ chính xác hàng đầu ngành.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'from-blue-500 to-indigo-600'
    },
    {
        title: 'Phân Tích Video',
        description: 'Xử lý và phân tích video thời gian thực cho phát hiện đối tượng, theo dõi và hiểu hành vi.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-red-500 to-pink-600'
    },
    {
        title: 'Học Sâu',
        description: 'Kiến trúc mạng nơ-ron tùy chỉnh được tối ưu cho các tác vụ thị giác máy tính với suy luận hiệu quả.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-purple-500 to-violet-600'
    },
    {
        title: 'Điện Toán Biên',
        description: 'Giải pháp được tối ưu cho triển khai biên, cho phép xử lý trên thiết bị mà không phụ thuộc đám mây.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        color: 'from-green-500 to-emerald-600'
    },
    {
        title: 'Tích Hợp Hệ Thống',
        description: 'API và SDK toàn diện để tích hợp liền mạch với hạ tầng CNTT doanh nghiệp.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
        ),
        color: 'from-orange-500 to-amber-600'
    },
    {
        title: 'Bảo Mật & Tuân Thủ',
        description: 'Bảo mật cấp doanh nghiệp với mã hóa dữ liệu, kiểm soát truy cập và tuân thủ quy định.',
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        color: 'from-teal-500 to-cyan-600'
    }
];

/**
 * Core Competencies component - Vietnamese with animations
 */
const CoreCompetencies: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-fade-in-up">
                    <SectionTitle
                        title="Năng Lực Cốt Lõi"
                        subtitle="Chuyên môn của chúng tôi trải dài toàn bộ phổ công nghệ thị giác máy tính và AI, cho phép cung cấp các giải pháp toàn diện."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {competencies.map((competency, index) => (
                        <div
                            key={index}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <Card className="group h-full">
                                <div className={`w-14 h-14 bg-gradient-to-br ${competency.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                                    {competency.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-navy-900 transition-colors duration-300">
                                    {competency.title}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    {competency.description}
                                </p>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoreCompetencies;
