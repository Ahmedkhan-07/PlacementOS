export default function Template1({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '18px' }}>
            <h3 style={{
                fontSize: '11pt', fontWeight: 700, color: accentColor,
                textTransform: 'uppercase', letterSpacing: '0.1em',
                borderBottom: `2px solid ${accentColor}`,
                paddingBottom: '4px', marginBottom: '10px',
            }}>{title}</h3>
            {children}
        </div>
    );

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            fontSize: '11pt',
            lineHeight: 1.5,
            margin: '0 auto',
        }}>
            {/* ── Header ── */}
            <div style={{
                background: accentColor,
                color: 'white',
                padding: '36px 40px 32px',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                    {pi.profilePicUrl && (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: 72, height: 72, borderRadius: '50%',
                                objectFit: 'cover',
                                border: '3px solid rgba(255,255,255,0.5)',
                                flexShrink: 0,
                            }}
                        />
                    )}
                    <div>
                        <h1 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '26pt', fontWeight: 700,
                            color: 'white', margin: '0 0 6px', lineHeight: 1.1,
                        }}>
                            {pi.name || 'Your Name'}
                        </h1>
                        <div style={{
                            display: 'flex', flexWrap: 'wrap',
                            gap: '4px 18px', fontSize: '9pt',
                            color: 'rgba(255,255,255,0.85)',
                        }}>
                            {pi.email && <span>✉ {pi.email}</span>}
                            {pi.phone && <span>📞 {pi.phone}</span>}
                            {pi.location && <span>📍 {pi.location}</span>}
                            {pi.linkedinUrl && <span>💼 {pi.linkedinUrl}</span>}
                            {pi.githubUrl && <span>🐙 {pi.githubUrl}</span>}
                            {pi.websiteUrl && <span>🌐 {pi.websiteUrl}</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div style={{ padding: '32px 40px' }}>
                {data.summary && (
                    <Section title="Summary">
                        <p style={{ fontSize: '11pt', color: '#4a4a4a' }}>{data.summary}</p>
                    </Section>
                )}

                {data.education?.length > 0 && (
                    <Section title="Education">
                        {data.education.map((e, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '12pt' }}>{e.institution}</strong>
                                    <span style={{ fontSize: '10pt', color: '#6B6560' }}>{e.startYear} – {e.endYear}</span>
                                </div>
                                <p style={{ fontSize: '11pt', color: '#4a4a4a' }}>
                                    {e.degree}{e.field && ` in ${e.field}`}{e.grade && ` | ${e.grade}`}
                                </p>
                            </div>
                        ))}
                    </Section>
                )}

                {data.experience?.length > 0 && (
                    <Section title="Experience">
                        {data.experience.map((e, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '12pt' }}>{e.role} — {e.company}</strong>
                                    <span style={{ fontSize: '10pt', color: '#6B6560' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                                </div>
                                <p style={{ fontSize: '11pt', color: '#4a4a4a' }}>{e.description}</p>
                            </div>
                        ))}
                    </Section>
                )}

                {data.skills?.length > 0 && (
                    <Section title="Skills">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {data.skills.map((s, i) => (
                                <span key={i} style={{
                                    padding: '3px 10px',
                                    background: `${accentColor}18`,
                                    color: accentColor, borderRadius: '4px',
                                    fontSize: '10pt', fontWeight: 500,
                                }}>{s}</span>
                            ))}
                        </div>
                    </Section>
                )}

                {data.projects?.length > 0 && (
                    <Section title="Projects">
                        {data.projects.map((p, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <strong style={{ fontSize: '12pt' }}>{p.title}</strong>
                                <p style={{ fontSize: '11pt', color: '#4a4a4a' }}>{p.description}</p>
                            </div>
                        ))}
                    </Section>
                )}

                {data.achievements?.length > 0 && (
                    <Section title="Achievements">
                        {data.achievements.map((a, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <strong style={{ fontSize: '11pt' }}>{a.title}</strong>
                                {a.year && <span style={{ fontSize: '10pt', color: '#6B6560' }}> ({a.year})</span>}
                                {a.description && <p style={{ fontSize: '10pt', color: '#4a4a4a' }}>{a.description}</p>}
                            </div>
                        ))}
                    </Section>
                )}

                {data.hobbies?.length > 0 && (
                    <Section title="Hobbies">
                        <p style={{ fontSize: '11pt', color: '#4a4a4a' }}>{data.hobbies.join(', ')}</p>
                    </Section>
                )}
            </div>
        </div>
    );
}
