import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { logout, getCurrentUser } from "../../services/userApi";
import {
  Home,
  BookOpen,
  Mic,
  BarChart2,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";

// --- Import file CSS mới tạo ---
import "./LearnerLayout.css"; 

const LearnerLayout = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Tổng quan", path: "/learner" },
    { icon: BookOpen, label: "Khóa học", path: "/learner/courses" },
    { icon: Mic, label: "Luyện nói AI", path: "/learner/speaking" },
    { icon: BarChart2, label: "Tiến độ", path: "/learner/progress" },
    { icon: CreditCard, label: "Thanh toán", path: "/learner/payment" },
    { icon: Settings, label: "Cài đặt", path: "/learner/settings" },
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
          <div className="logo-circle">A</div>
          <div>
            <h1 className="logo-title">AESP</h1>
            <p className="logo-subtitle">Learner Space</p>
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
              <p className="dashboard-subtitle">Chào mừng trở lại!</p>
            </div>
          </div>

          {/* User Widget */}
          <div className="dashboard-user-card">
            <div className="user-stats">
              <div className="user-stat-value">Level 1</div>
              <div className="user-stat-label">Học viên</div>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() || <User size={20} />}
              </div>
              <div className="hidden-mobile">
                <p className="font-medium" style={{margin:0, fontSize: '0.9rem', fontWeight: 600}}>
                  {user?.username || "Learner"}
                </p>
                <p style={{margin:0, fontSize: '0.75rem', color: '#10b981'}}>Online</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="learner-page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LearnerLayout;