'use client';

import { useEffect, useState } from 'react';

const fmt = (d) => { try { return new Date(d).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }); } catch { return d || ''; } };

export default function CertificateDetailPanel({ certificate, isOpen, onClose, onDelete, onEdit, readOnly = false }) {
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

            <div className={`slide-panel-up ${isOpen ? 'open' : ''}`} style={{ background: '#FFFDF7' }}>
                {/* Drag handle */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '14px' }}>
                    <div style={{ width: '44px', height: '4px', background: '#E0CFA0', borderRadius: '4px' }} />
                </div>

                {/* Gold accent bar */}
                <div style={{ height: '3px', background: 'linear-gradient(90deg,#7a5c0b,#C9A23A,#F5D76E,#C9A23A,#7a5c0b)', margin: '10px 0 0' }} />

                {/* Close */}
                <button onClick={onClose} className="btn-icon" style={{ position: 'absolute', top: '14px', right: '16px', zIndex: 2, width: '34px', height: '34px', fontSize: '18px' }}>×</button>

                {certificate && (
                    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 44px)', overflow: 'auto' }}>
                        <div style={{ display: 'flex', gap: '36px', padding: '28px 44px 20px', flexWrap: 'wrap' }}>

                            {/* ── Left: certificate image */}
                            <div style={{ flex: '0 0 38%', minWidth: '240px' }}>
                                <div style={{
                                    width: '100%', minHeight: '200px', maxHeight: '280px',
                                    borderRadius: '18px', overflow: 'hidden',
                                    background: 'var(--surface)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: '1.5px solid rgba(201,162,58,0.3)',
                                    boxShadow: '0 4px 24px rgba(201,162,58,0.15)',
                                }}>
                                    {certificate.fileUrl || certificate.thumbnailUrl ? (
                                        <img
                                            src={certificate.thumbnailUrl || certificate.fileUrl}
                                            alt={certificate.name}
                                            style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain', display: 'block' }}
                                        />
                                    ) : (
                                        <span style={{ fontSize: '64px', opacity: 0.6 }}>🏆</span>
                                    )}
                                </div>

                                {/* File type badge */}
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#B8860B', fontWeight: 500, textAlign: 'center', marginTop: '10px', opacity: 0.85 }}>
                                    {certificate.fileType === 'pdf' ? '📄 PDF Certificate' : certificate.fileUrl ? '🖼️ Image Certificate' : ''}
                                </p>
                            </div>

                            {/* ── Right: info */}
                            <div style={{ flex: 1, minWidth: '220px', paddingTop: '4px' }}>
                                <p style={{ fontFamily: "'Inter',sans-serif", fontSize: '11px', fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>Certificate</p>

                                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '28px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25, marginBottom: '10px', letterSpacing: '-0.01em' }}>
                                    {certificate.name}
                                </h3>

                                {certificate.issuer && (
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', fontWeight: 600, color: '#B8860B', marginBottom: '8px' }}>
                                        {certificate.issuer}
                                    </p>
                                )}

                                {certificate.dateIssued && (
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '5px 14px', background: 'rgba(201,162,58,0.1)', border: '1px solid rgba(201,162,58,0.25)', borderRadius: '100px', marginBottom: '20px' }}>
                                        <span style={{ fontSize: '12px' }}>📅</span>
                                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12.5px', fontWeight: 600, color: '#8a6c00' }}>{fmt(certificate.dateIssued)}</span>
                                    </div>
                                )}

                                {/* View cert link */}
                                {certificate.fileUrl && (
                                    <div style={{ paddingTop: '14px', borderTop: '1px solid rgba(0,0,0,0.07)' }}>
                                        <a href={certificate.fileUrl} target="_blank" rel="noopener noreferrer"
                                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '100px', background: 'linear-gradient(135deg,#B8860B,#DAA520)', color: '#fff', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 14px rgba(184,134,11,0.35)' }}>
                                            🔗 View Certificate
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        {!readOnly && !certificate._id?.startsWith('demo-cert-') && (
                            <div style={{ borderTop: '1px solid rgba(0,0,0,0.07)', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 44px 36px', flexWrap: 'wrap', gap: '10px' }}>
                                {onEdit && (
                                    <button onClick={onEdit} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '100px', border: '1.5px solid #B8860B', color: '#B8860B', background: 'transparent', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                                        ✏️ Edit Certificate
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
