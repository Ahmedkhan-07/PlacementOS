import LegalLayout from '@/components/shared/LegalLayout';

export const metadata = {
    title: 'Contact Us — PlacementOS',
    description: 'Get in touch with the PlacementOS support team.',
};

const S = ({ children }) => (
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, color: 'var(--text)', marginTop: '40px', marginBottom: '12px' }}>
        {children}
    </h2>
);
const P = ({ children }) => (
    <p style={{ marginBottom: '16px', color: 'var(--text-muted)', lineHeight: 1.9 }}>{children}</p>
);

export default function ContactUs() {
    const websiteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://placementos.in';

    return (
        <LegalLayout title="Contact Us" lastUpdated="April 2, 2026">

            <P>We're here to help. Whether you have a question about your account, a technical issue, or a legal/privacy concern — reach out and we'll respond as soon as possible.</P>

            {/* Contact Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', margin: '32px 0' }}>
                {[
                    {
                        icon: '📧',
                        title: 'General Support',
                        desc: 'Account issues, feature questions, and feedback.',
                        value: 'placematedotcom@gmail.com',
                        href: 'mailto:placematedotcom@gmail.com',
                    },
                    {
                        icon: '🔒',
                        title: 'Privacy & Legal',
                        desc: 'Data deletion requests, data queries, and legal notices.',
                        value: 'placematedotcom@gmail.com',
                        href: 'mailto:placematedotcom@gmail.com',
                    },
                    {
                        icon: '🤝',
                        title: 'Partnerships',
                        desc: 'College tie-ups, B2B integrations, and collaborations.',
                        value: 'placematedotcom@gmail.com',
                        href: 'mailto:placematedotcom@gmail.com',
                    },
                ].map(card => (
                    <div key={card.title} style={{
                        background: 'var(--surface)',
                        border: '1.5px solid var(--border)',
                        borderRadius: '16px',
                        padding: '24px',
                    }}>
                        <div style={{ fontSize: '32px', marginBottom: '10px' }}>{card.icon}</div>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>{card.title}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.6 }}>{card.desc}</p>
                        <a href={card.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: '13.5px', fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>{card.value}</a>
                    </div>
                ))}
            </div>

            <S>What to Include in Your Email</S>
            <P>To help us resolve your issue quickly, please include the following in your support email:</P>
            <ul style={{ paddingLeft: '22px', marginBottom: '20px' }}>
                {[
                    'Your registered email address (the one used to sign in to PlacementOS).',
                    'A clear description of your issue or request.',
                    'Screenshots or screen recordings of any errors you are experiencing (if applicable).',
                    'The date and time the issue occurred.',
                ].map((li, i) => (
                    <li key={i} style={{ marginBottom: '8px', color: 'var(--text-muted)', lineHeight: 1.85, paddingLeft: '6px' }}>{li}</li>
                ))}
            </ul>

            <S>Response Times</S>
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '14px' }}>
                    <thead>
                        <tr style={{ background: 'rgba(45,106,79,0.06)' }}>
                            {['Query Type', 'Expected Response'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--accent)', fontWeight: 700, borderBottom: '1.5px solid var(--border)' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['General support', '1–2 business days'],
                            ['Privacy / Legal', '3–5 business days'],
                            ['Partnerships', '5–7 business days'],
                        ].map(([type, time], i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '12px 16px', color: 'var(--text)' }}>{type}</td>
                                <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <P>We operate Monday to Saturday, 10:00 AM – 6:00 PM IST. Queries received on Sundays and public holidays will be addressed on the next business day.</P>

            <S>Business Details</S>
            <P>
                <strong>Platform:</strong> PlacementOS<br />
                <strong>Website:</strong> <a href={websiteUrl} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{websiteUrl.replace('https://', '').replace('http://', '').replace(/\/$/, '')}</a><br />
                <strong>Email:</strong> placematedotcom@gmail.com<br />
                <strong>Country:</strong> India<br />
                <strong>Developer:</strong> <a href="https://www.linkedin.com/in/ahmed-yasin-khan-4489992ba/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Ahmed Yasin Khan</a>
            </P>

        </LegalLayout>
    );
}
