'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SOCIAL_FIELDS = [
    { key: 'linkedinUrl', label: 'LinkedIn URL', icon: '🔗' },
    { key: 'githubUrl', label: 'GitHub URL', icon: '🐙' },
    { key: 'leetcodeUrl', label: 'LeetCode URL', icon: '🟠' },
    { key: 'hackerrankUrl', label: 'HackerRank URL', icon: '🟢' },
    { key: 'codeforcesUrl', label: 'Codeforces URL', icon: '🔵' },
    { key: 'twitterUrl', label: 'Twitter/X URL', icon: '𝕏' },
    { key: 'websiteUrl', label: 'Personal Website', icon: '🌐' },
];

export default function EditProfilePanel({ isOpen, onClose, user, onSave }) {
    const [form, setForm] = useState({});
    const [skillInput, setSkillInput] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || '',
                headline: user.headline || '',
                bio: user.bio || '',
                profilePicUrl: user.profilePicUrl || '',
                skills: user.skills || [],
                linkedinUrl: user.linkedinUrl || '',
                githubUrl: user.githubUrl || '',
                leetcodeUrl: user.leetcodeUrl || '',
                hackerrankUrl: user.hackerrankUrl || '',
                codeforcesUrl: user.codeforcesUrl || '',
                twitterUrl: user.twitterUrl || '',
                websiteUrl: user.websiteUrl || '',
            });
        }
    }, [user]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        if (isOpen) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    const updateField = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

    const addSkill = (val) => {
        const skill = val.trim();
        if (skill && !form.skills.includes(skill)) {
            updateField('skills', [...form.skills, skill]);
        }
        setSkillInput('');
    };

    const handleSkillKey = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addSkill(e.target.value);
        }
    };

    const removeSkill = (idx) => {
        updateField('skills', form.skills.filter((_, i) => i !== idx));
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append('file', file);
            fd.append('type', 'profile');
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (data.url) updateField('profilePicUrl', data.url);
        } catch {
            toast.error('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        // Flush any skill that was typed but not yet committed with Enter
        const pendingSkill = skillInput.trim();
        const finalSkills = pendingSkill && !form.skills.includes(pendingSkill)
            ? [...form.skills, pendingSkill]
            : form.skills;

        setSaving(true);
        try {
            const res = await fetch('/api/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, skills: finalSkills }),
            });
            if (res.ok) {
                const data = await res.json();
                toast.success('Profile updated! ✅');
                setSkillInput('');
                onSave(data.user);
                onClose();
            } else {
                toast.error('Failed to save');
            }
        } catch {
            toast.error('Network error');
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <div className={`overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
            <div className={`slide-panel-right ${isOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Green/Gold top strip */}
                <div style={{ height: '4px', background: 'linear-gradient(90deg, #2D6A4F, #C9A23A)', flexShrink: 0 }} />

                <div style={{ flex: 1, overflowY: 'auto', padding: '28px 32px' }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#1C1C1C' }}>
                            Edit Profile
                        </h2>
                        <button onClick={onClose} className="btn-icon">×</button>
                    </div>

                    {/* Profile Picture */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6560', display: 'block', marginBottom: '8px' }}>
                            Profile Picture
                        </label>
                        <div style={{
                            border: '2px dashed #E8E0D4',
                            borderRadius: '16px',
                            padding: '24px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            position: 'relative',
                        }}>
                            {form.profilePicUrl ? (
                                <img src={form.profilePicUrl} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 8px' }} />
                            ) : (
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#6B6560' }}>
                                    {uploading ? '⏳ Uploading...' : 'Drag photo here or click to upload'}
                                </p>
                            )}
                            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }} />
                        </div>
                    </div>

                    {/* Text Fields */}
                    {[
                        { key: 'name', label: 'Full Name', type: 'input', placeholder: 'John Doe' },
                        { key: 'headline', label: 'Headline', type: 'input', placeholder: 'e.g. Full Stack Developer | React · Node.js' },
                    ].map(f => (
                        <div key={f.key} style={{ marginBottom: '20px' }}>
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6560', display: 'block', marginBottom: '6px' }}>
                                {f.label}
                            </label>
                            <input
                                className="fancy-input"
                                value={form[f.key] || ''}
                                onChange={e => updateField(f.key, e.target.value)}
                                placeholder={f.placeholder}
                            />
                        </div>
                    ))}

                    {/* Bio */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6560', display: 'block', marginBottom: '6px' }}>
                            Bio
                        </label>
                        <div style={{ position: 'relative' }}>
                            <textarea
                                className="fancy-textarea"
                                rows={4}
                                maxLength={300}
                                value={form.bio || ''}
                                onChange={e => updateField('bio', e.target.value)}
                                placeholder="Tell the world about yourself..."
                                style={{ resize: 'vertical' }}
                            />
                            <span style={{
                                position: 'absolute',
                                bottom: '8px',
                                right: '12px',
                                fontFamily: "'Inter', sans-serif",
                                fontSize: '11px',
                                color: '#6B6560',
                            }}>
                                {(form.bio || '').length}/300
                            </span>
                        </div>
                    </div>

                    {/* Skills */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6560', display: 'block', marginBottom: '6px' }}>
                            Skills
                        </label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                            {(form.skills || []).map((skill, i) => (
                                <span key={i} className="tag-chip">
                                    {skill}
                                    <span className="tag-chip-remove" onClick={() => removeSkill(i)}>×</span>
                                </span>
                            ))}
                        </div>
                        <input
                            className="fancy-input"
                            value={skillInput}
                            onChange={e => setSkillInput(e.target.value)}
                            onKeyDown={handleSkillKey}
                            placeholder="Type a skill + Enter"
                        />
                    </div>

                    {/* Social URLs */}
                    {SOCIAL_FIELDS.map(f => (
                        <div key={f.key} style={{ marginBottom: '16px' }}>
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6560', display: 'block', marginBottom: '6px' }}>
                                {f.icon} {f.label}
                            </label>
                            <input
                                className="fancy-input"
                                value={form[f.key] || ''}
                                onChange={e => updateField(f.key, e.target.value)}
                                placeholder={`https://...`}
                            />
                        </div>
                    ))}
                </div>

                {/* Sticky footer — always at the very bottom */}
                <div style={{
                    position: 'sticky',
                    bottom: 0,
                    background: 'white',
                    padding: '16px 32px',
                    borderTop: '1px solid #E8E0D4',
                    flexShrink: 0,
                }}>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        {saving ? '⏳ Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </>
    );
}
