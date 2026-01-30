import React from 'react';

/**
 * Button Variants Definition
 * primary: Main action (Navy background, White text)
 * secondary: Alternative action (White background, Navy text, Border)
 * outline: Low emphasis (Transparent background, Gray border/text)
 * ghost: Subtle/Text only (Transparent background, Navy text)
 * danger: Destructive action (Red background, White text)
 * ctaOutline: High contrast for dark backgrounds (Transparent bg, White border/text, White hover)
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'ctaOutline';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Reusable Button component acting as the single source of truth for button styles.
 */
const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) => {
    // Base styles: Structure, Focus ring, Transition
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Animation styles: Hover lift, Active scale
    const animationStyles = !disabled ? 'hover:-translate-y-0.5 active:scale-95' : '';

    // Variant styles: Strictly controls colors (bg, text, border, hover, ring)
    const variantStyles: Record<ButtonVariant, string> = {
        primary: 'bg-navy-900 text-white hover:bg-navy-800 focus:ring-navy-500 border-transparent',
        secondary: 'bg-white text-navy-900 border-2 border-navy-900 hover:bg-gray-50 focus:ring-navy-500',
        outline: 'bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-navy-500',
        ghost: 'bg-transparent text-navy-900 hover:bg-navy-50 focus:ring-navy-500 border-transparent',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 border-transparent',
        ctaOutline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-navy-900 focus:ring-white/50'
    };

    // Size styles: Padding and Font size
    const sizeStyles = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <button
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${animationStyles} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
