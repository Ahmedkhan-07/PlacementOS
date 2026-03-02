export default function Template4({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#1C1C1C', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', borderBottom: '1px solid #E8E0D4', paddingBottom: '4px' }}>{title}</h3>
            {children}
        </div>
    );

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            margin: '0 auto',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            lineHeight: 1.6
        }}>
            {/* Bold Header Banner */}
            <div style={{ background: accentColor, padding: '32px 40px', color: '#FFFFFF' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '6px' }}>{pi.name || 'Your Name'}</h1>
                <p style={{ fontSize: '13px', opacity: 0.85 }}>
                    {[pi.email, pi.phone, pi.location].filter(Boolean).join(' | ')}
                </p>
                {(pi.linkedinUrl || pi.githubUrl) && (
                    <p style={{ fontSize: '11px', opacity: 0.7, marginTop: '4px' }}>
                        {[pi.linkedinUrl, pi.githubUrl, pi.websiteUrl].filter(Boolean).join(' | ')}
                    </p>
                )}
            </div>

            <div style={{ padding: '28px 40px' }}>
                {data.summary && <Section title="Professional Summary"><p style={{ fontSize: '12px', color: '#4a4a4a' }}>{data.summary}</p></Section>}

                {data.experience?.length > 0 && (
                    <Section title="Work Experience">
                        {data.experience.map((e, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <strong style={{ fontSize: '12px' }}>{e.role}</strong> <span style={{ fontSize: '11px', color: '#6B6560' }}>at {e.company}</span>
                                <p style={{ fontSize: '10px', color: accentColor }}>{e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{e.description}</p>
                            </div>
                        ))}
                    </Section>
                )}

                {data.education?.length > 0 && (
                    <Section title="Education">
                        {data.education.map((e, i) => (
                            <div key={i} style={{ marginBottom: '6px' }}>
                                <strong style={{ fontSize: '12px' }}>{e.institution}</strong>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{e.degree} {e.field && `in ${e.field}`} ({e.startYear}–{e.endYear})</p>
                            </div>
                        ))}
                    </Section>
                )}

                {data.skills?.length > 0 && (
                    <Section title="Skills">
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {data.skills.map((s, i) => (
                                <span key={i} style={{ padding: '4px 12px', border: `1px solid ${accentColor}`, borderRadius: '20px', fontSize: '11px', color: accentColor }}>{s}</span>
                            ))}
                        </div>
                    </Section>
                )}

                {data.projects?.length > 0 && (
                    <Section title="Projects">
                        {data.projects.map((p, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <strong style={{ fontSize: '12px' }}>{p.title}</strong>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{p.description}</p>
                            </div>
                        ))}
                    </Section>
                )}

                {data.achievements?.length > 0 && (
                    <Section title="Achievements">
                        {data.achievements.map((a, i) => (
                            <p key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>• {a.title} {a.year && `(${a.year})`}</p>
                        ))}
                    </Section>
                )}

                {data.hobbies?.length > 0 && (
                    <Section title="Interests">
                        <p style={{ fontSize: '12px', color: '#4a4a4a' }}>{data.hobbies.join(' · ')}</p>
                    </Section>
                )}
            </div>
        </div>
    );
}
