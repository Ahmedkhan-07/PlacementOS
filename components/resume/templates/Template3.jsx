export default function Template3({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

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
            {/* Centered Header */}
            <div style={{ marginBottom: '24px', borderBottom: `3px solid ${accentColor}`, paddingBottom: '16px', textAlign: 'center' }}>
                {data.showProfilePic !== false && (
                    pi.profilePicUrl ? (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                objectFit: 'cover', display: 'block', margin: '0 auto 12px',
                                border: `2px solid ${accentColor}`
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '50%',
                            background: accentColor, display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                            color: '#fff', fontSize: '22px', fontWeight: 700
                        }}>
                            {initials}
                        </div>
                    )
                )}

                <h1 style={{ fontSize: '30px', fontWeight: 300, color: '#1C1C1C', letterSpacing: '-0.02em', margin: '0 0 6px' }}>{pi.name || 'Your Name'}</h1>
                <p style={{ fontSize: '12px', color: '#6B6560', margin: '0 0 4px' }}>
                    {[pi.email, pi.phone, pi.location].filter(Boolean).join(' · ')}
                </p>
                <p style={{ fontSize: '10pt', margin: 0 }}>
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
                </p>
            </div>

            {/* 1. Professional Summary */}
            {data.summary && (
                <Section title="Professional Summary">
                    <p style={{ fontSize: '12px', color: '#4a4a4a', borderLeft: `3px solid ${accentColor}`, paddingLeft: '12px', margin: 0 }}>{data.summary}</p>
                </Section>
            )}

            {/* 2. Education */}
            {data.education?.length > 0 && (
                <Section title="Education">
                    {data.education.map((e, i) => (
                        <div key={i} style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '12px' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                <span style={{ fontSize: '10px', color: '#6B6560' }}>{e.startYear} – {e.endYear}</span>
                            </div>
                            <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0 }}>
                                {e.degree}{e.field && ` — ${e.field}`}{e.grade && ` | ${e.gradeType || 'CGPA'}: ${e.grade}`}
                            </p>
                            {e.description && <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>{e.description}</p>}
                        </div>
                    ))}
                </Section>
            )}

            {/* 3. Technical Skills */}
            {(data.skillsText || data.skills?.length > 0) && (
                <Section title="Technical Skills">
                    <p style={{ fontSize: '11px', color: '#4a4a4a', whiteSpace: 'pre-line', lineHeight: 1.4, margin: 0 }}>
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
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '13px' }}>{e.role}</strong>
                                <span style={{ fontSize: '10px', color: '#6B6560' }}>{e.startDate} — {e.current ? 'Present' : e.endDate}</span>
                            </div>
                            <p style={{ fontSize: '11px', color: accentColor, fontWeight: 500, margin: '2px 0' }}>{e.company}</p>
                            {e.description && <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line' }}>{e.description}</p>}
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
                    <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0 }}>{data.languages.join(', ')}</p>
                </Section>
            )}

            {/* 10. Interests */}
            {(data.interests?.length > 0 || data.hobbies?.length > 0) && (
                <Section title="Interests">
                    <p style={{ fontSize: '11px', color: '#4a4a4a', margin: 0 }}>{(data.interests || data.hobbies || []).join(' · ')}</p>
                </Section>
            )}

            {/* 11. References (Optional) */}
            {data.references && (
                <Section title="References">
                    <p style={{ fontSize: '11px', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0 }}>{data.references}</p>
                </Section>
            )}
        </div>
    );
}
