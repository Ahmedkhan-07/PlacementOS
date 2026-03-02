'use client';

const SOCIAL_PLATFORMS = [
    { key: 'linkedinUrl', label: 'LinkedIn', cls: 'btn-linkedin', icon: '🔗' },
    { key: 'githubUrl', label: 'GitHub', cls: 'btn-github', icon: '🐙' },
    { key: 'leetcodeUrl', label: 'LeetCode', cls: 'btn-leetcode', icon: '🟠' },
    { key: 'hackerrankUrl', label: 'HackerRank', cls: 'btn-hackerrank', icon: '🟢' },
    { key: 'twitterUrl', label: 'Twitter/X', cls: 'btn-twitter', icon: '𝕏' },
    { key: 'codeforcesUrl', label: 'Codeforces', cls: 'btn-codeforces', icon: '🔵' },
    { key: 'websiteUrl', label: 'Website', cls: 'btn-website', icon: '🌐' },
];

export default function SocialLinks({ user }) {
    // Filter platforms where user has a non-empty URL string
    const activeSocials = SOCIAL_PLATFORMS.filter(
        p => user?.[p.key] && typeof user[p.key] === 'string' && user[p.key].trim() !== ''
    );

    return (
        <section style={{ padding: '80px 0', overflow: 'hidden', background: '#FEFCF8', position: 'relative', zIndex: 1 }}>
            <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '36px', fontWeight: 700,
                textAlign: 'center', color: '#1C1C1C',
                marginBottom: '8px', padding: '0 48px',
            }}>
                Find Me On
            </h2>
            <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '16px', color: '#6B6560',
                textAlign: 'center', marginBottom: '48px',
            }}>
                Connect with me across the web
            </p>

            {activeSocials.length >= 1 ? (
                <div style={{
                    display: 'flex',
                    gap: '16px',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    padding: '0 48px 8px',
                }}>
                    {activeSocials.map((s, i) => (
                        <a
                            key={i}
                            href={user[s.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn-social ${s.cls}`}
                            style={{ flexShrink: 0 }}
                        >
                            <span>{s.icon}</span>
                            <span>{s.label}</span>
                        </a>
                    ))}
                </div>
            ) : (
                <p style={{
                    textAlign: 'center', fontFamily: "'Inter', sans-serif",
                    color: '#6B6560', fontSize: '14px',
                }}>
                    Add your social links in Edit Profile ↑
                </p>
            )}
        </section>
    );
}
