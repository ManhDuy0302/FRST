import React from 'react';

/**
 * Timeline milestones — Company founding story
 */
const milestones = [
    {
        year: '2024',
        period: 'Khởi Nguồn',
        title: 'Ý Tưởng Hình Thành',
        description:
            'Một nhóm sinh viên đam mê công nghệ tại Đại học FPT Hà Nội bắt đầu nghiên cứu chuyên sâu về Thị giác Máy tính và Trí tuệ Nhân tạo, đặt nền móng cho những giải pháp nhận dạng khuôn mặt đột phá.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
        ),
        accentFrom: '#58a6ff',
        accentTo: '#a8d8ff',
    },
    {
        year: '2025',
        period: 'Quý 1',
        title: 'Thành Lập RT-FRIS',
        description:
            'Chính thức thành lập công ty công nghệ RT-FRIS, quy tụ đội ngũ kỹ sư trẻ tài năng với chuyên môn sâu về Học sâu (Deep Learning), Xử lý ảnh và Phát triển phần mềm doanh nghiệp.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0a2.997 2.997 0 00.177-1.024A3 3 0 015.25 5.25h13.5a3 3 0 012.073 3.075 2.997 2.997 0 00.177 1.024" />
            </svg>
        ),
        accentFrom: '#34d399',
        accentTo: '#6ee7b7',
    },
    {
        year: '2025',
        period: 'Quý 2',
        title: 'Hoàn Thiện Sản Phẩm',
        description:
            'Phát triển thành công hệ thống nhận dạng khuôn mặt thời gian thực với độ chính xác 99.7%, tích hợp AI tiên tiến và khả năng xử lý hàng nghìn khuôn mặt đồng thời.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
        ),
        accentFrom: '#a78bfa',
        accentTo: '#c4b5fd',
    },
    {
        year: '2025',
        period: 'Quý 3',
        title: 'Triển Khai Thực Tế',
        description:
            'Ký kết hợp tác triển khai giải pháp cho các doanh nghiệp đầu tiên, chứng minh năng lực qua việc vận hành hệ thống ổn định 24/7 trong môi trường thực tế.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
        ),
        accentFrom: '#f59e0b',
        accentTo: '#fbbf24',
    },
];

/**
 * Company Story — visual timeline of the founding journey
 */
const CompanyStory: React.FC = () => {
    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 md:mb-20 animate-fade-in-up">
                    <span
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
                        style={{
                            background: 'rgba(167,139,250,0.15)',
                            color: '#c4b5fd',
                            border: '1px solid rgba(167,139,250,0.3)',
                        }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                        Câu Chuyện Của Chúng Tôi
                    </span>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        Từ Giảng Đường Đến{' '}
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #58a6ff)' }}>
                            Công Nghệ Thực Tiễn
                        </span>
                    </h2>

                    <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: 'rgba(200,220,255,0.8)' }}>
                        RT-FRIS được sáng lập bởi nhóm sinh viên đam mê công nghệ tại{' '}
                        <span style={{ color: '#f59e0b', fontWeight: 600 }}>Đại học FPT Hà Nội</span>.
                        Từ những dự án nghiên cứu trong phòng lab đến sản phẩm phục vụ doanh nghiệp thực tế —
                        đó là hành trình của sự kiên trì, sáng tạo và khát vọng vươn xa.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center vertical line (hidden on mobile) */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, transparent, rgba(88,166,255,0.4) 10%, rgba(167,139,250,0.4) 90%, transparent)' }} />

                    <div className="space-y-10 md:space-y-0">
                        {milestones.map((m, idx) => {
                            const isLeft = idx % 2 === 0;
                            return (
                                <div
                                    key={idx}
                                    className={`relative md:flex items-center animate-fade-in-up ${idx > 0 ? 'md:mt-12' : ''}`}
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    {/* Left content / spacer */}
                                    <div className={`hidden md:block md:w-1/2 ${isLeft ? 'pr-12 text-right' : ''}`}>
                                        {isLeft && (
                                            <div
                                                className="inline-block rounded-2xl p-7 text-left transition-all duration-500 hover:-translate-y-1"
                                                style={{
                                                    background: 'rgba(14,28,72,0.6)',
                                                    backdropFilter: 'blur(16px)',
                                                    border: `1px solid rgba(${idx === 0 ? '88,166,255' : idx === 1 ? '52,211,153' : idx === 2 ? '167,139,250' : '245,158,11'},0.2)`,
                                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                                }}
                                            >
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `linear-gradient(135deg, ${m.accentFrom}30, ${m.accentTo}20)`, color: m.accentFrom }}>{m.year} — {m.period}</span>
                                                </div>
                                                <h4 className="text-lg font-bold text-white mb-2">{m.title}</h4>
                                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.75)' }}>{m.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Center dot */}
                                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
                                            style={{
                                                background: `linear-gradient(135deg, ${m.accentFrom}, ${m.accentTo})`,
                                                boxShadow: `0 0 20px ${m.accentFrom}40, 0 0 40px ${m.accentFrom}20`,
                                            }}
                                        >
                                            <span className="text-white">{m.icon}</span>
                                        </div>
                                    </div>

                                    {/* Right content / spacer */}
                                    <div className={`md:w-1/2 ${!isLeft ? 'md:pl-12' : ''}`}>
                                        {!isLeft && (
                                            <div
                                                className="hidden md:block rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1"
                                                style={{
                                                    background: 'rgba(14,28,72,0.6)',
                                                    backdropFilter: 'blur(16px)',
                                                    border: `1px solid rgba(${idx === 1 ? '52,211,153' : idx === 3 ? '245,158,11' : '88,166,255'},0.2)`,
                                                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                                                }}
                                            >
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: `linear-gradient(135deg, ${m.accentFrom}30, ${m.accentTo}20)`, color: m.accentFrom }}>{m.year} — {m.period}</span>
                                                </div>
                                                <h4 className="text-lg font-bold text-white mb-2">{m.title}</h4>
                                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.75)' }}>{m.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Mobile card (shown only on mobile) */}
                                    <div className="md:hidden">
                                        <div className="flex items-start gap-4">
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                                                style={{
                                                    background: `linear-gradient(135deg, ${m.accentFrom}, ${m.accentTo})`,
                                                    boxShadow: `0 0 16px ${m.accentFrom}30`,
                                                }}
                                            >
                                                <span className="text-white [&>svg]:w-5 [&>svg]:h-5">{m.icon}</span>
                                            </div>
                                            <div
                                                className="flex-1 rounded-xl p-5"
                                                style={{
                                                    background: 'rgba(14,28,72,0.6)',
                                                    backdropFilter: 'blur(16px)',
                                                    border: `1px solid rgba(88,166,255,0.15)`,
                                                }}
                                            >
                                                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${m.accentFrom}20`, color: m.accentFrom }}>{m.year} — {m.period}</span>
                                                <h4 className="text-base font-bold text-white mt-2 mb-1">{m.title}</h4>
                                                <p className="text-sm leading-relaxed" style={{ color: 'rgba(200,220,255,0.75)' }}>{m.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyStory;
