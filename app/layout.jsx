import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { ThemeProvider } from '@/lib/ThemeContext';
import './globals.css';

export const metadata = {
    title: 'PlacementOS — Your Career. One Link.',
    description: 'Build your resume, showcase projects, store certificates — all in one elegant portfolio.',
    keywords: ['portfolio', 'resume builder', 'career', 'placement', 'projects'],
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body style={{ position: 'relative', zIndex: 1 }}>
                    <ThemeProvider>
                        <Script
                            src="https://checkout.razorpay.com/v1/checkout.js"
                            strategy="lazyOnload"
                        />
                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 3000,
                                success: {
                                    style: { background: '#2D6A4F', color: '#fff' },
                                },
                                error: {
                                    style: { background: '#C0392B', color: '#fff' },
                                },
                            }}
                        />
                        {children}
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
