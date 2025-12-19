import axios from 'axios';

// Cổng Gateway chuẩn
const API_BASE_URL = 'http://localhost:5050';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động thêm Token vào mỗi request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi chung (ví dụ hết hạn token)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Nếu token hết hạn -> Xóa token và reload trang (hoặc chuyển về login)
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // Bỏ comment dòng này nếu muốn tự động logout
    }
    return Promise.reject(error);
  }
);

export default api;