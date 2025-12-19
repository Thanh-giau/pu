// src/pages/learner/AssessmentPage.jsx
import React, { useEffect, useState } from "react";
import {
  getInitialAssessment,
  submitInitialAssessment,
} from "../../services/learningApi";
import { getCurrentUser } from "../../services/userApi";

const AssessmentPage = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    overall_level: "A2",
    grammar_level: "A2",
    pronunciation_level: "A2",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const u = getCurrentUser?.();
    if (u) {
      setUser(u);
      loadAssessment(u.id || u._id || u.userId);
    }
  }, []);

  const loadAssessment = async (userId) => {
    try {
      const data = await getInitialAssessment(userId);
      if (data) {
        setSaved(data);
        setForm({
          overall_level: data.overall_level || "A2",
          grammar_level: data.grammar_level || "A2",
          pronunciation_level: data.pronunciation_level || "A2",
          notes: data.notes || "",
        });
      }
    } catch (err) {
      console.error("Lỗi load assessment:", err);
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
    try {
      const uid = user.id || user._id || user.userId;
      const data = await submitInitialAssessment(uid, form);
      setSaved(data);
    } catch (err) {
      console.error("Lỗi submit assessment:", err);
      setError("Không lưu được đánh giá. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: 640 }}>
        <h2 className="auth-title">Đánh giá ban đầu</h2>

        <p style={{ color: "#cbd5e1", marginBottom: "1.5rem" }}>
          Cho biết sơ bộ trình độ hiện tại để hệ thống gợi ý lộ trình học
          phù hợp. Bạn có thể cập nhật lại sau.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form-row">
            <div className="auth-input-group">
              <label style={{ color: "#e2e8f0", fontSize: 14 }}>
                Trình độ tổng thể
              </label>
              <select
                name="overall_level"
                value={form.overall_level}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="A1">A1 - Beginner</option>
                <option value="A2">A2 - Elementary</option>
                <option value="B1">B1 - Intermediate</option>
                <option value="B2">B2 - Upper-intermediate</option>
                <option value="C1">C1 - Advanced</option>
                <option value="C2">C2 - Proficient</option>
              </select>
            </div>

            <div className="auth-input-group">
              <label style={{ color: "#e2e8f0", fontSize: 14 }}>
                Ngữ pháp
              </label>
              <select
                name="grammar_level"
                value={form.grammar_level}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="Yeu">Yếu</option>
                <option value="Trung binh">Trung bình</option>
                <option value="Tot">Tốt</option>
              </select>
            </div>

            <div className="auth-input-group">
              <label style={{ color: "#e2e8f0", fontSize: 14 }}>
                Phát âm
              </label>
              <select
                name="pronunciation_level"
                value={form.pronunciation_level}
                onChange={handleChange}
                className="auth-select"
              >
                <option value="Yeu">Yếu</option>
                <option value="Trung binh">Trung bình</option>
                <option value="Tot">Tốt</option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "1rem" }}>
            <label style={{ color: "#e2e8f0", fontSize: 14 }}>
              Ghi chú thêm (điểm mạnh, khó khăn, mục tiêu...)
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="auth-input"
              rows={4}
              style={{ resize: "vertical" }}
            />
          </div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
            style={{ marginTop: "1.5rem" }}
          >
            {loading ? "Đang lưu..." : "Lưu đánh giá"}
          </button>
        </form>

        {saved && (
          <p
            style={{
              color: "#a7f3d0",
              fontSize: 14,
              marginTop: "1rem",
              textAlign: "center",
            }}
          >
            Đã lưu đánh giá gần nhất lúc{" "}
            {new Date(saved.created_at).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
};

export default AssessmentPage;
