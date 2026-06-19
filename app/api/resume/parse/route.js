import { NextResponse } from 'next/server';
import groq from '@/lib/groq';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // ── Step 1: Extract raw text from the PDF buffer ─────────────────────
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let rawText = '';
        try {
            // pdf-parse (new version) is class-based. Pass `data` as Uint8Array
            // in the constructor options — they map directly to pdfjs.getDocument().
            const { PDFParse } = await import('pdf-parse');
            const parser = new PDFParse({ data: new Uint8Array(buffer), verbosity: 0 });
            await parser.load();
            const textResult = await parser.getText();
            // getText() returns a TextResult object with a .text string property
            rawText = (typeof textResult === 'string' ? textResult : textResult?.text) || '';
        } catch (pdfErr) {
            console.error('Failed to parse PDF binary:', pdfErr);
            return NextResponse.json(
                { 
                    error: `Could not read the PDF document structure. Error: ${pdfErr.message || pdfErr}`,
                    details: pdfErr.stack || String(pdfErr)
                },
                { status: 400 }
            );
        }

        if (!rawText.trim()) {
            return NextResponse.json(
                { error: 'The uploaded PDF appears to be empty or is a scanned image without selectable text.' },
                { status: 400 }
            );
        }

        // ── Step 2: Ask Groq to extract structured data ───────────────────────
        const systemPrompt = `You are a professional resume parser. Extract all details from the provided resume text and return them as a single valid JSON object matching this exact schema:

{
  "personalInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string"
  },
  "summary": "string (professional summary or objective, if present)",
  "skillsText": "string (all skills as a comma-separated list or formatted text, exactly as written)",
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startYear": "string",
      "endYear": "string",
      "grade": "string",
      "gradeType": "string (GPA, percentage, CGPA, etc.)",
      "description": "string"
    }
  ],
  "projects": [
    {
      "title": "string",
      "techStack": ["string"],
      "startDate": "string",
      "endDate": "string",
      "description": "string (bullet points joined with newlines)"
    }
  ],
  "experience": [
    {
      "role": "string",
      "company": "string",
      "startDate": "string",
      "endDate": "string",
      "current": false,
      "description": "string"
    }
  ],
  "certifications": [
    { "title": "string", "description": "string", "year": "string" }
  ],
  "achievements": [
    { "title": "string", "description": "string", "year": "string" }
  ],
  "languages": ["string"],
  "interests": ["string"]
}

Rules:
- Do NOT invent or hallucinate any information not present in the resume.
- Leave ALL URL/link fields empty string "" — the user will fill them manually.
- Rephrase bullet points to sound professional and concise.
- Use standard date formats like "June 2023" or "2023".
- Return ONLY the JSON object, no markdown fences, no extra text.`;

        let parsedData = {};
        try {
            const completion = await groq.chat.completions.create({
                model: 'llama-3.3-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Resume Text:\n\n${rawText}` },
                ],
                response_format: { type: 'json_object' },
                temperature: 0.1,
                max_tokens: 4096,
            });

            const jsonText = completion.choices[0]?.message?.content || '{}';
            parsedData = JSON.parse(jsonText);
        } catch (groqErr) {
            console.error('Groq extraction failed:', groqErr);
            return NextResponse.json(
                { error: 'AI failed to extract details from the resume. Please try again.' },
                { status: 500 }
            );
        }

        return NextResponse.json(parsedData);

    } catch (err) {
        console.error('Server error in resume parsing endpoint:', err);
        return NextResponse.json({ error: 'An unexpected server error occurred' }, { status: 500 });
    }
}
