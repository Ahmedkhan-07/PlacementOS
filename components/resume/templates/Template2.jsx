export default function Template2({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};

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
            <div style={{ width: '35%', background: accentColor, color: '#FFFFFF', padding: '32px 20px' }}>
                <h1 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '4px' }}>{pi.name || 'Your Name'}</h1>
                <p style={{ fontSize: '11px', opacity: 0.8, marginBottom: '24px' }}>{pi.email}</p>

                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '8px' }}>Contact</h3>
                    {pi.phone && <p style={{ fontSize: '11px' }}>📞 {pi.phone}</p>}
                    {pi.location && <p style={{ fontSize: '11px' }}>📍 {pi.location}</p>}
                    {pi.linkedinUrl && <p style={{ fontSize: '11px', wordBreak: 'break-all' }}>🔗 {pi.linkedinUrl}</p>}
                    {pi.githubUrl && <p style={{ fontSize: '11px', wordBreak: 'break-all' }}>🐙 {pi.githubUrl}</p>}
                </div>

                {data.skills?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '8px' }}>Skills</h3>
                        {data.skills.map((s, i) => (
                            <p key={i} style={{ fontSize: '11px', marginBottom: '3px' }}>• {s}</p>
                        ))}
                    </div>
                )}

                {data.hobbies?.length > 0 && (
                    <div>
                        <h3 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7, marginBottom: '8px' }}>Interests</h3>
                        {data.hobbies.map((h, i) => (
                            <p key={i} style={{ fontSize: '11px', marginBottom: '3px' }}>• {h}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div style={{ width: '65%', padding: '32px 24px' }}>
                {data.summary && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '8px' }}>Summary</h3>
                        <p style={{ fontSize: '12px', color: '#4a4a4a' }}>{data.summary}</p>
                    </div>
                )}

                {data.experience?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '8px' }}>Experience</h3>
                        {data.experience.map((e, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <strong style={{ fontSize: '12px' }}>{e.role}</strong>
                                <p style={{ fontSize: '11px', color: accentColor }}>{e.company} | {e.startDate} - {e.current ? 'Present' : e.endDate}</p>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{e.description}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.education?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '8px' }}>Education</h3>
                        {data.education.map((e, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <strong style={{ fontSize: '12px' }}>{e.institution}</strong>
                                <p style={{ fontSize: '11px', color: '#4a4a4a' }}>{e.degree} {e.field && `in ${e.field}`} | {e.startYear} - {e.endYear}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data.projects?.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '13px', fontWeight: 700, color: accentColor, textTransform: 'uppercase', marginBottom: '8px' }}>Projects</h3>
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
