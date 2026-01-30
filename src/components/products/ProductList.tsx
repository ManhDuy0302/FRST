import React from 'react';
import { SectionTitle } from '../ui';
import ProductCard from './ProductCard';
import { products } from '../../data/products';

/**
 * Product list component - Vietnamese with animations
 */
const ProductList: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-fade-in-up">
                    <SectionTitle
                        title="Sản Phẩm Của Chúng Tôi"
                        subtitle="Khám phá các giải pháp nhận dạng khuôn mặt cấp doanh nghiệp được thiết kế cho an ninh và quản lý nhân sự."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductList;
