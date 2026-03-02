export default function Template3({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '18px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>{title}</h3>
            {children}
        </div>
    );

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            margin: '0 auto',
            padding: '40px',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            lineHeight: 1.6
        }}>
            <div style={{ marginBottom: '24px', borderBottom: `3px solid ${accentColor}`, paddingBottom: '16px' }}>
                <h1 style={{ fontSize: '30px', fontWeight: 300, color: '#1C1C1C', letterSpacing: '-0.02em' }}>{pi.name || 'Your Name'}</h1>
                <p style={{ fontSize: '12px', color: '#6B6560', marginTop: '6px' }}>
                    {[pi.email, pi.phone, pi.location].filter(Boolean).join(' · ')}
                </p>
            </div>

            {data.summary && (
                <Section title="About">
                    <p style={{ fontSize: '12px', color: '#4a4a4a', borderLeft: `3px solid ${accentColor}`, paddingLeft: '12px' }}>{data.summary}</p>
                </Section>
            )}

            {data.experience?.length > 0 && (
                <Section title="Experience">
                    {data.experience.map((e, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '13px' }}>{e.role}</strong>
                                <span style={{ fontSize: '10px', color: '#6B6560' }}>{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                            </div>
                            <p style={{ fontSize: '11px', color: accentColor, fontWeight: 500 }}>{e.company}</p>
                            <p style={{ fontSize: '11px', color: '#4a4a4a', marginTop: '4px' }}>{e.description}</p>
                        </div>
                    ))}
                </Section>
            )}

            {data.education?.length > 0 && (
                <Section title="Education">
                    {data.education.map((e, i) => (
                        <div key={i} style={{ marginBottom: '8px' }}>
                            <strong style={{ fontSize: '12px' }}>{e.institution}</strong>
                            <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{e.degree} {e.field && `— ${e.field}`} | {e.startYear}–{e.endYear} {e.grade && `(${e.grade})`}</p>
                        </div>
                    ))}
                </Section>
            )}

            {data.skills?.length > 0 && (
                <Section title="Skills">
                    <p style={{ fontSize: '12px', color: '#4a4a4a' }}>{data.skills.join(' · ')}</p>
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
                        <p key={i} style={{ fontSize: '11px', marginBottom: '4px' }}>• <strong>{a.title}</strong> {a.year && `(${a.year})`} {a.description && `— ${a.description}`}</p>
                    ))}
                </Section>
            )}

            {data.hobbies?.length > 0 && (
                <Section title="Interests">
                    <p style={{ fontSize: '12px', color: '#4a4a4a' }}>{data.hobbies.join(' · ')}</p>
                </Section>
            )}
        </div>
    );
}
