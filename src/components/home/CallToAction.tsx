import React from 'react';
import { Link } from 'react-router-dom';
import { Button, CountUp } from '../ui';

const CallToAction: React.FC = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-16 md:py-20 lg:py-24">
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl animate-pulse delay-300" />
            </div>

            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center animate-fade-in-up">
                    <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                        Sẵn Sàng Chuyển Đổi{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            An Ninh Của Bạn?
                        </span>
                    </h2>

                    <p className="mb-10 text-lg leading-relaxed text-gray-300 md:text-xl">
                        Khám phá cách RT-FRIS có thể giúp tổ chức của bạn đạt được an ninh tốt hơn,
                        vận hành hiệu quả hơn và hiệu suất cao hơn với các giải pháp thị giác thông minh của chúng tôi.
                    </p>

                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link to="/contact">
                            <Button
                                variant="ctaOutline"
                                size="lg"
                                className="border-0 shadow-lg hover:shadow-cyan-400/40 transition-shadow"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                                Đặt Lịch Tư Vấn
                            </Button>
                        </Link>

                        <Link to="/products">
                            <Button
                                variant="ctaOutline"
                                size="lg"
                                className="border-0 shadow-lg hover:shadow-cyan-400/40 transition-shadow"
                            >
                                <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                                Xem Sản Phẩm
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 animate-fade-in-up delay-300">
                        <div className="text-center">
                            <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
                                <CountUp end={99.7} decimals={1} suffix="%" />
                            </div>
                            <div className="text-sm text-gray-400">Độ chính xác</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
                                <CountUp end={0.5} decimals={1} prefix="<" suffix="s" />
                            </div>
                            <div className="text-sm text-gray-400">Phản hồi</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
                                <CountUp end={1000} suffix="+" />
                            </div>
                            <div className="text-sm text-gray-400">Khuôn mặt</div>
                        </div>
                        <div className="text-center">
                            <div className="mb-1 text-3xl font-bold text-white md:text-4xl">
                                24/7
                            </div>
                            <div className="text-sm text-gray-400">Hoạt động</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
