// src/services/learningApi.js
import axios from "axios";

const API_BASE = "http://localhost:5050";

/* ====== COURSES GOI HOC ====== */

export const getCourses = async () => {
  const res = await axios.get(`${API_BASE}/api/courses`);
  return res.data;
};

export const addCourse = async (course) => {
  const res = await axios.post(`${API_BASE}/api/courses`, course);
  return res.data;
};

export const updateCourse = async (id, course) => {
  const res = await axios.put(`${API_BASE}/api/courses/${id}`, course);
  return res.data;
};

export const deleteCourse = async (id) => {
  const res = await axios.delete(`${API_BASE}/api/courses/${id}`);
  return res.data;
};

/* ====== ENROLLMENTS LEARNER ====== */

export const enrollCourse = async ({ userId, courseId, withMentor }) => {
  const res = await axios.post(`${API_BASE}/api/enrollments`, {
    userId,
    courseId,
    withMentor,
  });
  return res.data;
};

export const checkEnrolled = async ({ userId, courseId }) => {
  const res = await axios.get(`${API_BASE}/api/enrollments/check`, {
    params: { userId, courseId },
  });
  return res.data;
};

export const getMyEnrollments = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/enrollments/user/${userId}`);
  return res.data;
};

/* ====== LEARNER PROFILE ====== */

export const getProfile = async (userId) => {
  const res = await axios.get(`${API_BASE}/api/profile/${userId}`);
  return res.data;
};

export const updateProfile = async (userId, payload) => {
  const res = await axios.put(`${API_BASE}/api/profile/${userId}`, payload);
  return res.data;
};

/* ====== INITIAL ASSESSMENT ====== */

export const getAssessment = async (userId) => {
  const res = await axios.get(
    `${API_BASE}/api/profile/${userId}/assessment`
  );
  return res.data;
};

export const saveAssessment = async (userId, payload) => {
  const res = await axios.post(
    `${API_BASE}/api/profile/${userId}/assessment`,
    payload
  );
  return res.data;
};
