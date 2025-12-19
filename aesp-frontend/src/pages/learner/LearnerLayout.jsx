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
} from "lucide-react";
import "../../assets/Css/dashboard.css";
import "../../assets/Css/learner.css";

const LearnerLayout = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/learner" },
    { icon: BookOpen, label: "Khóa học", path: "/learner/courses" },
    { icon: Mic, label: "Luyện nói", path: "/learner/speaking" },
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
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo-circle">A</div>
          <div>
            <h1 className="logo-title">AESP</h1>
            <p className="logo-subtitle">Learner Portal</p>
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
      <main className="dashboard-main learner-main">
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
              Trung tâm học tập cá nhân của bạn.
            </p>
          </div>

          <div className="dashboard-user-card">
            <div className="user-stats">
              <div className="user-stat-value">1</div>
              <div className="user-stat-label">Học viên</div>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-medium">
                  {user?.username || "Learner"}
                </p>
                <p className="text-sm text-emerald-300">Học viên</p>
              </div>
            </div>
          </div>
        </header>

        {/* Wrapper cho tất cả các trang con */}
        <div className="learner-page">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LearnerLayout;
