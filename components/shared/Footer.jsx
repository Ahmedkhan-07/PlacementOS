'use client';

import Link from 'next/link';

const LEGAL_LINKS = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/about', label: 'About Us' },
];

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            background: 'var(--surface)',
            padding: '40px 40px 28px',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Top row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '32px', marginBottom: '32px' }}>

                    <div style={{ maxWidth: '320px' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 800, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                            PlacementOS
                        </span>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '8px', marginBottom: '24px' }}>
                            Your career, one link. Build a stunning digital portfolio — showcase projects, certificates, and achievements with a shareable public profile.
                        </p>
                        <a 
                            href={process.env.NEXT_PUBLIC_DEVELOPER_LINKEDIN || "https://www.linkedin.com/in/ahmed-yasin-khan-4489992ba/"}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                background: 'rgba(45, 106, 79, 0.04)',
                                border: '1px solid rgba(45, 106, 79, 0.15)',
                                padding: '10px 18px',
                                borderRadius: '12px',
                                color: 'var(--accent)',
                                fontSize: '13px',
                                fontWeight: 700,
                                transition: 'all 0.3s ease',
                                textTransform: 'lowercase'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(45, 106, 79, 0.08)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(45, 106, 79, 0.04)'; e.currentTarget.style.transform = 'translateY(0)' }}
                        >
                            support developer by connecting
                        </a>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
                            Legal &amp; Info
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                            {LEGAL_LINKS.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: '13.5px',
                                        color: 'var(--text-muted)',
                                        textDecoration: 'none',
                                        transition: 'color 0.2s',
                                    }}
                                    onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'}
                                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
                            Contact
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {[
                                { label: 'Support', email: 'placematedotcom@gmail.com' },
                                { label: 'Legal', email: 'placematedotcom@gmail.com' },
                            ].map(c => (
                                <div key={c.label}>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{c.label}: </span>
                                    <a href={`mailto:${c.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'}
                                        onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                    >{c.email}</a>
                                </div>
                            ))}
                            <div style={{ marginTop: '4px' }}>
                                <a 
                                    href={process.env.NEXT_PUBLIC_DEVELOPER_LINKEDIN || "https://www.linkedin.com/in/ahmed-yasin-khan-4489992ba/"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ 
                                        fontFamily: "'Inter', sans-serif", 
                                        fontSize: '13px', 
                                        color: 'var(--accent)', 
                                        textDecoration: 'none', 
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}
                                    onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    Connect the Developer 🔗
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom row */}
                <div style={{
                    paddingTop: '24px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '20px',
                }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        © 2026 PlacementOS by TechForce Studio. All rights reserved. <br/>
                        Developed by <a 
                            href={process.env.NEXT_PUBLIC_DEVELOPER_LINKEDIN || "https://www.linkedin.com/in/ahmed-yasin-khan-4489992ba/"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid transparent', transition: 'border-color 0.3s' }}
                            onMouseOver={e => e.currentTarget.style.borderBottomColor = 'var(--accent)'}
                            onMouseOut={e => e.currentTarget.style.borderBottomColor = 'transparent'}
                        >
                            Khan
                        </a>
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', opacity: 0.8 }}>
                        Governed by laws of India 🇮🇳
                    </p>
                </div>

            </div>
        </footer>
    );
}
