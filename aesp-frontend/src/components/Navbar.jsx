// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout, getCurrentUser } from "../services/userApi";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    const account = currentUser?.user || currentUser || null;
    setUser(account);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`premium-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div className="logo-icon-wrap">
              <span className="logo-emoji">🎓</span>
            </div>
            <div className="logo-text-group">
              <span className="logo-text">AESP</span>
              <span className="logo-sub">AI Study Platform</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="navbar-center">
            <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
              <span>Trang chủ</span>
            </Link>
            <Link to="/about" className={`nav-item ${isActive("/about") ? "active" : ""}`}>
              <span>Giới thiệu</span>
            </Link>
          </div>

          {/* Right Actions */}
          <div className="navbar-actions">
            {!user ? (
              <>
                <Link to="/login" className="nav-btn nav-btn-ghost">
                  Đăng nhập
                </Link>
                <Link to="/register" className="nav-btn nav-btn-primary">
                  <span>Đăng ký</span>
                  <span className="btn-sparkle">✨</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/learner"
                  className={`nav-item ${location.pathname.startsWith("/learner") ? "active" : ""}`}
                >
                  Học tập
                </Link>

                {(user.role === "mentor" || user.role === "admin") && (
                  <Link
                    to="/mentor"
                    className={`nav-item ${location.pathname.startsWith("/mentor") ? "active" : ""}`}
                  >
                    Mentor
                  </Link>
                )}

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className={`nav-item ${location.pathname.startsWith("/admin") ? "active" : ""}`}
                  >
                    Admin
                  </Link>
                )}

                <div className="user-pill">
                  <div className="user-avatar-nav">
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="user-name-nav">{user.username}</span>
                </div>

                <button onClick={handleLogout} className="nav-btn nav-btn-logout">
                  Đăng xuất
                </button>
              </>
            )}

            {/* Mobile Toggle */}
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className={`hamburger ${mobileOpen ? "open" : ""}`}>
                <span />
                <span />
                <span />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="mobile-menu" onClick={() => setMobileOpen(false)}>
            <Link to="/" className="mobile-link">Trang chủ</Link>
            <Link to="/about" className="mobile-link">Giới thiệu</Link>
            {!user ? (
              <>
                <Link to="/login" className="mobile-link">Đăng nhập</Link>
                <Link to="/register" className="mobile-link accent">Đăng ký</Link>
              </>
            ) : (
              <>
                <Link to="/learner" className="mobile-link">Học tập</Link>
                {(user.role === "mentor" || user.role === "admin") && (
                  <Link to="/mentor" className="mobile-link">Mentor</Link>
                )}
                {user.role === "admin" && (
                  <Link to="/admin" className="mobile-link">Admin</Link>
                )}
                <button onClick={handleLogout} className="mobile-link logout">
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <style>{`
        .premium-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 0 24px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          background: transparent;
        }

        .premium-navbar.scrolled {
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* Logo */
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          transition: transform 0.3s ease;
        }

        .navbar-logo:hover { transform: scale(1.03); }

        .logo-icon-wrap {
          width: 42px;
          height: 42px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .logo-emoji { font-size: 22px; }

        .logo-text-group {
          display: flex;
          flex-direction: column;
        }

        .logo-text {
          font-size: 1.3rem;
          font-weight: 800;
          color: #fff;
          letter-spacing: -0.5px;
          line-height: 1.1;
        }

        .logo-sub {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        /* Center Nav */
        .navbar-center {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-item {
          position: relative;
          padding: 8px 18px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 500;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .nav-item:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-item.active {
          color: #fff;
          background: rgba(102, 126, 234, 0.2);
          box-shadow: inset 0 0 0 1px rgba(102, 126, 234, 0.3);
        }

        /* Right Actions */
        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 20px;
          border: none;
          border-radius: 12px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .nav-btn-ghost {
          color: rgba(255, 255, 255, 0.8);
          background: transparent;
        }

        .nav-btn-ghost:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
        }

        .nav-btn-primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          position: relative;
          overflow: hidden;
        }

        .nav-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
        }

        .btn-sparkle {
          font-size: 14px;
          animation: sparkle-rotate 3s linear infinite;
        }

        @keyframes sparkle-rotate {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3) rotate(180deg); }
        }

        .nav-btn-logout {
          color: rgba(255, 255, 255, 0.6);
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .nav-btn-logout:hover {
          background: rgba(239, 68, 68, 0.2);
          color: #fca5a5;
          transform: translateY(-1px);
        }

        /* User Pill */
        .user-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 14px 5px 5px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50px;
        }

        .user-avatar-nav {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .user-name-nav {
          color: rgba(255, 255, 255, 0.9);
          font-size: 0.85rem;
          font-weight: 500;
        }

        /* Mobile */
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }

        .hamburger {
          width: 24px;
          height: 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .hamburger span {
          display: block;
          width: 100%;
          height: 2px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 6px);
        }
        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -6px);
        }

        .mobile-menu {
          display: none;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-link {
          display: block;
          padding: 12px 16px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          border-radius: 12px;
          transition: all 0.2s ease;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-size: 0.95rem;
        }

        .mobile-link:hover { background: rgba(255, 255, 255, 0.08); color: #fff; }
        .mobile-link.accent { color: #a78bfa; font-weight: 600; }
        .mobile-link.logout { color: #f87171; }

        @media (max-width: 768px) {
          .navbar-center { display: none; }
          .navbar-actions .nav-item,
          .navbar-actions .nav-btn-ghost,
          .navbar-actions .nav-btn-primary,
          .navbar-actions .nav-btn-logout,
          .navbar-actions .user-pill { display: none; }
          .mobile-toggle { display: block; }
          .mobile-menu { display: flex; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
