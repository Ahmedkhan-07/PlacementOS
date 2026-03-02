import LegalLayout from '@/components/shared/LegalLayout';

export const metadata = {
    title: 'Terms & Conditions — PlacementOS',
    description: 'Terms governing your use of PlacementOS portfolio platform.',
};

const S = ({ children }) => (
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '12px' }}>
        {children}
    </h2>
);
const P = ({ children }) => (
    <p style={{ marginBottom: '16px', color: 'var(--text-muted)', lineHeight: 1.9 }}>{children}</p>
);
const Li = ({ children }) => (
    <li style={{ marginBottom: '8px', color: 'var(--text-muted)', lineHeight: 1.85, paddingLeft: '6px' }}>{children}</li>
);

export default function TermsAndConditions() {
    return (
        <LegalLayout title="Terms & Conditions" lastUpdated="March 2, 2026">

            <P>These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User", "you") and <strong>PlacementOS</strong>, operated by TechForce Studio ("we", "us", "our"), governing your access to and use of the PlacementOS platform available at <strong>www.placementos.in</strong>. By registering an account or using any part of the platform, you agree to be bound by these Terms. If you do not agree, do not use the platform.</P>

            <S>1. Eligibility</S>
            <P>You must be at least 13 years of age to use PlacementOS. If you are between 13 and 18 years of age, you must have the consent of a parent or legal guardian. By using the platform, you represent that you meet these requirements and have the legal capacity to enter into this agreement.</P>

            <S>2. Account Registration</S>
            <P>To access PlacementOS features, you must create an account via Clerk authentication (email/password or Google sign-in). You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately at <strong>support@placementos.in</strong> if you suspect any unauthorised access to your account. PlacementOS shall not be liable for any loss resulting from unauthorised use of your account.</P>

            <S>3. Platform Services</S>
            <P>PlacementOS provides a digital portfolio builder platform that enables users to:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li>Create and manage an online placement portfolio including projects, certificates, achievements, education details, and skills.</Li>
                <Li>Build and preview a professional resume from within the dashboard.</Li>
                <Li><strong>[Premium Only]</strong> Download the portfolio and resume as a formatted PDF document.</Li>
                <Li><strong>[Premium Only]</strong> Generate a public shareable link to your portfolio, accessible without login.</Li>
            </ul>
            <P>We reserve the right to modify, suspend, or discontinue any feature at any time with or without notice.</P>

            <S>4. Premium Subscription</S>
            <P>Certain features of PlacementOS are available only to premium subscribers. Premium access is obtained by purchasing a subscription through our platform. Payment is processed exclusively via <strong>Razorpay</strong>, a regulated payment gateway. Subscription details, pricing, and duration are displayed at the time of purchase. Subscriptions are non-transferable and associated with a single user account.</P>

            <S>5. User Content</S>
            <P>You retain full ownership of all content you upload to PlacementOS ("User Content"), including text, images, links, and documents. By uploading content, you grant PlacementOS a non-exclusive, royalty-free, worldwide licence to host, display, and transmit your content solely for the purpose of providing the platform services to you.</P>
            <P>You represent and warrant that: (a) you own or have the necessary rights to all User Content you submit; (b) your User Content does not infringe any third-party intellectual property rights, privacy rights, or applicable laws; (c) your User Content does not contain malicious code, spam, or illegal material.</P>
            <P>We reserve the right to remove any User Content that violates these Terms or applicable law, without prior notice and without liability.</P>

            <S>6. Public Portfolio Disclaimer</S>
            <P>If you activate the public portfolio link (a premium feature), <strong>your portfolio content will be publicly visible on the internet to anyone with the link</strong>. This includes, but is not limited to, your name, photograph, academic qualifications, project descriptions, certificate details, and achievement records. You acknowledge and accept full responsibility for the information you choose to publish publicly. PlacementOS shall not be held responsible for any consequences arising from the public availability of your portfolio content, including misuse by third parties.</P>

            <S>7. Prohibited Conduct</S>
            <P>You agree not to:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li>Post false, misleading, or fabricated qualification or professional information.</Li>
                <Li>Upload content that violates any applicable law, including obscene, defamatory, or discriminatory material.</Li>
                <Li>Attempt to gain unauthorised access to any other user's account or portfolio data.</Li>
                <Li>Use automated bots or scrapers to extract content from the platform.</Li>
                <Li>Resell, sublicense, or otherwise commercially exploit PlacementOS or its features without our express written consent.</Li>
                <Li>Interfere with the platform's infrastructure, servers, or security systems.</Li>
            </ul>

            <S>8. Intellectual Property</S>
            <P>All platform design, code, branding, and content provided by PlacementOS (exclusive of User Content) are the intellectual property of TechForce Studio. You may not copy, reproduce, distribute, or create derivative works from our platform without express written permission.</P>

            <S>9. Limitation of Liability</S>
            <P>To the maximum extent permitted by applicable law, PlacementOS and TechForce Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, loss of revenue, loss of business opportunity, or reputational harm, arising from your use of or inability to use the platform.</P>
            <P>Our aggregate liability to you for any claim arising under these Terms shall not exceed the amount paid by you to PlacementOS in the 12 months immediately preceding the claim.</P>

            <S>10. Disclaimer of Warranties</S>
            <P>PlacementOS is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the platform will be uninterrupted, error-free, or secure. We disclaim all implied warranties including merchantability, fitness for a particular purpose, and non-infringement.</P>

            <S>11. Termination</S>
            <P>We may suspend or permanently terminate your account if you violate these Terms or engage in conduct that we reasonably determine to be harmful to the platform or other users. Upon termination, your right to use PlacementOS ceases immediately. Paid subscriptions terminated for cause are not eligible for a refund. You may also delete your account at any time from your dashboard settings.</P>

            <S>12. Governing Law & Dispute Resolution</S>
            <P>These Terms shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>. Any dispute, controversy, or claim arising out of or in connection with these Terms or your use of PlacementOS shall be subject to the exclusive jurisdiction of the courts located in <strong>India</strong>. We encourage resolution of disputes through good-faith negotiation before initiating legal proceedings.</P>

            <S>13. Changes to Terms</S>
            <P>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or a prominent in-platform notification. Your continued use of PlacementOS after such changes constitutes your acceptance of the revised Terms.</P>

            <S>14. Contact</S>
            <P>For questions about these Terms, contact us at:<br /><strong>Email:</strong> support@placementos.in<br /><strong>Operated by:</strong> TechForce Studio, India</P>

        </LegalLayout>
    );
}
