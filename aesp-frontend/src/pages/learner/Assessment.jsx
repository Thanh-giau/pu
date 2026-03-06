// src/pages/learner/Assessment.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userApi";
import axios from "axios";
import { ClipboardCheck, ArrowLeft, Save, Star, Lightbulb, Mic, Target } from "lucide-react";
import "./styles/learner-assessment.css";

const API_BASE = "http://localhost:5050";

const Assessment = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const userId = currentUser?.user?._id || currentUser?._id;

  const [level, setLevel] = useState("");
  const [pronunciationScore, setPronunciationScore] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [goal, setGoal] = useState("");
  const [focusTopics, setFocusTopics] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await axios.post(`${API_BASE}/api/profile/${userId}/assessment`, {
        level,
        pronunciationScore: Number(pronunciationScore) || 0,
        confidence: Number(confidence) || 0,
        goal,
        focusTopics,
      });
      setMessage("✅ Đã lưu đánh giá ban đầu thành công!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi lưu đánh giá. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const confidenceLabels = ["", "Rất ngại", "Hơi ngại", "Bình thường", "Khá tự tin", "Rất tự tin"];

  return (
    <div className="as-page">
      {/* Header */}
      <div className="as-header">
        <div>
          <h1 className="as-title">
            <ClipboardCheck size={28} style={{ color: "#818cf8" }} />
            Đánh giá năng lực
          </h1>
          <p className="as-subtitle">
            Bài đánh giá giúp AI hiểu rõ trình độ và mục tiêu của bạn.
          </p>
        </div>
        <div className="as-user-badge">
          <div className="as-user-avatar">
            {(currentUser?.user?.username || currentUser?.username || "U")[0].toUpperCase()}
          </div>
          <div>
            <div className="as-user-label">Tài khoản</div>
            <div className="as-user-name">
              {currentUser?.user?.username || currentUser?.username || "Học viên"}
            </div>
            <div className="as-user-id">ID: {userId || "—"}</div>
          </div>
        </div>
      </div>

      <div className="as-grid">
        {/* Form */}
        <form onSubmit={handleSubmit} className="as-form-card">
          <div className="as-field">
            <label><Star size={14} /> Trình độ hiện tại</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} required>
              <option value="">Chọn trình độ</option>
              <option value="beginner">Mới bắt đầu</option>
              <option value="elementary">Cơ bản</option>
              <option value="intermediate">Trung bình</option>
              <option value="upper_intermediate">Khá</option>
              <option value="advanced">Nâng cao</option>
            </select>
          </div>

          <div className="as-row">
            <div className="as-field">
              <label><Mic size={14} /> Điểm phát âm (0–100)</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={pronunciationScore}
                  onChange={(e) => setPronunciationScore(e.target.value)}
                  placeholder="Ví dụ: 65"
                />
                <span style={{ color: "rgba(255,255,255,.4)", fontSize: "0.85rem" }}>/100</span>
              </div>
            </div>
            <div className="as-field">
              <label><Target size={14} /> Mức tự tin khi nói</label>
              <input
                type="range"
                min="1"
                max="5"
                value={confidence}
                onChange={(e) => setConfidence(e.target.value)}
                className="as-range"
              />
              <div className="as-range-info">
                <span>{confidenceLabels[confidence]}</span>
                <span className="as-range-value">{confidence}/5</span>
              </div>
            </div>
          </div>

          <div className="as-field">
            <label><Target size={14} /> Mục tiêu học tập chính</label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={3}
              placeholder="Ví dụ: thi IELTS 6.5, giao tiếp công việc, du học..."
            />
          </div>

          <div className="as-field">
            <label><Lightbulb size={14} /> Chủ đề và lĩnh vực quan tâm</label>
            <textarea
              value={focusTopics}
              onChange={(e) => setFocusTopics(e.target.value)}
              rows={3}
              placeholder="Ví dụ: du lịch, kinh doanh, IT, y tế, phát biểu trước đám đông..."
            />
          </div>

          {message && (
            <div className={`as-message ${message.startsWith("✅") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="as-btn-row">
            <button type="button" onClick={() => navigate("/learner")} className="as-back-btn">
              <ArrowLeft size={16} /> Quay lại dashboard
            </button>
            <button type="submit" disabled={saving} className="as-save-btn">
              <Save size={16} />
              {saving ? "Đang lưu..." : "Lưu đánh giá"}
            </button>
          </div>
        </form>

        {/* Sidebar */}
        <div className="as-sidebar">
          <div className="as-why-card">
            <h3>🎯 Tại sao cần đánh giá?</h3>
            <ul>
              <li>Đề xuất gói học phù hợp</li>
              <li>Tính toán độ khó bài nói</li>
              <li>Theo dõi tiến độ theo thời gian</li>
            </ul>
          </div>
          <div className="as-tip-card">
            <h3>💡 Mẹo làm bài tốt</h3>
            <ul>
              <li>Nhớ lại tình huống bạn thường dùng tiếng Anh</li>
              <li>Tự hỏi: Mình muốn đạt được gì?</li>
              <li>Nếu không chắc, chọn mức thấp hơn một chút</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Assessment;
