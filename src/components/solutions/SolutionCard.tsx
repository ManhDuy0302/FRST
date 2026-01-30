import React from 'react';
import { Card } from '../ui';
import { Solution } from '../../types';

interface SolutionCardProps {
    solution: Solution;
}

/**
 * Solution card component - Vietnamese with micro-motion
 */
const SolutionCard: React.FC<SolutionCardProps> = ({ solution }) => {
    const getSolutionIcon = () => {
        switch (solution.icon) {
            case 'face':
                return (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
            case 'video':
                return (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                );
            case 'ai':
            default:
                return (
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                );
        }
    };

    const getGradientColor = () => {
        switch (solution.icon) {
            case 'face': return 'from-blue-500 to-indigo-600';
            case 'video': return 'from-red-500 to-pink-600';
            case 'ai': return 'from-purple-500 to-violet-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <Card className="h-full flex flex-col">
            {/* Icon with micro-motion */}
            <div className={`w-14 h-14 bg-gradient-to-br ${getGradientColor()} rounded-xl flex items-center justify-center text-white mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg`}>
                {getSolutionIcon()}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-navy-900 transition-colors duration-300">
                {solution.title}
            </h3>
            <p className="text-gray-600 mb-6 flex-grow text-sm leading-relaxed">
                {solution.description}
            </p>

            {/* Features with hover effect */}
            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-navy-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                    Khả Năng Chính:
                </h4>
                <ul className="space-y-2">
                    {solution.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 group/item hover:text-gray-900 transition-colors duration-200">
                            <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Auxiliary text appearing at bottom */}
            <div className="mt-auto flex items-center text-navy-600 font-semibold text-sm opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <span>Xem chi tiết giải pháp</span>
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>

            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 bg-navy-500 rounded-full animate-pulse"></div>
            </div>
        </Card>
    );
};

export default SolutionCard;
