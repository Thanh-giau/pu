import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/userApi";
import {
  Home,
  Users,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// --- QUAN TRỌNG: Import đúng CSS ---
import "./AdminLayout.css";   // File bố cục (Sidebar, Header) vừa tạo ở bước 1
import "./AdminPremium.css";  // File style chi tiết (Glass effect, Card, Form)
// import "../../assets/Css/dashboard.css"; // <-- XÓA HOẶC COMMENT DÒNG NÀY (Vì nó đang thiếu style)

const AdminLayout = () => {
  const user = getCurrentUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Tổng quan", path: "/admin" },
    { icon: Users, label: "Người dùng", path: "/admin/users" },
    { icon: Package, label: "Gói học", path: "/admin/packages" },
    { icon: BarChart3, label: "Báo cáo", path: "/admin/reports" },
    { icon: Settings, label: "Cài đặt", path: "/admin/settings" },
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
            <h1 className="logo-title">Admin Panel</h1>
            <p className="logo-subtitle">admin space</p>
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

      {/* Main Content */}
      <main className="dashboard-main admin-main">
        <header className="dashboard-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((v) => !v)}
            >
              {sidebarOpen ? <X /> : <Menu />}
            </button>

            <div>
              <h1 className="dashboard-title">Tổng quan</h1>
              <p className="dashboard-subtitle">
                Chào mừng trở lại, quản trị viên.
              </p>
            </div>
          </div>

          <div className="dashboard-user-card">
            <div className="user-stats">
              <div className="user-stat-value">System</div>
              <div className="user-stat-label">Online</div>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-medium" style={{ margin: 0, fontWeight: 600 }}>{user?.username || "Admin"}</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "#6ee7b7" }}>Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Nội dung trang con sẽ render ở đây */}
        <div className="admin-page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;