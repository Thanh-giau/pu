import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../../services/userApi";
import {
  Home,
  MessageSquare,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";

// --- Import file CSS mới ---
import "./MentorLayout.css";

const MentorLayout = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/mentor" },
    { icon: MessageSquare, label: "Phản hồi học viên", path: "/mentor/feedback" },
    { icon: BookOpen, label: "Tài nguyên", path: "/mentor/resources" },
    { icon: Settings, label: "Cài đặt", path: "/mentor/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-root">
      {/* ===== SIDEBAR ===== */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-circle">M</div>
          <div>
            <h1 className="logo-title">Mentor Hub</h1>
            <p className="logo-subtitle">Giảng viên</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Đăng xuất</span>
        </button>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>

            <div>
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">
                Công cụ hỗ trợ giảng dạy và đánh giá.
              </p>
            </div>
          </div>

          {/* User Widget */}
          <div className="dashboard-user-card">
            <div className="user-stats">
              <div className="user-stat-value">Mentor</div>
              <div className="user-stat-label">Verified</div>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() || <GraduationCap size={20} />}
              </div>
              <div>
                <p className="font-medium" style={{ margin: 0, fontWeight: 600 }}>
                  {user?.username || "Giảng viên"}
                </p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#22d3ee" }}>
                  Đang hoạt động
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Wrapper */}
        <div className="mentor-page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MentorLayout;