import React, { useEffect, useRef } from 'react';

/**
 * Animated canvas background with neural network / AI nodes effect
 */
export const AIBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animFrameId: number;
        let width = canvas.offsetWidth;
        let height = canvas.offsetHeight;

        canvas.width = width;
        canvas.height = height;

        const resize = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', resize);

        // Node type
        interface Node {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            pulse: number;
            pulseSpeed: number;
            type: 'hub' | 'node'; // hub nodes are slightly larger
        }

        const NODE_COUNT = 100;
        const CONNECTION_DIST = 200;

        const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
            radius: Math.random() > 0.85 ? 4.5 : 2.5,
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.015 + Math.random() * 0.02,
            type: Math.random() > 0.85 ? 'hub' : 'node',
        }));

        // Travelling signal dots along edges
        interface Signal {
            fromIdx: number;
            toIdx: number;
            t: number; // 0 → 1
            speed: number;
        }
        const signals: Signal[] = [];

        // Periodically spawn signals
        const spawnSignal = () => {
            const a = Math.floor(Math.random() * NODE_COUNT);
            const b = Math.floor(Math.random() * NODE_COUNT);
            if (a === b) return;
            const dx = nodes[a].x - nodes[b].x;
            const dy = nodes[a].y - nodes[b].y;
            if (Math.sqrt(dx * dx + dy * dy) < CONNECTION_DIST) {
                signals.push({ fromIdx: a, toIdx: b, t: 0, speed: 0.006 + Math.random() * 0.008 });
            }
        };

        let spawnTimer = 0;

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Background gradient — deeper blue-black
            const grad = ctx.createLinearGradient(0, 0, width, height);
            grad.addColorStop(0, '#080f2e');
            grad.addColorStop(0.5, '#0b1638');
            grad.addColorStop(1, '#070d28');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);

            // Soft radial glow in centre
            const radGlow = ctx.createRadialGradient(
                width * 0.5, height * 0.45, 0,
                width * 0.5, height * 0.45, width * 0.55
            );
            radGlow.addColorStop(0, 'rgba(80,140,255,0.12)');
            radGlow.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = radGlow;
            ctx.fillRect(0, 0, width, height);

            // Update nodes
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                n.pulse += n.pulseSpeed;
                if (n.x < 0 || n.x > width) n.vx *= -1;
                if (n.y < 0 || n.y > height) n.vy *= -1;
            });

            // Draw connections
            for (let i = 0; i < NODE_COUNT; i++) {
                for (let j = i + 1; j < NODE_COUNT; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.55;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        const lineGrad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                        lineGrad.addColorStop(0, `rgba(120,190,255,${alpha})`);
                        lineGrad.addColorStop(0.5, `rgba(170,220,255,${Math.min(alpha * 1.3, 0.75)})`);
                        lineGrad.addColorStop(1, `rgba(120,190,255,${alpha})`);
                        ctx.strokeStyle = lineGrad;
                        ctx.lineWidth = 1.4;
                        ctx.stroke();
                    }
                }
            }

            // Update & draw signals
            for (let s = signals.length - 1; s >= 0; s--) {
                const sig = signals[s];
                sig.t += sig.speed;
                if (sig.t > 1) {
                    signals.splice(s, 1);
                    continue;
                }
                const from = nodes[sig.fromIdx];
                const to = nodes[sig.toIdx];
                const sx = from.x + (to.x - from.x) * sig.t;
                const sy = from.y + (to.y - from.y) * sig.t;
                ctx.beginPath();
                ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(120,200,255,${0.9 - sig.t * 0.5})`;
                ctx.fill();
            }

            // Draw nodes
            nodes.forEach(n => {
                const glow = 0.5 + 0.5 * Math.sin(n.pulse);
                const r = n.radius + glow * 1.2;

                // Outer glow halo
                const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
                halo.addColorStop(0, n.type === 'hub' ? `rgba(56,139,253,${0.35 * glow})` : `rgba(88,166,255,${0.2 * glow})`);
                halo.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.beginPath();
                ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
                ctx.fillStyle = halo;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
                ctx.fillStyle = n.type === 'hub' ? `rgba(150,210,255,${0.9 + glow * 0.1})` : `rgba(120,190,255,${0.75 + glow * 0.25})`;
                ctx.fill();
            });

            // Spawn signals every ~45 frames
            spawnTimer++;
            if (spawnTimer % 45 === 0) spawnSignal();

            animFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrameId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ display: 'block' }}
        />
    );
};

/* ─── Icon Components ─── */
const IconTarget: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
    </svg>
);

const IconEye: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const IconDiamond: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 3l-3 6 9 12 9-12-3-6H6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21L8.25 9 12 3l3.75 6L12 21z" />
    </svg>
);

/** Card data for Mission / Vision / Values */
const cardData = [
    {
        icon: IconTarget,
        title: 'Sứ Mệnh',
        description:
            'Cung cấp giải pháp nhận dạng khuôn mặt tiên tiến, giúp doanh nghiệp nâng cao an ninh và tối ưu quản lý nhân sự thông qua công nghệ AI.',
        accentFrom: '#58a6ff',
        accentTo: '#a8d8ff',
        borderColor: 'rgba(88,166,255,0.25)',
        glowColor: 'rgba(88,166,255,0.08)',
        delay: 'delay-100',
    },
    {
        icon: IconEye,
        title: 'Tầm Nhìn',
        description:
            'Trở thành đơn vị hàng đầu trong lĩnh vực Thị giác Máy tính tại Việt Nam, mang công nghệ AI đẳng cấp thế giới phục vụ mọi tổ chức.',
        accentFrom: '#34d399',
        accentTo: '#6ee7b7',
        borderColor: 'rgba(52,211,153,0.25)',
        glowColor: 'rgba(52,211,153,0.08)',
        delay: 'delay-200',
    },
    {
        icon: IconDiamond,
        title: 'Giá Trị Cốt Lõi',
        description:
            'Cam kết chất lượng vượt trội: độ chính xác cao nhất, bảo mật tuyệt đối, và luôn đồng hành cùng khách hàng trên hành trình chuyển đổi số.',
        accentFrom: '#a78bfa',
        accentTo: '#c4b5fd',
        borderColor: 'rgba(167,139,250,0.25)',
        glowColor: 'rgba(167,139,250,0.08)',
        delay: 'delay-300',
    },
];



/**
 * Company Overview component — redesigned with hero banner, mission/vision/values, and stats
 */
const CompanyOverview: React.FC = () => {
    return (
        <section className="relative py-20 md:py-28 lg:py-32 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* ═══════════════ ZONE 1: Hero Banner ═══════════════ */}
                <div className="text-center mb-16 md:mb-20">
                    {/* Badge */}
                    <div className="animate-fade-in-up">
                        <span
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mb-8"
                            style={{
                                background: 'linear-gradient(135deg, rgba(88,166,255,0.15), rgba(52,211,153,0.10))',
                                color: '#7ec8ff',
                                border: '1px solid rgba(88,166,255,0.3)',
                                backdropFilter: 'blur(12px)',
                                boxShadow: '0 4px 20px rgba(88,166,255,0.15)',
                            }}
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                            </span>
                            Về Chúng Tôi
                        </span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight animate-fade-in-up delay-100">
                        Kiến Tạo Tương Lai Với{' '}
                        <span className="relative inline-block">
                            <span
                                className="text-transparent bg-clip-text"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #58a6ff, #34d399, #a78bfa)',
                                    backgroundSize: '200% auto',
                                    animation: 'gradient-shift 4s ease infinite',
                                }}
                            >
                                Trí Tuệ Nhân Tạo
                            </span>
                            {/* Animated underline */}
                            <span
                                className="absolute -bottom-2 left-0 w-full h-1 rounded-full"
                                style={{
                                    background: 'linear-gradient(90deg, #58a6ff, #34d399, #a78bfa)',
                                    backgroundSize: '200% auto',
                                    animation: 'gradient-shift 4s ease infinite',
                                    filter: 'blur(2px)',
                                }}
                            />
                        </span>
                    </h1>

                    {/* Subtitle description */}
                    <p
                        className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200"
                        style={{ color: 'rgba(200,220,255,0.85)' }}
                    >
                        Thành lập năm 2025, RT-FRIS là công ty công nghệ chuyên phát triển giải pháp{' '}
                        <span style={{ color: '#a8d8ff', fontWeight: 600 }}>Thị giác Máy tính</span> và{' '}
                        <span style={{ color: '#a8d8ff', fontWeight: 600 }}>Trí tuệ Nhân tạo</span> — giúp doanh nghiệp
                        nâng cao an ninh, tối ưu quản lý nhân sự với độ chính xác, tốc độ và bảo mật vượt trội.
                    </p>
                </div>

                {/* ═══════════════ ZONE 2: Mission / Vision / Values ═══════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-20">
                    {cardData.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={idx}
                                className={`animate-fade-in-up ${card.delay} group`}
                            >
                                <div
                                    className="relative rounded-2xl p-8 md:p-9 h-full transition-all duration-500 hover:-translate-y-2"
                                    style={{
                                        background: 'rgba(14, 28, 72, 0.55)',
                                        backdropFilter: 'blur(20px)',
                                        WebkitBackdropFilter: 'blur(20px)',
                                        border: `1px solid ${card.borderColor}`,
                                        boxShadow: `0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = card.accentFrom;
                                        e.currentTarget.style.boxShadow = `0 12px 50px rgba(0,0,0,0.4), 0 0 30px ${card.glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = card.borderColor;
                                        e.currentTarget.style.boxShadow = `0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)`;
                                    }}
                                >
                                    {/* Icon circle */}
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            background: `linear-gradient(135deg, ${card.accentFrom}22, ${card.accentTo}18)`,
                                            border: `1px solid ${card.borderColor}`,
                                            color: card.accentFrom,
                                        }}
                                    >
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-xl font-bold mb-4 text-transparent bg-clip-text"
                                        style={{
                                            backgroundImage: `linear-gradient(135deg, ${card.accentFrom}, ${card.accentTo})`,
                                        }}
                                    >
                                        {card.title}
                                    </h3>

                                    {/* Description */}
                                    <p
                                        className="text-base leading-relaxed"
                                        style={{ color: 'rgba(200,220,255,0.78)' }}
                                    >
                                        {card.description}
                                    </p>

                                    {/* Bottom accent line */}
                                    <div
                                        className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${card.accentFrom}, transparent)`,
                                        }}
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

export default CompanyOverview;