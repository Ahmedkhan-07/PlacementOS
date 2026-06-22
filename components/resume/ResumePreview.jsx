'use client';

import Template1 from '@/components/resume/templates/Template1';
import Template2 from '@/components/resume/templates/Template2';
import Template3 from '@/components/resume/templates/Template3';
import Template4 from '@/components/resume/templates/Template4';
import Template5 from '@/components/resume/templates/Template5';
import Template6 from '@/components/resume/templates/Template6';
import Template7 from '@/components/resume/templates/Template7';
import Template8 from '@/components/resume/templates/Template8';
import Template9 from '@/components/resume/templates/Template9';
import Template10 from '@/components/resume/templates/Template10';
import Template11 from '@/components/resume/templates/Template11';

const templates = { 
    1: Template1, 
    2: Template2, 
    3: Template3, 
    4: Template4, 
    5: Template5, 
    6: Template6,
    7: Template7,
    8: Template8,
    9: Template9,
    10: Template10,
    11: Template11
};

export default function ResumePreview({ data, templateId = 1, accentColor = '#2D6A4F', compact = false }) {
    const Template = templates[templateId] || Template1;

    // Helper to extract clean text from URLs (e.g. linkedin.com/in/username)
    const cleanLinkText = (url) => {
        if (!url) return '';
        return url.trim().replace(/^(https?:\/\/)?(www\.)?/i, '').replace(/\/$/, '');
    };

    // Helper to ensure URLs have valid absolute protocol prefixes so they are clickable
    const ensureHttps = (url) => {
        if (!url) return '';
        const trimmed = url.trim();
        if (/^(https?:\/\/|mailto:|tel:|sms:|\/|#)/i.test(trimmed)) {
            return trimmed;
        }
        return `https://${trimmed}`;
    };

    const handleContainerClick = (e) => {
        // Stop propagation if clicking a hyperlink so it does not open editor modals
        if (e.target.closest('a')) {
            e.stopPropagation();
        }
    };

    // Pre-process personal info links and labels
    const pi = data?.personalInfo || {};
    const cleanPersonalInfo = {
        ...pi,
        name: pi.name_hidden ? '\u200B' : pi.name,
        email: pi.email_hidden ? '' : pi.email,
        phone: pi.phone_hidden ? '' : pi.phone,
        location: pi.location_hidden ? '' : pi.location,
        linkedinUrl: pi.linkedinUrl_hidden ? '' : ensureHttps(pi.linkedinUrl),
        githubUrl: pi.githubUrl_hidden ? '' : ensureHttps(pi.githubUrl),
        leetcodeUrl: pi.leetcodeUrl_hidden ? '' : ensureHttps(pi.leetcodeUrl),
        portfolioUrl: pi.portfolioUrl_hidden ? '' : ensureHttps(pi.portfolioUrl),
        
        linkedinLabel: data?.atsProfileLinksFormat 
            ? `LinkedIn: ${cleanLinkText(pi.linkedinUrl)}` 
            : 'LinkedIn',
        githubLabel: data?.atsProfileLinksFormat 
            ? `GitHub: ${cleanLinkText(pi.githubUrl)}` 
            : 'GitHub',
        leetcodeLabel: data?.atsProfileLinksFormat 
            ? `LeetCode: ${cleanLinkText(pi.leetcodeUrl)}` 
            : 'LeetCode',
        portfolioLabel: data?.atsProfileLinksFormat 
            ? `Portfolio: ${cleanLinkText(pi.portfolioUrl)}` 
            : 'Portfolio',
    };

    // Pre-process project links and labels
    const cleanProjects = (data?.projects || []).map(p => ({
        ...p,
        githubUrl: ensureHttps(p.githubUrl),
        demoUrl: ensureHttps(p.demoUrl),
        
        githubLabel: data?.atsProjectLinksFormat 
            ? `GitHub: ${cleanLinkText(p.githubUrl)}` 
            : 'GitHub',
        demoLabel: data?.atsProjectLinksFormat 
            ? `Demo: ${cleanLinkText(p.demoUrl)}` 
            : 'Live',
    }));

    const cleanCertifications = (data?.certifications || []).map(c => ({
        ...c,
        url: ensureHttps(c.url),
    }));

    const cleanAchievements = (data?.achievements || []).map(a => ({
        ...a,
        url: ensureHttps(a.url),
    }));

    const filteredData = {
        ...(data || {}),
        personalInfo: cleanPersonalInfo,
        education: data?.education?.filter(edu => !edu.hidden) || [],
        projects: cleanProjects.filter(proj => !proj.hidden),
        certifications: cleanCertifications.filter(cert => !cert.hidden),
        achievements: cleanAchievements,
    };

    // Construct dynamically injected CSS styles based on ATS optimization selections
    const stylesToInject = [];

    // 1. Hide decorative symbols/icons
    if (data?.atsSymbols === false) {
        stylesToInject.push('.resume-container svg { display: none !important; }');
    }

    // 2. Uniform Consistent Formatting
    if (data?.atsConsistentFormatting) {
        stylesToInject.push(`
            .resume-container, .resume-container * {
                color: #1C1C1C !important;
                border-color: #CBD5E0 !important;
                background-color: transparent !important;
            }
            .resume-container {
                background-color: #FFFFFF !important;
            }
            .resume-container p, .resume-container li, .resume-container span, .resume-container div {
                line-height: 1.5 !important;
                color: #2D3748 !important;
            }
            .resume-container strong, .resume-container h1, .resume-container h2, .resume-container h3 {
                color: #1C1C1C !important;
            }
        `);
    }

    // 3. Single Column Layout (override two-column splits)
    if (data?.atsSingleColumn) {
        stylesToInject.push(`
            /* Stack main sidebar structures */
            .resume-container > div[style*="display: flex"],
            .resume-container > div[style*="display:flex"] {
                flex-direction: column !important;
            }
            .resume-container > div[style*="display: flex"] > div,
            .resume-container > div[style*="display:flex"] > div {
                width: 100% !important;
                max-width: 100% !important;
                border-right: none !important;
                border-left: none !important;
                padding-left: 20px !important;
                padding-right: 20px !important;
            }

            /* Stack split grids (e.g. Template 8 body) */
            .resume-container div[style*="display: flex"][style*="padding: 32px 40px"],
            .resume-container div[style*="display:flex"][style*="padding: 32px 40px"],
            .resume-container div[style*="display: flex"][style*="padding:32px 40px"],
            .resume-container div[style*="display:flex"][style*="padding:32px 40px"] {
                flex-direction: column !important;
                gap: 15px !important;
            }
            .resume-container div[style*="display: flex"][style*="padding: 32px 40px"] > div,
            .resume-container div[style*="display:flex"][style*="padding: 32px 40px"] > div {
                width: 100% !important;
                max-width: 100% !important;
            }
        `);
    }

    // 4. Standardized font selection
    if (data?.atsFontSelection) {
        stylesToInject.push(`
            .resume-container, .resume-container * {
                font-family: "${data.atsFontSelection}", Arial, sans-serif !important;
            }
        `);
    }

    return (
        <div 
            onClick={handleContainerClick}
            className="resume-container"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: compact ? '10px' : '13px', width: '100%', height: '100%' }}
        >
            {stylesToInject.length > 0 && <style dangerouslySetInnerHTML={{ __html: stylesToInject.join('\n') }} />}
            <Template data={filteredData} accentColor={accentColor} />
        </div>
    );
}
