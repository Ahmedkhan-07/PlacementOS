'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import AddCertificateModal from './AddCertificateModal';
import EditCertificateModal from './EditCertificateModal';

export default function ManageCertificatesModal({ isOpen, onClose, certificates = [], onRefresh }) {
    const [showAdd, setShowAdd] = useState(false);
    const [editingCert, setEditingCert] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    if (!isOpen) return null;

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`/api/certificates?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Certificate deleted successfully');
                setConfirmDeleteId(null);
                onRefresh?.();
            } else {
                toast.error('Failed to delete certificate');
            }
        } catch {
            toast.error('Error deleting certificate');
        }
    };

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.5)',
                zIndex: 55,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#FFFFFF',
                    borderRadius: '24px',
                    padding: '36px',
                    maxWidth: '640px',
                    width: '100%',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'modalSlideUp 0.3s ease forwards',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                }}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexShrink: 0 }}>
                    <div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '26px', fontWeight: 700,
                            color: '#1C1C1C', margin: 0,
                        }}>
                            Manage Certificates
                        </h2>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B6560', margin: '4px 0 0 0' }}>
                            Add, update, or remove certificates in your portfolio.
                        </p>
                    </div>
                    <button onClick={onClose} className="btn-icon" style={{ width: '36px', height: '36px', fontSize: '18px' }}>×</button>
                </div>

                {/* Toolbar */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', flexShrink: 0 }}>
                    <button onClick={() => setShowAdd(true)} className="btn-primary" style={{ padding: '10px 20px', fontSize: '13px' }}>
                        + Add Certificate
                    </button>
                </div>

                {/* List Container */}
                <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', marginBottom: '10px' }}>
                    {certificates.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '48px 20px', border: '1px dashed #E8E0D4', borderRadius: '16px', color: '#6B6560' }}>
                            No certificates found. Click the add button to start.
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {certificates.map((cert) => (
                                <div
                                    key={cert._id}
                                    style={{
                                        border: '1.5px solid #E8E0D4',
                                        borderRadius: '16px',
                                        padding: '18px 20px',
                                        background: '#FAFAF8',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '12px',
                                    }}
                                >
                                    {/* Certificate Meta Info */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                                        <div>
                                            <h4 style={{
                                                fontFamily: "'Inter', sans-serif",
                                                fontSize: '16px', fontWeight: 700,
                                                color: '#1C1C1C', margin: 0,
                                            }}>
                                                {cert.name}
                                            </h4>
                                            {cert.issuer && (
                                                <p style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '13px', color: '#6B6560',
                                                    margin: '4px 0 0 0',
                                                    fontWeight: 600,
                                                }}>
                                                    {cert.issuer}
                                                </p>
                                            )}
                                            {cert.dateIssued && (
                                                <p style={{
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: '12px', color: '#6B6560',
                                                    margin: '2px 0 0 0',
                                                }}>
                                                    Issued: {cert.dateIssued}
                                                </p>
                                            )}
                                        </div>

                                        {cert.isFromResume ? (
                                            <span style={{
                                                fontSize: '10.5px',
                                                fontWeight: 600,
                                                color: '#8b6200',
                                                background: 'rgba(201,162,58,0.12)',
                                                border: '1px solid rgba(201,162,58,0.25)',
                                                padding: '3px 8px',
                                                borderRadius: '100px',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                From Resume
                                            </span>
                                        ) : (
                                            <span style={{
                                                fontSize: '10.5px',
                                                fontWeight: 600,
                                                color: '#2D6A4F',
                                                background: 'rgba(45,106,79,0.08)',
                                                border: '1px solid rgba(45,106,79,0.2)',
                                                padding: '3px 8px',
                                                borderRadius: '100px',
                                                whiteSpace: 'nowrap',
                                            }}>
                                                Standalone
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #E8E0D4', paddingTop: '10px', marginTop: '4px' }}>
                                        {cert.isFromResume ? (
                                            <span style={{ fontSize: '11.5px', color: '#8b6200', fontStyle: 'italic' }}>
                                                Manage in Resume Builder
                                            </span>
                                        ) : (
                                            <>
                                                {confirmDeleteId === cert._id ? (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <span style={{ fontSize: '12px', color: '#C0392B', fontWeight: 500 }}>Confirm delete?</span>
                                                        <button onClick={() => setConfirmDeleteId(null)} style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '8px', border: '1px solid #ccc', background: 'transparent', cursor: 'pointer' }}>Cancel</button>
                                                        <button onClick={() => handleDelete(cert._id)} style={{ padding: '4px 12px', fontSize: '12px', borderRadius: '8px', border: 'none', background: '#C0392B', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <button
                                                            onClick={() => setEditingCert(cert)}
                                                            style={{
                                                                padding: '6px 14px',
                                                                fontSize: '12px',
                                                                borderRadius: '8px',
                                                                border: '1px solid #B8860B',
                                                                background: 'transparent',
                                                                color: '#B8860B',
                                                                fontWeight: 600,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            ✏️ Edit
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmDeleteId(cert._id)}
                                                            style={{
                                                                padding: '6px 14px',
                                                                fontSize: '12px',
                                                                borderRadius: '8px',
                                                                border: '1px solid #C0392B',
                                                                background: 'transparent',
                                                                color: '#C0392B',
                                                                fontWeight: 600,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            🗑️ Delete
                                                        </button>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Inner Modals */}
            <AddCertificateModal
                isOpen={showAdd}
                onClose={() => setShowAdd(false)}
                onCertificateAdded={() => {
                    setShowAdd(false);
                    onRefresh?.();
                }}
            />

            <EditCertificateModal
                isOpen={!!editingCert}
                onClose={() => setEditingCert(null)}
                certificate={editingCert}
                onCertificateUpdated={() => {
                    setEditingCert(null);
                    onRefresh?.();
                }}
            />

            <style>{`
                @keyframes modalSlideUp {
                    from { transform: translateY(50px); opacity: 0; }
                    to   { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
