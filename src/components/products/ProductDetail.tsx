import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from '../ui';
import { Product } from '../../types';

interface ProductDetailProps {
    product: Product;
}

/**
 * Product detail component - Vietnamese with animations
 */
const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const getProductIcon = () => {
        if (product.icon === 'attendance') {
            return (
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            );
        }
        return (
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        );
    };

    const gradientColor = product.icon === 'attendance'
        ? 'from-blue-500 to-indigo-600'
        : 'from-green-500 to-emerald-600';

    return (
        <div className="py-16 md:py-20 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-8 animate-fade-in-up">
                    <ol className="flex items-center space-x-2 text-sm">
                        <li>
                            <Link to="/" className="text-gray-500 hover:text-navy-900 transition-colors duration-300">Trang chủ</Link>
                        </li>
                        <li className="text-gray-400">/</li>
                        <li>
                            <Link to="/products" className="text-gray-500 hover:text-navy-900 transition-colors duration-300">Sản phẩm</Link>
                        </li>
                        <li className="text-gray-400">/</li>
                        <li className="text-gray-900 font-medium">{product.name}</li>
                    </ol>
                </nav>

                {/* Product header */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
                    <div className="lg:col-span-2 animate-fade-in-left">
                        <div className="flex items-start mb-6">
                            <div className={`w-20 h-20 bg-gradient-to-br ${gradientColor} rounded-2xl flex items-center justify-center text-white mr-6 flex-shrink-0 shadow-lg animate-float`}>
                                {getProductIcon()}
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-gray-600">
                                    {product.shortDescription}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {product.fullDescription}
                        </p>
                    </div>

                    {/* Quick CTA */}
                    <div className="lg:col-span-1 animate-fade-in-right delay-200">
                        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-xl">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">
                                Quan tâm đến giải pháp này?
                            </h3>
                            <p className="text-gray-600 text-sm mb-6">
                                Liên hệ đội ngũ của chúng tôi để tìm hiểu cách giải pháp này có thể được tùy chỉnh cho tổ chức của bạn.
                            </p>
                            <Link to="/contact">
                                <Button variant="primary" className="w-full mb-3 shadow-md hover:shadow-lg">
                                    Yêu Cầu Demo
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button variant="secondary" className="w-full text-navy-900 border-navy-900 hover:bg-navy-50">
                                    Liên Hệ Tư Vấn
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>

                {/* Features and Benefits */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Features */}
                    <div className="animate-fade-in-up">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            Tính Năng
                        </h2>
                        <ul className="space-y-4">
                            {product.features.map((feature, index) => (
                                <li key={index} className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-300">
                                    <svg className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Benefits */}
                    <div className="animate-fade-in-up delay-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            Lợi Ích
                        </h2>
                        <ul className="space-y-4">
                            {product.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-300">
                                    <svg className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="mb-16 animate-fade-in-up">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                        </div>
                        Thông Số Kỹ Thuật
                    </h2>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg">
                        <table className="w-full">
                            <tbody>
                                {product.specifications.map((spec, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-navy-50 transition-colors duration-300`}>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900 w-1/3">
                                            {spec.label}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {spec.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden animate-fade-in-up">
                    {/* Background decoration */}
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="relative">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            Sẵn Sàng Bắt Đầu?
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            Đặt lịch tư vấn với đội ngũ của chúng tôi để thảo luận về cách {product.name} có thể mang lại lợi ích cho tổ chức của bạn.
                        </p>
                        <Link to="/contact">
                            <Button
                                variant="white"
                                size="lg"
                                className="shadow-xl hover:shadow-2xl"
                            >
                                Đặt Lịch Tư Vấn
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
