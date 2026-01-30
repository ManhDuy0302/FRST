import { Product } from '../types';

/**
 * Product data - Vietnamese
 */
export const products: Product[] = [
    {
        id: 'face-recognition-attendance',
        name: 'Hệ Thống Chấm Công Nhận Dạng Khuôn Mặt',
        shortDescription: 'Tối ưu hóa quản lý nhân sự với công nghệ nhận dạng khuôn mặt AI, chấm công chính xác và không tiếp xúc.',
        fullDescription: 'Hệ thống Chấm Công Nhận Dạng Khuôn Mặt của chúng tôi cách mạng hóa cách các tổ chức quản lý chấm công nhân viên. Sử dụng thuật toán học sâu tiên tiến, hệ thống cung cấp khả năng xác định nhân viên tức thì, chính xác mà không cần tiếp xúc vật lý hay nhập liệu thủ công. Giải pháp tích hợp liền mạch với các hệ thống HR hiện có và cung cấp dữ liệu chấm công thời gian thực, phân tích và khả năng báo cáo.',
        features: [
            'Phát hiện và nhận dạng khuôn mặt thời gian thực với độ chính xác 99.7%',
            'Chấm công không tiếp xúc, cải thiện vệ sinh và hiệu quả',
            'Chống giả mạo bằng ảnh và video',
            'Hỗ trợ nhiều camera và điểm vào',
            'Ghi nhận và báo cáo chấm công tự động',
            'Tích hợp với các hệ thống HR và tính lương phổ biến',
            'Ứng dụng di động để chấm công và quản lý từ xa',
            'Khả năng hoạt động offline với đồng bộ tự động'
        ],
        benefits: [
            'Loại bỏ gian lận chấm công hộ',
            'Giảm 80% chi phí quản lý hành chính',
            'Cải thiện trải nghiệm nhân viên với chấm công nhanh hơn',
            'Tự động tạo dữ liệu tính lương chính xác',
            'Đảm bảo tuân thủ quy định lao động',
            'Truy cập phân tích nhân sự thời gian thực'
        ],
        specifications: [
            { label: 'Tốc độ nhận dạng', value: '< 0.5 giây' },
            { label: 'Độ chính xác', value: '99.7%' },
            { label: 'Dung lượng CSDL', value: 'Đến 100,000 khuôn mặt' },
            { label: 'Hỗ trợ camera', value: 'Camera IP, Camera USB' },
            { label: 'Nhiệt độ hoạt động', value: '-10°C đến 50°C' },
            { label: 'Tích hợp', value: 'REST API, SDK có sẵn' }
        ],
        icon: 'attendance'
    },
    {
        id: 'smart-security-surveillance',
        name: 'Hệ Thống An Ninh & Giám Sát Thông Minh',
        shortDescription: 'Nâng cao an ninh cơ sở với giám sát video thông minh được hỗ trợ bởi nhận dạng khuôn mặt thời gian thực và phân tích AI.',
        fullDescription: 'Hệ thống An ninh & Giám sát Thông minh của chúng tôi biến đổi hạ tầng CCTV truyền thống thành mạng lưới an ninh thông minh. Hệ thống tận dụng thị giác máy tính và học sâu để phát hiện, theo dõi và xác định cá nhân trong thời gian thực, cho phép các biện pháp an ninh chủ động và phản ứng sự cố nhanh chóng. Lý tưởng cho cơ sở doanh nghiệp, tòa nhà chính phủ, sân bay và các khu vực an ninh cao.',
        features: [
            'Phát hiện khuôn mặt thời gian thực trên nhiều luồng video',
            'Đối chiếu danh sách theo dõi với cảnh báo tức thì',
            'Phát hiện người lạ và tích hợp kiểm soát truy cập',
            'Theo dõi đa camera và phân tích di chuyển',
            'Tìm kiếm lịch sử theo khuôn mặt trên tất cả bản ghi',
            'Phân tích hành vi để phát hiện hoạt động đáng ngờ',
            'Tích hợp với hạ tầng CCTV hiện có',
            'Tùy chọn triển khai đám mây và tại chỗ'
        ],
        benefits: [
            'Phát hiện và ngăn chặn mối đe dọa chủ động',
            'Giảm 90% thời gian phản ứng an ninh',
            'Nâng cao độ chính xác kiểm soát truy cập',
            'Hỗ trợ điều tra pháp y với tìm kiếm khuôn mặt',
            'Tối ưu hóa bố trí nhân viên an ninh',
            'Duy trì tuân thủ quy định an ninh'
        ],
        specifications: [
            { label: 'Xử lý video', value: 'Đến 64 luồng đồng thời' },
            { label: 'Phạm vi phát hiện', value: 'Đến 50 mét' },
            { label: 'Dung lượng danh sách', value: 'Đến 1,000,000 khuôn mặt' },
            { label: 'Độ trễ cảnh báo', value: '< 1 giây' },
            { label: 'Định dạng video', value: 'H.264, H.265, MJPEG' },
            { label: 'Tích hợp', value: 'ONVIF, REST API, RTSP' }
        ],
        icon: 'security'
    }
];

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
};
