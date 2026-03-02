'use client';

import { useState, useEffect, useRef } from 'react';
import PremiumBadge from '@/components/shared/PremiumBadge';

const SOCIAL_PLATFORMS = [
    { key: 'linkedinUrl', label: 'LinkedIn', cls: 'btn-linkedin', icon: '🔗' },
    { key: 'githubUrl', label: 'GitHub', cls: 'btn-github', icon: '🐙' },
    { key: 'leetcodeUrl', label: 'LeetCode', cls: 'btn-leetcode', icon: '🟠' },
    { key: 'hackerrankUrl', label: 'HackerRank', cls: 'btn-hackerrank', icon: '🟢' },
    { key: 'twitterUrl', label: 'Twitter/X', cls: 'btn-twitter', icon: '𝕏' },
    { key: 'codeforcesUrl', label: 'Codeforces', cls: 'btn-codeforces', icon: '🔵' },
    { key: 'websiteUrl', label: 'Website', cls: 'btn-website', icon: '🌐' },
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

    const nameAnim = useTypewriter(user?.name || '', 80, 0, animStart);
    const headlineAnim = useTypewriter(user?.headline || '', 60, (user?.name?.length || 0) * 80 + 400, animStart);
    const bioAnim = useTypewriter(user?.bio || '', 28, (user?.name?.length || 0) * 80 + (user?.headline?.length || 0) * 60 + 800, animStart);

    const totalTypeTime = (user?.name?.length || 0) * 80 + (user?.headline?.length || 0) * 60 + (user?.bio?.length || 0) * 28 + 1200;

    const socialLinks = SOCIAL_PLATFORMS.filter(p => user?.[p.key]);

    const initials = (user?.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <section ref={sectionRef} style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            padding: '100px 40px 80px',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap', width: '100%' }}>
                {/* Left — Profile Picture */}
                <div style={{ flex: '0 0 auto', textAlign: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        {user?.profilePicUrl ? (
                            <img
                                src={user.profilePicUrl}
                                alt={user.name}
                                style={{
                                    width: '220px',
                                    height: '220px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '3px solid #C9A23A',
                                    boxShadow: '0 0 0 8px rgba(201,162,58,0.12), 0 20px 50px rgba(0,0,0,0.1)',
                                }}
                            />
                        ) : (
                            <div style={{
                                width: '220px',
                                height: '220px',
                                borderRadius: '50%',
                                background: '#2D6A4F',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '3px solid #C9A23A',
                                boxShadow: '0 0 0 8px rgba(201,162,58,0.12), 0 20px 50px rgba(0,0,0,0.1)',
                            }}>
                                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '64px', color: '#FAF7F2' }}>
                                    {initials}
                                </span>
                            </div>
                        )}
                        {user?.isPremium && <PremiumBadge />}
                    </div>
                    {onEditProfile && (
                        <div style={{ marginTop: '16px' }}>
                            <button onClick={onEditProfile} className="btn-ghost" style={{ padding: '7px 16px', fontSize: '12px' }}>
                                ✏️ Edit Profile
                            </button>
                        </div>
                    )}
                </div>

                {/* Right — Typewriter Text */}
                <div style={{ flex: 1, minWidth: '280px' }}>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(32px, 4vw, 52px)',
                        fontWeight: 700,
                        color: 'var(--text)',
                        minHeight: '60px',
                        marginBottom: '8px',
                    }}>
                        {nameAnim.displayed}
                        {!nameAnim.done && animStart && <span style={{ borderRight: '2px solid var(--accent)', animation: 'blink 1s step-end infinite' }}>​</span>}
                    </h1>

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '22px',
                        color: 'var(--accent)',
                        minHeight: '30px',
                        marginBottom: '8px',
                    }}>
                        {headlineAnim.displayed}
                    </p>

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '16px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.7,
                        maxWidth: '480px',
                        minHeight: '50px',
                        marginBottom: '24px',
                    }}>
                        {bioAnim.displayed}
                    </p>

                    {/* Social Buttons */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {socialLinks.map((p, i) => (
                            <a
                                key={p.key}
                                href={user[p.key]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`btn-social ${p.cls}`}
                                style={{
                                    opacity: bioAnim.done ? 1 : 0,
                                    transition: `opacity 0.3s ease ${i * 150}ms`,
                                }}
                            >
                                {p.icon} {p.label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
        </section>
    );
}
