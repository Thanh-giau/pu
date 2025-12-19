import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api'; // Thay port nếu cần

// Tạo instance axios
const progressAPI = axios.create({
  baseURL: `${API_BASE_URL}/progress`,
  timeout: 10000,
});

// ✅ Export tất cả functions
export const getAllProgress = async () => {
  try {
    const response = await progressAPI.get('/');
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy tất cả progress:', error);
    throw error;
  }
};

export const getProgressByUser = async (user_id) => {
  try {
    const response = await progressAPI.get(`/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy progress user:', error);
    throw error;
  }
};

export const getUserProgressOverview = async (user_id) => {
  try {
    const response = await progressAPI.get(`/user/${user_id}/overview`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy overview progress:', error);
    throw error;
  }
};

export const getProgressByUserAndCourse = async (user_id, course_id) => {
  try {
    const response = await progressAPI.get(`/user/${user_id}/course/${course_id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi lấy progress chi tiết:', error);
    throw error;
  }
};

export const addProgress = async (progressData) => {
  try {
    const response = await progressAPI.post('/', progressData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi thêm progress:', error);
    throw error;
  }
};

export const updateProgress = async (id, progressData) => {
  try {
    const response = await progressAPI.put(`/${id}`, progressData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật progress:', error);
    throw error;
  }
};

export const updateProgressByUserAndCourse = async (user_id, course_id, progressData) => {
  try {
    const response = await progressAPI.put(`/user/${user_id}/course/${course_id}`, progressData);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi cập nhật progress:', error);
    throw error;
  }
};

export const incrementCompletedLessons = async (user_id, course_id) => {
  try {
    const response = await progressAPI.patch(`/user/${user_id}/course/${course_id}/increment`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi tăng lesson:', error);
    throw error;
  }
};

export const deleteProgress = async (id) => {
  try {
    const response = await progressAPI.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa progress:', error);
    throw error;
  }
};

export const deleteProgressByUser = async (user_id) => {
  try {
    const response = await progressAPI.delete(`/user/${user_id}`);
    return response.data;
  } catch (error) {
    console.error('Lỗi khi xóa progress user:', error);
    throw error;
  }
};

// ✅ Hoặc export default object (chọn 1 trong 2 cách)
const progressService = {
  getAllProgress,
  getProgressByUser,
  getUserProgressOverview,
  getProgressByUserAndCourse,
  addProgress,
  updateProgress,
  updateProgressByUserAndCourse,
  incrementCompletedLessons,
  deleteProgress,
  deleteProgressByUser
};

export default progressService;