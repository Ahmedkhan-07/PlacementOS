export default function Template6({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '22px' }}>
            <h3 style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: '#1C1C1C',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                borderBottom: '2px solid #1C1C1C',
                paddingBottom: '4px',
                marginBottom: '12px',
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
            fontSize: '10.5pt',
            lineHeight: 1.5,
            margin: '0 auto',
            padding: '48px 40px',
            boxSizing: 'border-box',
        }}>
            {/* Header */}
            <div style={{ marginBottom: '28px' }}>
                {data.showProfilePic !== false && (
                    pi.profilePicUrl ? (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                objectFit: 'cover', display: 'block', marginBottom: '16px',
                                border: `2px solid ${accentColor}`
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '50%',
                            background: accentColor, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                            color: '#fff', fontSize: '22px', fontWeight: 700
                        }}>
                            {initials}
                        </div>
                    )
                )}

                <h1 style={{
                    fontSize: '26pt',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    color: '#1C1C1C',
                    margin: '0 0 8px',
                    lineHeight: 1.1
                }}>
                    {pi.name || 'Your Name'}
                </h1>
                
                {/* Contact line */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px 18px',
                    fontSize: '9pt',
                    color: '#6B6560',
                    fontWeight: 500
                }}>
                    {pi.email && <span>✉ {pi.email}</span>}
                    {pi.phone && <span>📞 {pi.phone}</span>}
                    {pi.location && <span>📍 {pi.location}</span>}
                    {pi.linkedinUrl && (
                        <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>💼 LinkedIn</a>
                    )}
                    {pi.githubUrl && (
                        <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>🐙 GitHub</a>
                    )}
                    {pi.leetcodeUrl && (
                        <a href={pi.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>🟠 LeetCode</a>
                    )}
                    {pi.portfolioUrl && (
                        <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>🌐 Portfolio</a>
                    )}
                </div>
            </div>

            {/* 1. Professional Summary */}
            {data.summary && (
                <Section title="Professional Summary">
                    <p style={{ color: '#4a4a4a', fontSize: '10pt', margin: 0 }}>
                        {data.summary}
                    </p>
                </Section>
            )}

            {/* 2. Education */}
            {data.education?.length > 0 && (
                <Section title="Education">
                    {data.education.map((e, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '11pt' }}>{e.degree}{e.field && ` in ${e.field}`}</strong>
                                <span style={{ fontSize: '9.5pt', color: '#6B6560' }}>{e.startYear} – {e.endYear}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '2px' }}>
                                <span style={{ color: accentColor, fontWeight: 600 }}>{e.institution}</span>
                                {e.grade && <span style={{ fontSize: '9pt', color: '#6B6560' }}>Grade: {e.grade}</span>}
                            </div>
                            {e.description && (
                                <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, marginTop: '4px', whiteSpace: 'pre-line' }}>
                                    {e.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* 3. Technical Skills */}
            {(data.skillsText || data.skills?.length > 0) && (
                <Section title="Technical Skills">
                    <p style={{ fontSize: '10pt', color: '#4a4a4a', whiteSpace: 'pre-line', lineHeight: 1.4, margin: 0 }}>
                        {data.skillsText || data.skills?.join(', ')}
                    </p>
                </Section>
            )}

            {/* 4. Projects */}
            {data.projects?.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((p, i) => (
                        <div key={i} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                                    <strong style={{ fontSize: '11pt' }}>{p.title}</strong>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {p.githubUrl && (
                                            <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: accentColor, textDecoration: 'none' }}>GitHub</a>
                                        )}
                                        {p.demoUrl && (
                                            <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: accentColor, textDecoration: 'none' }}>Live</a>
                                        )}
                                    </div>
                                </div>
                                {(p.startDate || p.endDate) && (
                                    <span style={{ fontSize: '9.5pt', color: '#6B6560' }}>
                                        {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                    </span>
                                )}
                            </div>
                            {p.techStack?.length > 0 && (
                                <p style={{ fontSize: '9.5pt', color: '#6B6560', fontStyle: 'italic', margin: 0, marginTop: '2px', marginBottom: '2px' }}>
                                    {p.techStack.join(', ')}
                                </p>
                            )}
                            {p.description && (
                                <p style={{ fontSize: '10pt', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0, marginTop: '4px' }}>
                                    {p.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* 5. Work & Internship Experience */}
            {data.experience?.length > 0 && (
                <Section title="Work & Internship Experience">
                    {data.experience.map((e, i) => (
                        <div key={i} style={{ marginBottom: '14px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '11pt' }}>{e.role}</strong>
                                <span style={{ fontSize: '9.5pt', color: '#6B6560' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                            </div>
                            <span style={{ color: accentColor, fontWeight: 600, display: 'block', marginTop: '2px' }}>{e.company}</span>
                            {e.description && (
                                <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0, marginTop: '4px', whiteSpace: 'pre-line' }}>
                                    {e.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* 6. Certifications */}
            {data.certifications?.length > 0 && (
                <Section title="Certifications">
                    {data.certifications.map((c, i) => (
                        <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <div>
                                <strong style={{ fontSize: '10pt' }}>{c.title}</strong>
                                {c.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{c.description}</p>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {c.year && <span style={{ fontSize: '9.5pt', color: '#6B6560' }}>{c.year}</span>}
                                {c.url && (
                                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9.5pt', color: accentColor, textDecoration: 'none' }}>View →</a>
                                )}
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {/* 7. Achievements */}
            {data.achievements?.length > 0 && (
                <Section title="Achievements">
                    {data.achievements.map((a, i) => (
                        <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <div>
                                <strong style={{ fontSize: '10pt' }}>{a.title}</strong>
                                {a.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{a.description}</p>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {a.year && <span style={{ fontSize: '9.5pt', color: '#6B6560' }}>{a.year}</span>}
                                {a.url && (
                                    <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9.5pt', color: accentColor, textDecoration: 'none' }}>View →</a>
                                )}
                            </div>
                        </div>
                    ))}
                </Section>
            )}

            {/* 8. Leadership & Extracurricular Activities */}
            {data.leadership?.length > 0 && (
                <Section title="Leadership & Extracurricular Activities">
                    {data.leadership.map((l, i) => (
                        <div key={i} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <strong style={{ fontSize: '11pt' }}>{l.role} — {l.organization}</strong>
                                <span style={{ fontSize: '9pt', color: '#6B6560' }}>{l.startDate} – {l.endDate}</span>
                            </div>
                            {l.description && <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0, marginTop: '2px', whiteSpace: 'pre-line' }}>{l.description}</p>}
                        </div>
                    ))}
                </Section>
            )}

            {/* 9. Languages */}
            {data.languages?.length > 0 && (
                <Section title="Languages">
                    <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0 }}>
                        {data.languages.join(', ')}
                    </p>
                </Section>
            )}

            {/* 10. Interests */}
            {(data.interests?.length > 0 || data.hobbies?.length > 0) && (
                <Section title="Interests">
                    <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0 }}>
                        {(data.interests || data.hobbies || []).join(', ')}
                    </p>
                </Section>
            )}

            {/* 11. References (Optional) */}
            {data.references && (
                <Section title="References">
                    <p style={{ fontSize: '10pt', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0 }}>{data.references}</p>
                </Section>
            )}
        </div>
    );
}
