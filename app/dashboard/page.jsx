'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ProfileHero from '@/components/dashboard/ProfileHero';
import AboutOverview from '@/components/dashboard/AboutOverview';
import SkillsArsenal from '@/components/dashboard/SkillsArsenal';
import EducationSection from '@/components/dashboard/EducationSection';
import ResumeSection from '@/components/dashboard/ResumeSection';
import TrainSection from '@/components/dashboard/TrainSection';
import CertificateTrain from '@/components/dashboard/CertificateTrain';
import AchievementBus from '@/components/dashboard/AchievementBus';
import ContactSection from '@/components/dashboard/ContactSection';
import PremiumCTA from '@/components/dashboard/PremiumCTA';
import SupportSection from '@/components/dashboard/SupportSection';
import EditProfilePanel from '@/components/panels/EditProfilePanel';
import PremiumModal from '@/components/modals/PremiumModal';

// Deduplicate an array of MongoDB documents by _id to prevent UI-level duplicates
const dedup = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
        const id = String(item._id);
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
    });
};

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

export default function DashboardPage() {
    const { user: clerkUser, isLoaded } = useUser();
    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [resumes, setResumes] = useState([]);
    const resume = resumes.find(r => r.isActive) || resumes[0];
    const [projects, setProjects] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showEditProfile, setShowEditProfile] = useState(false);
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    // Fetch all data
    const fetchData = async () => {
        try {
            const [userRes, resumeRes, projRes, certRes, achRes] = await Promise.all([
                fetch('/api/user'),
                fetch('/api/resume'),
                fetch('/api/projects'),
                fetch('/api/certificates'),
                fetch('/api/achievements'),
            ]);

            if (!userRes.ok) {
                router.push('/onboarding');
                return;
            }

            const { user } = await userRes.json();
            setUserData(user);

            if (resumeRes.ok) {
                const resumeData = await resumeRes.json();
                setResumes(resumeData.resumes || []);
            }

            if (projRes.ok) {
                const { projects: p } = await projRes.json();
                setProjects(dedup(p));
            }

            if (certRes.ok) {
                const { certificates: c } = await certRes.json();
                setCertificates(dedup(c));
            }

            if (achRes.ok) {
                const { achievements: a } = await achRes.json();
                setAchievements(dedup(a));
            }
        } catch (err) {
            toast.error('Failed to load data');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (isLoaded && clerkUser) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, clerkUser]);

    const refreshUser = async () => {
        const res = await fetch('/api/user');
        if (res.ok) {
            const { user } = await res.json();
            setUserData(user);
        }
    };

    const refreshProjects = async () => {
        const res = await fetch('/api/projects');
        if (res.ok) {
            const { projects: p } = await res.json();
            setProjects(dedup(p));
        }
    };

    const refreshCertificates = async () => {
        const res = await fetch('/api/certificates');
        if (res.ok) {
            const { certificates: c } = await res.json();
            setCertificates(dedup(c));
        }
    };

    const refreshAchievements = async () => {
        const res = await fetch('/api/achievements');
        if (res.ok) {
            const { achievements: a } = await res.json();
            setAchievements(dedup(a));
        }
    };




    if (!isLoaded || loading) {
        return (
            <>
                <Navbar />
                <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
                    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px' }}>
                        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div className="skeleton" style={{ width: '220px', height: '220px', borderRadius: '50%' }} />
                            <div style={{ flex: 1, minWidth: '280px' }}>
                                <div className="skeleton" style={{ width: '300px', height: '40px', marginBottom: '12px' }} />
                                <div className="skeleton" style={{ width: '250px', height: '24px', marginBottom: '12px' }} />
                                <div className="skeleton" style={{ width: '400px', height: '60px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const allProjects = [
        ...projects,
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
        ...certificates,
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
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    success: { style: { background: '#2D6A4F', color: '#fff' } },
                    error: { style: { background: '#C0392B', color: '#fff' } },
                }}
            />
            <Navbar />
            <main style={{ paddingTop: '70px', position: 'relative', zIndex: 1 }}>
                {/* Section 1: Profile Hero */}
                <ProfileHero
                    user={userData}
                    onEditProfile={() => setShowEditProfile(true)}
                />

                {/* Section 2: About / Overview */}
                <AboutOverview 
                    user={userData} 
                    resume={resume} 
                    projectsCount={mergedProjects.length} 
                    certificatesCount={mergedCertificates.length} 
                />

                {/* Section 3: Skills Arsenal — merge user.skills + resume.skills + parsed resume.skillsText */}
                <SkillsArsenal skills={[
                    ...new Set([
                        ...(userData?.skills || []),
                        ...(resume?.skills || []),
                        ...extractSkillsFromText(resume?.skillsText)
                    ])
                ]} />

                {/* Section 4: Education */}
                <EducationSection education={resume?.education || []} />

                {/* Section 5: Resume */}
                <ResumeSection
                    resumes={resumes}
                    username={userData?.username}
                    userProfilePic={userData?.profilePicUrl}
                    onResumesChange={setResumes}
                />

                {/* Section 6: Projects Train */}
                <TrainSection
                    projects={mergedProjects}
                    onRefreshProjects={refreshProjects}
                />

                {/* Section 7: Certificates Train */}
                <CertificateTrain
                    certificates={mergedCertificates}
                    onRefreshCertificates={refreshCertificates}
                />

                {/* Section 8: Achievements Bus */}
                <AchievementBus
                    achievements={achievements}
                    onRefreshAchievements={refreshAchievements}
                />

                {/* Section 9: Contact Section — always pass live userData */}
                <ContactSection user={userData} />

                {/* Section 10: Premium CTA */}
                <PremiumCTA
                    user={userData}
                    onOpenPremiumModal={() => setShowPremiumModal(true)}
                    onRefreshUser={refreshUser}
                />
            </main>

            {/* Support Section */}
            <SupportSection user={userData} />

            <Footer />

            {/* Edit Profile Panel */}
            <EditProfilePanel
                isOpen={showEditProfile}
                user={userData}
                onClose={() => setShowEditProfile(false)}
                onSave={(updatedUser) => {
                    // Use the returned user object directly — no extra fetch needed
                    if (updatedUser) setUserData(updatedUser);
                    else refreshUser(); // fallback if no user returned
                    setShowEditProfile(false);
                }}
            />

            {/* Premium Modal */}
            <PremiumModal
                isOpen={showPremiumModal}
                onClose={() => setShowPremiumModal(false)}
                onSuccess={() => {
                    refreshUser();
                }}
            />
        </>
    );
}
