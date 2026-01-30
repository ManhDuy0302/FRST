import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

/**
 * Reusable Card component for content containers
 * Updated with enhanced hover effects (lift, shadow, group for children)
 */
const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hover = true
}) => {
    const baseStyles = 'bg-white rounded-lg border border-gray-200 p-6 relative overflow-hidden group';

    // Enhanced hover styles: Translate Y up, deeper shadow, border change
    const hoverStyles = hover
        ? 'transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-navy-300'
        : '';

    return (
        <div className={`${baseStyles} ${hoverStyles} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
