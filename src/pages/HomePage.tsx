import React from 'react';
import { Layout } from '../components/layout';
import { Hero, VisionMission, KeyStrengths, CallToAction } from '../components/home';

/**
 * Home page component
 */
const HomePage: React.FC = () => {
    return (
        <Layout>
            <Hero />
            <VisionMission />
            <KeyStrengths />
            <CallToAction />
        </Layout>
    );
};

export default HomePage;
