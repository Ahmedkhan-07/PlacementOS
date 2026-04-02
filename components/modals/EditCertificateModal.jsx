'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const lbl = { fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' };

function parseDateIssued(dateStr) {
    if (!dateStr) return { month: '', year: '' };
    const [y, m] = dateStr.split('-');
    return { month: MONTHS[parseInt(m) - 1] || '', year: y || '' };
}

export default function EditCertificateModal({ isOpen, onClose, certificate, onCertificateUpdated }) {
    const isSubmitting = useRef(false);
    const [name, setName] = useState('');
    const [issuer, setIssuer] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [credentialUrl, setCredentialUrl] = useState('');
    const [fileUrl, setFileUrl] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [fileType, setFileType] = useState('image');
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen && certificate) {
            setName(certificate.name || '');
            setIssuer(certificate.issuer || '');
            const parsed = parseDateIssued(certificate.dateIssued);
            setMonth(parsed.month); setYear(parsed.year);
            setCredentialUrl(certificate.credentialUrl || '');
            setFileUrl(certificate.fileUrl || '');
            setThumbnailUrl(certificate.thumbnailUrl || '');
            setFileType(certificate.fileType || 'image');
            setErrors({});
        }
    }, [isOpen, certificate]);

    useEffect(() => {
        if (!isOpen) return;
        const h = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h);
    }, [isOpen, onClose]);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData(); fd.append('file', file); fd.append('type', 'certificate');
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            if (res.ok) { const d = await res.json(); setFileUrl(d.url); setThumbnailUrl(d.thumbnailUrl || d.url); setFileType(file.type === 'application/pdf' ? 'pdf' : 'image'); }
            else toast.error('Upload failed');
        } catch { toast.error('Upload error'); }
        setUploading(false);
    };

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        if (!name.trim()) { setErrors({ name: 'Name is required' }); return; }
        setErrors({});
        const dateIssued = month && year ? `${year}-${String(MONTHS.indexOf(month) + 1).padStart(2, '0')}` : '';
        isSubmitting.current = true; setSaving(true);
        try {
            const res = await fetch(`/api/certificates?id=${certificate._id}`, {
                method: 'PUT', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, issuer, dateIssued, fileUrl, thumbnailUrl, fileType, credentialUrl }),
            });
            if (res.ok) { toast.success('Certificate updated! 🏆'); onCertificateUpdated?.(); onClose(); }
            else toast.error('Failed to update');
        } catch { toast.error('Error saving'); }
        finally { setSaving(false); isSubmitting.current = false; }
    };

    if (!isOpen) return null;
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', maxWidth: '540px', width: '100%', maxHeight: '90vh', overflow: 'auto', animation: 'modalSlideUp 0.35s ease forwards' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1C1C1C', marginBottom: '24px' }}>Edit Certificate</h2>

                <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Certificate Name *</label>
                    <input className="fancy-input" value={name} onChange={e => setName(e.target.value)} />
                    {errors.name && <p style={{ color: '#C0392B', fontSize: '12px', marginTop: '4px' }}>{errors.name}</p>}
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Issuer / Organization</label>
                    <input className="fancy-input" value={issuer} onChange={e => setIssuer(e.target.value)} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Credential Link (URL) 🔗</label>
                    <input className="fancy-input" value={credentialUrl} onChange={e => setCredentialUrl(e.target.value)} placeholder="https://..." />
                </div>
                <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={lbl}>Month</label>
                        <select className="fancy-input" value={month} onChange={e => setMonth(e.target.value)} style={{ cursor: 'pointer' }}>
                            <option value="">Select</option>
                            {MONTHS.map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={lbl}>Year</label>
                        <select className="fancy-input" value={year} onChange={e => setYear(e.target.value)} style={{ cursor: 'pointer' }}>
                            <option value="">Select</option>
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={lbl}>Certificate File</label>
                    {fileUrl ? (
                        <div style={{ position: 'relative' }}>
                            <img src={thumbnailUrl || fileUrl} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px' }} />
                            <button onClick={() => { setFileUrl(''); setThumbnailUrl(''); }} className="btn-icon" style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', fontSize: '14px' }}>×</button>
                        </div>
                    ) : (
                        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #E8E0D4', borderRadius: '16px', padding: '32px', cursor: 'pointer' }}>
                            <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
                            <span style={{ fontSize: '24px', marginBottom: '8px' }}>📄</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B6560' }}>{uploading ? 'Uploading...' : 'Click to upload (JPG, PNG, PDF)'}</span>
                        </label>
                    )}
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} className="btn-ghost">Cancel</button>
                    <button onClick={handleSubmit} disabled={saving} className="btn-gold">{saving ? '⏳ Saving...' : 'Save Changes'}</button>
                </div>
            </div>
            <style>{`@keyframes modalSlideUp{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
        </div>
    );
}
