'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const SOCIAL_FIELDS = [
    { key: 'linkedinUrl', label: 'LinkedIn', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ) },
    { key: 'githubUrl', label: 'GitHub', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
    ) },
    { key: 'leetcodeUrl', label: 'LeetCode', icon: '🟠' },
    { key: 'hackerrankUrl', label: 'HackerRank', icon: '🟢' },
    { key: 'codeforcesUrl', label: 'Codeforces', icon: '🔵' },
    { key: 'twitterUrl', label: 'Twitter/X', icon: '𝕏' },
    { key: 'websiteUrl', label: 'Website', icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
    ) },
];

function FormSection({ title, children, icon }) {
    return (
        <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <div style={{ padding: '8px', background: 'rgba(45, 106, 79, 0.08)', borderRadius: '8px', color: 'var(--accent)' }}>
                    {icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                    {title}
                </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {children}
            </div>
        </div>
    );
}

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
                aboutMe: user.aboutMe || '',
                profilePicUrl: user.profilePicUrl || '',
                skills: user.skills || [],
                contactEmail: user.contactEmail || '',
                linkedinUrl: user.linkedinUrl || '',
                githubUrl: user.githubUrl || '',
                leetcodeUrl: user.leetcodeUrl || '',
                hackerrankUrl: user.hackerrankUrl || '',
                codeforcesUrl: user.codeforcesUrl || '',
                twitterUrl: user.twitterUrl || '',
                websiteUrl: user.websiteUrl || '',
                openToOpportunities: user.openToOpportunities || false,
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
            <div className={`slide-panel-right ${isOpen ? 'open' : ''}`} style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
                {/* Header Section */}
                <div style={{ padding: '28px 32px', borderBottom: '1px solid var(--border)', background: 'var(--surface)', position: 'relative', zIndex: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: 'var(--text)', margin: 0 }}>
                                Edit Profile
                            </h2>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                                Customize how you appear on your portfolio.
                            </p>
                        </div>
                        <button onClick={onClose} className="btn-icon" style={{ width: '40px', height: '40px' }}>×</button>
                    </div>
                </div>

                {/* Form Content */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
                    
                    {/* Visual Identity Section */}
                    <FormSection title="Identity" icon={(
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    )}>
                        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                            <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                                <div style={{
                                    width: '100%', height: '100%',
                                    borderRadius: '24px',
                                    border: '2px dashed var(--border)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    overflow: 'hidden', background: 'var(--surface)',
                                    transition: 'all 0.3s ease',
                                    position: 'relative'
                                }}>
                                    {form.profilePicUrl ? (
                                        <img src={form.profilePicUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                    )}
                                    {uploading && (
                                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div className="spin" style={{ width: '20px', height: '20px', border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                                        </div>
                                    )}
                                </div>
                                <input type="file" accept="image/*" onChange={handleFileUpload} style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', zIndex: 2 }} title="Update photo" />
                                <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', width: '28px', height: '28px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', border: '3px solid var(--surface)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                                    Full Name
                                </label>
                                <input
                                    className="fancy-input"
                                    value={form.name || ''}
                                    onChange={e => updateField('name', e.target.value)}
                                    placeholder="e.g. Liam Anderson"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                                Headline
                            </label>
                            <input
                                className="fancy-input"
                                value={form.headline || ''}
                                onChange={e => updateField('headline', e.target.value)}
                                placeholder="e.g. AI Research Engineer & Web Architect"
                            />
                        </div>
                    </FormSection>

                    {/* Professional Summary Section */}
                    <FormSection title="About Me" icon={(
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    )}>
                        <div style={{ position: 'relative', marginBottom: '24px' }}>
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                                Hero Bio (Short)
                            </label>
                            <textarea
                                className="fancy-textarea"
                                rows={2}
                                maxLength={300}
                                value={form.bio || ''}
                                onChange={e => updateField('bio', e.target.value)}
                                placeholder="Briefly describe your passion..."
                                style={{ resize: 'none' }}
                            />
                            <div style={{
                                position: 'absolute', bottom: '12px', right: '12px',
                                fontSize: '11px', color: (form.bio || '').length >= 300 ? 'var(--engine-red)' : 'var(--text-muted)',
                                fontWeight: 500
                            }}>
                                {(form.bio || '').length}/300
                            </div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                                Personnel Profile (Detailed)
                            </label>
                            <textarea
                                className="fancy-textarea"
                                rows={6}
                                maxLength={1000}
                                value={form.aboutMe || ''}
                                onChange={e => updateField('aboutMe', e.target.value)}
                                placeholder="Tell your full story here..."
                                style={{ resize: 'none' }}
                            />
                            <div style={{
                                position: 'absolute', bottom: '12px', right: '12px',
                                fontSize: '11px', color: (form.aboutMe || '').length >= 1000 ? 'var(--engine-red)' : 'var(--text-muted)',
                                fontWeight: 500
                            }}>
                                {(form.aboutMe || '').length}/1000
                            </div>
                        </div>

                        <div>
                            <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                                Skills & Tech Stack
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                                {(form.skills || []).map((skill, i) => (
                                    <span key={i} className="tag-chip" style={{ padding: '6px 12px', fontSize: '13px' }}>
                                        {skill}
                                        <span onClick={() => removeSkill(i)} style={{ marginLeft: '6px', cursor: 'pointer', opacity: 0.6 }}>×</span>
                                    </span>
                                ))}
                            </div>
                            <input
                                className="fancy-input"
                                value={skillInput}
                                onChange={e => setSkillInput(e.target.value)}
                                onKeyDown={handleSkillKey}
                                placeholder="Type a skill and press Enter"
                            />
                        </div>
                    </FormSection>

                    {/* Social & Contact Section */}
                    <FormSection title="Social Presence" icon={(
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    )}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '8px' }}>
                                    Public Email
                                </label>
                                <input
                                    className="fancy-input"
                                    value={form.contactEmail || ''}
                                    onChange={e => updateField('contactEmail', e.target.value)}
                                    placeholder="yourname@domain.com"
                                />
                            </div>
                            {SOCIAL_FIELDS.map(f => (
                                <div key={f.key}>
                                    <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                                        {typeof f.icon === 'string' ? f.icon : <span style={{ opacity: 0.8 }}>{f.icon}</span>}
                                        {f.label}
                                    </label>
                                    <input
                                        className="fancy-input"
                                        style={{ padding: '10px 14px', fontSize: '13px' }}
                                        value={form[f.key] || ''}
                                        onChange={e => updateField(f.key, e.target.value)}
                                        placeholder="URL"
                                    />
                                </div>
                            ))}
                        </div>
                    </FormSection>

                    {/* Preferences Section */}
                    <FormSection title="Availability" icon={(
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    )}>
                        <div 
                            onClick={() => updateField('openToOpportunities', !form.openToOpportunities)}
                            style={{ 
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                                background: 'var(--surface)', padding: '20px', borderRadius: '16px', 
                                border: '1px solid var(--border)', cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                borderColor: form.openToOpportunities ? 'var(--accent)' : 'var(--border)',
                                boxShadow: form.openToOpportunities ? '0 8px 24px rgba(45, 106, 79, 0.08)' : 'none'
                            }}
                        >
                            <div style={{ flex: 1, paddingRight: '20px' }}>
                                <label style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 700, color: 'var(--text)', display: 'block', marginBottom: '4px' }}>
                                    Open to Opportunities
                                </label>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                                    Broadcast an "Open to Work" status on your profile.
                                </p>
                            </div>
                            <div className={`toggle-switch ${form.openToOpportunities ? 'active' : ''}`} />
                        </div>
                    </FormSection>
                </div>

                {/* Footer Actions */}
                <div style={{
                    padding: '24px 32px',
                    background: 'var(--surface)',
                    borderTop: '1px solid var(--border)',
                    display: 'flex', gap: '12px'
                }}>
                    <button onClick={onClose} className="btn-ghost" style={{ flex: 1, height: '48px', justifyContent: 'center' }}>
                        Dismiss
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn-primary"
                        style={{ flex: 2, height: '48px', justifyContent: 'center' }}
                    >
                        {saving ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div className="spin" style={{ width: '16px', height: '16px', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%' }} />
                                Syncing...
                            </div>
                        ) : 'Save Profile'}
                    </button>
                </div>
            </div>
        </>
    );
}
