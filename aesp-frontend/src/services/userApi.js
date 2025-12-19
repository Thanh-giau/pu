// src/services/userApi.js
import axios from "axios";

const API_BASE = "http://localhost:5050";
const STORAGE_KEY = "aesp_user";

/* ==== LOCAL STORAGE USER ==== */

// Lưu thông tin sau khi đăng nhập
export const saveUserToStorage = (payload) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error("Khong the luu user vao localStorage:", err);
  }
};

// Lấy user hiện tại cho Navbar, ProtectedRoute, cac trang learner, mentor, admin
export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const data = JSON.parse(raw);

    // Hỗ trợ 2 dạng:
    // 1. { message, token, user: {...} }
    // 2. { _id, username, role, ... }
    const user = data && typeof data === "object" ? data.user || data : null;
    return user || null;
  } catch (err) {
    console.error("Khong the doc user tu localStorage:", err);
    return null;
  }
};

// Đăng xuất
export const logout = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Khong the xoa user khoi localStorage:", err);
  }
};

/* ==== ADMIN USER MANAGEMENT ==== */

// Lấy danh sách user cho admin
export const getAdminUsers = async () => {
  const res = await axios.get(`${API_BASE}/api/admin/users`);
  return res.data;
};

// Admin tạo user mới (mentor, learner)
export const createUserByAdmin = async ({ username, password, role }) => {
  const res = await axios.post(`${API_BASE}/api/admin/users`, {
    username,
    password,
    role,
  });
  return res.data;
};

// Khóa, mở khóa tài khoản
export const toggleUserActive = async (userId) => {
  const res = await axios.patch(
    `${API_BASE}/api/admin/users/${userId}/toggle-active`
  );
  return res.data;
};

/* ==== AUTH LEARNER THƯỜNG ==== */

// Đăng ký learner
export const registerUser = async ({ username, password }) => {
  const res = await axios.post(`${API_BASE}/api/users/register`, {
    username,
    password,
    role: "learner",
  });
  return res.data;
};

// Đăng nhập
export const loginUser = async ({ username, password }) => {
  const res = await axios.post(`${API_BASE}/api/users/login`, {
    username,
    password,
  });

  // Backend trả { message, token, user: {...} }
  const data = res.data;
  saveUserToStorage(data);
  return data;
};

// Wrapper tiện cho component cũ
export const login = async (username, password) => {
  return loginUser({ username, password });
};

export const register = async (username, password) => {
  return registerUser({ username, password });
};
