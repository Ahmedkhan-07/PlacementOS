'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

export default function AddCertificateModal({ isOpen, onClose, onCertificateAdded }) {
    const isSubmitting = useRef(false);
    const [name, setName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [fileType, setFileType] = useState('image');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const resetForm = () => {
        setName(''); setIssuer(''); setMonth(''); setYear('');
        setFileUrl(''); setFileType('image'); setThumbnailUrl(''); setErrors({});
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'certificate');
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            if (res.ok) {
                const data = await res.json();
                setFileUrl(data.url);
                setThumbnailUrl(data.thumbnailUrl || data.url);
                setFileType(file.type === 'application/pdf' ? 'pdf' : 'image');
            } else {
                toast.error('Upload failed');
            }
        } catch {
            toast.error('Upload error');
        }
        setUploading(false);
    };

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        const newErrors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        const dateIssued = month && year ? `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, '0')}` : '';

        isSubmitting.current = true;
        setSaving(true);
        try {
            const res = await fetch('/api/certificates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, issuer, dateIssued, fileUrl, fileType, thumbnailUrl }),
            });
            if (res.ok) {
                toast.success('Certificate added! 🏆');
                resetForm();
                onCertificateAdded?.();
            } else {
                toast.error('Failed to add certificate');
            }
        } catch {
            toast.error('Error adding certificate');
        } finally {
            setSaving(false);
            isSubmitting.current = false;
        }
    };

    if (!isOpen) return null;

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    return (
        <div
            onClick={onClose}
            style={{
                position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
                zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '20px',
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: '#FFFFFF', borderRadius: '24px', padding: '40px',
                    maxWidth: '540px', width: '100%', maxHeight: '90vh', overflow: 'auto',
                    animation: 'modalSlideUp 0.35s ease forwards',
                }}
            >
                <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '28px', fontWeight: 700,
                    color: '#1C1C1C', marginBottom: '24px',
                }}>
                    Add Certificate
                </h2>

                {/* Name */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' }}>
                        Certificate Name *
                    </label>
                    <input className="fancy-input" value={name} onChange={e => setName(e.target.value)} placeholder="AWS Solutions Architect" />
                    {errors.name && <p style={{ color: '#C0392B', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                </div>

                {/* Issuer */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' }}>
                        Issuer / Organization
                    </label>
                    <input className="fancy-input" value={issuer} onChange={e => setIssuer(e.target.value)} placeholder="Amazon Web Services" />
                </div>

                {/* Date */}
                <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' }}>
                            Month
                        </label>
                        <select className="fancy-input" value={month} onChange={e => setMonth(e.target.value)} style={{ cursor: 'pointer' }}>
                            <option value="">Select</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' }}>
                            Year
                        </label>
                        <select className="fancy-input" value={year} onChange={e => setYear(e.target.value)} style={{ cursor: 'pointer' }}>
                            <option value="">Select</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>

                {/* File Upload */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' }}>
                        Certificate File (Image or PDF)
                    </label>
                    {fileUrl ? (
                        <div style={{ position: 'relative' }}>
                            <img src={thumbnailUrl || fileUrl} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px' }} />
                            <button
                                onClick={() => { setFileUrl(''); setThumbnailUrl(''); }}
                                className="btn-icon"
                                style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', fontSize: '14px' }}
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <label style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            border: '2px dashed #E8E0D4', borderRadius: '16px',
                            padding: '32px', cursor: 'pointer',
                        }}>
                            <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
                            <span style={{ fontSize: '24px', marginBottom: '8px' }}>📄</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B6560' }}>
                                {uploading ? 'Uploading...' : 'Click to upload (JPG, PNG, PDF)'}
                            </span>
                        </label>
                    )}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={() => { resetForm(); onClose(); }} className="btn-ghost">Cancel</button>
                    <button onClick={handleSubmit} disabled={saving} className="btn-gold">
                        {saving ? '⏳ Adding...' : 'Add Certificate'}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes modalSlideUp {
                    from { transform: translateY(60px); opacity: 0; }
                    to   { transform: translateY(0); opacity: 1; }
                }
            `}</style>
        </div>
    );
}
