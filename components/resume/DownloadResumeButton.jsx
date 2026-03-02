'use client';

import { useState } from 'react';

export default function DownloadResumeButton({ username }) {
    const [loading, setLoading] = useState(false);

    const download = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const element = document.getElementById('resume-pdf-container');
            if (!element) {
                console.error('PDF container not found');
                setLoading(false);
                return;
            }

            // Short delay so any pending React renders flush to the DOM
            await new Promise(r => setTimeout(r, 200));

            await html2pdf()
                .set({
                    margin: [0, 0, 0, 0],
                    filename: `${username || 'resume'}-resume.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        letterRendering: true,
                        // Provide a large virtual window so off-screen elements are fully captured
                        windowWidth: 1440,
                        windowHeight: 900,
                        logging: false,
                        // Inline computed styles so CSS vars resolve before capture
                        onclone: (doc) => {
                            const el = doc.getElementById('resume-pdf-container');
                            if (el) {
                                el.style.position = 'relative';
                                el.style.left = '0';
                                el.style.top = '0';
                            }
                        },
                    },
                    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                })
                .from(element)
                .save();
        } catch (err) {
            console.error('PDF error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button onClick={download} disabled={loading} className="btn-gold">
            {loading ? '⏳ Generating PDF...' : '⬇ Download Resume PDF'}
        </button>
    );
}
