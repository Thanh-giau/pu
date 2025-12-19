// src/pages/common/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/userApi";
import "./auth.css";

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
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng nhập</h2>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-row">
            <div className="auth-input-group">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="auth-input"
                placeholder="Tên đăng nhập"
                disabled={loading}
              />
            </div>

            <div className="auth-input-group">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="auth-input"
                placeholder="Mật khẩu"
                disabled={loading}
              />
            </div>

            <div className="auth-input-group">
              <select className="auth-select" value="auto" disabled={true}>
                <option value="auto">Tự động theo tài khoản</option>
              </select>
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <>
                <div className="auth-spinner" />
                <span>Đăng nhập...</span>
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="auth-link">
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
