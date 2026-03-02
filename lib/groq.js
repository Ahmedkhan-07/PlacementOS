import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export default groq;

export const PROMPTS = {
    professional_summary: (text) =>
        `Rewrite the following as a compelling 3-4 sentence professional resume summary. Use strong action verbs. Sound confident and achievement-focused. Return ONLY the rewritten text, no quotes or extra commentary.\n\nOriginal: ${text}`,
    project_description: (text) =>
        `Rewrite this project description for a resume. Highlight technical complexity. Keep it 2-3 sentences max. Return ONLY the rewritten text.\n\nOriginal: ${text}`,
    experience: (text) =>
        `Rewrite the following work experience using strong action verbs. Make it achievement-focused. Quantify impact where logical. Return ONLY the rewritten text.\n\nOriginal: ${text}`,
    skills: (text) =>
        `Given these skills: ${text}. Suggest 8 additional highly relevant skills that complement these. Return ONLY a comma-separated list of skills, nothing else.`,
    achievement: (text) =>
        `Rewrite the following achievement to sound impressive on a resume. Be specific and concise. Return ONLY the rewritten text.\n\nOriginal: ${text}`,
};
