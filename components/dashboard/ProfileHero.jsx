'use client';

import { useState, useEffect, useRef } from 'react';

const SOCIAL_PLATFORMS = [
    { key: 'linkedinUrl', label: 'LinkedIn', cls: 'btn-linkedin', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ) },
    { key: 'githubUrl', label: 'GitHub', cls: 'btn-github', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ) },
    { key: 'leetcodeUrl', label: 'LeetCode', cls: 'btn-leetcode', icon: '🟠' },
    { key: 'hackerrankUrl', label: 'HackerRank', cls: 'btn-hackerrank', icon: '🟢' },
    { key: 'twitterUrl', label: 'Twitter/X', cls: 'btn-twitter', icon: '𝕏' },
    { key: 'websiteUrl', label: 'Website', cls: 'btn-website', icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    ) },
];

function useTypewriter(text, speed, delay, startTrigger) {
    const [displayed, setDisplayed] = useState('');
    const [done, setDone] = useState(false);

    useEffect(() => {
        if (!startTrigger || !text) return;
        setDisplayed('');
        setDone(false);
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                i++;
                setDisplayed(text.slice(0, i));
                if (i >= text.length) {
                    clearInterval(interval);
                    setDone(true);
                }
            }, speed);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, speed, delay, startTrigger]);

    return { displayed, done };
}

