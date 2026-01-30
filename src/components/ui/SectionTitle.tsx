import React from 'react';

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    centered?: boolean;
    className?: string;
}

/**
 * Reusable section title component for page sections
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
    title,
    subtitle,
    centered = true,
    className = ''
}) => {
    const alignmentStyles = centered ? 'text-center' : 'text-left';

    return (
        <div className={`mb-12 ${alignmentStyles} ${className}`}>
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionTitle;
