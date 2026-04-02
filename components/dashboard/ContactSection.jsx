'use client';

import { useState } from 'react';

export default function ContactSection({ user }) {
    return (
        <section id="contact" style={{
            padding: '100px 40px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{ maxWidth: '1100px', width: '100%' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                }}>
                    <div style={{ width: '40px', height: '2px', background: 'var(--primary)' }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', letterSpacing: '0.15em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 600 }}>
                        CONTACT
                    </span>
                </div>
                
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(36px, 5vw, 48px)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '16px'
                }}>
                    Let's Connect
                </h2>
                <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '16px',
                    color: 'var(--text-muted)',
                    maxWidth: '480px',
                    lineHeight: 1.6,
                    marginBottom: '60px'
                }}>
                    Have a project in mind, want to collaborate, or just want to chat about AI? I'd love to hear from you.
                </p>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    {/* Contact Info Blocks */}
                    <a href={`mailto:${user?.contactEmail || 'hello@' + (user?.username || 'user') + '.dev'}`} style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        background: 'var(--card-bg)',
                        border: '1.5px solid var(--border)',
                        borderRadius: '24px',
                        padding: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '24px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                    >
                        <div style={{ width: '64px', height: '64px', background: 'rgba(45, 106, 79, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase' }}>Email Me</p>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: 'var(--text)', fontWeight: 600 }}>
                                {user?.contactEmail || `hello@${user?.username || 'user'}.dev`}
                            </p>
                        </div>
                        <div style={{ opacity: 0.5 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l10-10M7 7h10v10" /></svg>
                        </div>
                    </a>

                    {user?.linkedinUrl && (
                        <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            background: 'var(--card-bg)',
                            border: '1.5px solid var(--border)',
                            borderRadius: '24px',
                            padding: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                            <div style={{ width: '64px', height: '64px', background: 'rgba(45, 106, 79, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase' }}>Professional</p>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: 'var(--text)', fontWeight: 600, margin: 0 }}>
                                    LinkedIn Profile
                                </p>
                            </div>
                            <div style={{ opacity: 0.5 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </div>
                        </a>
                    )}

                    {user?.githubUrl && (
                        <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                            textDecoration: 'none',
                            color: 'inherit',
                            background: 'var(--card-bg)',
                            border: '1.5px solid var(--border)',
                            borderRadius: '24px',
                            padding: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '24px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                            cursor: 'pointer',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                        >
                            <div style={{ width: '64px', height: '64px', background: 'rgba(45, 106, 79, 0.1)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)' }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.15em', marginBottom: '8px', textTransform: 'uppercase' }}>Software</p>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '18px', color: 'var(--text)', fontWeight: 600, margin: 0 }}>
                                    GitHub Repos
                                </p>
                            </div>
                            <div style={{ opacity: 0.5 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </div>
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}
