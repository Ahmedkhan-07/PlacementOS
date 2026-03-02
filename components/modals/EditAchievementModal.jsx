'use client';

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const lbl = { fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#1C1C1C', display: 'block', marginBottom: '6px' };

export default function EditAchievementModal({ isOpen, onClose, achievement, onAchievementUpdated }) {
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
        if (isOpen && achievement) {
            setTitle(achievement.title || '');
            setDescription(achievement.description || '');
            setDetails(achievement.details || '');
            setLink(achievement.link || '');
            setImageUrl(achievement.imageUrl || '');
            setErrors({});
        }
    }, [isOpen, achievement]);

    useEffect(() => {
        if (!isOpen) return;
        const h = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, [isOpen, onClose]);

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0]; if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData(); fd.append('file', file); fd.append('type', 'achievement');
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            if (res.ok) { const { url } = await res.json(); setImageUrl(url); }
            else toast.error('Upload failed');
        } catch { toast.error('Upload error'); }
        setUploading(false);
    };

    const handleSubmit = async () => {
        if (isSubmitting.current) return;
        if (!title.trim()) { setErrors({ title: 'Title is required' }); return; }
        setErrors({});
        isSubmitting.current = true; setSaving(true);
        try {
            const res = await fetch(`/api/achievements?id=${achievement._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, details, link, imageUrl }),
            });
            if (res.ok) { toast.success('Achievement updated! ✏️'); onAchievementUpdated?.(); onClose(); }
            else toast.error('Failed to update');
        } catch { toast.error('Error saving'); }
        finally { setSaving(false); isSubmitting.current = false; }
    };

    if (!isOpen) return null;

    return (
        <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div onClick={e => e.stopPropagation()} style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflow: 'auto', animation: 'modalSlideUp 0.35s ease forwards' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#1C1C1C', marginBottom: '24px' }}>Edit Achievement</h2>

                <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Title *</label>
                    <input className="fancy-input" value={title} onChange={e => setTitle(e.target.value)} />
                    {errors.title && <p style={{ color: '#C0392B', fontSize: '12px', marginTop: '4px' }}>{errors.title}</p>}
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Description</label>
                    <textarea className="fancy-textarea" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Details</label>
                    <textarea className="fancy-textarea" rows={3} value={details} onChange={e => setDetails(e.target.value)} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={lbl}>Link</label>
                    <input className="fancy-input" value={link} onChange={e => setLink(e.target.value)} placeholder="https://..." />
                </div>
                <div style={{ marginBottom: '24px' }}>
                    <label style={lbl}>Photo / Certificate Image</label>
                    {imageUrl ? (
                        <div style={{ position: 'relative' }}>
                            <img src={imageUrl} alt="Preview" style={{ width: '100%', height: '130px', objectFit: 'cover', borderRadius: '12px' }} />
                            <button onClick={() => setImageUrl('')} className="btn-icon" style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', fontSize: '13px' }}>×</button>
                        </div>
                    ) : (
                        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px dashed #E8E0D4', borderRadius: '14px', padding: '24px', cursor: 'pointer' }}>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                            <span style={{ fontSize: '22px', marginBottom: '6px' }}>🏅</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B6560' }}>{uploading ? 'Uploading...' : 'Click to upload image'}</span>
                        </label>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} className="btn-ghost">Cancel</button>
                    <button onClick={handleSubmit} disabled={saving} className="btn-primary">{saving ? '⏳ Saving...' : 'Save Changes'}</button>
                </div>
            </div>
            <style>{`@keyframes modalSlideUp{from{transform:translateY(60px);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
        </div>
    );
}
