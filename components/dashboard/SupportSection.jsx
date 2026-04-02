'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function SupportSection({ user }) {
    const [copied, setCopied] = useState(false);
    const [shareUrl, setShareUrl] = useState('');

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || window.location.origin;
        // Using the user's username as the referral identifier
        setShareUrl(`${baseUrl}/u/${user?.username}`);
    }, [user?.username]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            toast.success('Sharing is caring! Link copied! 🔗');
            setTimeout(() => setCopied(false), 2000);
        } catch {
            toast.error('Failed to copy');
        }
    };

    return (
        <section style={{
            padding: '60px 40px',
            background: 'var(--bg)',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1
        }}>
            <div style={{
                background: 'linear-gradient(135deg, var(--surface) 0%, rgba(45, 106, 79, 0.05) 100%)',
                border: '1.5px dashed var(--accent)',
                borderRadius: '32px',
                padding: '48px',
                maxWidth: '1000px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '40px',
                flexWrap: 'wrap',
                boxShadow: '0 20px 60px rgba(0,0,0,0.03)'
            }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <div style={{ 
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: '12px', 
                        fontWeight: 800, 
                        color: 'var(--accent)', 
                        letterSpacing: '0.2em', 
                        textTransform: 'uppercase',
                        marginBottom: '12px'
                    }}>
                        Support the Platform 🚀
                    </div>
                    <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '32px',
                        fontWeight: 700,
                        color: 'var(--text)',
                        marginBottom: '16px'
                    }}>
                        Refer your friends to PlacementOS
                    </h3>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '15px',
                        color: 'var(--text-muted)',
                        lineHeight: 1.6,
                        margin: 0
                    }}>
                        Love your new portfolio? Help us grow by sharing your professional profile with your peers and network.
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'var(--bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '8px 8px 8px 24px',
                    gap: '24px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
                    flexWrap: 'wrap'
                }}>
                    <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '14px',
                        color: 'var(--text)',
                        fontWeight: 500,
                        opacity: 0.7
                    }}>
                        {shareUrl.replace('https://', '').replace('http://', '')}
                    </span>
                    <button 
                        onClick={handleCopy}
                        className="btn-primary"
                        style={{
                            padding: '14px 28px',
                            borderRadius: '10px',
                            fontSize: '13px',
                            fontWeight: 700,
                            letterSpacing: '0.03em'
                        }}
                    >
                        {copied ? 'COPIED! 🎉' : 'COPY & SHARE'}
                    </button>
                </div>
            </div>
        </section>
    );
}
