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
} from "lucide-react";
import "../../assets/Css/dashboard.css";
import "../../assets/Css/mentor.css";

const MentorLayout = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/mentor" },
    { icon: MessageSquare, label: "Phản hồi", path: "/mentor/feedback" },
    { icon: BookOpen, label: "Tài nguyên", path: "/mentor/resources" },
    { icon: Settings, label: "Cài đặt", path: "/mentor/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-circle">M</div>
          <div>
            <h1 className="logo-title">Mentor Hub</h1>
            <p className="logo-subtitle">
              {user?.username || "Giảng viên tiếng Anh"}
            </p>
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
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={18} />
          Đăng xuất
        </button>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <div>
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Công cụ hỗ trợ mentor đánh giá và hướng dẫn học viên.
            </p>
          </div>

          <div className="dashboard-user-card">
            <div className="user-stats">
              <div className="user-stat-value">1</div>
              <div className="user-stat-label">Giảng viên</div>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() || "M"}
              </div>
              <div>
                <p className="font-medium">{user?.username || "Mentor"}</p>
                <p className="text-sm text-emerald-300">Giảng viên</p>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MentorLayout;
