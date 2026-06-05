export default function Template8({ data = {}, accentColor = '#2D6A4F' }) {
    const pi = data.personalInfo || {};
    const initials = (pi.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

    const Section = ({ title, children }) => (
        <div style={{ marginBottom: '18px' }}>
            <h3 style={{
                fontSize: '11pt',
                fontWeight: 700,
                color: accentColor,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                borderBottom: `1.5px solid ${accentColor}`,
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
            fontFamily: "'Inter', sans-serif",
            color: '#1C1C1C',
            fontSize: '10pt',
            lineHeight: 1.5,
            margin: '0 auto',
            boxSizing: 'border-box',
        }}>
            {/* Bold Premium Banner Header */}
            <div style={{
                backgroundColor: accentColor,
                color: '#FFFFFF',
                padding: '36px 40px',
                textAlign: 'center',
            }}>
                {data.showProfilePic !== false && (
                    pi.profilePicUrl ? (
                        <img
                            src={pi.profilePicUrl}
                            alt="Profile"
                            style={{
                                width: '72px', height: '72px', borderRadius: '50%',
                                objectFit: 'cover', display: 'block', margin: '0 auto 12px',
                                border: '2px solid rgba(255,255,255,0.5)'
                            }}
                        />
                    ) : (
                        <div style={{
                            width: '72px', height: '72px', borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px',
                            color: '#fff', fontSize: '22px', fontWeight: 700,
                            border: '2px solid rgba(255,255,255,0.5)'
                        }}>
                            {initials}
                        </div>
                    )
                )}

                <h1 style={{
                    fontSize: '26pt',
                    fontWeight: 800,
                    margin: '0 0 8px',
                    letterSpacing: '-0.02em',
                }}>
                    {pi.name || 'Your Name'}
                </h1>
                
                {/* Contact grid */}
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '6px 16px',
                    fontSize: '9pt',
                    opacity: 0.9,
                }}>
                    {pi.email && <span>✉ {pi.email}</span>}
                    {pi.phone && <span>📞 {pi.phone}</span>}
                    {pi.location && <span>📍 {pi.location}</span>}
                    {pi.linkedinUrl && (
                        <a href={pi.linkedinUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>LinkedIn</a>
                    )}
                    {pi.githubUrl && (
                        <a href={pi.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>GitHub</a>
                    )}
                    {pi.leetcodeUrl && (
                        <a href={pi.leetcodeUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>LeetCode</a>
                    )}
                    {pi.portfolioUrl && (
                        <a href={pi.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline' }}>Portfolio</a>
                    )}
                </div>
            </div>

            {/* Split Grid Body */}
            <div style={{
                display: 'flex',
                padding: '32px 40px',
                gap: '28px',
            }}>
                {/* Left Column — 65% width */}
                <div style={{ width: '65%' }}>
                    {/* 1. Professional Profile */}
                    {data.summary && (
                        <Section title="Professional Profile">
                            <p style={{ color: '#4a4a4a', fontSize: '9.5pt', margin: 0 }}>
                                {data.summary}
                            </p>
                        </Section>
                    )}

                    {/* 2. Education */}
                    {data.education?.length > 0 && (
                        <Section title="Education">
                            {data.education.map((e, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <strong style={{ fontSize: '10pt', display: 'block' }}>{e.institution}{e.university && `, ${e.university}`}</strong>
                                    <span style={{ fontSize: '9.5pt', color: '#4a4a4a', display: 'block' }}>{e.degree} {e.field && `in ${e.field}`}</span>
                                    <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{e.startYear} – {e.endYear} {e.grade && `| ${e.gradeType || 'CGPA'}: ${e.grade}`}</span>
                                    {e.description && <p style={{ fontSize: '9pt', color: '#4a4a4a', margin: '2px 0 0' }}>{e.description}</p>}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 3. Key Projects */}
                    {data.projects?.length > 0 && (
                        <Section title="Key Projects">
                            {data.projects.map((p, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <strong style={{ fontSize: '10.5pt' }}>{p.title}</strong>
                                            <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>
                                                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none', marginRight: '6px' }}>GitHub</a>}
                                                {p.demoUrl && <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" style={{ color: accentColor, textDecoration: 'none' }}>Live</a>}
                                            </span>
                                        </div>
                                        {(p.startDate || p.endDate) && (
                                            <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>
                                                {p.startDate}{p.startDate && p.endDate ? ' – ' : ''}{p.endDate}
                                            </span>
                                        )}
                                    </div>
                                    {p.techStack?.length > 0 && (
                                        <p style={{ fontSize: '8.5pt', color: '#6B6560', fontStyle: 'italic', margin: 0 }}>
                                            {p.techStack.join(', ')}
                                        </p>
                                    )}
                                    {p.description && (
                                        <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, marginTop: '2px', whiteSpace: 'pre-line' }}>
                                            {p.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 4. Work History */}
                    {data.experience?.length > 0 && (
                        <Section title="Work History">
                            {data.experience.map((e, i) => (
                                <div key={i} style={{ marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <strong style={{ fontSize: '10.5pt' }}>{e.role}</strong>
                                        <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{e.startDate} – {e.current ? 'Present' : e.endDate}</span>
                                    </div>
                                    <span style={{ fontSize: '9.5pt', color: accentColor, fontWeight: 600, display: 'block', marginBottom: '3px' }}>{e.company}</span>
                                    {e.description && (
                                        <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line' }}>
                                            {e.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 5. Certifications */}
                    {data.certifications?.length > 0 && (
                        <Section title="Certifications">
                            {data.certifications.map((c, i) => (
                                <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <strong style={{ fontSize: '9.5pt' }}>{c.title}</strong>
                                        {c.description && <p style={{ fontSize: '8.5pt', color: '#4a4a4a', margin: '2px 0 0' }}>{c.description}</p>}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {c.year && <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{c.year}</span>}
                                        {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '8.5pt', color: accentColor, textDecoration: 'none' }}>Verify →</a>}
                                    </div>
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 6. Achievements */}
                    {data.achievements?.length > 0 && (
                        <Section title="Achievements">
                            {data.achievements.map((a, i) => (
                                <div key={i} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <div>
                                        <strong style={{ fontSize: '9.5pt' }}>{a.title}</strong>
                                        {a.description && <p style={{ fontSize: '8.5pt', color: '#4a4a4a', margin: '2px 0 0' }}>{a.description}</p>}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {a.year && <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{a.year}</span>}
                                        {a.url && <a href={a.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '8.5pt', color: accentColor, textDecoration: 'none' }}>Verify →</a>}
                                    </div>
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 7. Leadership & Extracurricular Activities */}
                    {data.leadership?.length > 0 && (
                        <Section title="Leadership & Extracurricular Activities">
                            {data.leadership.map((l, i) => (
                                <div key={i} style={{ marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                        <strong style={{ fontSize: '10pt' }}>{l.role}</strong>
                                        <span style={{ fontSize: '8.5pt', color: '#6B6560' }}>{l.startDate} – {l.endDate}</span>
                                    </div>
                                    <span style={{ fontSize: '9.5pt', color: accentColor, fontWeight: 600, display: 'block', marginBottom: '3px' }}>{l.organization}</span>
                                    {l.description && (
                                        <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0, whiteSpace: 'pre-line' }}>
                                            {l.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </Section>
                    )}

                    {/* 8. References (Optional) */}
                    {data.references && (
                        <Section title="References">
                            <p style={{ color: '#4a4a4a', fontSize: '9.5pt', whiteSpace: 'pre-line', margin: 0 }}>
                                {data.references}
                            </p>
                        </Section>
                    )}
                </div>

                {/* Right Column — 35% width */}
                <div style={{ width: '35%' }}>
                    {/* Technical Expertise */}
                    {(data.skillsText || data.skills?.length > 0) && (
                        <Section title="Technical Expertise">
                            <p style={{ fontSize: '9.5pt', color: '#4a4a4a', whiteSpace: 'pre-line', lineHeight: 1.4, margin: 0 }}>
                                {data.skillsText || data.skills?.join(', ')}
                            </p>
                        </Section>
                    )}

                    {/* Languages */}
                    {data.languages?.length > 0 && (
                        <Section title="Languages">
                            <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0 }}>
                                {data.languages.join(', ')}
                            </p>
                        </Section>
                    )}

                    {/* Interests */}
                    {data.interests && data.interests.filter(i => i.trim() !== '').length > 0 && (
                        <Section title="Interests">
                            <p style={{ fontSize: '9.5pt', color: '#4a4a4a', margin: 0 }}>
                                {data.interests.filter(i => i.trim() !== '').join(', ')}
                            </p>
                        </Section>
                    )}
                </div>
            </div>
        </div>
    );
}
