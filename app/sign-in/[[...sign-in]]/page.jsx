import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FAF7F2',
            padding: '40px 20px',
        }}>
            <SignIn />
        </div>
    );
}
