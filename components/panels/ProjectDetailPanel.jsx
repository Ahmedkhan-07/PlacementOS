'use client';

import { useEffect, useState } from 'react';

function parseTechStack(ts) {
    if (!ts) return [];
    if (Array.isArray(ts)) return ts.filter(Boolean);
    if (typeof ts === 'string') return ts.split(',').map(t => t.trim()).filter(Boolean);
    return [];
}

const TAG_COLORS = [
    { bg: 'rgba(45,106,79,0.12)', color: '#1B5E41', border: 'rgba(45,106,79,0.25)' },
    { bg: 'rgba(201,162,58,0.12)', color: '#8a6c00', border: 'rgba(201,162,58,0.3)' },
    { bg: 'rgba(50,80,200,0.10)', color: '#1a40a0', border: 'rgba(50,80,200,0.22)' },
    { bg: 'rgba(160,50,180,0.10)', color: '#7a1890', border: 'rgba(160,50,180,0.22)' },
    { bg: 'rgba(200,80,30,0.10)', color: '#a03010', border: 'rgba(200,80,30,0.22)' },
];

export default function ProjectDetailPanel({ project, isOpen, onClose, onDelete, onEdit, readOnly = false }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const h = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [isOpen, onClose]);

    useEffect(() => { if (!isOpen) setConfirmDelete(false); }, [isOpen]);

    const handleDelete = () => { onDelete?.(); onClose(); };
    const techStack = project ? parseTechStack(project.techStack) : [];

    return (
        <>
            <div className={`overlay ${isOpen ? 'active' : ''}`} style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />

            <div className={`slide-panel-up ${isOpen ? 'open' : ''}`} style={{ background: '#FAFAF8' }}>
                {/* Drag handle */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '14px' }}>
                    <div style={{ width: '44px', height: '4px', background: '#D8D0C8', borderRadius: '4px' }} />
                </div>

                {/* Premium accent bar */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg,#1B4332,#2D6A4F,#C9A23A,#2D6A4F,#1B4332)', margin: '10px 0 0' }} />

                {/* Close */}
                <button onClick={onClose} className="btn-icon" style={{ position: 'absolute', top: '14px', right: '16px', zIndex: 2, width: '34px', height: '34px', fontSize: '18px' }}>×</button>

                {project && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 44px)', overflow: 'auto' }}>
                        <div style={{ display: 'flex', gap: '36px', padding: '28px 44px 20px', flexWrap: 'wrap' }}>

                            {/* ── Left: image */}
                            <div style={{ flex: '0 0 38%', minWidth: '240px' }}>
                                <div style={{
                                    width: '100%', height: '220px',
                                    borderRadius: '16px', background: 'var(--surface)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                                    border: '1.5px solid rgba(45,106,79,0.15)',
                                    boxShadow: '0 4px 24px rgba(45,106,79,0.08)',
                                }}>
                                    {project.imageUrl ? (
                                        <img src={project.imageUrl} alt={project.title} style={{ maxWidth: '100%', maxHeight: '260px', objectFit: 'contain', display: 'block' }} />
                                    ) : (
                                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', color: 'var(--accent)', opacity: 0.6 }}>📦</span>
                                    )}
                                </div>

                                {/* Tech chips */}
                                {techStack.length > 0 && (
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '16px' }}>
                                        {techStack.map((t, i) => {
                                            const c = TAG_COLORS[i % TAG_COLORS.length];
                                            return (
                                                <span key={i} style={{ padding: '4px 12px', background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: '100px', fontSize: '11.5px', fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: '0.01em' }}>{t}</span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* ── Right: info */}
                            <div style={{ flex: 1, minWidth: '220px', paddingTop: '4px' }}>
                                {/* Label */}
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px', opacity: 0.85 }}>Project</p>

                                {/* Title */}
                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: '14px', letterSpacing: '-0.01em' }}>
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '14.5px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '20px', fontWeight: 400 }}>
                                    {project.description || 'No description provided.'}
                                </p>

                                {/* Links */}
                                {(project.githubUrl || project.demoUrl) && (
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                                        {project.githubUrl && (
                                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '100px', border: '1.5px solid var(--text)', color: 'var(--text)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, textDecoration: 'none', background: 'transparent', transition: 'background 0.2s' }}
                                                onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                                                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                                            >🐙 GitHub</a>
                                        )}
                                        {project.demoUrl && (
                                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 20px', borderRadius: '100px', border: 'none', background: 'linear-gradient(135deg,#2D6A4F,#1B4332)', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,106,79,0.3)' }}
                                            >🚀 Live Demo</a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        {!readOnly && !project._id?.startsWith('demo-') && (
                            <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 44px 36px', flexWrap: 'wrap', gap: '10px' }}>
                                {onEdit && (
                                    <button onClick={onEdit} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '100px', border: '1.5px solid #2D6A4F', color: '#2D6A4F', background: 'transparent', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                        ✏️ Edit Project
                                    </button>
                                )}
                                {onDelete && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        {!confirmDelete ? (
                                            <button onClick={() => setConfirmDelete(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '100px', border: '1.5px solid #C0392B', color: '#C0392B', background: 'transparent', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                                🗑 Delete
                                            </button>
                                        ) : (
                                            <>
                                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: '#C0392B' }}>Are you sure?</span>
                                                <button onClick={() => setConfirmDelete(false)} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid #ccc', background: 'transparent', fontFamily: "'Inter',sans-serif", fontSize: 13, cursor: 'pointer' }}>Cancel</button>
                                                <button onClick={handleDelete} style={{ padding: '9px 18px', borderRadius: 100, background: '#C0392B', color: 'white', border: 'none', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
