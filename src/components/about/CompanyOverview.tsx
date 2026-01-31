import React from 'react';
import { CountUp } from '../ui';

/**
 * Company Overview component - Vietnamese with animations
 */
const CompanyOverview: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="animate-fade-in-left">
                        <span className="inline-block px-4 py-2 bg-navy-100 text-navy-900 text-sm font-medium rounded-full mb-6">
                            Về Chúng Tôi
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Giới Thiệu{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-600">
                                RT-FRIS
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Thành lập năm 2025, RT-FRIS là công ty công nghệ tận tâm với việc thúc đẩy
                            lĩnh vực Thị giác Máy tính và Trí tuệ Nhân tạo. Chúng tôi chuyên phát triển
                            các giải pháp nhận dạng khuôn mặt giúp các tổ chức nâng cao an ninh
                            và tối ưu hóa quản lý nhân sự.
                        </p>
                        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                            Đội ngũ của chúng tôi quy tụ chuyên môn về học sâu, thị giác máy tính
                            và phát triển phần mềm doanh nghiệp. Chúng tôi cam kết cung cấp các giải pháp
                            đáp ứng tiêu chuẩn cao nhất về độ chính xác, độ tin cậy và bảo mật.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Tại RT-FRIS, chúng tôi tin vào sức mạnh của công nghệ trong việc giải quyết
                            các vấn đề thực tế. Các sản phẩm của chúng tôi được thiết kế cho doanh nghiệp
                            và khách hàng chính phủ cần các giải pháp AI mạnh mẽ, có khả năng mở rộng và tuân thủ quy định.
                        </p>
                    </div>

                    {/* Stats with animation */}
                    <div className="animate-fade-in-right delay-200">
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-10 shadow-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-navy-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Tổng Quan Công Ty
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="group text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-navy-900 to-navy-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        <CountUp end={2025} separator="" />
                                    </div>
                                    <div className="text-sm text-gray-600">Năm Thành Lập</div>
                                </div>
                                <div className="group text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        <CountUp end={99.7} decimals={1} suffix="%" />
                                    </div>
                                    <div className="text-sm text-gray-600">Độ Chính Xác</div>
                                </div>
                                <div className="group text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        <CountUp end={1000} suffix="+" />
                                    </div>
                                    <div className="text-sm text-gray-600">Khuôn Mặt Hỗ Trợ</div>
                                </div>
                                <div className="group text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                                        24/7
                                    </div>
                                    <div className="text-sm text-gray-600">Thời Gian Hoạt Động</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;
