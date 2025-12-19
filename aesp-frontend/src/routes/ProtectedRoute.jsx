// src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/userApi";

const ProtectedRoute = ({ children, roles }) => {
  const user = getCurrentUser();

  // Chưa đăng nhập
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const role = user.role;

  // Đăng nhập rồi nhưng không có quyền
  if (roles && !roles.includes(role)) {
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    }
    if (role === "mentor") {
      return <Navigate to="/mentor" replace />;
    }
    return <Navigate to="/learner" replace />;
  }

  // Có quyền, render nội dung
  return children;
};

export default ProtectedRoute;
