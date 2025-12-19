// aesp-frontend/src/pages/admin/Reports.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reports.css";

const BASE_URL = "http://localhost:5050";

const Reports = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    totalMentors: 0,
    totalLearners: 0,
    totalCourses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError("");

      try {
        // Lấy user cho admin, và danh sách khóa học
        const [usersRes, coursesRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/admin/users`),
          axios.get(`${BASE_URL}/api/courses`),
        ]);

        const users = usersRes.data || [];
        const courses = coursesRes.data || [];

        // Đếm user theo vai trò
        const roleCount = users.reduce(
          (acc, u) => {
            const role = u.role || "unknown";
            if (role === "admin") acc.admin += 1;
            else if (role === "mentor") acc.mentor += 1;
            else if (role === "learner") acc.learner += 1;
            else acc.unknown += 1;
            return acc;
          },
          { admin: 0, mentor: 0, learner: 0, unknown: 0 }
        );

        setStats({
          totalUsers: users.length,
          totalAdmins: roleCount.admin,
          totalMentors: roleCount.mentor,
          totalLearners: roleCount.learner,
          totalCourses: courses.length,
        });
      } catch (err) {
        console.error("Lỗi tải báo cáo:", err);
        setError(
          "Không tải được số liệu. Vui lòng kiểm tra gateway, user service và learning service."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="reports-container">
      <h1 className="reports-title">Báo cáo</h1>
      <p className="reports-subtitle">
        Tổng quan hệ thống, số lượng người dùng và gói học.
      </p>

      {loading && <div className="reports-loading">Đang tải số liệu...</div>}

      {error && !loading && <div className="reports-error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="reports-grid">
            <div className="report-card">
              <div className="report-label">Tổng người dùng</div>
              <div className="report-value">{stats.totalUsers}</div>
            </div>

            <div className="report-card">
              <div className="report-label">Quản trị viên</div>
              <div className="report-value">{stats.totalAdmins}</div>
            </div>

            <div className="report-card">
              <div className="report-label">Mentor</div>
              <div className="report-value">{stats.totalMentors}</div>
            </div>

            <div className="report-card">
              <div className="report-label">Học viên</div>
              <div className="report-value">{stats.totalLearners}</div>
            </div>

            <div className="report-card">
              <div className="report-label">Tổng gói học</div>
              <div className="report-value">{stats.totalCourses}</div>
            </div>
          </div>

          <div className="reports-note">
            Số liệu được tính từ danh sách người dùng và gói học hiện có.
            Sau này có thể thêm báo cáo doanh thu và lịch sử mua gói từ payment service.
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
