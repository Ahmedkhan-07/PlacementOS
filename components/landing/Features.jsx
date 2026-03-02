'use client';

const features = [
    { icon: '📄', title: 'Resume Builder', desc: 'AI-powered builder with live preview and 5 templates' },
    { icon: '🚂', title: 'Projects Train', desc: 'Animated train of your work — click any car for full details' },
    { icon: '🏆', title: 'Certificate Vault', desc: 'Store and display all your credentials' },
    { icon: '🔗', title: 'Public Portfolio', desc: 'One permanent link for every recruiter (Premium)' },
];

export default function Features() {
    return (
        <section id="features" style={{
            padding: '100px 40px',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '40px',
                    fontWeight: 700,
                    color: '#1C1C1C',
                    textAlign: 'center',
                    marginBottom: '60px',
                }}>
                    Everything in one place
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '24px',
                }}>
                    {features.map((f, i) => (
                        <div key={i} className="card" style={{ padding: '36px 28px' }}>
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{f.icon}</div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '20px',
                                fontWeight: 600,
                                color: '#1C1C1C',
                                marginBottom: '10px',
                            }}>
                                {f.title}
                            </h3>
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '14px',
                                color: '#6B6560',
                                lineHeight: 1.6,
                            }}>
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
