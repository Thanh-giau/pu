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
import "../../assets/Css/dashboard.css";
import "../../assets/Css/admin.css";

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
            <p className="logo-subtitle">admin</p>
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
      <main className="dashboard-main admin-main">
        <header className="dashboard-header">
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>

          <div>
            <h1 className="dashboard-title">Tổng quan</h1>
            <p className="dashboard-subtitle">
              Khu quản lý hệ thống dành cho quản trị viên.
            </p>
          </div>

          <div className="dashboard-user-card">
            <div className="user-stats">
              <div className="user-stat-value">admin</div>
              <div className="user-stat-label">Quản trị viên</div>
            </div>
            <div className="user-info">
              <div className="user-avatar">
                {user?.username?.[0]?.toUpperCase() || "A"}
              </div>
              <div>
                <p className="font-medium">{user?.username || "admin"}</p>
                <p className="text-sm text-emerald-300">Quản trị viên</p>
              </div>
            </div>
          </div>
        </header>

        {/* Tất cả các trang con của admin nằm trong wrapper này */}
        <div className="admin-page">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
