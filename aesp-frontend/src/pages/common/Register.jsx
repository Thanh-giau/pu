import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/userApi";
import "../../pages/common/auth.css";

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
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Đăng ký tài khoản học viên</h2>
        <p className="auth-note">
          Tài khoản <strong>Admin</strong> và <strong>Mentor</strong> được tạo bởi
          quản trị viên.
        </p>

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
              <select className="auth-select" value="learner" disabled={true}>
                <option value="learner">Học viên</option>
              </select>
            </div>
          </div>

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? (
              <>
                <div className="auth-spinner" />
                <span>Đăng ký...</span>
              </>
            ) : (
              "Đăng ký"
            )}
          </button>
        </form>

        <div className="auth-link">
          Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
