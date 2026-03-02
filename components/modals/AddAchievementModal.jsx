'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const label = { fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' };

export default function AddAchievementModal({ isOpen, onClose, onAchievementAdded }) {
    const isSubmitting = useRef(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [details, setDetails] = useState('');
    const [link, setLink] = useState('');
    const [imageUrl, setImageUrl] = useState('');
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
        setTitle(''); setDescription(''); setDetails(''); setLink(''); setImageUrl(''); setErrors({});
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'achievement');
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            if (res.ok) {
                const { url } = await res.json();
                setImageUrl(url);
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
        if (!title.trim()) newErrors.title = 'Title is required';
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        isSubmitting.current = true;
        setSaving(true);
        try {
            const res = await fetch('/api/achievements', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, details, link, imageUrl }),
            });
            if (res.ok) {
                toast.success('Achievement added! 🏅');
                resetForm();
                onAchievementAdded?.();
            } else {
                toast.error('Failed to add achievement');
            }
        } catch {
            toast.error('Error adding achievement');
        } finally {
            setSaving(false);
            isSubmitting.current = false;
        }
    };

    if (!isOpen) return null;

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
                    maxWidth: '520px', width: '100%', maxHeight: '90vh', overflow: 'auto',
                    animation: 'modalSlideUp 0.35s ease forwards',
                }}
            >
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#1C1C1C', marginBottom: '24px' }}>
                    Add Achievement
                </h2>

                {/* Title */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={label}>Title *</label>
                    <input className="fancy-input" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Won National Hackathon, LeetCode Top 500..." />
                    {errors.title && <p style={{ color: '#C0392B', fontSize: '12px', marginTop: '4px' }}>{errors.title}</p>}
                </div>

                {/* Description */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={label}>Description</label>
                    <textarea className="fancy-textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief summary of the achievement..." />
                </div>

                {/* Details */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={label}>Details</label>
                    <textarea className="fancy-textarea" rows={3} value={details} onChange={e => setDetails(e.target.value)} placeholder="Any extra context, stats, metrics, rank..." />
                </div>

                {/* Link */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={label}>Link</label>
                    <input className="fancy-input" value={link} onChange={e => setLink(e.target.value)} placeholder="https://certificate-url.com or profile link" />
                </div>

                {/* Image Upload */}
                <div style={{ marginBottom: '24px' }}>
                    <label style={label}>Photo / Certificate Image</label>
                    {imageUrl ? (
                        <div style={{ position: 'relative' }}>
                            <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '12px' }} />
                            <button onClick={() => setImageUrl('')} className="btn-icon"
                                style={{ position: 'absolute', top: '8px', right: '8px', width: '32px', height: '32px', fontSize: '14px' }}>×</button>
                        </div>
                    ) : (
                        <label style={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            border: '2px dashed #E8E0D4', borderRadius: '16px', padding: '28px', cursor: 'pointer',
                        }}>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                            <span style={{ fontSize: '24px', marginBottom: '8px' }}>🏅</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B6560' }}>
                                {uploading ? 'Uploading...' : 'Click to upload image / certificate'}
                            </span>
                        </label>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={() => { resetForm(); onClose(); }} className="btn-ghost">Cancel</button>
                    <button onClick={handleSubmit} disabled={saving} className="btn-primary">
                        {saving ? '⏳ Adding...' : 'Add Achievement'}
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
