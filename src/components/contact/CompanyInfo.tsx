import React from 'react';
import { Card } from '../ui';

/**
 * Company info component - Vietnamese with animations
 */
const CompanyInfo: React.FC = () => {
    return (
        <div className="space-y-6">
            <Card className="shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    Thông Tin Liên Hệ
                </h3>
                <ul className="space-y-5">
                    <li className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 -mx-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Địa Chỉ Văn Phòng</h4>
                            <p className="text-gray-600 text-sm">
                                Trung Tâm Đổi Mới Sáng Tạo, Tầng 12<br />
                                Quận Cầu Giấy, Hà Nội, Việt Nam
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 -mx-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                            <p className="text-gray-600 text-sm">
                                Liên hệ chung: contact@rt-fris.com<br />
                                Kinh doanh: sales@rt-fris.com<br />
                                Hỗ trợ: support@rt-fris.com
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 -mx-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Điện Thoại</h4>
                            <p className="text-gray-600 text-sm">
                                +84 (24) 1234 5678<br />
                                +84 (24) 1234 5679
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 -mx-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Giờ Làm Việc</h4>
                            <p className="text-gray-600 text-sm">
                                Thứ Hai - Thứ Sáu: 8:30 - 17:30<br />
                                Thứ Bảy - Chủ Nhật: Nghỉ
                            </p>
                        </div>
                    </li>
                </ul>
            </Card>

            <Card className="bg-gradient-to-br from-navy-900 to-navy-800 border-0 shadow-xl overflow-hidden relative">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                <div className="relative">
                    <h4 className="text-lg font-bold text-white mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Giải Pháp Doanh Nghiệp
                    </h4>
                    <p className="text-gray-300 text-sm mb-4">
                        Cho các triển khai quy mô lớn và giải pháp doanh nghiệp tùy chỉnh,
                        liên hệ đội ngũ doanh nghiệp của chúng tôi để được hỗ trợ cá nhân hóa.
                    </p>
                    <a
                        href="mailto:enterprise@rt-fris.com"
                        className="inline-flex items-center text-white font-semibold hover:text-cyan-300 transition-colors duration-300 text-sm group"
                    >
                        enterprise@rt-fris.com
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </Card>
        </div>
    );
};

export default CompanyInfo;
