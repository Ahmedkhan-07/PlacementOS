import { auth } from '@clerk/nextjs';
import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
    const { userId } = auth();
    if (!userId) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    if (!user?.isPremium) {
        return Response.json({ error: 'Premium required' }, { status: 403 });
    }

    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 900 });
        await page.goto(
            `${process.env.NEXT_PUBLIC_APP_URL}/u/${user.username}`,
            { waitUntil: 'networkidle0', timeout: 30000 }
        );

        await new Promise(r => setTimeout(r, 3000));

        await page.addStyleTag({
            content: `*, *::before, *::after {
        animation-play-state: paused !important;
        animation: none !important;
        transition: none !important;
      }`,
        });

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
        });

        await browser.close();

        return new Response(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${user.username}-portfolio.pdf"`,
            },
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return Response.json({ error: 'PDF generation failed' }, { status: 500 });
    }
}
