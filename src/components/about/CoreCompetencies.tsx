import React, { useState } from 'react';
import { SectionTitle } from '../ui';

/**
 * Core competencies data with detailed descriptions for expand
 */
const competencies = [
    {
        title: 'Nhận Dạng Khuôn Mặt',
        description: 'Thuật toán phát hiện, căn chỉnh và nhận dạng khuôn mặt tiên tiến với tỷ lệ chính xác hàng đầu.',
        detailedDescription:
            'Hệ thống nhận dạng khuôn mặt của RT-FRIS sử dụng kiến trúc mạng nơ-ron sâu thế hệ mới, được huấn luyện trên tập dữ liệu đa dạng với hàng triệu mẫu. Hệ thống đạt độ chính xác 99.7% — ngang tầm các giải pháp hàng đầu thế giới, đồng thời tối ưu cho khuôn mặt người Việt.',
        features: [
            'Nhận dạng đồng thời 1000+ khuôn mặt trong thời gian thực',
            'Chống giả mạo (Anti-Spoofing) bằng ảnh, video, mặt nạ 3D',
            'Hoạt động ổn định trong điều kiện ánh sáng yếu, góc nghiêng',
            'Tốc độ xử lý < 100ms trên mỗi khung hình',
        ],
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        color: 'from-blue-500 to-indigo-600',
        accentColor: '#58a6ff',
    },
    {
        title: 'Phân Tích Video',
        description: 'Xử lý và phân tích video thời gian thực cho phát hiện đối tượng, theo dõi và hiểu hành vi.',
        detailedDescription:
            'Công nghệ phân tích video của chúng tôi xử lý nhiều luồng camera đồng thời, sử dụng pipeline AI đa tầng để phát hiện, theo dõi và phân tích hành vi đối tượng. Hệ thống được thiết kế cho các kịch bản giám sát an ninh quy mô lớn, quản lý nhân sự tự động và phân tích dữ liệu hình ảnh chuyên sâu.',
        features: [
            'Xử lý đồng thời nhiều luồng camera Full HD / 4K',
            'Phát hiện và theo dõi đối tượng xuyên suốt các camera (Re-ID)',
            'Phân tích hành vi bất thường và cảnh báo thời gian thực',
            'Lưu trữ và truy xuất lịch sử thông minh theo sự kiện',
            'Hỗ trợ giao thức RTSP, ONVIF — tương thích mọi hãng camera',
            'Thống kê lưu lượng, heatmap và báo cáo trực quan tự động',
        ],
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-red-500 to-pink-600',
        accentColor: '#f43f5e',
    },
    {
        title: 'Học Sâu (Deep Learning)',
        description: 'Kiến trúc mạng nơ-ron tùy chỉnh được tối ưu cho các tác vụ thị giác máy tính với suy luận hiệu quả.',
        detailedDescription:
            'Đội ngũ R&D của RT-FRIS nghiên cứu và phát triển các kiến trúc mạng nơ-ron chuyên biệt, được tối ưu hóa từ gốc để đạt hiệu suất cao nhất trên phần cứng mục tiêu — từ GPU datacenter đến thiết bị edge computing.',
        features: [
            'Kiến trúc CNN/Transformer tùy chỉnh cho nhận dạng khuôn mặt',
            'Transfer Learning từ mô hình pre-trained hàng đầu thế giới',
            'Quantization & Pruning giảm kích thước mô hình 4-8 lần',
            'Benchmark liên tục trên các dataset chuẩn quốc tế (LFW, FERET)',
        ],
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-purple-500 to-violet-600',
        accentColor: '#a78bfa',
    },
    {
        title: 'Điện Toán Biên (Edge)',
        description: 'Giải pháp được tối ưu cho triển khai biên, cho phép xử lý trên thiết bị mà không phụ thuộc đám mây.',
        detailedDescription:
            'Giải pháp Edge AI của RT-FRIS cho phép triển khai toàn bộ pipeline nhận dạng trên thiết bị cục bộ — đảm bảo tốc độ phản hồi tức thì, bảo mật dữ liệu tuyệt đối và hoạt động không cần internet.',
        features: [
            'Tương thích NVIDIA Jetson, Intel OpenVINO, ARM-based devices',
            'Xử lý hoàn toàn offline — dữ liệu không rời khỏi cơ sở',
            'Tiêu thụ năng lượng thấp, phù hợp triển khai quy mô lớn',
            'OTA Update — cập nhật mô hình từ xa không gián đoạn vận hành',
        ],
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        color: 'from-green-500 to-emerald-600',
        accentColor: '#34d399',
    },
    {
        title: 'Tích Hợp Hệ Thống',
        description: 'API và SDK toàn diện để tích hợp liền mạch với hạ tầng CNTT doanh nghiệp.',
        detailedDescription:
            'RT-FRIS cung cấp bộ API RESTful và SDK đa ngôn ngữ, cho phép doanh nghiệp tích hợp nhanh chóng vào hệ thống HRM, chấm công, kiểm soát truy cập hiện có — giảm thiểu rủi ro và chi phí triển khai.',
        features: [
            'RESTful API với tài liệu Swagger/OpenAPI đầy đủ',
            'SDK hỗ trợ Python, JavaScript, Java, .NET',
            'Webhook & Event streaming cho tích hợp thời gian thực',
            'Tương thích hệ thống HRM, ERP, Access Control phổ biến',
        ],
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
            </svg>
        ),
        color: 'from-orange-500 to-amber-600',
        accentColor: '#f59e0b',
    },
    {
        title: 'Bảo Mật & Tuân Thủ',
        description: 'Bảo mật cấp doanh nghiệp với mã hóa dữ liệu, kiểm soát truy cập và tuân thủ quy định.',
        detailedDescription:
            'Mọi sản phẩm của RT-FRIS đều được thiết kế với nguyên tắc "Security by Design". Dữ liệu sinh trắc học được mã hóa AES-256, lưu trữ tuân thủ quy định về bảo vệ dữ liệu cá nhân, đảm bảo quyền riêng tư cho người dùng cuối.',
        features: [
            'Mã hóa AES-256 cho dữ liệu sinh trắc học và embedding vectors',
            'Kiểm soát truy cập phân quyền (RBAC) đa cấp',
            'Audit log đầy đủ — truy vết mọi thao tác trên hệ thống',
            'Tuân thủ quy định bảo vệ dữ liệu cá nhân Việt Nam',
        ],
        icon: (
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        color: 'from-teal-500 to-cyan-600',
        accentColor: '#14b8a6',
    },
];

