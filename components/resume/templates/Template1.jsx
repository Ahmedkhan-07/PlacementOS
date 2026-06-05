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
            {/* Header */}
            <div style={{
                background: accentColor,
                color: 'white',
                padding: '36px 40px 32px',
                width: '100%',
                boxSizing: 'border-box',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center', textAlign: 'center', width: '100%' }}>
                    {data.showProfilePic !== false && pi.profilePicUrl && (
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
                            display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                            gap: '4px 18px', fontSize: '9pt',
                            color: 'rgba(255,255,255,0.85)',
                        }}>
                            {pi.email && <span>✉ {pi.email}</span>}
                            {pi.phone && <span>📞 {pi.phone}</span>}
                            {pi.location && <span>📍 {pi.location}</span>}
                            {pi.linkedinUrl && (
                                <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', marginRight: '12px' }}>💼 LinkedIn</a>
                            )}
                            {pi.githubUrl && (
                                <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', marginRight: '12px' }}>🐙 GitHub</a>
                            )}
                            {pi.leetcodeUrl && (
                                <a href={pi.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none', marginRight: '12px' }}>🟠 LeetCode</a>
                            )}
                            {pi.portfolioUrl && (
                                <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>🌐 Portfolio</a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '32px 40px' }}>
                {/* 1. Professional Summary */}
                {data.summary && (
                    <Section title="Professional Summary">
                        <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0 }}>{data.summary}</p>
                    </Section>
                )}

                {/* 2. Education */}
                {data.education?.length > 0 && (
                    <Section title="Education">
                        {data.education.map((e, i) => (
                            <div key={i} style={{ marginBottom: '8px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '11pt' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                    <span style={{ fontSize: '9pt', color: '#6B6560' }}>{e.startYear} – {e.endYear}</span>
                                </div>
                                <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0 }}>
                                    {e.degree}{e.field && ` in ${e.field}`}{e.grade && ` | ${e.gradeType || 'CGPA'}: ${e.grade}`}
                                </p>
                                {e.description && <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{e.description}</p>}
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
                                        <span style={{ fontSize: '9pt', color: '#6B6560' }}>
                                            {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                        </span>
                                    )}
                                </div>
                                {p.techStack?.length > 0 && (
                                    <p style={{ fontSize: '9pt', color: '#6B6560', fontStyle: 'italic', margin: 0, marginTop: '2px', marginBottom: '2px' }}>
                                        {p.techStack.join(', ')}
                                    </p>
                                )}
                                {p.description && (
                                    <p style={{ fontSize: '10pt', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0, marginTop: '4px' }}>{p.description}</p>
                                )}
                            </div>
                        ))}
                    </Section>
                )}

                {/* 5. Work & Internship Experience */}
                {data.experience?.length > 0 && (
                    <Section title="Work & Internship Experience">
                        {data.experience.map((e, i) => (
                            <div key={i} style={{ marginBottom: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <strong style={{ fontSize: '11pt' }}>{e.role} — {e.company}</strong>
                                    <span style={{ fontSize: '9pt', color: '#6B6560' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                                </div>
                                {e.description && <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0, marginTop: '2px', whiteSpace: 'pre-line' }}>{e.description}</p>}
                            </div>
                        ))}
                    </Section>
                )}

                {/* 6. Certifications */}
                {data.certifications?.length > 0 && (
                    <Section title="Certifications">
                        {data.certifications.map((c, i) => (
                            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <strong style={{ fontSize: '10pt' }}>{c.title}</strong>
                                    {c.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{c.description}</p>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {c.year && <span style={{ fontSize: '9pt', color: '#6B6560' }}>{c.year}</span>}
                                    {c.url && (
                                        <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: accentColor, textDecoration: 'none' }}>View →</a>
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
                            <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div>
                                    <strong style={{ fontSize: '10pt' }}>{a.title}</strong>
                                    {a.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{a.description}</p>}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {a.year && <span style={{ fontSize: '9pt', color: '#6B6560' }}>{a.year}</span>}
                                    {a.url && (
                                        <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '9pt', color: accentColor, textDecoration: 'none' }}>View →</a>
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
                        <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0 }}>{data.languages.join(', ')}</p>
                    </Section>
                )}

                {/* 10. Interests */}
                {(data.interests?.length > 0 || data.hobbies?.length > 0) && (
                    <Section title="Interests">
                        <p style={{ fontSize: '10pt', color: '#4a4a4a', margin: 0 }}>{(data.interests || data.hobbies || []).join(', ')}</p>
                    </Section>
                )}

                {/* 11. References (Optional) */}
                {data.references && (
                    <Section title="References">
                        <p style={{ fontSize: '10pt', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0 }}>{data.references}</p>
                    </Section>
                )}
            </div>
        </div>
    );
}
