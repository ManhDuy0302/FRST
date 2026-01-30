import React from 'react';
import { Layout } from '../components/layout';
import { ProductList } from '../components/products';
import { CallToAction } from '../components/home';

/**
 * Products listing page component
 */
const ProductsPage: React.FC = () => {
    return (
        <Layout>
            <ProductList />
            <CallToAction />
        </Layout>
    );
};

export default ProductsPage;