/**
 * Core Competencies component — interactive click-to-expand cards
 */
const CoreCompetencies: React.FC = () => {
    const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

    const toggleExpand = (index: number) => {
        setExpandedIndices(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    return (
        <section className="py-16 md:py-20 lg:py-24 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-fade-in-up">
                    <SectionTitle
                        title="Năng Lực Cốt Lõi"
                        subtitle="Chuyên môn của chúng tôi trải dài toàn bộ phổ công nghệ thị giác máy tính và AI, cho phép cung cấp các giải pháp toàn diện. Nhấn vào từng năng lực để tìm hiểu chi tiết."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {competencies.map((competency, index) => {
                        const isExpanded = expandedIndices.has(index);
                        return (
                            <div
                                key={index}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div
                                    className={`bg-white rounded-lg border p-6 relative overflow-hidden group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl ${isExpanded
                                        ? 'border-navy-300 shadow-xl ring-1 ring-navy-200'
                                        : 'border-gray-200 hover:border-navy-300'
                                        }`}
                                    onClick={() => toggleExpand(index)}
                                >
                                    {/* Header row */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`w-14 h-14 bg-gradient-to-br ${competency.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                            {competency.icon}
                                        </div>
                                        {/* Chevron indicator */}
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded
                                                ? 'bg-navy-100 text-navy-700 rotate-180'
                                                : 'bg-gray-100 text-gray-400 group-hover:bg-navy-50 group-hover:text-navy-500'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                            </svg>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-navy-900 transition-colors duration-300">
                                        {competency.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {competency.description}
                                    </p>

                                    {/* Expandable detail section */}
                                    <div
                                        className="transition-all duration-500 ease-in-out overflow-hidden"
                                        style={{
                                            maxHeight: isExpanded ? '500px' : '0px',
                                            opacity: isExpanded ? 1 : 0,
                                            marginTop: isExpanded ? '16px' : '0px',
                                        }}
                                    >
                                        <div className="border-t border-gray-100 pt-4">
                                            <p className="text-gray-700 text-sm leading-relaxed mb-4" style={{ fontStyle: 'normal' }}>
                                                {competency.detailedDescription}
                                            </p>

                                            <div className="space-y-2.5">
                                                {competency.features.map((feature, fIdx) => (
                                                    <div key={fIdx} className="flex items-start gap-2.5">
                                                        <svg
                                                            className="w-5 h-5 flex-shrink-0 mt-0.5"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke={competency.accentColor}
                                                            strokeWidth={2}
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom accent line on expanded */}
                                    <div
                                        className={`absolute bottom-0 left-0 right-0 h-[3px] transition-all duration-500 bg-gradient-to-r ${competency.color}`}
                                        style={{ opacity: isExpanded ? 1 : 0 }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CoreCompetencies;
