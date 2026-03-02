'use client';

import { useEffect, useState } from 'react';

export default function AchievementDetailPanel({ achievement, isOpen, onClose, onDelete, onEdit, readOnly = false }) {
    const [confirmDelete, setConfirmDelete] = useState(false);

    useEffect(() => {
        if (!isOpen) return;
        const h = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [isOpen, onClose]);

    useEffect(() => { if (!isOpen) setConfirmDelete(false); }, [isOpen]);
    const handleDelete = () => { onDelete?.(); onClose(); };

    return (
        <>
            <div className={`overlay ${isOpen ? 'active' : ''}`} style={{ background: 'rgba(0,0,0,0.5)' }} onClick={onClose} />

            <div className={`slide-panel-up ${isOpen ? 'open' : ''}`} style={{ background: 'var(--surface)', height: '80vh', display: 'flex', flexDirection: 'column' }}>
                {/* Drag handle */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '14px' }}>
                    <div style={{ width: '44px', height: '4px', background: 'var(--border)', borderRadius: '4px' }} />
                </div>

                {/* Accent bar */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg,#2D6A4F,#52B788,#C9A23A,#52B788,#2D6A4F)', margin: '10px 0 0' }} />

                {/* Close */}
                <button onClick={onClose} className="btn-icon" style={{ position: 'absolute', top: '14px', right: '16px', zIndex: 2, width: '34px', height: '34px', fontSize: '18px' }}>×</button>

                {achievement && (
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>
                        <div style={{ padding: '24px 44px', flex: 1 }}>

                            {/* Label */}
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Achievement</p>

                            {/* Title */}
                            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: '16px', letterSpacing: '-0.01em' }}>
                                {achievement.title}
                            </h3>

                            {/* Image — if present, shown prominently */}
                            {achievement.imageUrl && (
                                <div style={{
                                    width: '100%', borderRadius: '18px', overflow: 'hidden',
                                    background: 'var(--surface)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: '20px',
                                    border: '1.5px solid var(--border)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                }}>
                                    <img src={achievement.imageUrl} alt={achievement.title}
                                        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain', display: 'block' }} />
                                </div>
                            )}

                            {/* No image placeholder */}
                            {!achievement.imageUrl && (
                                <div style={{ textAlign: 'center', paddingBottom: '4px' }}>
                                    <span style={{ fontSize: '52px', opacity: 0.5 }}>🏅</span>
                                </div>
                            )}

                            {/* Description */}
                            {achievement.description && (
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '16px', fontWeight: 400 }}>
                                    {achievement.description}
                                </p>
                            )}

                            {/* Details block */}
                            {achievement.details && (
                                <div style={{ background: 'rgba(45,106,79,0.05)', border: '1px solid rgba(45,106,79,0.12)', borderRadius: '14px', padding: '16px 20px', marginBottom: '20px' }}>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Details</p>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text)', lineHeight: 1.75 }}>
                                        {achievement.details}
                                    </p>
                                </div>
                            )}

                            {/* Link */}
                            {achievement.link && (
                                <a href={achievement.link} target="_blank" rel="noopener noreferrer"
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '100px', background: 'linear-gradient(135deg,#2D6A4F,#1B4332)', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 14px rgba(45,106,79,0.3)' }}>
                                    🔗 View Achievement
                                </a>
                            )}
                        </div>

                        {/* Actions */}
                        {!readOnly && (
                            <div style={{ borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 44px 36px', flexWrap: 'wrap', gap: '10px' }}>
                                {onEdit && (
                                    <button onClick={onEdit} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '100px', border: '1.5px solid var(--accent)', color: 'var(--accent)', background: 'transparent', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                        ✏️ Edit
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
                                                <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, color: 'var(--engine-red)' }}>Cannot be undone.</span>
                                                <button onClick={() => setConfirmDelete(false)} style={{ padding: '8px 16px', borderRadius: 100, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontFamily: "'Inter',sans-serif", fontSize: 13, cursor: 'pointer' }}>Cancel</button>
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
