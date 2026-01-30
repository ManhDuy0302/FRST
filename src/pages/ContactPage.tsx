import React from 'react';
import { Layout } from '../components/layout';
import { ContactForm, CompanyInfo } from '../components/contact';

/**
 * Contact page component - Vietnamese
 */
const ContactPage: React.FC = () => {
    return (
        <Layout>
            {/* Page header */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-20 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-navy-100/50 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-2 bg-navy-100 text-navy-900 text-sm font-medium rounded-full mb-6 animate-fade-in-up">
                        Liên Hệ
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in-up delay-100">
                        Liên Hệ{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-600">
                            Với Chúng Tôi
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200">
                        Liên hệ với đội ngũ của chúng tôi để thảo luận về cách RT-FRIS
                        có thể giúp chuyển đổi an ninh và quản lý nhân sự của bạn.
                    </p>
                </div>
            </section>

            {/* Contact content */}
            <section className="py-16 md:py-20 lg:py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Contact form */}
                        <div className="lg:col-span-2 animate-fade-in-left">
                            <ContactForm />
                        </div>

                        {/* Company info */}
                        <div className="lg:col-span-1 animate-fade-in-right delay-200">
                            <CompanyInfo />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ContactPage;
