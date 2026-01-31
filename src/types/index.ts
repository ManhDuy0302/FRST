/**
 * Product type definition
 */
export interface Product {
    id: string;
    name: string;
    shortDescription: string;
    fullDescription: string;
    features: string[];
    benefits: string[];
    specifications: {
        label: string;
        value: string;
    }[];
    icon: 'attendance' | 'security';
    image?: string;
}

/**
 * Solution type definition
 */
export interface Solution {
    id: string;
    title: string;
    description: string;
    features: string[];
    useCases: string[];
    icon: 'face' | 'video' | 'ai';
}

/**
 * Navigation item type
 */
export interface NavItem {
    label: string;
    path: string;
}

/**
 * Company strength type
 */
export interface Strength {
    title: string;
    description: string;
    icon: 'tech' | 'realtime' | 'integration' | 'security';
}

/**
 * Contact form data type
 */
export interface ContactFormData {
    name: string;
    email: string;
    company: string;
    phone: string;
    message: string;
}
