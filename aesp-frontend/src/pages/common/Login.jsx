// src/pages/common/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/userApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await login(username, password);
      const account = data.user || data;
      const role = account.role;

      if (role === "admin") {
        navigate("/admin", { replace: true });
      } else if (role === "mentor") {
        navigate("/mentor", { replace: true });
      } else {
        navigate("/learner", { replace: true });
      }
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "Lỗi server khi đăng nhập";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && !loading && username && password) {
        handleSubmit(e);
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [username, password, loading]);

  return (
    <div className="premium-auth-container">
      <div className="auth-particles-bg">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="auth-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <div className="auth-bg-glow" />

      <div className="premium-auth-card">
        <div className="auth-card-glow" />

        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-icon">🎓</span>
          </div>
          <h2 className="auth-title">Đăng nhập</h2>
          <p className="auth-subtitle">Chào mừng bạn trở lại!</p>
        </div>

        {error && (
          <div className="auth-error-banner">
            <span className="error-icon">⚠️</span>
            <span className="error-text">{error}</span>
          </div>
        )}

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
              <span className="input-icon">🎯</span>
              <select className="premium-select" value="auto" disabled>
                <option value="auto">Tự động theo tài khoản</option>
              </select>
            </div>
          </div>

          <button type="submit" className="premium-submit-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="btn-spinner" />
                <span>Đang đăng nhập...</span>
              </>
            ) : (
              <>
                <span>Đăng nhập</span>
                <span className="btn-arrow">→</span>
              </>
            )}
            <div className="btn-shine-effect" />
          </button>
        </form>

        <div className="auth-footer">
          <p className="footer-text">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="footer-link">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <div className="card-decoration card-decoration-1" />
        <div className="card-decoration card-decoration-2" />
      </div>
    </div>
  );
};

export default Login;
