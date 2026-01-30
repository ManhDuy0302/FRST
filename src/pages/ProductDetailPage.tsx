import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Layout } from '../components/layout';
import { ProductDetail } from '../components/products';
import { getProductById } from '../data/products';

/**
 * Product detail page component
 */
const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();

    const product = productId ? getProductById(productId) : undefined;

    if (!product) {
        return <Navigate to="/products" replace />;
    }

    return (
        <Layout>
            <ProductDetail product={product} />
        </Layout>
    );
};

export default ProductDetailPage;
