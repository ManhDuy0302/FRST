import React from 'react';
import { Layout } from '../components/layout';
import { SolutionList } from '../components/solutions';
import { CallToAction } from '../components/home';

/**
 * Solutions page component - Vietnamese
 */
const SolutionsPage: React.FC = () => {
    return (
        <Layout>
            {/* Page header */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-navy-100/50 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-2 bg-navy-100 text-navy-900 text-sm font-medium rounded-full mb-6 animate-fade-in-up">
                        Công Nghệ & Giải Pháp
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up delay-100">
                        Giải Pháp{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-600">
                            Công Nghệ
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
                        Khám phá bộ giải pháp AI và thị giác máy tính toàn diện của chúng tôi,
                        được thiết kế để giải quyết các thách thức an ninh và vận hành phức tạp.
                    </p>
                </div>
            </section>

            <SolutionList />
            <CallToAction />
        </Layout>
    );
};

export default SolutionsPage;
