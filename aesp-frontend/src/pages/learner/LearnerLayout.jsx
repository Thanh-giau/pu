import React, { useEffect, useRef, useState } from "react";
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

import "./LearnerLayout.css";
import "./learner-pages.css";
import "./learner-tw-lite.css";

const LearnerLayout = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mainRef = useRef(null);

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

  // JS nhỏ: reveal khi scroll + parallax nhẹ
  useEffect(() => {
    const root = mainRef.current;
    if (!root) return;

    const selector = [
      "form",
      ".admin-card",
      ".bg-white",
      ".bg-white\\/5",
      ".course-list-table",
      ".learner-card",
      ".auth-card",
      ".auth-container > div",
    ].join(",");

    const targets = Array.from(root.querySelectorAll(selector));
    targets.forEach((el) => {
      if (!el.classList.contains("lx-reveal")) el.classList.add("lx-reveal");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    targets.forEach((el) => io.observe(el));

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        root.style.setProperty("--lx-parallax-y", `${Math.min(y * 0.08, 36)}px`);
        root.style.setProperty("--lx-parallax-y2", `${Math.min(y * 0.04, 22)}px`);
        raf = 0;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [location.pathname]);

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
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main ref={mainRef} className="dashboard-main">
        {/* FX Background (Particles) */}
        <div className="lx-fx" aria-hidden="true">
          <div className="lx-particles">
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} className="lx-p" />
            ))}
          </div>
        </div>

        {/* Header */}
        <header className="dashboard-header">
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
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
                <p
                  className="font-medium"
                  style={{ margin: 0, fontSize: "0.9rem", fontWeight: 600 }}
                >
                  {user?.username || "Learner"}
                </p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#10b981" }}>
                  Online
                </p>
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
