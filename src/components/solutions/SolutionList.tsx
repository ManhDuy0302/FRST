import React from 'react';
import { SectionTitle } from '../ui';
import SolutionCard from './SolutionCard';
import { solutions } from '../../data/solutions';

/**
 * Solution list component - Vietnamese with animations
 */
const SolutionList: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-fade-in-up">
                    <SectionTitle
                        title="Giải Pháp Của Chúng Tôi"
                        subtitle="Bộ giải pháp công nghệ AI và thị giác máy tính toàn diện được thiết kế để giải quyết các thách thức an ninh và vận hành phức tạp."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {solutions.map((solution, index) => (
                        <div
                            key={solution.id}
                            className="animate-fade-in-up"
                            style={{ animationDelay: `${index * 150}ms` }}
                        >
                            <SolutionCard solution={solution} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionList;
