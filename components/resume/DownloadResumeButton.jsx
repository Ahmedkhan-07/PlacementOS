'use client';

import { useState } from 'react';

export default function DownloadResumeButton({ username }) {
    const [loading, setLoading] = useState(false);

    const download = () => {
        if (loading) return;
        setLoading(true);
        try {
            const element = document.getElementById('resume-pdf-container');
            if (!element) {
                console.error('PDF container not found');
                setLoading(false);
                return;
            }

            // Open a print window with the resume HTML + fonts
            const printWindow = window.open('', '_blank', 'width=900,height=1200');
            if (!printWindow) {
                alert('Please allow popups to download PDF');
                setLoading(false);
                return;
            }

            printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${username || 'resume'}-resume</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: white; }
    @media print {
      @page { size: A4 portrait; margin: 0; }
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>${element.innerHTML}</body>
</html>`);
            printWindow.document.close();

            // Wait for fonts then trigger print
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
                setTimeout(() => {
                    printWindow.close();
                    setLoading(false);
                }, 1000);
            }, 1500);
        } catch (err) {
            console.error('PDF error:', err);
            setLoading(false);
        }
    };

    return (
        <button onClick={download} disabled={loading} className="btn-gold">
            {loading ? '⏳ Generating PDF...' : '⬇ Download Resume PDF'}
        </button>
    );
}
