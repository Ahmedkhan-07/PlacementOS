'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ResumePreview from '@/components/resume/ResumePreview';
import toast from 'react-hot-toast';

const STEPS = [
    'Personal Info', 
    'Professional Summary', 
    'Education', 
    'Technical Skills', 
    'Projects', 
    'Work & Internship Experience', 
    'Certifications', 
    'Achievements', 
    'Leadership & Extracurriculars', 
    'Languages', 
    'Interests', 
    'References'
];
const DEGREES = ["Bachelor's", "Master's", 'PhD', 'Diploma', 'High School', 'Other'];
const YEARS = Array.from({ length: 31 }, (_, i) => String(2000 + i));
const ACCENT_COLORS = ['#2D6A4F', '#1B4332', '#C0392B', '#2C3E50', '#8E44AD', '#E67E22', '#FFFFFF'];

export default function ResumeBuilder({ resume, userProfilePic, onClose, onSave }) {
    const [step, setStep] = useState(0);
    const [showAtsSidebar, setShowAtsSidebar] = useState(true);
    const [data, setData] = useState({
        templateId: resume?.templateId || 1,
        accentColor: resume?.accentColor || '#2D6A4F',
        personalInfo: {
            ...resume?.personalInfo,
            profilePicUrl: resume?.personalInfo?.profilePicUrl || userProfilePic || '',
        },
        showProfilePic: resume?.showProfilePic === true,
        summary: resume?.summary || '',
        education: resume?.education || [],
        skills: resume?.skills || [],
        projects: resume?.projects || [],
        experience: resume?.experience || [],
        certifications: resume?.certifications || [],
        achievements: resume?.achievements || [],
        leadership: resume?.leadership || [],
        languages: resume?.languages || [],
        interests: resume?.interests || [],
        hobbies: resume?.hobbies || [],
        references: resume?.references || '',
        skillsText: resume?.skillsText || '',
        boldSkillsHeader: resume?.boldSkillsHeader || false,
        atsSymbols: resume?.atsSymbols !== false,
        atsStandardSectionNames: resume?.atsStandardSectionNames === true,
        atsConsistentFormatting: resume?.atsConsistentFormatting === true,
        atsSingleColumn: resume?.atsSingleColumn === true,
        atsFontSelection: resume?.atsFontSelection || '',
        atsProfileLinksFormat: resume?.atsProfileLinksFormat === true,
        atsProjectLinksFormat: resume?.atsProjectLinksFormat === true,
    });
    const [saving, setSaving] = useState(false);
    const [showExitConfirm, setShowExitConfirm] = useState(false);
    const [enhancing, setEnhancing] = useState(false);
    const [originalText, setOriginalText] = useState(null);
    const [skillInput, setSkillInput] = useState('');
    const [hobbyInput, setHobbyInput] = useState('');
    const [langInput, setLangInput] = useState('');
    const [interestInput, setInterestInput] = useState('');
    const [suggestedSkills, setSuggestedSkills] = useState([]);
    const [mounted, setMounted] = useState(false);
    const [importing, setImporting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleImportResumeFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset file input value so same file can be uploaded again if needed
        e.target.value = '';

        // Check if there is already some data in the form to warn the user
        const hasExistingData = 
            (data.summary && data.summary.trim() !== '') || 
            (data.skillsText && data.skillsText.trim() !== '') || 
            (data.education && data.education.length > 0) || 
            (data.projects && data.projects.length > 0) || 
            (data.experience && data.experience.length > 0);

        if (hasExistingData) {
            const confirmOverwrite = window.confirm(
                "Warning: Importing a resume will overwrite your current form inputs (Summary, Education, Projects, Experience, Skills, etc.). Are you sure you want to continue?"
            );
            if (!confirmOverwrite) return;
        }

        setImporting(true);
        const toastId = toast.loading('Extracting details from PDF...');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/resume/parse', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Parsing failed');
            }

            const parsed = await response.json();

            // Safely map parsed results back to state
            setData(prev => {
                const updatedPI = { ...prev.personalInfo };
                if (parsed.personalInfo) {
                    if (parsed.personalInfo.name) updatedPI.name = parsed.personalInfo.name;
                    if (parsed.personalInfo.email) updatedPI.email = parsed.personalInfo.email;
                    if (parsed.personalInfo.phone) updatedPI.phone = parsed.personalInfo.phone;
                    if (parsed.personalInfo.location) updatedPI.location = parsed.personalInfo.location;
                }

                return {
                    ...prev,
                    personalInfo: updatedPI,
                    summary: parsed.summary || prev.summary,
                    skillsText: parsed.skillsText || prev.skillsText,
                    education: (parsed.education || []).map(edu => ({
                        institution: edu.institution || '',
                        degree: edu.degree || '',
                        field: edu.field || '',
                        startYear: edu.startYear || '',
                        endYear: edu.endYear || '',
                        grade: edu.grade || '',
                        gradeType: edu.gradeType || 'CGPA',
                        description: edu.description || '',
                        hidden: false
                    })),
                    projects: (parsed.projects || []).map(p => ({
                        title: p.title || '',
                        techStack: p.techStack || [],
                        startDate: p.startDate || '',
                        endDate: p.endDate || '',
                        description: p.description || '',
                        githubUrl: '', // URLs left empty for user
                        demoUrl: '',
                        hidden: false
                    })),
                    experience: (parsed.experience || []).map(exp => ({
                        role: exp.role || '',
                        company: exp.company || '',
                        startDate: exp.startDate || '',
                        endDate: exp.endDate || '',
                        current: exp.current || false,
                        description: exp.description || '',
                        hidden: false
                    })),
                    certifications: (parsed.certifications || []).map(c => ({
                        title: c.title || '',
                        description: c.description || '',
                        year: c.year || '',
                        url: '',
                        hidden: false
                    })),
                    achievements: (parsed.achievements || []).map(a => ({
                        title: a.title || '',
                        description: a.description || '',
                        year: a.year || '',
                        url: '',
                        hidden: false
                    })),
                    languages: parsed.languages || prev.languages,
                    interests: parsed.interests || prev.interests
                };
            });

            toast.success('Resume details extracted successfully! 🎉', { id: toastId });
        } catch (error) {
            console.error('Import error:', error);
            toast.error(error.message || 'Failed to extract resume details. Ensure it is a valid text PDF.', { id: toastId, duration: 5000 });
        } finally {
            setImporting(false);
        }
    };

    useEffect(() => {
        const esc = (e) => { if (e.key === 'Escape') setShowExitConfirm(true); };
        document.addEventListener('keydown', esc);
        return () => document.removeEventListener('keydown', esc);
    }, []);

    const update = (key, val) => setData(prev => ({ ...prev, [key]: val }));
    const updatePI = (key, val) => setData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [key]: val } }));

    const commitCurrentInputs = () => {
        let updatedData = null;
        if (langInput.trim()) {
            const l = langInput.trim();
            if (!data.languages.includes(l)) {
                const newLangs = [...(data.languages || []), l];
                setData(prev => {
                    const next = { ...prev, languages: newLangs };
                    updatedData = next;
                    return next;
                });
            }
            setLangInput('');
        }
        if (interestInput.trim()) {
            const val = interestInput.trim();
            if (!data.interests.includes(val)) {
                const newInts = [...(data.interests || []), val];
                setData(prev => {
                    const next = { ...prev, interests: newInts };
                    updatedData = next;
                    return next;
                });
            }
            setInterestInput('');
        }
        return updatedData;
    };

    const aiEnhance = async (text, context, onResult) => {
        if (!text?.trim()) return;
        setEnhancing(true);
        setOriginalText(text);
        try {
            const res = await fetch('/api/ai-enhance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, context, skills: context === 'skills' ? text : undefined }),
            });
            const d = await res.json();
            if (d.enhanced) onResult(d.enhanced);
        } catch {
            toast.error('AI enhance failed');
        } finally {
            setEnhancing(false);
        }
    };

    const suggestSkills = async () => {
        setEnhancing(true);
        try {
            const res = await fetch('/api/ai-enhance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: '', context: 'skills', skills: data.skills.join(',') }),
            });
            const d = await res.json();
            if (d.enhanced) setSuggestedSkills(d.enhanced.split(',').map(s => s.trim()).filter(Boolean));
        } catch {
            toast.error('Skill suggestion failed');
        } finally {
            setEnhancing(false);
        }
    };

    const addListItem = (key, item) => update(key, [...data[key], item]);
    const removeListItem = (key, idx) => update(key, data[key].filter((_, i) => i !== idx));
    const updateListItem = (key, idx, field, val) => {
        const items = [...data[key]];
        items[idx] = { ...items[idx], [field]: val };
        update(key, items);
    };
    const moveListItem = (key, idx, dir) => {
        const items = [...data[key]];
        if (dir === 'up' && idx > 0) {
            [items[idx], items[idx - 1]] = [items[idx - 1], items[idx]];
        } else if (dir === 'down' && idx < items.length - 1) {
            [items[idx], items[idx + 1]] = [items[idx + 1], items[idx]];
        }
        update(key, items);
    };

    const handleSave = async () => {
        setSaving(true);
        let finalData = { ...data };
        if (langInput.trim()) {
            const l = langInput.trim();
            if (!finalData.languages.includes(l)) {
                finalData.languages = [...(finalData.languages || []), l];
            }
            setLangInput('');
        }
        if (interestInput.trim()) {
            const val = interestInput.trim();
            if (!finalData.interests.includes(val)) {
                finalData.interests = [...(finalData.interests || []), val];
            }
            setInterestInput('');
        }
        setData(finalData);

        try {
            const res = await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeId: resume?._id || null,
                    data: finalData,
                }),
            });
            if (res.ok) {
                const result = await res.json();
                toast.success('Resume saved! ✅');
                onSave(result.resume, resume?._id || null);
                onClose();
            }
        } catch {
            toast.error('Save failed');
        } finally {
            setSaving(false);
        }
    };

    const handleSaveOnly = async () => {
        setSaving(true);
        let finalData = { ...data };
        if (langInput.trim()) {
            const l = langInput.trim();
            if (!finalData.languages.includes(l)) {
                finalData.languages = [...(finalData.languages || []), l];
            }
            setLangInput('');
        }
        if (interestInput.trim()) {
            const val = interestInput.trim();
            if (!finalData.interests.includes(val)) {
                finalData.interests = [...(finalData.interests || []), val];
            }
            setInterestInput('');
        }
        setData(finalData);

        try {
            const res = await fetch('/api/resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    resumeId: resume?._id || null,
                    data: finalData,
                }),
            });
            if (res.ok) {
                const result = await res.json();
                toast.success('Progress saved! ✅');
                onSave(result.resume, resume?._id || null);
            }
        } catch {
            toast.error('Save failed');
        } finally {
            setSaving(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0: return (
                <div>
                    <h3 style={stepTitle}>Personal Information</h3>

                    {/* Parser Resume PDF Drop Zone */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(201, 162, 58, 0.04)',
                        border: '1.5px dashed #C9A23A',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px',
                        transition: 'all 0.3s ease',
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                            <span style={{ fontSize: '20px' }}>✨</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 700, color: 'var(--text)' }}>
                                Import Details from Existing Resume
                            </span>
                        </div>
                        <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                            Upload your current PDF resume, and AI will automatically fill out your profile details, education, skills, projects, and work experience!
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input 
                                type="file" 
                                accept=".pdf" 
                                id="resume-pdf-import-input"
                                onChange={handleImportResumeFile} 
                                style={{ display: 'none' }} 
                            />
                            <button 
                                onClick={() => document.getElementById('resume-pdf-import-input')?.click()}
                                disabled={importing}
                                className="btn-gold" 
                                style={{ padding: '10px 20px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                            >
                                {importing ? (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="spin">
                                            <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                        </svg>
                                        Extracting Details...
                                    </>
                                ) : (
                                    <>
                                        <span>📁</span> Select PDF Resume
                                    </>
                                )}
                            </button>
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Supports PDF formats with text</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#FAFAF8', border: '1px solid #E8E0D4', borderRadius: '12px', marginBottom: '24px' }}>
                        <div>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', fontWeight: 600, color: '#1C1C1C', display: 'block', marginBottom: '2px' }}>Display Profile Picture</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B6560' }}>Show your portfolio profile picture on the resume header</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor }}>
                            <input
                                type="checkbox"
                                checked={data.showProfilePic === true}
                                onChange={e => update('showProfilePic', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>
                    {['name', 'email', 'phone', 'location', 'linkedinUrl', 'githubUrl', 'leetcodeUrl', 'portfolioUrl'].map(f => {
                        const isHidden = !!data.personalInfo[`${f}_hidden`];
                        return (
                            <div key={f} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                    <label style={{ ...labelStyle, marginBottom: 0 }}>
                                        {f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).replace('Url', ' URL')}
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => updatePI(`${f}_hidden`, !isHidden)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontSize: '11px',
                                            color: isHidden ? '#C0392B' : '#2D6A4F',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            fontWeight: 600,
                                            outline: 'none',
                                            padding: 0,
                                        }}
                                        title={isHidden ? "Show on Resume" : "Hide from Resume"}
                                    >
                                        {isHidden ? '🙈 Hidden' : '👁️ Visible'}
                                    </button>
                                </div>
                                <input 
                                    className="fancy-input" 
                                    value={data.personalInfo[f] || ''} 
                                    onChange={e => updatePI(f, e.target.value)} 
                                    style={{
                                        opacity: isHidden ? 0.6 : 1,
                                        borderStyle: isHidden ? 'dashed' : 'solid',
                                        transition: 'all 0.25s ease'
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            );
            case 1: return (
                <div>
                    <h3 style={stepTitle}>Professional Summary</h3>
                    <div style={{ position: 'relative' }}>
                        <textarea className="fancy-textarea" rows={6} value={data.summary} onChange={e => update('summary', e.target.value)}
                            placeholder="Write a brief summary of your professional background and skills..." />
                        <button onClick={() => aiEnhance(data.summary, 'professional_summary', t => update('summary', t))}
                            disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '8px', right: '8px', padding: '6px 14px', fontSize: '12px' }}>
                            {enhancing ? '⏳' : '✨ AI Enhance'}
                        </button>
                    </div>
                    {originalText && <button onClick={() => { update('summary', originalText); setOriginalText(null); }}
                        style={{ background: 'none', border: 'none', color: '#2D6A4F', fontSize: '12px', cursor: 'pointer', marginTop: '8px' }}>↩ Revert</button>}
                </div>
            );
            case 2: return (
                <div>
                    <h3 style={stepTitle}>Education</h3>
                    <datalist id="degrees-list">
                        {['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'Intermediate', 'SSC', "Bachelor's", "Master's", 'PhD', 'Diploma', 'High School'].map(d => <option key={d} value={d} />)}
                    </datalist>
                    <datalist id="years-list">
                        {YEARS.map(y => <option key={y} value={y} />)}
                    </datalist>
                    {data.education.map((edu, i) => (
                        <div key={i} className="card" style={{ 
                            padding: '20px', 
                            marginBottom: '12px',
                            opacity: edu.hidden ? 0.6 : 1,
                            borderStyle: edu.hidden ? 'dashed' : 'solid',
                            transition: 'all 0.25s ease'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Education {i + 1}
                                    {edu.hidden && (
                                        <span style={{ 
                                            fontSize: '11px', 
                                            fontWeight: 500, 
                                            color: '#C0392B', 
                                            background: 'rgba(192, 57, 43, 0.1)', 
                                            padding: '2px 8px', 
                                            borderRadius: '10px' 
                                        }}>
                                            Hidden
                                        </span>
                                    )}
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        disabled={i === 0}
                                        onClick={() => moveListItem('education', i, 'up')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === 0 ? 0.3 : 1, 
                                            cursor: i === 0 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        disabled={i === data.education.length - 1}
                                        onClick={() => moveListItem('education', i, 'down')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === data.education.length - 1 ? 0.3 : 1, 
                                            cursor: i === data.education.length - 1 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </button>
                                    <button 
                                        onClick={() => updateListItem('education', i, 'hidden', !edu.hidden)} 
                                        className="btn-icon" 
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            borderColor: edu.hidden ? '#C0392B' : '#E8E0D4',
                                            background: edu.hidden ? 'rgba(192, 57, 43, 0.05)' : 'white'
                                        }}
                                        title={edu.hidden ? "Show on Resume" : "Hide from Resume"}
                                    >
                                        {edu.hidden ? '👁️' : '🙈'}
                                    </button>
                                    <button onClick={() => removeListItem('education', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                                </div>
                            </div>
                            
                            {/* Degree / Qualification name */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Degree / Qualification name (e.g., B.Tech, Intermediate, SSC)</label>
                                <input className="fancy-input" list="degrees-list" value={edu.degree || ''} onChange={e => updateListItem('education', i, 'degree', e.target.value)} placeholder="e.g. B.Tech" />
                            </div>

                            {/* Specialization / Stream */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Specialization / Stream (e.g., Artificial Intelligence, MPC, etc.)</label>
                                <input className="fancy-input" value={edu.field || ''} onChange={e => updateListItem('education', i, 'field', e.target.value)} placeholder="e.g. Artificial Intelligence" />
                            </div>

                            {/* Institution name */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Institution name (College / School name)</label>
                                <input className="fancy-input" value={edu.institution || ''} onChange={e => updateListItem('education', i, 'institution', e.target.value)} placeholder="e.g. College / School name" />
                            </div>

                            {/* University / Board */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>University / Board (e.g., JNTUA, BIEAP, BSEAP etc.)</label>
                                <input className="fancy-input" value={edu.university || ''} onChange={e => updateListItem('education', i, 'university', e.target.value)} placeholder="e.g. JNTUA" />
                            </div>

                            {/* Year of passing / Start Year */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Start Year</label>
                                    <input className="fancy-input" list="years-list" value={edu.startYear || ''} onChange={e => updateListItem('education', i, 'startYear', e.target.value)} placeholder="Year" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={labelStyle}>Year of passing (e.g., 2026, 2022 etc.)</label>
                                    <input className="fancy-input" list="years-list" value={edu.endYear || ''} onChange={e => updateListItem('education', i, 'endYear', e.target.value)} placeholder="Year" />
                                </div>
                            </div>

                             {/* Score Type & Score Value */}
                             <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                 <div style={{ width: '30%' }}>
                                     <label style={labelStyle}>Score Type</label>
                                     <select className="fancy-input" value={edu.gradeType || 'CGPA'} onChange={e => updateListItem('education', i, 'gradeType', e.target.value)}>
                                         <option value="CGPA">CGPA</option>
                                         <option value="Percentage">Percentage</option>
                                         <option value="GPA">GPA</option>
                                         <option value="Marks">Marks</option>
                                         <option value="Grade">Grade</option>
                                     </select>
                                 </div>
                                 <div style={{ flex: 1 }}>
                                     <label style={labelStyle}>Your Score</label>
                                     <input className="fancy-input" value={edu.grade || ''} onChange={e => updateListItem('education', i, 'grade', e.target.value)} placeholder={edu.gradeType === 'Percentage' ? 'e.g. 95%' : edu.gradeType === 'CGPA' ? 'e.g. 9.2' : edu.gradeType === 'GPA' ? 'e.g. 3.8 / 4.0' : edu.gradeType === 'Marks' ? 'e.g. 920 / 1000' : 'e.g. A+'} />
                                 </div>
                             </div>

                            {/* Description */}
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={2} value={edu.description || ''} onChange={e => updateListItem('education', i, 'description', e.target.value)} placeholder="Extra details..." />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('education', { gradeType: 'CGPA', hidden: false })} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Education</button>
                </div>
            );
            case 3: return (
                <div>
                    <h3 style={stepTitle}>Technical Skills</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#FAFAF8', border: '1px solid #E8E0D4', borderRadius: '12px', marginBottom: '20px' }}>
                        <div>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', fontWeight: 600, color: '#1C1C1C', display: 'block', marginBottom: '2px' }}>Auto-bold Category Headers</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#6B6560' }}>Automatically bold text before a colon (e.g., "Languages: ..."). Or wrap text in **double asterisks** for custom bolding.</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor }}>
                            <input 
                                type="checkbox" 
                                checked={data.boldSkillsHeader === true} 
                                onChange={e => update('boldSkillsHeader', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>
                    <p style={{ fontSize: '13px', color: '#6B6560', marginBottom: '12px' }}>
                        Write your skills in any format. Example: Languages: JavaScript, Python | Frontend: React, Next.js
                    </p>
                    <textarea
                        className="fancy-textarea"
                        rows={10}
                        value={data.skillsText || ''}
                        onChange={e => update('skillsText', e.target.value)}
                        placeholder="Languages: JavaScript, TypeScript, Python&#10;Frontend: React, Next.js, Tailwind CSS&#10;Backend: Node.js, Express.js&#10;Databases: MongoDB, PostgreSQL&#10;Tools: Git, Docker, Postman"
                    />
                </div>
            );
            case 4: return (
                <div>
                    <h3 style={stepTitle}>Projects</h3>
                    {data.projects.map((proj, i) => (
                        <div key={i} className="card" style={{ 
                            padding: '20px', 
                            marginBottom: '12px',
                            opacity: proj.hidden ? 0.6 : 1,
                            borderStyle: proj.hidden ? 'dashed' : 'solid',
                            transition: 'all 0.25s ease'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Project {i + 1}
                                    {proj.hidden && (
                                        <span style={{ 
                                            fontSize: '11px', 
                                            fontWeight: 500, 
                                            color: '#C0392B', 
                                            background: 'rgba(192, 57, 43, 0.1)', 
                                            padding: '2px 8px', 
                                            borderRadius: '10px' 
                                        }}>
                                            Hidden
                                        </span>
                                    )}
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        disabled={i === 0}
                                        onClick={() => moveListItem('projects', i, 'up')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === 0 ? 0.3 : 1, 
                                            cursor: i === 0 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        disabled={i === data.projects.length - 1}
                                        onClick={() => moveListItem('projects', i, 'down')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === data.projects.length - 1 ? 0.3 : 1, 
                                            cursor: i === data.projects.length - 1 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </button>
                                    <button 
                                        onClick={() => updateListItem('projects', i, 'hidden', !proj.hidden)} 
                                        className="btn-icon" 
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            borderColor: proj.hidden ? '#C0392B' : '#E8E0D4',
                                            background: proj.hidden ? 'rgba(192, 57, 43, 0.05)' : 'white'
                                        }}
                                        title={proj.hidden ? "Show on Resume" : "Hide from Resume"}
                                    >
                                        {proj.hidden ? '👁️' : '🙈'}
                                    </button>
                                    <button onClick={() => removeListItem('projects', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                                </div>
                            </div>
                            {['title', 'startDate', 'endDate', 'githubUrl', 'demoUrl'].map(f => (
                                <div key={f} style={{ marginBottom: '10px' }}>
                                    <label style={labelStyle}>{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).replace('Url', ' URL')}</label>
                                    <input className="fancy-input" value={proj[f] || ''} onChange={e => updateListItem('projects', i, f, e.target.value)} />
                                </div>
                            ))}
                            <div style={{ marginBottom: '10px', position: 'relative' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={3} value={proj.description || ''} onChange={e => updateListItem('projects', i, 'description', e.target.value)} />
                                <button onClick={() => aiEnhance(proj.description, 'project_description', t => updateListItem('projects', i, 'description', t))}
                                    disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '24px', right: '8px', padding: '4px 10px', fontSize: '11px' }}>✨</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('projects', { techStack: [], hidden: false })} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Project</button>
                </div>
            );
            case 5: return (
                <div>
                    <h3 style={stepTitle}>Work & Internship Experience</h3>
                    {data.experience.map((exp, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Experience {i + 1}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        disabled={i === 0}
                                        onClick={() => moveListItem('experience', i, 'up')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === 0 ? 0.3 : 1, 
                                            cursor: i === 0 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        disabled={i === data.experience.length - 1}
                                        onClick={() => moveListItem('experience', i, 'down')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === data.experience.length - 1 ? 0.3 : 1, 
                                            cursor: i === data.experience.length - 1 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </button>
                                    <button onClick={() => removeListItem('experience', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                                </div>
                            </div>
                            {['company', 'role', 'startDate', 'endDate'].map(f => (
                                <div key={f} style={{ marginBottom: '10px' }}>
                                    <label style={labelStyle}>{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                                    <input className="fancy-input" value={exp[f] || ''} onChange={e => updateListItem('experience', i, f, e.target.value)} />
                                </div>
                            ))}
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontSize: '13px', color: '#6B6560' }}>
                                <input type="checkbox" checked={exp.current || false} onChange={e => updateListItem('experience', i, 'current', e.target.checked)} />
                                Currently Working
                            </label>
                            <div style={{ position: 'relative' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={3} value={exp.description || ''} onChange={e => updateListItem('experience', i, 'description', e.target.value)} />
                                <button onClick={() => aiEnhance(exp.description, 'experience', t => updateListItem('experience', i, 'description', t))}
                                    disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '24px', right: '8px', padding: '4px 10px', fontSize: '11px' }}>✨</button>
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('experience', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Experience</button>
                </div>
            );
            case 6: return (
                <div>
                    <h3 style={stepTitle}>Certifications</h3>
                    {(data.certifications || []).map((cert, i) => (
                        <div key={i} className="card" style={{ 
                            padding: '20px', 
                            marginBottom: '12px',
                            opacity: cert.hidden ? 0.6 : 1,
                            borderStyle: cert.hidden ? 'dashed' : 'solid',
                            transition: 'all 0.25s ease'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Certification {i + 1}
                                    {cert.hidden && (
                                        <span style={{ 
                                            fontSize: '11px', 
                                            fontWeight: 500, 
                                            color: '#C0392B', 
                                            background: 'rgba(192, 57, 43, 0.1)', 
                                            padding: '2px 8px', 
                                            borderRadius: '10px' 
                                        }}>
                                            Hidden
                                        </span>
                                    )}
                                </span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        disabled={i === 0}
                                        onClick={() => moveListItem('certifications', i, 'up')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === 0 ? 0.3 : 1, 
                                            cursor: i === 0 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        disabled={i === data.certifications.length - 1}
                                        onClick={() => moveListItem('certifications', i, 'down')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === data.certifications.length - 1 ? 0.3 : 1, 
                                            cursor: i === data.certifications.length - 1 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </button>
                                    <button 
                                        onClick={() => updateListItem('certifications', i, 'hidden', !cert.hidden)} 
                                        className="btn-icon" 
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            borderColor: cert.hidden ? '#C0392B' : '#E8E0D4',
                                            background: cert.hidden ? 'rgba(192, 57, 43, 0.05)' : 'white'
                                        }}
                                        title={cert.hidden ? "Show on Resume" : "Hide from Resume"}
                                    >
                                        {cert.hidden ? '👁️' : '🙈'}
                                    </button>
                                    <button onClick={() => removeListItem('certifications', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                                </div>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Title</label>
                                <input className="fancy-input" value={cert.title || ''} onChange={e => updateListItem('certifications', i, 'title', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Issuer / Description</label>
                                <textarea className="fancy-textarea" rows={2} value={cert.description || ''} onChange={e => updateListItem('certifications', i, 'description', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Year</label>
                                <input className="fancy-input" value={cert.year || ''} onChange={e => updateListItem('certifications', i, 'year', e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Certificate URL</label>
                                <input className="fancy-input" value={cert.url || ''} onChange={e => updateListItem('certifications', i, 'url', e.target.value)} placeholder="https://certificate-link.com" />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('certifications', { hidden: false })} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Certification</button>
                </div>
            );
            case 7: return (
                <div>
                    <h3 style={stepTitle}>Achievements</h3>
                    {(data.achievements || []).map((ach, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Achievement {i + 1}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        disabled={i === 0}
                                        onClick={() => moveListItem('achievements', i, 'up')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === 0 ? 0.3 : 1, 
                                            cursor: i === 0 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        disabled={i === (data.achievements || []).length - 1}
                                        onClick={() => moveListItem('achievements', i, 'down')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === (data.achievements || []).length - 1 ? 0.3 : 1, 
                                            cursor: i === (data.achievements || []).length - 1 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </button>
                                    <button onClick={() => removeListItem('achievements', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                                </div>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Title</label>
                                <input className="fancy-input" value={ach.title || ''} onChange={e => updateListItem('achievements', i, 'title', e.target.value)} />
                            </div>
                            <div style={{ marginBottom: '10px', position: 'relative' }}>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={2} value={ach.description || ''} onChange={e => updateListItem('achievements', i, 'description', e.target.value)} />
                                <button onClick={() => aiEnhance(ach.description, 'achievement', t => updateListItem('achievements', i, 'description', t))}
                                    disabled={enhancing} className="btn-gold" style={{ position: 'absolute', top: '24px', right: '8px', padding: '4px 10px', fontSize: '11px' }}>✨</button>
                            </div>
                            <div style={{ marginBottom: '10px' }}>
                                <label style={labelStyle}>Year</label>
                                <input className="fancy-input" value={ach.year || ''} onChange={e => updateListItem('achievements', i, 'year', e.target.value)} />
                            </div>
                            <div>
                                <label style={labelStyle}>Certificate URL</label>
                                <input className="fancy-input" value={ach.url || ''} onChange={e => updateListItem('achievements', i, 'url', e.target.value)} placeholder="https://certificate-link.com" />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('achievements', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Achievement</button>
                </div>
            );
            case 8: return (
                <div>
                    <h3 style={stepTitle}>Leadership & Extracurricular Activities</h3>
                    {(data.leadership || []).map((lead, i) => (
                        <div key={i} className="card" style={{ padding: '20px', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                <span style={{ fontWeight: 600, fontSize: '14px' }}>Activity {i + 1}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button 
                                        disabled={i === 0}
                                        onClick={() => moveListItem('leadership', i, 'up')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === 0 ? 0.3 : 1, 
                                            cursor: i === 0 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Up"
                                    >
                                        ↑
                                    </button>
                                    <button 
                                        disabled={i === (data.leadership || []).length - 1}
                                        onClick={() => moveListItem('leadership', i, 'down')}
                                        className="btn-icon"
                                        style={{ 
                                            width: '32px', 
                                            height: '32px', 
                                            fontSize: '14px', 
                                            opacity: i === (data.leadership || []).length - 1 ? 0.3 : 1, 
                                            cursor: i === (data.leadership || []).length - 1 ? 'not-allowed' : 'pointer' 
                                        }}
                                        title="Move Down"
                                    >
                                        ↓
                                    </button>
                                    <button onClick={() => removeListItem('leadership', i)} className="btn-icon" style={{ width: '32px', height: '32px', fontSize: '14px' }}>🗑️</button>
                                </div>
                            </div>
                            {['role', 'organization', 'startDate', 'endDate'].map(f => (
                                <div key={f} style={{ marginBottom: '10px' }}>
                                    <label style={labelStyle}>{f.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
                                    <input className="fancy-input" value={lead[f] || ''} onChange={e => updateListItem('leadership', i, f, e.target.value)} />
                                </div>
                            ))}
                            <div>
                                <label style={labelStyle}>Description</label>
                                <textarea className="fancy-textarea" rows={3} value={lead.description || ''} onChange={e => updateListItem('leadership', i, 'description', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button onClick={() => addListItem('leadership', {})} className="btn-outline" style={{ padding: '10px 20px', fontSize: '13px' }}>+ Add Activity</button>
                </div>
            );
            case 9: return (
                <div>
                    <h3 style={stepTitle}>Languages</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {(data.languages || []).map((l, i) => (
                            <span key={i} className="tag-chip" style={{ background: 'rgba(107,101,96,0.1)', color: '#6B6560' }}>
                                {l}<span className="tag-chip-remove" onClick={() => update('languages', data.languages.filter((_, j) => j !== i))}>×</span>
                            </span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input className="fancy-input" style={{ flex: 1 }} value={langInput} onChange={e => setLangInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commitCurrentInputs(); } }}
                            onBlur={commitCurrentInputs}
                            placeholder="Type a language (e.g. English, French) + Enter" />
                        <button type="button" className="btn-primary" onClick={commitCurrentInputs} style={{ padding: '0 16px', fontSize: '13px', borderRadius: '10px', flexShrink: 0 }}>
                            Add
                        </button>
                    </div>
                </div>
            );
            case 10: return (
                <div>
                    <h3 style={stepTitle}>Interests</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                        {(data.interests || []).map((interest, i) => (
                            <span key={i} className="tag-chip" style={{ background: 'rgba(107,101,96,0.1)', color: '#6B6560' }}>
                                {interest}<span className="tag-chip-remove" onClick={() => update('interests', data.interests.filter((_, j) => j !== i))}>×</span>
                            </span>
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input className="fancy-input" style={{ flex: 1 }} value={interestInput} onChange={e => setInterestInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); commitCurrentInputs(); } }}
                            onBlur={commitCurrentInputs}
                            placeholder="Type an interest (e.g. Reading, Hiking) + Enter" />
                        <button type="button" className="btn-primary" onClick={commitCurrentInputs} style={{ padding: '0 16px', fontSize: '13px', borderRadius: '10px', flexShrink: 0 }}>
                            Add
                        </button>
                    </div>
                </div>
            );
            case 11: return (
                <div>
                    <h3 style={stepTitle}>References (Optional)</h3>
                    <textarea className="fancy-textarea" rows={6} value={data.references || ''} onChange={e => update('references', e.target.value)}
                        placeholder="E.g. Professional references available upon request..." />
                </div>
            );
            default: return null;
        }
    };

    if (!mounted) return null;

    return createPortal(
        <div style={{
            position: 'fixed', inset: 0, background: 'var(--bg)', zIndex: 99999,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
            {/* Top Bar */}
            <div style={{
                background: 'var(--surface)', 
                borderBottom: '1px solid var(--border)', 
                padding: '14px 28px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                flexShrink: 0, 
                gap: '24px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
                {/* Left side: Branding & Editing Context */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: 'var(--accent)', letterSpacing: '-0.02em' }}>
                        PlacementOS
                    </span>
                    <span style={{ height: '18px', width: '1px', background: 'var(--border)' }} />
                    <div style={{ 
                        background: 'rgba(45, 106, 79, 0.06)', 
                        border: '1px solid rgba(45, 106, 79, 0.15)',
                        color: 'var(--accent)', 
                        padding: '4px 12px', 
                        borderRadius: '20px', 
                        fontSize: '12px', 
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                    }}>
                        <span style={{ fontSize: '10px' }}>📝</span>
                        Editing: <span style={{ fontWeight: 700 }}>{resume?.label || 'New Resume'}</span>
                    </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button 
                        onClick={() => setShowAtsSidebar(!showAtsSidebar)}
                        className="btn-outline" 
                        style={{ 
                            padding: '8px 16px', 
                            fontSize: '13px', 
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            borderColor: 'var(--border)',
                            background: showAtsSidebar ? 'rgba(201, 162, 58, 0.08)' : 'transparent',
                            color: showAtsSidebar ? 'var(--accent)' : 'var(--text-muted)',
                            transition: 'all 0.2s ease',
                            flexShrink: 0 
                        }}
                    >
                        ⚙️ ATS Settings {showAtsSidebar ? '◀' : '▶'}
                    </button>
                    <button 
                        onClick={() => setShowExitConfirm(true)} 
                        className="btn-ghost" 
                        style={{ 
                            padding: '8px 16px', 
                            fontSize: '13px', 
                            fontWeight: 600,
                            color: 'var(--engine-red)', 
                            borderColor: 'var(--engine-red)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            borderRadius: '10px',
                            transition: 'all 0.2s ease',
                            flexShrink: 0 
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = 'rgba(192, 57, 43, 0.08)';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = 'transparent';
                        }}
                    >
                        ✕ Exit Builder
                    </button>
                </div>
            </div>

            {/* Step Navigation Pills */}
            <div style={{
                display: 'flex', 
                gap: '8px', 
                flexWrap: 'wrap',
                padding: '12px 28px', 
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg)',
            }}>
                {STEPS.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => { commitCurrentInputs(); setStep(i); }}
                        style={{
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: step === i ? 600 : 400,
                            cursor: 'pointer',
                            border: step === i ? 'none' : '1px solid var(--border)',
                            background: step === i ? 'var(--accent)' : 'var(--surface)',
                            color: step === i ? '#FFFFFF' : 'var(--text-muted)',
                            transition: 'all 0.2s ease',
                            boxShadow: step === i ? '0 4px 10px rgba(45, 106, 79, 0.2)' : 'none'
                        }}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: 'var(--bg)' }}>
                {/* Left: Form */}
                <div style={{ flex: 1, overflow: 'auto', padding: '32px 28px', paddingBottom: '100px' }}>
                    {renderStep()}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', gap: '12px', flexWrap: 'wrap' }}>
                        {step > 0 ? (
                            <button onClick={() => { commitCurrentInputs(); setStep(step - 1); }} className="btn-ghost">← Back</button>
                        ) : (
                            <div />
                        )}
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                            <button onClick={handleSaveOnly} disabled={saving} className="btn-outline" style={{ fontSize: '13px', padding: '10px 20px' }}>
                                {saving ? '⏳ Saving...' : '💾 Save progress'}
                            </button>
                            {step < 11 && (
                                <button onClick={() => { commitCurrentInputs(); setStep(step + 1); }} className="btn-primary" style={{ fontSize: '13px', padding: '10px 20px' }}>
                                    Next Step →
                                </button>
                            )}
                            <button onClick={handleSave} disabled={saving} className="btn-gold" style={{ fontSize: '13px', padding: '10px 20px' }}>
                                {saving ? '⏳ Saving...' : '✅ Save & Exit'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Center: Live Preview */}
                <div style={{
                    flex: 1, overflow: 'auto', background: 'var(--surface)', borderLeft: '1px solid var(--border)',
                    padding: '20px', display: 'flex', flexDirection: 'column',
                }}>
                    {/* Template Switcher */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', background: 'var(--bg)', padding: '14px', borderRadius: '12px', border: '1px solid var(--border)', width: '100%', boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', width: '100px', flexShrink: 0 }}>Templates:</span>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(id => (
                                    <button
                                        key={id}
                                        onClick={() => update('templateId', id)}
                                        style={{
                                            padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer',
                                            background: data.templateId === id ? 'var(--accent)' : 'var(--skeleton)',
                                            color: data.templateId === id ? '#fff' : 'var(--text)',
                                            border: 'none', fontWeight: 500, transition: 'all 0.2s ease',
                                        }}
                                    >
                                        T{id}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', width: '100px', flexShrink: 0 }}>Accent:</span>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                {data.atsConsistentFormatting ? (
                                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        ⚠️ Overridden by Consistent Formatting
                                    </span>
                                ) : (
                                    ACCENT_COLORS.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => update('accentColor', c)}
                                            style={{
                                                width: '20px', height: '20px', borderRadius: '50%', background: c,
                                                border: data.accentColor === c ? '3px solid var(--text)' : '1.5px solid var(--border)',
                                                cursor: 'pointer', transition: 'all 0.2s ease',
                                            }}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview — A4 scaled to fit */}
                    <div style={{
                        width: '794px',
                        transformOrigin: 'top left',
                        transform: 'scale(0.55)',
                        marginBottom: '-400px',
                        flexShrink: 0,
                    }}>
                        <ResumePreview data={data} templateId={data.templateId} accentColor={data.accentColor} />
                    </div>
                </div>

                {/* Right: ATS Configuration Sidebar */}
                <div style={{
                    width: showAtsSidebar ? '320px' : '0px',
                    borderLeft: showAtsSidebar ? '1px solid var(--border)' : 'none',
                    background: 'var(--surface)',
                    padding: showAtsSidebar ? '24px 20px' : '0px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    flexShrink: 0,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    opacity: showAtsSidebar ? 1 : 0,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '4px', minWidth: '280px' }}>
                        <span style={{ fontSize: '18px' }}>⚙️</span>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text)' }}>
                            ATS Optimization
                        </h3>
                    </div>

                    {/* Symbols Toggle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', minWidth: '280px' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '2px' }}>Show Symbols & Icons</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3, display: 'block' }}>Hides all visual icons/logos for strict text parsing.</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor, flexShrink: 0 }}>
                            <input 
                                type="checkbox" 
                                checked={data.atsSymbols !== false} 
                                onChange={e => update('atsSymbols', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>

                    {/* Standard Section Names Toggle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', minWidth: '280px' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '2px' }}>Standard Section Names</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3, display: 'block' }}>Forces headings like Summary, Experience, Education.</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor, flexShrink: 0 }}>
                            <input 
                                type="checkbox" 
                                checked={data.atsStandardSectionNames === true} 
                                onChange={e => update('atsStandardSectionNames', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>

                    {/* Consistent Formatting Toggle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', minWidth: '280px' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '2px' }}>Consistent Formatting</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3, display: 'block' }}>Enforces uniform black/dark colors and solid layout flows.</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor, flexShrink: 0 }}>
                            <input 
                                type="checkbox" 
                                checked={data.atsConsistentFormatting === true} 
                                onChange={e => update('atsConsistentFormatting', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>

                    {/* Single Column Layout Toggle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', minWidth: '280px' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '2px' }}>Single Column Layout</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3, display: 'block' }}>Forces side-by-side grids and sidebars to stack vertically.</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor, flexShrink: 0 }}>
                            <input 
                                type="checkbox" 
                                checked={data.atsSingleColumn === true} 
                                onChange={e => update('atsSingleColumn', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>

                    {/* Profile Links Format Toggle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', minWidth: '280px' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '2px' }}>Profile Links URL format</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3, display: 'block' }}>e.g. LinkedIn: linkedin.com/in/...</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor, flexShrink: 0 }}>
                            <input 
                                type="checkbox" 
                                checked={data.atsProfileLinksFormat === true} 
                                onChange={e => update('atsProfileLinksFormat', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>

                    {/* Project Links Format Toggle */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', minWidth: '280px' }}>
                        <div style={{ flex: 1 }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)', display: 'block', marginBottom: '2px' }}>Project Links URL format</span>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.3, display: 'block' }}>e.g. GitHub: github.com/...</span>
                        </div>
                        <label className="fancy-toggle" style={{ '--accent-color': (data.accentColor === '#FFFFFF' || data.accentColor === '#ffffff') ? '#1C1C1C' : data.accentColor, flexShrink: 0 }}>
                            <input 
                                type="checkbox" 
                                checked={data.atsProjectLinksFormat === true} 
                                onChange={e => update('atsProjectLinksFormat', e.target.checked)}
                            />
                            <span className="fancy-toggle-slider" />
                        </label>
                    </div>

                    {/* Font Selection Dropdown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '280px' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>Standard Font Selection</span>
                        <select 
                            className="fancy-input" 
                            value={data.atsFontSelection || ''} 
                            onChange={e => update('atsFontSelection', e.target.value)}
                            style={{ width: '100%', outline: 'none' }}
                        >
                            <option value="">Default Template Font</option>
                            <option value="Arial">Arial</option>
                            <option value="Calibri">Calibri</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Georgia">Georgia</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Exit Confirmation Modal */}
            {showExitConfirm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(26, 31, 46, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '40px', maxWidth: '400px', width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
                        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginBottom: '12px' }}>Unsaved Changes</h3>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '28px' }}>
                            You are about to exit the resume builder. How would you like to proceed?
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button className="btn-primary" onClick={handleSave} disabled={saving} style={{ width: '100%', padding: '12px' }}>
                                {saving ? '⏳ Saving...' : '💾 Save & Exit'}
                            </button>
                            <button className="btn-outline" onClick={onClose} style={{ width: '100%', padding: '12px', color: 'var(--engine-red)', borderColor: 'var(--engine-red)' }}>
                                🗑️ Exit Without Saving
                            </button>
                            <button className="btn-ghost" onClick={() => setShowExitConfirm(false)} style={{ width: '100%', padding: '12px' }}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>,
        document.body
    );
}

const stepTitle = { fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#1C1C1C', marginBottom: '24px' };
const labelStyle = { fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B6560', display: 'block', marginBottom: '6px' };
