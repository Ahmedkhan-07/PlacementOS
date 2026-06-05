'use client';

import ProfileHero from '@/components/dashboard/ProfileHero';
import AboutOverview from '@/components/dashboard/AboutOverview';
import SkillsArsenal from '@/components/dashboard/SkillsArsenal';
import EducationSection from '@/components/dashboard/EducationSection';
import ResumeSection from '@/components/dashboard/ResumeSection';
import TrainSection from '@/components/dashboard/TrainSection';
import CertificateTrain from '@/components/dashboard/CertificateTrain';
import AchievementBus from '@/components/dashboard/AchievementBus';
import ContactSection from '@/components/dashboard/ContactSection';

const extractSkillsFromText = (skillsText) => {
    if (!skillsText) return [];
    const lines = skillsText.split(/[\n|;]/);
    const extracted = [];
    for (const line of lines) {
        const parts = line.split(':');
        const skillList = parts.length > 1 ? parts[1] : parts[0];
        const skills = skillList.split(',');
        for (const s of skills) {
            const trimmed = s.trim();
            if (trimmed && trimmed.length < 40) {
                const cleaned = trimmed.replace(/^\*\*|\*\*$/g, '').trim();
                if (cleaned) {
                    extracted.push(cleaned);
                }
            }
        }
    }
    return extracted;
};

export default function PublicPortfolioClient({ user, resume, projects = [], certificates = [], achievements = [] }) {
    const allProjects = [
        ...(projects || []),
        ...(resume?.projects || []).map((p, idx) => ({
            ...p,
            _id: p._id || `resume-proj-${idx}`,
            isFromResume: true
        }))
    ];
    const seenTitles = new Set();
    const mergedProjects = [];
    for (const p of allProjects) {
        const titleNormalized = p.title?.trim().toLowerCase();
        if (titleNormalized && !seenTitles.has(titleNormalized)) {
            seenTitles.add(titleNormalized);
            mergedProjects.push(p);
        }
    }

    const allCertificates = [
        ...(certificates || []),
        ...(resume?.certifications || []).map((c, idx) => ({
            ...c,
            _id: c._id || `resume-cert-${idx}`,
            name: c.title,
            issuer: c.description,
            dateIssued: c.year,
            credentialUrl: c.url,
            isFromResume: true
        }))
    ];
    const seenCertNames = new Set();
    const mergedCertificates = [];
    for (const c of allCertificates) {
        const nameNormalized = c.name?.trim().toLowerCase();
        if (nameNormalized && !seenCertNames.has(nameNormalized)) {
            seenCertNames.add(nameNormalized);
            mergedCertificates.push(c);
        }
    }

    return (
        <main style={{ position: 'relative', zIndex: 1 }}>
            {/* Navbar - minimal */}
            <nav className="glass-navbar fixed top-0 left-0 right-0 z-50" style={{ padding: '14px 40px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <a href="/" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: '#2D6A4F' }}>
                            PlacementOS
                        </span>
                    </a>
                    
                    {/* Anchor Links */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500 }}>
                        <a href="#about" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}>About</a>
                        <a href="#skills" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); }}>Skills</a>
                        <a href="#projects" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>Projects</a>
                        <a href="#education" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('education')?.scrollIntoView({ behavior: 'smooth' }); }}>Education</a>
                        <a href="#contact" className="nav-link" style={{textDecoration: 'none'}} onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Contact</a>
                    </div>
                </div>
            </nav>
 
            {/* Profile Hero — no edit button */}
            <div style={{ paddingTop: '70px' }}>
                <ProfileHero user={user} />
            </div>
 
            {/* About / Overview */}
            <AboutOverview 
                user={user} 
                resume={resume} 
                projectsCount={mergedProjects.length} 
                certificatesCount={mergedCertificates.length} 
            />
 
            {/* Skills Arsenal */}
            <SkillsArsenal skills={[
                ...new Set([
                    ...(user?.skills || []),
                    ...(resume?.skills || []),
                    ...extractSkillsFromText(resume?.skillsText)
                ])
            ]} />
 
            {/* Education Section */}
            <EducationSection education={resume?.education || []} />
 
            {/* Resume Section — read-only (no onSaveResume → no Edit button) */}
            {resume && (
                <ResumeSection
                    resume={resume}
                    username={user.username}
                    readOnly
                />
            )}
 
            {/* Projects Train — read-only */}
            {mergedProjects.length > 0 && (
                <TrainSection
                    projects={mergedProjects}
                    readOnly
                />
            )}
 
            {/* Certificates Train — read-only */}
            {mergedCertificates.length > 0 && (
                <CertificateTrain
                    certificates={mergedCertificates}
                    readOnly
                />
            )}

            {/* Achievements Bus — read-only */}
            {achievements.length > 0 && (
                <AchievementBus
                    achievements={achievements}
                    readOnly
                />
            )}

            {/* Contact Section */}
            <ContactSection user={user} />
        </main>
    );
}
