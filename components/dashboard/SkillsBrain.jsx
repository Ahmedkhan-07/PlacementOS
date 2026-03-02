'use client';

import { useState, useEffect, useRef } from 'react';

export default function SkillsBrain({ skills = [] }) {
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.25 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const hasSkills = skills.length > 0;

    return (
        <section
            ref={sectionRef}
            style={{
                padding: '80px 48px',
                position: 'relative',
                zIndex: 1,
                overflow: 'hidden',
            }}
        >
            {/* Section heading */}
            <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '36px', fontWeight: 700,
                color: 'var(--text)', textAlign: 'center',
                marginBottom: '64px',
            }}>
                Skills
            </h2>

            <div style={{
                maxWidth: '1100px', margin: '0 auto',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 0,
                flexWrap: 'wrap',
            }}>
                {/* LEFT: Brain with glowing pulsing circle */}
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: '16px',
                    flexShrink: 0,
                }}>
                    <div style={{
                        width: '140px', height: '140px',
                        borderRadius: '50%',
                        background: 'rgba(45,106,79,0.07)',
                        border: '2px solid rgba(45,106,79,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '72px',
                        animation: 'brain-pulse 2s ease-in-out infinite',
                        flexShrink: 0,
                    }}>
                        🧠
                    </div>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '13px', color: 'var(--text-muted)',
                        textAlign: 'center', maxWidth: '120px',
                    }}>
                        Your knowledge base
                    </p>
                </div>

                {/* CENTER: SVG electric signal lines */}
                <svg
                    width="280"
                    height="140"
                    viewBox="0 0 280 140"
                    style={{ flexShrink: 0, overflow: 'visible' }}
                >
                    {[
                        { d: 'M 0,35 Q 70,15 140,35 Q 210,55 280,35', delay: '0s' },
                        { d: 'M 0,70 Q 70,50 140,70 Q 210,90 280,70', delay: '0.45s' },
                        { d: 'M 0,105 Q 70,85 140,105 Q 210,125 280,105', delay: '0.9s' },
                    ].map((path, i) => (
                        <path
                            key={i}
                            d={path.d}
                            stroke="#2D6A4F"
                            strokeWidth={2.5}
                            fill="none"
                            opacity={0.8}
                            strokeDasharray="40 20"
                            style={{
                                animation: visible ? `signal-travel 1.8s linear infinite` : 'none',
                                animationDelay: path.delay,
                            }}
                        />
                    ))}
                    {/* Glowing dots traveling along each line */}
                    {visible && [
                        { cy: 35, delay: '0s' },
                        { cy: 70, delay: '0.45s' },
                        { cy: 105, delay: '0.9s' },
                    ].map((dot, i) => (
                        <circle key={i} r={5} fill="#C9A23A" opacity={0.9}>
                            <animateMotion
                                dur="1.8s"
                                repeatCount="indefinite"
                                begin={dot.delay}
                                path={[
                                    'M 0,35 Q 70,15 140,35 Q 210,55 280,35',
                                    'M 0,70 Q 70,50 140,70 Q 210,90 280,70',
                                    'M 0,105 Q 70,85 140,105 Q 210,125 280,105',
                                ][i]}
                            />
                        </circle>
                    ))}
                </svg>

                {/* RIGHT: Skills box — wide, premium card */}
                <div style={{
                    minWidth: '340px',
                    maxWidth: '520px',
                    flex: 1,
                    minHeight: '200px',
                    background: 'var(--surface)',
                    border: '2px solid var(--gold)',
                    borderRadius: '20px',
                    padding: '28px 28px 24px',
                    boxShadow: '0 8px 32px rgba(45,106,79,0.1), 0 2px 8px rgba(201,162,58,0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Top gold accent */}
                    <div style={{
                        position: 'absolute', top: 0, left: 0, right: 0,
                        height: '4px',
                        background: 'linear-gradient(90deg, #C9A23A, #2D6A4F, #C9A23A)',
                        borderRadius: '20px 20px 0 0',
                    }} />

                    <p style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '18px', fontWeight: 700,
                        color: '#2D6A4F', marginBottom: '20px',
                    }}>
                        ✦ Skill Set
                    </p>

                    {!hasSkills ? (
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '14px', color: 'var(--text-muted)',
                            fontStyle: 'italic',
                        }}>
                            Add skills in your profile or resume builder to see them here.
                        </p>
                    ) : (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {skills.map((skill, i) => (
                                <span
                                    key={i}
                                    style={{
                                        padding: '6px 16px',
                                        background: i % 3 === 0
                                            ? 'rgba(45,106,79,0.08)'
                                            : i % 3 === 1
                                                ? 'rgba(201,162,58,0.10)'
                                                : 'rgba(45,106,79,0.05)',
                                        color: i % 3 === 1 ? '#7A5A1A' : '#2D6A4F',
                                        border: `1px solid ${i % 3 === 1 ? 'rgba(201,162,58,0.3)' : 'rgba(45,106,79,0.2)'}`,
                                        borderRadius: '100px',
                                        fontSize: '13px',
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 500,
                                        cursor: 'default',
                                        opacity: 0,
                                        animation: visible ? 'fadeInUp 0.35s ease forwards' : 'none',
                                        animationDelay: `${i * 0.08}s`,
                                        transition: 'transform 0.2s, box-shadow 0.2s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.transform = 'scale(1.08)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(45,106,79,0.2)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.transform = 'scale(1)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes brain-pulse {
                    0%, 100% { box-shadow: 0 0 0 0 rgba(45,106,79,0.3), inset 0 0 0 0 rgba(45,106,79,0.05); }
                    50% { box-shadow: 0 0 0 24px rgba(45,106,79,0), inset 0 0 20px rgba(45,106,79,0.05); }
                }
                @keyframes signal-travel {
                    0%   { stroke-dashoffset: 60; }
                    100% { stroke-dashoffset: 0; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
