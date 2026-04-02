'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function PremiumCTA({ user, onRefreshUser }) {
    const [isPublic, setIsPublic] = useState(user?.isPublic || false);
    const [copied, setCopied] = useState(false);
    const [toggling, setToggling] = useState(false);
    const [portfolioUrl, setPortfolioUrl] = useState('');

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || window.location.origin;
        setPortfolioUrl(`${baseUrl}/u/${user?.username}`);
    }, [user?.username]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(portfolioUrl);
            setCopied(true);
            toast.success('Link copied! 📋');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    };

    const handleTogglePublic = async () => {
        setToggling(true);
        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPublic: !isPublic }),
            });
            if (res.ok) {
                const newState = !isPublic;
                setIsPublic(newState);
                toast.success(newState ? 'Portfolio is now LIVE! 🚀' : 'Portfolio set to private 🔒');
                onRefreshUser?.();
            }
        } catch {
            toast.error('Failed to update visibility');
        }
        setToggling(false);
    };

    return (
        <section style={{
            padding: '120px 40px',
            background: 'var(--surface)',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Accent */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, rgba(45, 106, 79, 0.03) 0%, transparent 70%)',
                zIndex: 0,
                pointerEvents: 'none'
            }} />

            <div style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '48px',
                padding: '80px 60px',
                maxWidth: '900px',
                width: '100%',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
                boxShadow: '0 40px 100px rgba(0,0,0,0.06)',
                transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }} className="presence-card">
                
                {/* Status Indicator Floating */}
                <div style={{
                    position: 'absolute',
                    top: '40px',
                    right: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '100px',
                    background: isPublic ? 'rgba(82, 183, 136, 0.1)' : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${isPublic ? 'rgba(82, 183, 136, 0.3)' : 'var(--border)'}`,
                    transition: 'all 0.5s ease'
                }}>
                    <span style={{ 
                        width: '8px', height: '8px', borderRadius: '50%', 
                        background: isPublic ? '#52B788' : '#6B6560',
                        boxShadow: isPublic ? '0 0 10px #52B788' : 'none',
                        animation: isPublic ? 'pulse-green 2s infinite' : 'none'
                    }} />
                    <span style={{ fontSize: '12px', fontWeight: 700, color: isPublic ? '#2D6A4F' : '#6B6560', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {isPublic ? 'Online' : 'Offline'}
                    </span>
                </div>

                {/* Globe Visual with Scan Lines */}
                <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 40px' }}>
                    <div style={{ 
                        fontSize: '80px', 
                        lineHeight: 1, 
                        animation: 'float 6s ease-in-out infinite',
                        filter: isPublic ? 'drop-shadow(0 0 20px rgba(82, 183, 136, 0.4))' : 'grayscale(1)'
                    }}>🌍</div>
                    <div className="radar-line" />
                </div>

                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(32px, 4vw, 42px)',
                    fontWeight: 800,
                    color: 'var(--text)',
                    marginBottom: '20px',
                    letterSpacing: '-0.03em'
                }}>
                    Launch Your Professional Identity
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    marginBottom: '60px',
                    maxWidth: '560px',
                    margin: '0 auto 60px',
                    lineHeight: 1.6
                }}>
                    Broadcast your expertise to the global talent network. One switch connects you to top recruiters and innovative companies.
                </p>

                {/* THE MASTER TOGGLE */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px',
                    marginBottom: '60px'
                }}>
                    <div 
                        onClick={toggling ? undefined : handleTogglePublic}
                        style={{
                            width: '100px',
                            height: '50px',
                            background: isPublic ? '#2D6A4F' : '#E8E0D4',
                            borderRadius: '100px',
                            padding: '6px',
                            cursor: 'pointer',
                            position: 'relative',
                            transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                            boxShadow: isPublic ? 'inset 0 2px 10px rgba(0,0,0,0.2), 0 10px 30px rgba(45, 106, 79, 0.3)' : 'inset 0 2px 10px rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{
                            width: '38px',
                            height: '38px',
                            background: '#FFF',
                            borderRadius: '50%',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                            transform: isPublic ? 'translateX(50px)' : 'translateX(0)',
                            transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <div style={{ width: '4px', height: '12px', background: isPublic ? '#2D6A4F' : '#CCC', borderRadius: '4px' }} />
                        </div>
                    </div>
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '14px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        color: isPublic ? '#52B788' : 'var(--text-muted)'
                    }}>
                        {isPublic ? 'Visibility: High' : 'Visibility: Private'}
                    </span>
                </div>

                {/* URL DISPLAY COMMAND BOX */}
                {isPublic && (
                    <div style={{
                        marginTop: '40px',
                        animation: 'reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: 'var(--surface)',
                            border: '1.5px solid var(--border)',
                            borderRadius: '20px',
                            padding: '8px 8px 8px 32px',
                            gap: '32px',
                            maxWidth: '620px',
                            margin: '0 auto',
                            boxShadow: '0 15px 40px rgba(0,0,0,0.04)',
                            flexWrap: 'wrap',
                            justifyContent: 'center'
                        }}>
                            <span style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: '15px',
                                color: 'var(--accent)',
                                fontWeight: 600,
                                flex: 1,
                                textAlign: 'left',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                            }}>
                                {portfolioUrl.replace('https://', '').replace('http://', '')}
                            </span>
                            <button 
                                onClick={handleCopy}
                                className="btn-primary"
                                style={{
                                    padding: '16px 32px',
                                    borderRadius: '16px',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    letterSpacing: '0.02em',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 10px 20px rgba(45, 106, 79, 0.2)'
                                }}
                            >
                                {copied ? 'COPIED ✅' : 'COPY BROADCAST LINK'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .presence-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 50px 120px rgba(0,0,0,0.08);
                }
                @keyframes pulse-green {
                    0% { opacity: 1; }
                    50% { opacity: 0.4; transform: scale(1.2); }
                    100% { opacity: 1; }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-10px) rotate(5deg); }
                }
                @keyframes reveal {
                    from { opacity: 0; transform: translateY(20px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .radar-line {
                    position: absolute;
                    top: 50%; left: 50%;
                    width: 140px; height: 140px;
                    border: 1px solid rgba(82, 183, 136, 0.2);
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    pointer-events: none;
                }
                .radar-line::after {
                    content: '';
                    position: absolute;
                    top: -2px; left: 50%;
                    width: 6px; height: 6px;
                    background: #52B788;
                    border-radius: 50%;
                    box-shadow: 0 0 10px #52B788;
                }
                .radar-line {
                    animation: spin 4s linear infinite;
                }
                @keyframes spin {
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
            `}</style>
        </section>
    );
}
