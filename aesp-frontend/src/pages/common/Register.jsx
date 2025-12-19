// src/pages/common/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/userApi";
import './auth.css'; // Import CSS file

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register(username, password);
      alert("Đăng ký thành công, vui lòng đăng nhập.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error || "Đã xảy ra lỗi khi đăng ký tài khoản";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="premium-auth-container">
      {/* Animated Background Particles */}
      <div className="auth-particles-bg">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="auth-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Background Glow */}
      <div className="auth-bg-glow" />

      {/* Auth Card */}
      <div className="premium-auth-card">
        <div className="auth-card-glow" />
        
        {/* Logo & Title */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">✨</span>
          </div>
          <h2 className="auth-title">Đăng ký tài khoản</h2>
          <p className="auth-subtitle">Bắt đầu hành trình học tập của bạn</p>
        </div>

        {/* Info Banner */}
        <div className="info-banner">
          <span className="info-icon">ℹ️</span>
          <div className="info-content">
            <p className="info-text">
              Tài khoản <strong>Admin</strong> và <strong>Mentor</strong> được tạo bởi quản trị viên.
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="auth-error-banner">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Tên đăng nhập</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="premium-input"
                placeholder="Nhập tên đăng nhập"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Mật khẩu</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="premium-input"
                placeholder="Nhập mật khẩu"
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Vai trò</label>
            <div className="input-wrapper">
              <span className="input-icon">🎓</span>
              <select className="premium-select" value="learner" disabled={true}>
                <option value="learner">Học viên</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="premium-submit-btn" 
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner" />
                <span>Đang đăng ký...</span>
              </>
            ) : (
              <>
                <span>Đăng ký</span>
                <span className="btn-arrow">→</span>
              </>
            )}
            <div className="btn-shine-effect" />
          </button>
        </form>

        {/* Footer Link */}
        <div className="auth-footer">
          <p className="footer-text">
            Đã có tài khoản?{" "}
            <Link to="/login" className="footer-link">
              Đăng nhập ngay
            </Link>
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="card-decoration card-decoration-1" />
        <div className="card-decoration card-decoration-2" />
      </div>
    </div>
  );
};

export default Register;