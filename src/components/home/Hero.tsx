import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui';

const Hero: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles: Array<{
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
        }> = [];

        for (let i = 0; i < 80; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
            });
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(96, 165, 250, 0.5)';
                ctx.fill();
            });

            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(96, 165, 250, ${0.15 * (1 - distance / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-20 md:py-28 lg:py-36">
            {/* Animated Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full opacity-40"
            />

            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl animate-spin-slow"></div>
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.15]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(96, 165, 250, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(96, 165, 250, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                ></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="text-center lg:text-left z-10">
                        <div className="animate-fade-in-up">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-full text-cyan-300 text-sm font-medium mb-6 border border-blue-400/30 shadow-lg shadow-blue-500/20">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                </span>
                                Công nghệ AI tiên tiến hàng đầu
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up delay-100">
                            Nâng Tầm An Ninh Với{' '}
                            <span className="relative inline-block">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-gradient">
                                    Thị Giác Thông Minh
                                </span>
                                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 blur-sm animate-pulse"></span>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300/90 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up delay-200">
                            RT-FRIS cung cấp giải pháp Thị giác Máy tính và AI cấp doanh nghiệp,
                            chuyển đổi cách tổ chức quản lý an ninh và chấm công nhân viên.
                            Với công nghệ nhận dạng khuôn mặt mang lại độ chính xác,
                            tốc độ cao và bảo mật thông tin tuyệt đối.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 animate-fade-in-up delay-300">
                            <Link to="/solutions">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 border-0 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 font-semibold transition-all duration-300 hover:scale-105"
                                >
                                    <span className="relative z-10">Khám Phá Giải Pháp</span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500"></div>
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    className="group relative overflow-hidden bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/30 shadow-xl hover:shadow-cyan-500/30 font-semibold transition-all duration-300 hover:scale-105"
                                >
                                    <span className="relative z-10">Liên Hệ Ngay</span>
                                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500"></div>
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Visual */}
                    <div className="relative animate-fade-in-right delay-200 z-10">
                        <div className="relative">
                            {/* Rotating Ring */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[400px] h-[400px] border-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[420px] h-[420px] border-2 border-cyan-500/20 rounded-full animate-spin-reverse"></div>
                            </div>

                            {/* Image Container - No Background Card */}
                            <div className="relative w-full max-w-lg mx-auto aspect-square">
                                {/* Face Recognition Visual */}
                                <div className="absolute inset-0">
                                    <div className="w-full h-full relative">
                                        {/* Background Image - Full Size */}
                                        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/30">
                                            <img 
                                                src="/media/images/image.png" 
                                                alt="Face Recognition"
                                                className="w-full h-full object-cover"
                                            />
                                            {/* Subtle overlay for scanning effect visibility */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-cyan-900/20"></div>
                                        </div>

                                        {/* Scanning Lines - Horizontal */}
                                        <div className="absolute inset-0 overflow-hidden rounded-2xl">
                                            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50 animate-scan-vertical"></div>
                                            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-scan-vertical-delayed"></div>
                                        </div>

                                        {/* Corner Brackets - Larger */}
                                        <div className="absolute top-0 left-0 w-16 h-16 border-l-3 border-t-3 border-cyan-400 rounded-tl-2xl animate-pulse"></div>
                                        <div className="absolute top-0 right-0 w-16 h-16 border-r-3 border-t-3 border-cyan-400 rounded-tr-2xl animate-pulse delay-75"></div>
                                        <div className="absolute bottom-0 left-0 w-16 h-16 border-l-3 border-b-3 border-cyan-400 rounded-bl-2xl animate-pulse delay-150"></div>
                                        <div className="absolute bottom-0 right-0 w-16 h-16 border-r-3 border-b-3 border-cyan-400 rounded-br-2xl animate-pulse delay-200"></div>

                                        {/* Data Points */}
                                        <div className="absolute top-8 -right-2 flex items-center gap-2 animate-fade-in">
                                            <div className="flex flex-col items-end">
                                                <div className="h-1 w-16 bg-gradient-to-l from-cyan-400 to-transparent mb-1 shadow-sm shadow-cyan-400"></div>
                                                <div className="h-1 w-10 bg-gradient-to-l from-blue-400 to-transparent shadow-sm shadow-blue-400"></div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-8 -left-2 flex items-center gap-2 animate-fade-in delay-200">
                                            <div className="flex flex-col items-start">
                                                <div className="h-1 w-16 bg-gradient-to-r from-cyan-400 to-transparent mb-1 shadow-sm shadow-cyan-400"></div>
                                                <div className="h-1 w-10 bg-gradient-to-r from-blue-400 to-transparent shadow-sm shadow-blue-400"></div>
                                            </div>
                                        </div>

                                        {/* Scanning Grid Overlay */}
                                        <div className="absolute inset-0 rounded-2xl opacity-30 pointer-events-none">
                                            <div
                                                className="w-full h-full"
                                                style={{
                                                    backgroundImage: `
                                                        linear-gradient(rgba(96, 165, 250, 0.2) 1px, transparent 1px),
                                                        linear-gradient(90deg, rgba(96, 165, 250, 0.2) 1px, transparent 1px)
                                                    `,
                                                    backgroundSize: '20px 20px',
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-sm px-5 py-2 rounded-full flex items-center shadow-lg shadow-green-500/50 animate-bounce-subtle">
                                    <div className="relative flex h-2 w-2 mr-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                    </div>
                                    <span className="text-white text-sm font-semibold">     Xác nhận danh tính</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-20 pt-10 border-t border-white/10 animate-fade-in-up delay-400">
                    <p className="text-center text-white/60 text-sm mb-8 font-medium">
                        Được tin tưởng bởi các doanh nghiệp và tổ chức chính phủ
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        <div className="group flex flex-col items-center gap-2 text-white/60 hover:text-cyan-400 transition-all duration-300 cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">Bảo mật cao</span>
                        </div>
                        <div className="group flex flex-col items-center gap-2 text-white/60 hover:text-cyan-400 transition-all duration-300 cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">100K+ khuôn mặt</span>
                        </div>
                        <div className="group flex flex-col items-center gap-2 text-white/60 hover:text-cyan-400 transition-all duration-300 cursor-pointer">
                            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10 transition-all duration-300">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium">Thời gian thực</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes scan-vertical {
                    0%, 100% { 
                        top: -10%; 
                        opacity: 0; 
                    }
                    10% {
                        opacity: 0.3;
                    }
                    50% { 
                        top: 50%; 
                        opacity: 1; 
                    }
                    90% {
                        opacity: 0.3;
                    }
                }
                
                @keyframes scan-vertical-delayed {
                    0%, 100% { 
                        top: -5%; 
                        opacity: 0; 
                    }
                    50% { 
                        top: 55%; 
                        opacity: 0.6; 
                    }
                }
                
                @keyframes scan-horizontal {
                    0%, 100% { 
                        left: 0%; 
                        opacity: 0; 
                    }
                    50% { 
                        left: 50%; 
                        opacity: 1; 
                    }
                }

                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(1deg); }
                }

                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-1deg); }
                }

                @keyframes bounce-subtle {
                    0%, 100% { transform: translate(-50%, 0px); }
                    50% { transform: translate(-50%, -5px); }
                }

                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes spin-reverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }

                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.05); }
                }

                .animate-scan-vertical {
                    animation: scan-vertical 4s ease-in-out infinite;
                }

                .animate-scan-vertical-delayed {
                    animation: scan-vertical-delayed 4s ease-in-out infinite 0.5s;
                }

                .animate-scan-horizontal {
                    animation: scan-horizontal 4s ease-in-out infinite;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .animate-float-delayed {
                    animation: float-delayed 5s ease-in-out infinite;
                }

                .animate-bounce-subtle {
                    animation: bounce-subtle 2s ease-in-out infinite;
                }

                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }

                .animate-spin-reverse {
                    animation: spin-reverse 15s linear infinite;
                }

                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }

                .delay-75 { animation-delay: 75ms; }
                .delay-100 { animation-delay: 100ms; }
                .delay-150 { animation-delay: 150ms; }
                .delay-200 { animation-delay: 200ms; }
                .delay-250 { animation-delay: 250ms; }
                .delay-300 { animation-delay: 300ms; }
                .delay-400 { animation-delay: 400ms; }
                .delay-1000 { animation-delay: 1000ms; }

                .border-l-3 { border-left-width: 3px; }
                .border-r-3 { border-right-width: 3px; }
                .border-t-3 { border-top-width: 3px; }
                .border-b-3 { border-bottom-width: 3px; }
            `}</style>
        </section>
    );
};

export default Hero;