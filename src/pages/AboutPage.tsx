import React from 'react';
import { Layout } from '../components/layout';
import { CompanyOverview, CoreCompetencies, TechnologyFocus } from '../components/about';
import { CallToAction } from '../components/home';

/**
 * About page component
 */
const AboutPage: React.FC = () => {
    return (
        <Layout>
            <CompanyOverview />
            <CoreCompetencies />
            <TechnologyFocus />
            <CallToAction />
        </Layout>
    );
};

export default AboutPage;
