'use client';

import Link from 'next/link';

const LEGAL_LINKS = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/refund-policy', label: 'Refund Policy' },
    { href: '/shipping-policy', label: 'Shipping & Delivery' },
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

                    {/* Brand */}
                    <div style={{ maxWidth: '320px' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>
                            PlacementOS
                        </span>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7, marginTop: '8px' }}>
                            Your career, one link. Build a stunning digital portfolio — showcase projects, certificates, and achievements with a shareable public profile.
                        </p>
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
                                { label: 'Billing', email: 'placematedotcom@gmail.com' },
                                { label: 'Legal', email: 'placematedotcom@gmail.com' },
                            ].map(c => (
                                <div key={c.label}>
                                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>{c.label}: </span>
                                    <a href={`mailto:${c.email}`} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}
                                        onMouseOver={e => e.currentTarget.style.color = 'var(--accent)'}
                                        onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}
                                    >{c.email}</a>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Bottom row */}
                <div style={{
                    paddingTop: '18px',
                    borderTop: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} PlacementOS by TechForce Studio. All rights reserved.
                    </p>
                    <a
                        href="https://www.linkedin.com/in/ahmed-yasin-khan-4489992ba/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}
                    >
                        Connect the Developer 🔗
                    </a>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-muted)' }}>
                        Payments secured by{' '}
                        <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>
                            Razorpay
                        </a>
                        {' '}· Governed by laws of India
                    </p>
                </div>

            </div>
        </footer>
    );
}
