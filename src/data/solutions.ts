import { Solution } from '../types';

/**
 * Solution/Technology data - Vietnamese
 */
export const solutions: Solution[] = [
    {
        id: 'face-recognition',
        title: 'Công Nghệ Nhận Dạng Khuôn Mặt',
        description: 'Engine nhận dạng khuôn mặt độc quyền của chúng tôi mang lại độ chính xác và hiệu suất hàng đầu ngành. Được xây dựng trên kiến trúc học sâu tiên tiến, công nghệ xử lý các điều kiện thách thức bao gồm ánh sáng thay đổi, góc độ, che khuất một phần và lão hóa. Hệ thống được tối ưu cho cả thiết bị biên và triển khai đám mây, mang lại sự linh hoạt cho mọi trường hợp sử dụng.',
        features: [
            'Phát hiện và căn chỉnh khuôn mặt dựa trên học sâu',
            'Trích xuất vector đặc trưng khuôn mặt 512 chiều',
            'Phát hiện sống và chống giả mạo',
            'Chế độ xác định 1:N và xác minh 1:1',
            'Ước lượng tuổi và giới tính',
            'Khả năng phát hiện khẩu trang',
            'Xử lý tăng tốc GPU',
            'Tùy chọn triển khai biên và đám mây'
        ],
        useCases: [
            'Xác minh danh tính cho dịch vụ tài chính',
            'Kiểm soát truy cập và an ninh vật lý',
            'Nhận dạng khách hàng trong bán lẻ',
            'Xác định bệnh nhân trong y tế',
            'Kiểm soát biên giới và xuất nhập cảnh',
            'Quản lý sự kiện và nhận dạng VIP'
        ],
        icon: 'face'
    },
    {
        id: 'video-analytics',
        title: 'Phân Tích Video',
        description: 'Biến đổi dữ liệu video thành thông tin hữu ích với nền tảng phân tích video toàn diện của chúng tôi. Các thuật toán thị giác máy tính trích xuất thông tin có ý nghĩa từ luồng video trong thời gian thực, cho phép giám sát tự động, phát hiện sự kiện và tạo nghiệp vụ thông minh. Nền tảng hỗ trợ nhiều module phân tích có thể tùy chỉnh cho nhu cầu ngành cụ thể.',
        features: [
            'Phát hiện và phân loại đối tượng',
            'Đếm người và phân tích mật độ đám đông',
            'Phát hiện phương tiện và nhận dạng biển số',
            'Phát hiện xâm nhập và giám sát chu vi',
            'Phát hiện lảng vảng và vật thể bị bỏ rơi',
            'Phân tích luồng giao thông',
            'Bản đồ nhiệt và phân tích vùng',
            'Theo dõi đa camera'
        ],
        useCases: [
            'Phân tích lưu lượng và hành vi khách hàng bán lẻ',
            'Quản lý giao thông thành phố thông minh',
            'Giám sát an toàn công nghiệp',
            'Tối ưu hóa quản lý hàng đợi',
            'An ninh chu vi cho cơ sở hạ tầng quan trọng',
            'Hệ thống quản lý bãi đỗ xe'
        ],
        icon: 'video'
    },
    {
        id: 'ai-security-monitoring',
        title: 'Giám Sát An Ninh Dựa Trên AI',
        description: 'Nâng cao hoạt động an ninh với trí tuệ nhân tạo tư duy chủ động. Giải pháp giám sát an ninh AI của chúng tôi kết hợp nhiều khả năng AI để cung cấp phát hiện mối đe dọa toàn diện và nhận thức tình huống. Hệ thống học các mẫu bình thường và tự động xác định bất thường, cho phép quản lý an ninh chủ động và giảm cảnh báo sai.',
        features: [
            'Phát hiện bất thường sử dụng học máy',
            'Hợp nhất dữ liệu đa cảm biến',
            'Đánh giá mối đe dọa dự đoán',
            'Ưu tiên cảnh báo tự động',
            'Tích hợp với hệ thống an ninh hiện có',
            'Báo cáo sự cố bằng ngôn ngữ tự nhiên',
            'Dashboard và trực quan hóa thời gian thực',
            'Phân tích mẫu lịch sử'
        ],
        useCases: [
            'Trung tâm điều hành an ninh doanh nghiệp',
            'Bảo vệ cơ sở chính phủ',
            'Giám sát cơ sở hạ tầng quan trọng',
            'An ninh trung tâm dữ liệu',
            'An ninh khuôn viên và bệnh viện',
            'An toàn trung tâm giao thông'
        ],
        icon: 'ai'
    }
];

/**
 * Get solution by ID
 */
export const getSolutionById = (id: string): Solution | undefined => {
    return solutions.find(solution => solution.id === id);
};
