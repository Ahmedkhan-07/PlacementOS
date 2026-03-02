import LegalLayout from '@/components/shared/LegalLayout';

export const metadata = {
    title: 'About Us — PlacementOS',
    description: 'Learn about PlacementOS — the digital portfolio builder designed for placement-ready students and professionals.',
};

const S = ({ children }) => (
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '12px' }}>
        {children}
    </h2>
);
const P = ({ children }) => (
    <p style={{ marginBottom: '16px', color: 'var(--text-muted)', lineHeight: 1.9 }}>{children}</p>
);

export default function AboutUs() {
    return (
        <LegalLayout title="About Us" lastUpdated="March 2, 2026">

            {/* Mission statement block */}
            <div style={{
                background: 'rgba(45,106,79,0.06)',
                border: '1.5px solid rgba(45,106,79,0.18)',
                borderLeft: '4px solid var(--accent)',
                borderRadius: '12px',
                padding: '24px 28px',
                marginBottom: '32px',
            }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.5, margin: 0 }}>
                    "Built for students and professionals who deserve more than a plain PDF resume — a living, shareable portfolio that speaks for them."
                </p>
            </div>

            <S>Who We Are</S>
            <P><strong>PlacementOS</strong> is a modern digital portfolio platform built by <strong>TechForce Studio</strong>, an independent product studio based in India. We build focused, purposeful software for the next generation of professionals navigating competitive job markets and placement seasons.</P>
            <P>PlacementOS was created after observing a common problem: talented students and early-career professionals struggle to present their skills, projects, and achievements in a compelling, organised, and accessible way. A traditional resume fails to capture the depth of a person's work. PlacementOS was built to change that.</P>

            <S>What We Build</S>
            <P>PlacementOS is an all-in-one portfolio operating system designed for:</P>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', margin: '20px 0 28px' }}>
                {[
                    { icon: '🚂', title: 'Projects Train', desc: 'Showcase your technical and creative projects in an animated, visual format.' },
                    { icon: '🏆', title: 'Certificate Wall', desc: 'Log and display all your certifications from any course or institution.' },
                    { icon: '🚌', title: 'Achievement Bus', desc: 'Highlight awards, competitions, and extra-curricular accomplishments.' },
                    { icon: '📄', title: 'Resume Builder', desc: 'Generate a professional resume with your portfolio data in one click.' },
                    { icon: '🧠', title: 'Skills Brain', desc: 'Visualise your technical skill set in an engaging, animated layout.' },
                    { icon: '🔗', title: 'Public Portfolio', desc: 'Share a single link that showcases your entire professional profile.' },
                ].map(f => (
                    <div key={f.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px', padding: '18px 20px' }}>
                        <div style={{ fontSize: '26px', marginBottom: '8px' }}>{f.icon}</div>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>{f.title}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                ))}
            </div>

            <S>Our Mission</S>
            <P>Our mission is simple: to help every placement-ready individual walk into an interview, campus drive, or job application with confidence — backed by a portfolio that truly represents who they are and what they are capable of.</P>
            <P>We believe that your skills deserve better visibility than a static Word document. Every project you've built, every certificate you've earned, and every achievement you've unlocked deserves a platform that presents it as professionally as you worked for it.</P>

            <S>Technology & Compliance</S>
            <P>PlacementOS is built using a modern web stack (Next.js, MongoDB) hosted on secure cloud infrastructure. User authentication is handled by <strong>Clerk</strong>, a GDPR-compliant identity provider. Payments are processed by <strong>Razorpay</strong>, a PCI-DSS compliant payment gateway regulated by the Reserve Bank of India. We take data security and user privacy seriously — see our <a href="/privacy-policy" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Privacy Policy</a> for full details.</P>

            <S>Our Model</S>
            <P>PlacementOS operates on a freemium model:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                {[
                    'Free Plan: Create your profile, add projects, certificates, and achievements. Full dashboard access.',
                    'Premium Plan: Unlock PDF export of your portfolio and resume, and activate a public shareable portfolio link — all for a one-time affordable subscription fee.',
                ].map((li, i) => (
                    <li key={i} style={{ marginBottom: '8px', color: 'var(--text-muted)', lineHeight: 1.85, paddingLeft: '6px' }}>{li}</li>
                ))}
            </ul>
            <P>We do not run advertisements. We do not sell user data. Our business model is sustained entirely by premium subscriptions.</P>

            <S>Get in Touch</S>
            <P>We're always listening. If you have a feature suggestion, partnership proposal, or just want to say hello — reach out:</P>
            <P>
                <strong>General:</strong> support@placementos.in<br />
                <strong>Partnerships & Colleges:</strong> hello@placementos.in<br />
                <strong>Website:</strong> www.placementos.in<br />
                <strong>Operated by:</strong> TechForce Studio, India
            </P>

        </LegalLayout>
    );
}
