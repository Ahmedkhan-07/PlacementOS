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

    const filteredData = {
        ...(data || {}),
        education: data?.education?.filter(edu => !edu.hidden) || [],
        projects: data?.projects?.filter(proj => !proj.hidden) || [],
        certifications: data?.certifications?.filter(cert => !cert.hidden) || [],
    };

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: compact ? '10px' : '13px' }}>
            <Template data={filteredData} accentColor={accentColor} />
        </div>
    );
}
