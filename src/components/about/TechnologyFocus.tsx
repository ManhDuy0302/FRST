import React from 'react';
import { SectionTitle } from '../ui';

/**
 * Technology Focus component - Vietnamese with animations
 */
const TechnologyFocus: React.FC = () => {
    return (
        <section className="py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="animate-fade-in-up">
                    <SectionTitle
                        title="Trọng Tâm Công Nghệ"
                        subtitle="Chúng tôi đầu tư mạnh vào nghiên cứu và phát triển để luôn đi đầu trong công nghệ AI và thị giác máy tính."
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Research Areas */}
                    <div className="animate-fade-in-left">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            Lĩnh Vực Nghiên Cứu
                        </h3>
                        <ul className="space-y-4">
                            {[
                                { title: 'Phát Hiện Sống', desc: 'Kỹ thuật chống giả mạo tiên tiến để ngăn chặn tấn công bằng ảnh, video hoặc mặt nạ 3D.' },
                                { title: 'Nhận Dạng Qua Tuổi', desc: 'Thuật toán duy trì độ chính xác ngay cả khi đối tượng thay đổi theo thời gian.' },
                                { title: 'Hiệu Suất Ánh Sáng Yếu', desc: 'Khả năng nhận dạng nâng cao trong điều kiện ánh sáng khó khăn.' },
                                { title: 'Tối Ưu Mô Hình', desc: 'Mạng nơ-ron hiệu quả cho xử lý thời gian thực trên thiết bị biên.' }
                            ].map((item, index) => (
                                <li key={index} className="flex items-start group hover:bg-gray-50 p-3 rounded-lg transition-all duration-300">
                                    <svg className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-navy-900 transition-colors duration-300">{item.title}</h4>
                                        <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Technology Stack */}
                    <div className="animate-fade-in-right delay-200">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
                                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            Nền Tảng Công Nghệ
                        </h3>
                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-lg">
                            <div className="space-y-6">
                                {[
                                    { title: 'AI & Machine Learning', tech: 'PyTorch, TensorFlow, ONNX Runtime, TensorRT cho tăng tốc GPU', color: 'bg-blue-500' },
                                    { title: 'Thị Giác Máy Tính', tech: 'OpenCV, CUDA kernels tùy chỉnh, pipeline xử lý khuôn mặt độc quyền', color: 'bg-green-500' },
                                    { title: 'Hạ Tầng Backend', tech: 'Kiến trúc microservices, triển khai container, hạ tầng đám mây mở rộng', color: 'bg-purple-500' },
                                    { title: 'Điện Toán Biên', tech: 'NVIDIA Jetson, Intel OpenVINO, triển khai ARM tối ưu', color: 'bg-orange-500' }
                                ].map((item, index) => (
                                    <div key={index} className="group flex items-start hover:bg-white p-3 rounded-lg transition-all duration-300">
                                        <div className={`w-2 h-2 ${item.color} rounded-full mt-2 mr-4 group-hover:scale-150 transition-transform duration-300`}></div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{item.title}</h4>
                                            <p className="text-gray-600 text-sm mt-1">{item.tech}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnologyFocus;
