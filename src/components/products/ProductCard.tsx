import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from '../ui';
import { Product } from '../../types';

interface ProductCardProps {
    product: Product;
}

/**
 * Product card component - Vietnamese with micro-motion animations
 */
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const getProductIcon = () => {
        if (product.icon === 'attendance') {
            return (
                <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            );
        }
        return (
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        );
    };

    const gradientColor = product.icon === 'attendance'
        ? 'from-blue-500 to-indigo-600'
        : 'from-green-500 to-emerald-600';

    return (
        <Card className="h-full flex flex-col h-full">
            {/* Icon with micro-motion */}
            <div className={`w-16 h-16 bg-gradient-to-br ${gradientColor} rounded-xl flex items-center justify-center text-white mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:shadow-blue-200`}>
                {getProductIcon()}
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-navy-900 transition-colors duration-300">
                {product.name}
            </h3>

            <p className="text-gray-600 mb-6 flex-grow">
                {product.shortDescription}
            </p>

            {product.image && (
                <div className="mb-6 overflow-hidden rounded-xl bg-gray-100 aspect-video">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}

            <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-navy-900" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Tính Năng Chính:
                </h4>
                <ul className="space-y-2">
                    {product.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 group/item hover:text-gray-900 transition-colors duration-200">
                            <svg className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Auxiliary Text / CTA with animation */}
            <Link to={`/products/${product.id}`} className="mt-auto">
                <Button variant="primary" className="w-full shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:bg-navy-800">
                    Tìm Hiểu Thêm
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Button>
            </Link>

            {/* Hidden decorative text that appears on hover */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-xs font-bold text-navy-400 bg-navy-50 px-2 py-1 rounded">
                Xem Ngay
            </div>
        </Card>
    );
};

export default ProductCard;
