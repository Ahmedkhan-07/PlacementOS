'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function ReferralSection({ user }) {
    const [copied, setCopied] = useState(false);
    const [referralUrl, setReferralUrl] = useState('');

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || window.location.origin;
        setReferralUrl(`${baseUrl}/onboarding?ref=${user?.referralCode}`);
    }, [user?.referralCode]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(referralUrl);
            setCopied(true);
            toast.success('Referral link copied! 📋');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy link');
        }
    };

    const shareOnLinkedIn = () => {
        const text = `Hey! I'm using PlacementOS to build my professional portfolio. It's clean, fast, and recruiter-friendly. Join me using my link below!`;
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const shareOnTwitter = () => {
        const text = `Build your professional portfolio in minutes with PlacementOS! 🚀\n\nJoin me here:`;
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(referralUrl)}`, '_blank');
    };

    if (user?.isPremium) return null;

    const progress = Math.min((user?.referralCount || 0) / 1 * 100, 100);

    return (
        <section id="referral" style={{ padding: '80px 40px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ 
                    background: 'var(--bg)', 
                    borderRadius: '40px', 
                    padding: '64px', 
                    border: '1.5px solid var(--accent)', 
                    textAlign: 'center',
                    boxShadow: '0 30px 80px rgba(45, 106, 79, 0.08)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Decorative Background Glow */}
                    <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--accent)', opacity: 0.03, filter: 'blur(80px)' }} />

                    <div style={{ fontSize: '56px', marginBottom: '24px' }}>🎁</div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                        Premium for Free
                    </h2>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 48px', lineHeight: 1.6 }}>
                        Invite <span style={{ color: 'var(--accent)', fontWeight: 700 }}>1 friend</span> to join PlacementOS and unlock <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Permanent Premium Access</span> forever. 
                    </p>

                    {/* Progress Bar */}
                    <div style={{ maxWidth: '500px', margin: '0 auto 48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700 }}>
                            <span style={{ color: 'var(--text-muted)' }}>Progress</span>
                            <span style={{ color: 'var(--accent)' }}>{user?.referralCount || 0}/1 Referred</span>
                        </div>
                        <div style={{ height: '14px', background: 'var(--surface)', borderRadius: '100px', padding: '3px', border: '1px solid var(--border)' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent) 0%, #52B788 100%)', borderRadius: '100px', transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)', position: 'relative', boxShadow: '0 0 10px rgba(45, 106, 79, 0.4)' }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '6px', height: '100%', background: 'rgba(255,255,255,0.4)', borderRadius: '100px', filter: 'blur(2px)' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
                        {/* Link Box */}
                        <div style={{ 
                            display: 'flex', alignItems: 'center', gap: '16px', 
                            background: 'var(--surface)', padding: '8px 8px 8px 24px', 
                            borderRadius: '16px', border: '1px solid var(--border)',
                            maxWidth: '100%', width: 'fit-content'
                        }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text)', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {referralUrl.replace('https://', '')}
                            </span>
                            <button 
                                onClick={handleCopy} 
                                className="btn-primary" 
                                style={{ padding: '12px 24px', borderRadius: '10px', fontSize: '13px' }}
                            >
                                {copied ? 'COPIED!' : 'COPY LINK'}
                            </button>
                        </div>

                        {/* Social Buttons */}
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button onClick={shareOnLinkedIn} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', borderRadius: '12px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                LinkedIn
                            </button>
                            <button onClick={shareOnTwitter} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', borderRadius: '12px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                Twitter / X
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
