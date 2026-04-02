'use client';

export default function AboutOverview({ user, resume, projectsCount = 0, certificatesCount = 0 }) {
    return (
        <section style={{
            padding: '40px 40px 80px',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
        }}>
            <div style={{
                maxWidth: '1100px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: '80px',
                alignItems: 'center'
            }}>
                {/* About Me Left Panel */}
                <div style={{ position: 'relative' }}>
                    {/* Vertical Accent Line */}
                    <div style={{ position: 'absolute', left: 0, top: '8px', bottom: '8px', width: '3px', background: 'var(--accent)', borderRadius: '4px' }} />
                    
                    <div style={{ paddingLeft: '32px' }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '16px'
                        }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', letterSpacing: '0.15em', color: 'var(--primary)', textTransform: 'uppercase', fontWeight: 700 }}>
                                Professional profile
                            </span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: 'clamp(32px, 4vw, 42px)',
                            fontWeight: 700,
                            color: 'var(--text)',
                            marginBottom: '24px',
                            lineHeight: 1.2
                        }}>
                            Executive Overview
                        </h2>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '16px',
                            color: 'var(--text-muted)',
                            lineHeight: 1.8,
                            fontWeight: 400
                        }}>
                            {user?.aboutMe || "Dedicated professional with a commitment to continuous learning and technical excellence. Explore my journey through the projects and milestones detailed below."}
                        </p>
                    </div>
                </div>

                {/* Portfolio Overview Stats (Staggered Cards) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div 
                        onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                        style={{
                            cursor: 'pointer',
                            background: 'var(--card-bg)',
                            border: '1px solid var(--border)',
                            borderRadius: '24px',
                        padding: '44px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.04)'; }}
                    >
                        <div style={{ fontSize: '56px', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                            {projectsCount > 0 ? `${projectsCount}+` : '0'}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontWeight: 700, marginTop: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center' }}>
                            Projects Delivered
                        </div>
                    </div>

                    <div 
                        onClick={(e) => { e.preventDefault(); document.getElementById('certificates')?.scrollIntoView({ behavior: 'smooth' }); }}
                        style={{
                            cursor: 'pointer',
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '24px',
                        padding: '44px 24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        transform: 'translateY(32px)' // Staggered UI
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(24px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(32px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.04)'; }}
                    >
                        <div style={{ fontSize: '56px', fontWeight: 800, color: 'var(--accent)', fontFamily: "'Inter', sans-serif", lineHeight: 1 }}>
                            {certificatesCount > 0 ? `${certificatesCount}+` : '0'}
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: "'Inter', sans-serif", fontWeight: 700, marginTop: '16px', letterSpacing: '0.05em', textTransform: 'uppercase', textAlign: 'center' }}>
                            Certifications Displayed
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
