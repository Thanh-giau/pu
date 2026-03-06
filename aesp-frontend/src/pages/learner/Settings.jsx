// src/pages/learner/Settings.jsx
import React, { useState } from "react";
import { getCurrentUser } from "../../services/userApi";
import axios from "axios";
import { User, Target, Clock, BookOpen, Sparkles, Save, Info } from "lucide-react";
import "./styles/learner-settings.css";

const API_BASE = "http://localhost:5050";

const Settings = () => {
  const currentUser = getCurrentUser();
  const userId = currentUser?.user?._id || currentUser?._id;

  const [displayName, setDisplayName] = useState(
    currentUser?.user?.username || currentUser?.username || ""
  );
  const [targetLevel, setTargetLevel] = useState("");
  const [weeklyTime, setWeeklyTime] = useState("");
  const [studyGoal, setStudyGoal] = useState("");
  const [interests, setInterests] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e) => {
    e.preventDefault();
    if (!userId) {
      setMessage("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      await axios.put(`${API_BASE}/api/profile/${userId}`, {
        displayName, targetLevel, weeklyTime, studyGoal, interests,
      });
      setMessage("✅ Đã cập nhật hồ sơ học tập thành công!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi lưu hồ sơ. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  const tags = ["Business English", "Du lịch", "Phỏng vấn xin việc", "Thuyết trình", "Giao tiếp hàng ngày"];

  return (
    <div className="st-page">
      {/* Header */}
      <div className="st-header">
        <div>
          <h1 className="st-title">
            <User size={28} style={{ color: "#818cf8" }} />
            Cài đặt & Hồ sơ học tập
          </h1>
          <p className="st-subtitle">
            Điều chỉnh hồ sơ, mục tiêu và sở thích để AI đề xuất lộ trình phù hợp hơn.
          </p>
        </div>
        <div className="st-user-badge">
          <div className="st-user-avatar">
            {(currentUser?.user?.username || currentUser?.username || "U")[0].toUpperCase()}
          </div>
          <div>
            <div className="st-user-label">Tên đăng nhập</div>
            <div className="st-user-name">
              {currentUser?.user?.username || currentUser?.username || "Học viên"}
            </div>
          </div>
        </div>
      </div>

      <div className="st-grid">
        {/* Main Form */}
        <form onSubmit={handleSave} className="st-form-card">
          <h2 className="st-card-title">
            <BookOpen size={20} /> Hồ sơ học tập
          </h2>

          <div className="st-field">
            <label><User size={14} /> Tên hiển thị</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ví dụ: Linh Nguyễn"
            />
          </div>

          <div className="st-row">
            <div className="st-field">
              <label><Target size={14} /> Trình độ mong muốn</label>
              <select value={targetLevel} onChange={(e) => setTargetLevel(e.target.value)}>
                <option value="">Chưa xác định</option>
                <option value="b1">Giao tiếp hằng ngày (B1)</option>
                <option value="b2">Giao tiếp công việc (B2)</option>
                <option value="ielts6">IELTS 6.0</option>
                <option value="ielts7">IELTS 7.0+</option>
              </select>
            </div>
            <div className="st-field">
              <label><Clock size={14} /> Thời gian học mỗi tuần</label>
              <input
                type="text"
                value={weeklyTime}
                onChange={(e) => setWeeklyTime(e.target.value)}
                placeholder="Ví dụ: 3 giờ, 5 giờ mỗi tuần..."
              />
            </div>
          </div>

          <div className="st-field">
            <label><Target size={14} /> Mục tiêu học tiếng Anh</label>
            <textarea
              value={studyGoal}
              onChange={(e) => setStudyGoal(e.target.value)}
              rows={3}
              placeholder="Ví dụ: tự tin giao tiếp với đối tác nước ngoài, thi IELTS, du học..."
            />
          </div>

          <div className="st-field">
            <label><Sparkles size={14} /> Chủ đề và lĩnh vực quan tâm</label>
            <textarea
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              rows={3}
              placeholder="Ví dụ: kinh doanh, IT, phim ảnh, âm nhạc, du lịch..."
            />
            <div className="st-tags">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className="st-tag"
                  onClick={() =>
                    setInterests((prev) =>
                      prev ? (prev.includes(tag) ? prev : `${prev}, ${tag}`) : tag
                    )
                  }
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {message && (
            <div className={`st-message ${message.startsWith("✅") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={saving} className="st-save-btn">
            <Save size={16} />
            {saving ? "Đang lưu..." : "Lưu hồ sơ"}
          </button>
        </form>

        {/* Sidebar Cards */}
        <div className="st-sidebar">
          <div className="st-info-card">
            <h3><Info size={16} /> Hệ thống sử dụng hồ sơ để:</h3>
            <ul>
              <li>🎯 Đề xuất bài nói và chủ đề phù hợp với mục tiêu</li>
              <li>📊 Điều chỉnh độ khó và tốc độ bài tập</li>
              <li>🔔 Tạo nhắc nhở giữ chuỗi luyện tập (streak)</li>
            </ul>
          </div>

          <div className="st-tip-card">
            <h3>💡 Mẹo giữ động lực</h3>
            <ul>
              <li>Đặt mục tiêu nhỏ theo tuần thay vì chỉ mục tiêu lớn</li>
              <li>Chọn chủ đề gắn với công việc hoặc sở thích</li>
              <li>Luyện nói ít nhất 10 phút mỗi ngày</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Settings;
