'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import ExpiryBanner from '@/components/dashboard/ExpiryBanner';
import ProfileHero from '@/components/dashboard/ProfileHero';
import TypewriterSummary from '@/components/dashboard/TypewriterSummary';
import SkillsBrain from '@/components/dashboard/SkillsBrain';
import EducationSection from '@/components/dashboard/EducationSection';
import ResumeSection from '@/components/dashboard/ResumeSection';
import TrainSection from '@/components/dashboard/TrainSection';
import CertificateTrain from '@/components/dashboard/CertificateTrain';
import AchievementBus from '@/components/dashboard/AchievementBus';
import SocialLinks from '@/components/dashboard/SocialLinks';
import PremiumCTA from '@/components/dashboard/PremiumCTA';
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

export default function DashboardPage() {
    const { user: clerkUser, isLoaded } = useUser();
    const router = useRouter();

    const [userData, setUserData] = useState(null);
    const [resume, setResume] = useState(null);
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
                const { resume: r } = await resumeRes.json();
                setResume(r);
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

    const handleSaveResume = async (data) => {
        const method = resume ? 'PATCH' : 'POST';
        const res = await fetch('/api/resume', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (res.ok) {
            const { resume: r } = await res.json();
            setResume(r);
            toast.success('Resume saved! ✅');
        }
    };

    // Calculate expiry days
    const daysUntilExpiry = userData?.dataExpiresAt
        ? Math.ceil((new Date(userData.dataExpiresAt) - Date.now()) / (1000 * 60 * 60 * 24))
        : null;

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
                {/* Expiry Banner */}
                {!userData?.isPremium && daysUntilExpiry !== null && (
                    <ExpiryBanner
                        daysLeft={daysUntilExpiry}
                        onUpgrade={() => setShowPremiumModal(true)}
                    />
                )}

                {/* Section 1: Profile Hero */}
                <ProfileHero
                    user={userData}
                    onEditProfile={() => setShowEditProfile(true)}
                />

                {/* Section 2: Typewriter Summary */}
                <TypewriterSummary user={userData} resume={resume} />

                {/* Section 3: Skills Brain Animation — merge user.skills + resume.skills */}
                <SkillsBrain skills={[
                    ...new Set([
                        ...(userData?.skills || []),
                        ...(resume?.skills || []),
                    ])
                ]} />

                {/* Section 4: Education */}
                <EducationSection education={resume?.education || []} />

                {/* Section 5: Resume */}
                <ResumeSection
                    resume={resume}
                    username={userData?.username}
                    onSaveResume={handleSaveResume}
                />

                {/* Section 6: Projects Train */}
                <TrainSection
                    projects={projects}
                    onRefreshProjects={refreshProjects}
                />

                {/* Section 7: Certificates Train */}
                <CertificateTrain
                    certificates={certificates}
                    onRefreshCertificates={refreshCertificates}
                />

                {/* Section 8: Achievements Bus */}
                <AchievementBus
                    achievements={achievements}
                    onRefreshAchievements={refreshAchievements}
                />

                {/* Section 9: Social Links — always pass live userData */}
                <SocialLinks user={userData} />

                {/* Section 10: Premium CTA */}
                <PremiumCTA
                    user={userData}
                    onOpenPremiumModal={() => setShowPremiumModal(true)}
                    onRefreshUser={refreshUser}
                />
            </main>

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
