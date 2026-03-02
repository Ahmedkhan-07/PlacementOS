'use client';

export default function EducationSection({ education = [] }) {
    return (
        <section style={{
            padding: '80px 48px',
            maxWidth: '900px',
            margin: '0 auto',
            position: 'relative',
            zIndex: 1,
        }}>
            <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '36px',
                color: 'var(--text)',
                marginBottom: '48px',
                textAlign: 'center',
            }}>
                Education
            </h2>

            {education.map((edu, i) => (
                <div key={i} style={{
                    display: 'flex',
                    gap: '32px',
                    marginBottom: '40px',
                    paddingBottom: '40px',
                    borderBottom: i < education.length - 1 ? '1px solid var(--border)' : 'none',
                    alignItems: 'flex-start',
                }}>
                    {/* Year on left */}
                    <div style={{
                        minWidth: '80px',
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '18px',
                        color: '#2D6A4F',
                        fontWeight: 600,
                        paddingTop: '4px',
                    }}>
                        {edu.startYear}–{edu.current ? 'Now' : edu.endYear}
                    </div>

                    {/* Details on right */}
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '22px',
                            color: 'var(--text)',
                            marginBottom: '6px',
                        }}>
                            {edu.institution}
                        </h3>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '15px',
                            color: '#2D6A4F',
                            fontWeight: 500,
                            marginBottom: '4px',
                        }}>
                            {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                        </p>
                        {edu.grade && (
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)' }}>
                                Grade: {edu.grade}
                            </p>
                        )}
                    </div>
                </div>
            ))}

            {education.length === 0 && (
                <p style={{
                    textAlign: 'center',
                    fontFamily: "'Inter', sans-serif",
                    color: 'var(--text-muted)',
                    fontSize: '15px',
                }}>
                    Add education in your Resume Builder.
                </p>
            )}
        </section>
    );
}
