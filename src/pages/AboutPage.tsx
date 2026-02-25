import React from 'react';
import { Layout } from '../components/layout';
import { CompanyOverview, CompanyStory, CoreCompetencies, TechnologyFocus } from '../components/about';
import { AIBackground } from '../components/about/CompanyOverview';
import { CallToAction } from '../components/home';

/**
 * About page component
 */
const AboutPage: React.FC = () => {
    return (
        <Layout>
            {/* Shared dark background wrapper for Overview + Story */}
            <div className="relative overflow-hidden">
                {/* Single AI canvas background spanning both sections */}
                <AIBackground />

                {/* Gradient orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
                        style={{ background: 'rgba(88,166,255,0.12)' }}
                    />
                    <div
                        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl"
                        style={{ background: 'rgba(52,211,153,0.08)' }}
                    />
                    <div
                        className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl"
                        style={{ background: 'rgba(167,139,250,0.06)' }}
                    />
                </div>

                {/* Top & bottom vignette only */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(14,30,74,0.6) 0%, transparent 8%, transparent 92%, rgba(14,30,74,0.6) 100%)',
                    }}
                />

                <CompanyOverview />

                {/* Glowing divider line */}
                <div className="relative z-10 max-w-5xl mx-auto px-8">
                    <div
                        className="h-px"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(88,166,255,0.5) 20%, rgba(167,139,250,0.5) 50%, rgba(52,211,153,0.4) 80%, transparent)',
                        }}
                    />
                    <div
                        className="h-px mt-px"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(88,166,255,0.2) 30%, rgba(167,139,250,0.15) 70%, transparent)',
                            filter: 'blur(3px)',
                        }}
                    />
                </div>

                <CompanyStory />
            </div>

            <CoreCompetencies />
            <TechnologyFocus />
            <CallToAction />
        </Layout>
    );
};

export default AboutPage;
