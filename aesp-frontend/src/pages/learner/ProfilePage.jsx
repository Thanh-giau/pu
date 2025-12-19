// src/pages/learner/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import {
  getLearnerProfile,
  updateLearnerProfile,
} from "../../services/learningApi";
import { getCurrentUser } from "../../services/userApi";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    display_name: "",
    goal: "",
    interests: "",
    level: "",
    target_level: "",
    preferred_topics: "",
  });
  const [loading, setLoading] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const u = getCurrentUser?.();
    if (u) {
      setUser(u);
      loadProfile(u.id || u._id || u.userId);
    }
  }, []);

  const loadProfile = async (userId) => {
    try {
      const data = await getLearnerProfile(userId);
      if (data) {
        setForm({
          display_name: data.display_name || "",
          goal: data.goal || "",
          interests: data.interests || "",
          level: data.level || "",
          target_level: data.target_level || "",
          preferred_topics: data.preferred_topics || "",
        });
      }
    } catch (err) {
      console.error("Lỗi load profile:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");
    setSavedMsg("");
    try {
      const uid = user.id || user._id || user.userId;
      await updateLearnerProfile(uid, form);
      setSavedMsg("Đã lưu hồ sơ học tập.");
    } catch (err) {
      console.error("Lỗi update profile:", err);
      setError("Không lưu được. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: 720 }}>
        <h2 className="auth-title">Hồ sơ học tập</h2>

        {error && <div className="auth-error">{error}</div>}
        {savedMsg && (
          <div
            className="auth-error"
            style={{
              background: "rgba(34,197,94,0.15)",
              borderColor: "rgba(34,197,94,0.4)",
              color: "#bbf7d0",
            }}
          >
            {savedMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-form-row">
            <div className="auth-input-group">
              <label style={{ color: "#e2e8f0", fontSize: 14 }}>
                Tên hiển thị
              </label>
              <input
                className="auth-input"
                name="display_name"
                value={form.display_name}
                onChange={handleChange}
                placeholder="Ví dụ: John, Hoa..."
              />
            </div>
            <div className="auth-input-group">
              <label style={{ color: "#e2e8f0", fontSize: 14 }}>
                Trình độ hiện tại
              </label>
              <input
                className="auth-input"
                name="level"
                value={form.level}
                onChange={handleChange}
                placeholder="Ví dụ: A2, B1..."
              />
            </div>
            <div className="auth-input-group">
              <label style={{ color: "#e2e8f0", fontSize: 14 }}>
                Mục tiêu
              </label>
              <input
                className="auth-input"
                name="target_level"
                value={form.target_level}
                onChange={handleChange}
                placeholder="Ví dụ: B2 trong 6 tháng"
              />
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ color: "#e2e8f0", fontSize: 14 }}>
              Mục tiêu học tập
            </label>
            <textarea
              className="auth-input"
              rows={3}
              name="goal"
              value={form.goal}
              onChange={handleChange}
              placeholder="Ví dụ: nói tự tin trong công việc, du học, thi IELTS..."
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ color: "#e2e8f0", fontSize: 14 }}>
              Sở thích & phong cách học
            </label>
            <textarea
              className="auth-input"
              rows={3}
              name="interests"
              value={form.interests}
              onChange={handleChange}
              placeholder="Ví dụ: thích phim, game, kinh doanh..."
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ color: "#e2e8f0", fontSize: 14 }}>
              Chủ đề / lĩnh vực ưu tiên
            </label>
            <textarea
              className="auth-input"
              rows={3}
              name="preferred_topics"
              value={form.preferred_topics}
              onChange={handleChange}
              placeholder="Ví dụ: du lịch, công nghệ, marketing, y tế..."
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
            style={{ marginTop: "1.5rem" }}
          >
            {loading ? "Đang lưu..." : "Lưu hồ sơ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
