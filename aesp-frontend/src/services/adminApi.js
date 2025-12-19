import axios from 'axios';

// 👇 CỔNG 5050 LÀ CỔNG GATEWAY MỞ RA MÁY TÍNH CỦA BẠN
const API_BASE_URL = 'http://localhost:5050';

// Tạo một instance axios riêng để tự động thêm token vào mọi request
const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Tự động thêm Token vào header (Interceptor)
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Hoặc chỉ là `token` tùy backend bạn xử lý
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const adminApi = {
    // 1. Lấy danh sách Users
    // Gọi vào Gateway: http://localhost:5050/api/admin/users
    getUsers: async () => {
        try {
            const response = await axiosClient.get('/api/admin/users');
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy danh sách user:", error);
            throw error; // Ném lỗi để component xử lý hiển thị
        }
    },

    // 2. Xóa User
    // Gọi vào Gateway: http://localhost:5050/api/admin/users/:id
    deleteUser: async (userId) => {
        try {
            const response = await axiosClient.delete(`/api/admin/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi xóa user:", error);
            throw error;
        }
    },

    // 3. Lấy thống kê tổng quan (Dashboard)
    // Gọi vào Gateway: http://localhost:5050/api/users/stats/count (hoặc api thống kê bạn đã viết)
    getStats: async () => {
        try {
            // Lưu ý: Route này phải khớp với route bạn khai báo trong User Service
            const response = await axiosClient.get('/api/users/stats/count');
            return response.data;
        } catch (error) {
            console.error("Lỗi lấy thống kê:", error);
            // Trả về dữ liệu giả để không bị crash trang nếu API lỗi
            return { totalUsers: 0, students: 0, mentors: 0, admins: 0 };
        }
    }
};