export default function ProfileHero({ user, onEditProfile }) {
    const [animStart, setAnimStart] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => setAnimStart(true), 200);
        return () => clearTimeout(timer);
    }, []);

    const nameAnim = useTypewriter(user?.name || '', 60, 0, animStart);
    const headlineAnim = useTypewriter(user?.headline || '', 40, (user?.name?.length || 0) * 60 + 300, animStart);
    const bioAnim = useTypewriter(user?.bio || '', 20, (user?.name?.length || 0) * 60 + (user?.headline?.length || 0) * 40 + 600, animStart);

    const socialLinks = SOCIAL_PLATFORMS.filter(p => user?.[p.key]);
    const initials = (user?.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <section id="about" ref={sectionRef} style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '120px 5% 80px',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            background: 'var(--bg)'
        }}>
            
            {/* Artistic Backdrop Elements */}
            <div style={{
                position: 'absolute',
                top: '-10%', right: '-5%',
                width: '600px', height: '600px',
                background: 'radial-gradient(circle, rgba(45, 106, 79, 0.05) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '5%', left: '-10%',
                width: '500px', height: '500px',
                background: 'radial-gradient(circle, rgba(201, 162, 58, 0.03) 0%, transparent 70%)',
                filter: 'blur(50px)',
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap-reverse', width: '100%' }}>
                
                {/* Left — Visual Content */}
                <div style={{ flex: 1, minWidth: '320px' }}>
                    
                    {/* Status Badge */}
                    {user?.openToOpportunities && (
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '10px',
                            background: 'rgba(82, 183, 136, 0.08)',
                            border: '1px solid rgba(82, 183, 136, 0.2)',
                            color: 'var(--accent)',
                            padding: '8px 16px',
                            borderRadius: '100px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '13px',
                            fontWeight: 600,
                            marginBottom: '24px',
                            opacity: animStart ? 1 : 0,
                            transform: animStart ? 'translateY(0)' : 'translateY(10px)',
                            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)', animation: 'pulse 2s infinite' }} />
                            Available for new opportunities
                        </div>
                    )}

                    {/* Main Headings */}
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(42px, 6vw, 72px)',
                        fontWeight: 700,
                        color: 'var(--text)',
                        marginBottom: '12px',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px'
                    }}>
                        {nameAnim.displayed}
                        {user?.isPremium && (
                            <span style={{
                                fontSize: '14px',
                                background: 'linear-gradient(135deg, #2D6A4F 0%, #1B4332 100%)',
                                color: '#FFF',
                                padding: '4px 12px',
                                borderRadius: '100px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                fontWeight: 800,
                                transform: 'translateY(-10px)',
                                boxShadow: '0 4px 15px rgba(45,106,79,0.3)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                letterSpacing: '0.05em'
                            }}>
                                PRO <span style={{ color: '#FFD700', textShadow: '0 0 5px rgba(255,215,0,0.5)' }}>👑</span>
                            </span>
                        )}
                        {!nameAnim.done && animStart && <span style={{ borderRight: '3px solid var(--accent)', animation: 'blink 1s step-end infinite' }}>​</span>}
                    </h1>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '28px',
                        opacity: headlineAnim.displayed ? 1 : 0,
                        transition: 'opacity 0.6s ease'
                    }}>
                        <div style={{ height: '2px', width: '40px', background: 'var(--gold)' }} />
                        <h2 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 'clamp(18px, 2.5vw, 26px)',
                            color: 'var(--accent)',
                            fontWeight: 500,
                            margin: 0
                        }}>
                            {headlineAnim.displayed}
                        </h2>
                    </div>

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '18px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.8,
                        maxWidth: '540px',
                        marginBottom: '40px',
                        opacity: 0.9
                    }}>
                        {bioAnim.displayed}
                    </p>

                    {/* Action Dock */}
                    <div style={{
                        display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '48px',
                        opacity: bioAnim.done ? 1 : 0,
                        transform: bioAnim.done ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}>
                        <a 
                            href="#projects" 
                            className="btn-primary" 
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{ textDecoration: 'none', padding: '16px 36px', fontSize: '15px' }}
                        >
                            Explore Projects
                        </a>
                        <a 
                            href="#contact" 
                            className="btn-outline" 
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            style={{ textDecoration: 'none', padding: '16px 36px', fontSize: '15px' }}
                        >
                            Let's Connect
                        </a>
                    </div>

                    {/* Social Cloud */}
                    <div style={{ 
                        display: 'flex', gap: '12px', flexWrap: 'wrap',
                        opacity: bioAnim.done ? 1 : 0,
                        transition: 'opacity 1s ease 0.4s'
                    }}>
                        {socialLinks.map((p, i) => (
                            <div key={p.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <a
                                    href={user[p.key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`btn-icon`}
                                    title={p.label}
                                    style={{
                                        width: '48px', height: '48px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        borderRadius: '12px',
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        color: 'var(--text)',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--accent)';
                                        e.currentTarget.style.color = 'var(--accent)';
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 24px rgba(45, 106, 79, 0.12)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'var(--border)';
                                        e.currentTarget.style.color = 'var(--text)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.03)';
                                    }}
                                >
                                    {p.icon}
                                </a>
                                <span style={{ 
                                    fontFamily: "'Inter', sans-serif", 
                                    fontSize: '10px', 
                                    fontWeight: 700, 
                                    color: 'var(--text-muted)', 
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
                                    {p.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Profile Visual */}
                <div style={{ flex: '0 0 auto', position: 'relative' }}>
                    <div style={{
                        position: 'relative',
                        width: 'clamp(280px, 30vw, 400px)',
                        height: 'clamp(280px, 30vw, 400px)',
                        zIndex: 2
                    }}>
                        {/* Decorative Frames */}
                        <div style={{
                            position: 'absolute', inset: '-15px',
                            border: '1px solid var(--border)',
                            borderRadius: '50px',
                            transform: 'rotate(-5deg)',
                            zIndex: -1,
                            opacity: 0.5
                        }} />
                        <div style={{
                            position: 'absolute', inset: '-5px',
                            border: '2px solid var(--accent)',
                            borderRadius: '45px',
                            transform: 'rotate(3deg)',
                            zIndex: -1,
                            opacity: 0.2
                        }} />

                        <div style={{
                            width: '100%', height: '100%',
                            borderRadius: '40px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
                            background: 'var(--surface)',
                            border: '8px solid var(--surface)'
                        }}>
                            {user?.profilePicUrl ? (
                                <img
                                    src={user.profilePicUrl}
                                    alt={user.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%', height: '100%',
                                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(64px, 10vw, 120px)', color: 'white' }}>
                                        {initials}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Floating Edit Badge */}
                        {onEditProfile && (
                            <button 
                                onClick={onEditProfile} 
                                className="btn-icon"
                                style={{
                                    position: 'absolute', bottom: '20px', right: '-20px',
                                    width: '56px', height: '56px',
                                    borderRadius: '50%',
                                    background: 'var(--surface)',
                                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    zIndex: 10,
                                    color: 'var(--accent)'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }
            `}</style>
        </section>
    );
}
