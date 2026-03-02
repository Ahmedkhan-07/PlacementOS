'use client';

import Template1 from '@/components/resume/templates/Template1';
import Template2 from '@/components/resume/templates/Template2';
import Template3 from '@/components/resume/templates/Template3';
import Template4 from '@/components/resume/templates/Template4';
import Template5 from '@/components/resume/templates/Template5';

const templates = { 1: Template1, 2: Template2, 3: Template3, 4: Template4, 5: Template5 };

export default function ResumePreview({ data, templateId = 1, accentColor = '#2D6A4F', compact = false }) {
    const Template = templates[templateId] || Template1;

    return (
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: compact ? '10px' : '13px' }}>
            <Template data={data || {}} accentColor={accentColor} />
        </div>
    );
}
