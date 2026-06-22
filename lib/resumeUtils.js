/**
 * Utility functions for resume templates and ATS configuration processing.
 */

/**
 * Resolves standard section titles based on the user's ATS preferences.
 * 
 * @param {string} title The original title.
 * @param {boolean} atsStandardSectionNames Whether standard names are enabled.
 * @returns {string} The resolved title.
 */
export function resolveSectionTitle(title, atsStandardSectionNames) {
    if (!atsStandardSectionNames || !title) return title;
    const lower = title.toLowerCase();
    if (lower.includes('summary') || lower.includes('profile')) return 'Summary';
    if (lower.includes('experience') || lower.includes('work') || lower.includes('history') || lower.includes('internship')) return 'Experience';
    if (lower.includes('education') || lower.includes('academic')) return 'Education';
    if (lower.includes('skills') || lower.includes('expertise') || lower.includes('qualifications')) return 'Skills';
    if (lower.includes('projects')) return 'Projects';
    if (lower.includes('certifications')) return 'Certifications';
    if (lower.includes('achievements')) return 'Achievements';
    if (lower.includes('leadership') || lower.includes('extracurricular')) return 'Leadership';
    if (lower.includes('languages')) return 'Languages';
    if (lower.includes('interests') || lower.includes('hobbies')) return 'Interests';
    if (lower.includes('references')) return 'References';
    return title;
}
