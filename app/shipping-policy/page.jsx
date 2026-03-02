import LegalLayout from '@/components/shared/LegalLayout';

export const metadata = {
    title: 'Shipping & Delivery Policy — PlacementOS',
    description: 'Digital delivery policy for PlacementOS premium subscription services.',
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

export default function ShippingPolicy() {
    return (
        <LegalLayout title="Shipping & Delivery Policy" lastUpdated="March 2, 2026">

            <P><strong>PlacementOS</strong> is a fully digital Software-as-a-Service (SaaS) platform. We do not sell, manufacture, or ship any physical goods. This page describes how our digital services are delivered to users following a successful purchase.</P>

            <S>1. Nature of Delivery</S>
            <P>All services and features provided by PlacementOS are delivered electronically over the internet. There is no physical shipment involved. No logistics partners, couriers, or delivery timelines are applicable to PlacementOS products. This policy exists to comply with applicable e-commerce disclosure requirements in India under the Consumer Protection (E-Commerce) Rules, 2020.</P>

            <S>2. Premium Subscription — Digital Delivery</S>
            <P>When you purchase a PlacementOS Premium subscription:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li><strong>Instant Activation:</strong> Your premium subscription is activated on your account within seconds of a successful payment confirmation from Razorpay.</Li>
                <Li><strong>No Waiting Period:</strong> There is no processing delay. Premium features (PDF export, public portfolio link) become available immediately upon payment success.</Li>
                <Li><strong>Delivery Confirmation:</strong> You will receive an email confirmation to your registered email address confirming your subscription activation.</Li>
                <Li><strong>Access Method:</strong> Log in to your PlacementOS account at www.placementos.in/dashboard to access all premium features.</Li>
            </ul>

            <S>3. PDF Portfolio & Resume Export (Premium Feature)</S>
            <P>The PDF export feature is a premium digital deliverable that allows you to download a formatted version of your portfolio or resume directly from your browser:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li>PDF generation is performed on-demand, in real time, based on your current portfolio data.</Li>
                <Li>The PDF is delivered as an instant browser download — no email attachment is sent.</Li>
                <Li>There is no queue or delay. Generation typically completes within 5–15 seconds, depending on your portfolio content.</Li>
                <Li>You may download your PDF as many times as needed during your active premium subscription period.</Li>
            </ul>

            <S>4. Public Portfolio Link (Premium Feature)</S>
            <P>The public shareable portfolio link is a digital URL generated instantly when you activate this feature from your dashboard:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li>The URL is generated immediately upon activation — no manual processing is required.</Li>
                <Li>Your portfolio is hosted on PlacementOS servers and accessible globally via the unique link.</Li>
                <Li>Deactivating the public link immediately revokes public access to your portfolio.</Li>
            </ul>

            <S>5. Delivery Failures</S>
            <P>In the rare event that premium features are not activated on your account within <strong>10 minutes</strong> of a successful payment (which you can verify via the Razorpay payment confirmation email), please:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li>Refresh your dashboard and check the premium status indicator.</Li>
                <Li>Clear browser cache and log in again.</Li>
                <Li>If the issue persists, email us at <strong>support@placementos.in</strong> with your Razorpay Payment ID within 48 hours. We will manually verify and activate your subscription.</Li>
            </ul>
            <P>Delivery issues reported beyond 48 hours of the transaction may not be resolvable without additional verification.</P>

            <S>6. No Physical Shipping</S>
            <P>PlacementOS does not offer any physical products, printed documents, USB drives, DVDs, or merchandise of any kind. If you receive any communication claiming to ship physical goods on behalf of PlacementOS, treat it as fraudulent and report it to us immediately at <strong>support@placementos.in</strong>.</P>

            <S>7. Geographic Availability</S>
            <P>PlacementOS is accessible worldwide via any internet-connected device and browser. Payment via Razorpay is currently configured for Indian users (INR). Users outside India may face payment restrictions depending on their country's banking regulations and Razorpay's supported payment methods.</P>

            <S>8. Contact</S>
            <P>For delivery-related concerns:<br /><strong>Email:</strong> support@placementos.in<br /><strong>Response Time:</strong> Within 2 business days<br /><strong>Operated by:</strong> TechForce Studio, India</P>

        </LegalLayout>
    );
}
