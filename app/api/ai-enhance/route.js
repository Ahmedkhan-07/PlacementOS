import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import groq, { PROMPTS } from '@/lib/groq';

export async function POST(req) {
    try {
        const { userId } = auth();
        if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { text, context } = await req.json();
        if (!text || !context) {
            return NextResponse.json({ error: 'text and context are required' }, { status: 400 });
        }

        const promptFn = PROMPTS[context];
        if (!promptFn) {
            return NextResponse.json({ error: 'Invalid context' }, { status: 400 });
        }

        const completion = await groq.chat.completions.create({
            model: 'llama-3.1-8b-instant',
            messages: [
                {
                    role: 'user',
                    content: promptFn(text),
                },
            ],
            temperature: 0.7,
            max_tokens: 500,
        });

        const enhanced = completion.choices[0]?.message?.content?.trim() || text;

        return NextResponse.json({ enhanced });
    } catch (error) {
        console.error('Groq error:', error);
        return NextResponse.json({ error: 'AI enhancement failed' }, { status: 500 });
    }
}
