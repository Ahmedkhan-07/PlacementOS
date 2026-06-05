export default function Template7({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '20px' }}>
            <h3 style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                borderBottom: '1px solid #E8E0D4',
                paddingBottom: '3px',
                marginBottom: '10px',
            }}>{title}</h3>
            {children}
        </div>
    );

    return (
        <div style={{
            width: '794px',
            minHeight: '1123px',
            background: 'white',
            fontFamily: "'Georgia', serif",
            color: '#1C1C1C',
            fontSize: '10pt',
            lineHeight: 1.5,
            margin: '0 auto',
            padding: '52px 48px',
            boxSizing: 'border-box',
        }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
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

                <h1 style={{
                    fontSize: '24pt',
                    fontWeight: 700,
                    margin: '0 0 6px',
                    color: '#1C1C1C',
                    letterSpacing: '-0.01em'
                }}>
                    {pi.name || 'Your Name'}
                </h1>
                
                {/* Contact Details */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '4px 10px',
                    fontSize: '9pt',
                    color: '#6B6560',
                    fontFamily: "'Inter', sans-serif"
                }}>
                    {pi.email && <span>{pi.email}</span>}
                    {pi.email && (pi.phone || pi.location || pi.linkedinUrl) && <span>•</span>}
                    {pi.phone && <span>{pi.phone}</span>}
                    {pi.phone && (pi.location || pi.linkedinUrl) && <span>•</span>}
                    {pi.location && <span>{pi.location}</span>}
                    {pi.location && (pi.linkedinUrl || pi.githubUrl) && <span>•</span>}
                    {pi.linkedinUrl && (
                        <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
                    )}
                    {pi.linkedinUrl && (pi.githubUrl || pi.leetcodeUrl || pi.portfolioUrl) && <span>•</span>}
                    {pi.githubUrl && (
                        <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>GitHub</a>
                    )}
                    {pi.githubUrl && (pi.leetcodeUrl || pi.portfolioUrl) && <span>•</span>}
                    {pi.leetcodeUrl && (
                        <a href={pi.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LeetCode</a>
                    )}
                    {pi.leetcodeUrl && pi.portfolioUrl && <span>•</span>}
                    {pi.portfolioUrl && (
                        <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Portfolio</a>
                    )}
                </div>
            </div>

            {/* 1. Professional Summary */}
            {data.summary && (
                <Section title="Professional Summary">
                    <p style={{ color: '#4a4a4a', fontSize: '10pt', margin: 0, textAlign: 'justify' }}>
                        {data.summary}
                    </p>
                </Section>
            )}

            {/* 2. Education */}
            {data.education?.length > 0 && (
                <Section title="Education">
                    {data.education.map((e, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '10.5pt' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                <span style={{ fontSize: '9pt', color: '#6B6560', fontFamily: "'Inter', sans-serif" }}>{e.startYear} – {e.endYear}</span>
                            </div>
                            <div style={{ fontSize: '9.5pt', color: '#4a4a4a' }}>
                                {e.degree}{e.field && ` in ${e.field}`}{e.grade && ` (${e.gradeType || 'CGPA'}: ${e.grade})`}
                            </div>
                            {e.description && (
                                <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, marginTop: '2px' }}>
                                    {e.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* 3. Technical Skills */}
            {(data.skillsText || data.skills?.length > 0) && (
                <Section title="Skills & Expertise">
                    <p style={{ fontSize: '9.5pt', color: '#4a4a4a', whiteSpace: 'pre-line', lineHeight: 1.4, margin: 0 }}>
                        {data.skillsText || data.skills?.join(', ')}
                    </p>
                </Section>
            )}

            {/* 4. Projects */}
            {data.projects?.length > 0 && (
                <Section title="Projects">
                    {data.projects.map((p, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <strong style={{ fontSize: '10.5pt' }}>{p.title}</strong>
                                    <span style={{ fontSize: '9pt', color: '#6B6560', fontFamily: "'Inter', sans-serif" }}>
                                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none', marginRight: '8px' }}>[GitHub]</a>}
                                        {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>[Live]</a>}
                                    </span>
                                </div>
                                {(p.startDate || p.endDate) && (
                                    <span style={{ fontSize: '9pt', color: '#6B6560', fontFamily: "'Inter', sans-serif" }}>
                                        {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                    </span>
                                )}
                            </div>
                            {p.techStack?.length > 0 && (
                                <p style={{ fontSize: '9pt', color: '#6B6560', fontStyle: 'italic', margin: 0, marginTop: '2px', marginBottom: '2px' }}>
                                    Technologies: {p.techStack.join(', ')}
                                </p>
                            )}
                            {p.description && (
                                <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line', textAlign: 'justify' }}>
                                    {p.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* 5. Work & Internship Experience */}
            {data.experience?.length > 0 && (
                <Section title="Professional Experience">
                    {data.experience.map((e, i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '10.5pt' }}>{e.company}</strong>
                                <span style={{ fontSize: '9pt', color: '#6B6560', fontFamily: "'Inter', sans-serif" }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', fontSize: '9.5pt', color: '#4a4a4a', marginBottom: '4px' }}>
                                {e.role}
                            </div>
                            {e.description && (
                                <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line', textAlign: 'justify' }}>
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
                        <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                            <div>
                                <strong style={{ fontSize: '9.5pt' }}>{c.title}</strong>
                                {c.description && <span style={{ fontSize: '9pt', color: '#4a4a4a' }}> — {c.description}</span>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Inter', sans-serif", fontSize: '9pt' }}>
                                {c.year && <span style={{ color: '#6B6560' }}>{c.year}</span>}
                                {c.url && (
                                    <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>[Link]</a>
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
                                <strong style={{ fontSize: '9.5pt' }}>{a.title}</strong>
                                {a.description && <span style={{ fontSize: '9pt', color: '#4a4a4a' }}> — {a.description}</span>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Inter', sans-serif", fontSize: '9pt' }}>
                                {a.year && <span style={{ color: '#6B6560' }}>{a.year}</span>}
                                {a.url && (
                                    <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>[Link]</a>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                <strong style={{ fontSize: '10.5pt' }}>{l.organization}</strong>
                                <span style={{ fontSize: '9pt', color: '#6B6560', fontFamily: "'Inter', sans-serif" }}>{l.startDate} – {l.endDate}</span>
                            </div>
                            <div style={{ fontStyle: 'italic', fontSize: '9.5pt', color: '#4a4a4a', marginBottom: '4px' }}>
                                {l.role}
                            </div>
                            {l.description && (
                                <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line', textAlign: 'justify' }}>
                                    {l.description}
                                </p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* 9. Languages */}
            {data.languages?.length > 0 && (
                <Section title="Languages">
                    <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0 }}>
                        {data.languages.join(', ')}
                    </p>
                </Section>
            )}

            {/* 10. Interests */}
            {(data.interests?.length > 0 || data.hobbies?.length > 0) && (
                <Section title="Interests">
                    <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0 }}>
                        {(data.interests || data.hobbies || []).join(', ')}
                    </p>
                </Section>
            )}

            {/* 11. References (Optional) */}
            {data.references && (
                <Section title="References">
                    <p style={{ fontSize: '9.5pt', color: '#4a4a4a', whiteSpace: 'pre-line', margin: 0 }}>{data.references}</p>
                </Section>
            )}
        </div>
    );
}
