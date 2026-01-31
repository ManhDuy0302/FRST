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
        icon: 'attendance',
        image: '/media/images/image_frs.png'
    },
    {
        id: 'restricted-area-detection',
        name: 'Hệ Thống Phát Hiện Người Trong Vùng Cấm',
        shortDescription: 'Bảo vệ khu vực nhạy cảm với phát hiện xâm nhập tự động và cảnh báo thời gian thực được hỗ trợ bởi AI.',
        fullDescription: 'Hệ thống Phát Hiện Người Trong Vùng Cấm của chúng tôi cung cấp giải pháp an ninh tiên tiến để giám sát và bảo vệ các khu vực hạn chế. Sử dụng công nghệ thị giác máy tính và học sâu, hệ thống tự động phát hiện sự hiện diện của con người trong các vùng được định nghĩa là cấm và kích hoạt cảnh báo tức thì. Lý tưởng cho nhà máy, khu công nghiệp, công trường xây dựng, và các khu vực nguy hiểm cần kiểm soát truy cập nghiêm ngặt.',
        features: [
            'Phát hiện người trong thời gian thực với độ chính xác cao',
            'Định nghĩa vùng cấm linh hoạt trên video',
            'Cảnh báo tức thì qua nhiều kênh (âm thanh, email, SMS, app)',
            'Ghi lại video tự động khi phát hiện xâm nhập',
            'Hoạt động 24/7 trong mọi điều kiện ánh sáng',
            'Phân biệt người và vật thể để giảm cảnh báo sai',
            'Tích hợp với hệ thống CCTV và kiểm soát truy cập hiện có',
            'Dashboard giám sát tập trung cho nhiều vị trí'
        ],
        benefits: [
            'Ngăn ngừa tai nạn lao động và xâm nhập trái phép',
            'Giảm 95% thời gian phản ứng với sự cố',
            'Tuân thủ quy định an toàn lao động',
            'Giảm chi phí nhân lực giám sát an ninh',
            'Bảo vệ tài sản và thiết bị quan trọng',
            'Lưu trữ bằng chứng pháp lý cho điều tra'
        ],
        specifications: [
            { label: 'Xử lý video', value: 'Đến 32 luồng đồng thời' },
            { label: 'Độ chính xác phát hiện', value: '98.5%' },
            { label: 'Thời gian phản ứng', value: '< 0.3 giây' },
            { label: 'Hỗ trợ camera', value: 'Camera IP, Camera analog (qua DVR/NVR)' },
            { label: 'Điều kiện hoạt động', value: 'Ban ngày, ban đêm, điều kiện thời tiết khắc nghiệt' },
            { label: 'Tích hợp', value: 'REST API, Webhook, ONVIF, RTSP' }
        ],
        icon: 'security',
        image: '/media/images/savety.png'
    }
];

/**
 * Get product by ID
 */
export const getProductById = (id: string): Product | undefined => {
    return products.find(product => product.id === id);
};