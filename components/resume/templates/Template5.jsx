export default function Template5({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    return (
        <div style={{
            display: 'flex',
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            margin: '0 auto',
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            lineHeight: 1.6
        }}>
            {/* Sidebar */}
            <div style={{ width: '30%', background: '#F5F3EF', padding: '32px 16px', borderRight: `3px solid ${accentColor}` }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#fff', fontSize: '24px', fontWeight: 700 }}>
                    {initials}
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accentColor, marginBottom: '6px' }}>Contact</h3>
                    {pi.email && <p style={{ fontSize: '10px', color: '#4a4a4a', wordBreak: 'break-all' }}>{pi.email}</p>}
                    {pi.phone && <p style={{ fontSize: '10px', color: '#4a4a4a' }}>{pi.phone}</p>}
                    {pi.location && <p style={{ fontSize: '10px', color: '#4a4a4a' }}>{pi.location}</p>}
                </div>

                {data.skills?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accentColor, marginBottom: '6px' }}>Skills</h3>
                        {data.skills.map((s, i) => (
                            <div key={i} style={{ marginBottom: '4px' }}>
                                <p style={{ fontSize: '10px', color: '#4a4a4a' }}>{s}</p>
                                <div style={{ height: '3px', background: '#E8E0D4', borderRadius: '2px', overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: '75%', background: accentColor, borderRadius: '2px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {data.hobbies?.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: accentColor, marginBottom: '6px' }}>Interests</h3>
                        {data.hobbies.map((h, i) => (
                            <p key={i} style={{ fontSize: '10px', color: '#4a4a4a', marginBottom: '2px' }}>• {h}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Main */}
            <div style={{ width: '70%', padding: '32px 24px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1C1C1C', marginBottom: '4px' }}>{pi.name || 'Your Name'}</h1>

                {data.summary && (
                    <div style={{ marginBottom: '18px' }}>
                        <h3 style={{ fontSize: '12px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '6px' }}>About Me</h3>
                        <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{data.summary}</p>
                    </div>
                )}

                {data.experience?.length > 0 && (
                    <div style={{ marginBottom: '18px' }}>
                        <h3 style={{ fontSize: '12px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '8px' }}>Experience</h3>
                        {data.experience.map((e, i) => (
                            <div key={i} style={{ marginBottom: '10px', paddingLeft: '12px', borderLeft: `2px solid ${accentColor}` }}>
                                <strong style={{ fontSize: '12px' }}>{e.role}</strong>
                                <p style={{ fontSize: '11px', color: accentColor }}>{e.company} | {e.startDate} - {e.current ? 'Present' : e.endDate}</p>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{e.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.education?.length > 0 && (
                    <div style={{ marginBottom: '18px' }}>
                        <h3 style={{ fontSize: '12px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '8px' }}>Education</h3>
                        {data.education.map((e, i) => (
                            <div key={i} style={{ marginBottom: '6px' }}>
                                <strong style={{ fontSize: '12px' }}>{e.institution}</strong>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{e.degree} {e.field && `in ${e.field}`} ({e.startYear}–{e.endYear})</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.projects?.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '12px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '8px' }}>Projects</h3>
                        {data.projects.map((p, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <strong style={{ fontSize: '12px' }}>{p.title}</strong>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{p.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
