import LegalLayout from '@/components/shared/LegalLayout';

export const metadata = {
    title: 'Refund & Cancellation Policy — PlacementOS',
    description: 'Refund and cancellation terms for PlacementOS premium subscriptions.',
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

export default function RefundPolicy() {
    return (
        <LegalLayout title="Refund & Cancellation Policy" lastUpdated="March 2, 2026">

            <P>This Refund and Cancellation Policy applies to all purchases made on <strong>PlacementOS</strong> (www.placementos.in), operated by TechForce Studio. Please read this policy carefully before completing any payment. By purchasing a premium subscription, you acknowledge that you have read, understood, and agreed to this policy.</P>

            <S>1. Nature of Service</S>
            <P>PlacementOS is a <strong>digital SaaS (Software as a Service)</strong> platform. All features, including premium access, are delivered digitally and are made available to the user immediately upon successful payment. No physical products are shipped. Because the digital service is accessible and consumed immediately upon purchase, our refund policy is governed accordingly.</P>

            <S>2. Premium Subscription — General Policy</S>
            <P>Premium subscriptions provide access to advanced features including PDF export of portfolios/resumes and public shareable portfolio links. Upon successful payment:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li>Premium features are activated on your account immediately.</Li>
                <Li>You receive full and uninterrupted access to all premium features for the purchased subscription duration.</Li>
            </ul>
            <P>Given the immediate digital delivery of the subscribed service, <strong>all purchases are generally non-refundable.</strong></P>

            <S>3. Eligibility for Refund</S>
            <P>Notwithstanding the general no-refund policy, a refund may be considered in the following limited circumstances:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li><strong>Technical Failure:</strong> You were charged successfully by Razorpay, but your account was not upgraded to premium due to a verified technical error on our platform, and you report the issue within <strong>48 hours</strong> of the transaction.</Li>
                <Li><strong>Duplicate Payment:</strong> Your account was charged more than once for the same subscription period due to a payment gateway error.</Li>
                <Li><strong>Service Non-Availability:</strong> PlacementOS experiences a platform-wide outage for more than 72 continuous hours during your active subscription, making premium features completely inaccessible.</Li>
            </ul>
            <P>Refund requests made after <strong>7 calendar days</strong> from the date of purchase will not be entertained under any circumstances.</P>

            <S>4. Non-Refundable Circumstances</S>
            <P>No refunds will be issued in the following cases:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li>You changed your mind or no longer wish to use the platform after purchase.</Li>
                <Li>You did not use the premium features during the subscription period.</Li>
                <Li>Your account was terminated due to violation of our Terms and Conditions.</Li>
                <Li>You claim dissatisfaction with platform design, feature set, or UI changes made during your subscription period.</Li>
                <Li>Internet connectivity issues on your end preventing access to the platform.</Li>
                <Li>You failed to cancel before an auto-renewal date (if applicable).</Li>
            </ul>

            <S>5. Cancellation Policy</S>
            <P>PlacementOS premium subscriptions are sold as one-time fixed-duration plans (e.g., 1 month, 6 months, or 1 year). At present, subscriptions are <strong>not auto-renewed</strong> unless otherwise stated at the time of purchase. There is no ongoing recurring billing by default.</P>
            <P>If you wish to cancel your account entirely, you may do so from your dashboard. Cancellation of the account does not entitle you to a refund for the remaining subscription period.</P>

            <S>6. How to Request a Refund</S>
            <P>To raise a refund request for an eligible circumstance, contact us within 7 days of your transaction:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                <Li><strong>Email:</strong> support@placementos.in</Li>
                <Li><strong>Subject Line:</strong> "Refund Request — [Your Registered Email] — [Transaction ID]"</Li>
                <Li>Include your Razorpay Payment ID (found in the payment confirmation email) and a description of the issue.</Li>
            </ul>
            <P>We will review your request and respond within <strong>5-7 business days</strong>. Approved refunds will be credited back to the original payment method within <strong>7-10 business days</strong>, subject to Razorpay's processing timelines.</P>

            <S>7. Payment Gateway — Razorpay</S>
            <P>All transactions on PlacementOS are processed by <strong>Razorpay Payment Solutions Private Limited</strong>, a regulated payment aggregator. Razorpay's own refund processing timelines apply once a refund is initiated from our end. PlacementOS is not responsible for delays caused by Razorpay, card-issuing banks, or intermediary payment processors.</P>

            <S>8. Chargebacks</S>
            <P>If you initiate a chargeback with your bank or card provider for a transaction that is not eligible for a refund under this policy, we reserve the right to: (a) provide evidence of service delivery to your bank to dispute the chargeback; (b) suspend or terminate your PlacementOS account pending resolution.</P>

            <S>9. Contact</S>
            <P>For refund-related queries: <br /><strong>Email:</strong> support@placementos.in<br /><strong>Response Time:</strong> Within 2 business days<br /><strong>Operated by:</strong> TechForce Studio, India</P>

        </LegalLayout>
    );
}
