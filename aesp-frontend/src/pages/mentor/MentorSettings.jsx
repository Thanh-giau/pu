import React, { useEffect, useState } from "react";

const STORAGE_KEY = "mentor_settings";

const defaultExperience =
  "Hãy tạo cơ hội để học viên nói chuyện với người bản xứ thật, dù chỉ 5 đến 10 phút một tuần. " +
  "Hướng dẫn họ chuẩn bị trước vài câu hỏi và câu trả lời mẫu, sau đó khuyến khích họ hỏi thêm câu follow up.";

const MentorSettings = () => {
  const [defaultLevel, setDefaultLevel] = useState("B1 - Intermediate");
  const [showVocabTips, setShowVocabTips] = useState(true);
  const [experience, setExperience] = useState(defaultExperience);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      if (s.defaultLevel) setDefaultLevel(s.defaultLevel);
      if (typeof s.showVocabTips === "boolean") {
        setShowVocabTips(s.showVocabTips);
      }
      if (s.experience) setExperience(s.experience);
    } catch (err) {
      console.error("Lỗi đọc mentor settings:", err);
    }
  }, []);

  const handleSave = () => {
    const data = { defaultLevel, showVocabTips, experience };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      alert("Đã lưu cài đặt mentor.");
    } catch (err) {
      console.error("Lỗi lưu mentor settings:", err);
      alert("Không lưu được cài đặt.");
    }
  };

  return (
    <div className="mentor-page">
      <div>
        <h2 className="mentor-title">Cài đặt Mentor</h2>
        <p className="mentor-subtitle">
          Tùy chỉnh một số mặc định và lưu lại kinh nghiệm giao tiếp với người
          bản xứ để sử dụng khi hướng dẫn học viên.
        </p>
      </div>

      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">Tùy chỉnh mặc định</span>
        </div>

        <div className="mentor-field-group">
          <label className="mentor-label">
            Trình độ mặc định khi gợi ý lộ trình
          </label>
          <select
            value={defaultLevel}
            onChange={(e) => setDefaultLevel(e.target.value)}
            className="mentor-select"
            style={{ maxWidth: 260 }}
          >
            <option>A1 - Beginner</option>
            <option>A2 - Pre intermediate</option>
            <option>B1 - Intermediate</option>
            <option>B2 - Upper intermediate</option>
            <option>C1 - Advanced</option>
          </select>
        </div>

        <div className="mentor-field-group">
          <label className="mentor-label">
            Tính năng hiển thị gợi ý collocation và idioms
          </label>
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "#e5e7eb",
            }}
          >
            <input
              id="showTips"
              type="checkbox"
              checked={showVocabTips}
              onChange={(e) => setShowVocabTips(e.target.checked)}
              style={{ width: 16, height: 16 }}
            />
            Hiển thị các gợi ý về collocation và idioms trên trang Tài nguyên
          </label>
        </div>

        <div className="mentor-field-group" style={{ marginTop: 12 }}>
          <label className="mentor-label">
            Kinh nghiệm giao tiếp với người bản xứ
          </label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            rows={6}
            className="mentor-textarea"
            placeholder="Chia sẻ mẹo chuẩn bị trước khi nói chuyện, cách xử lý khi không nghe kịp, cách hỏi lại lịch sử..."
          />
          <p className="mentor-help">
            Đoạn này có thể được dùng làm tài liệu mẫu để chia sẻ cho học viên
            hoặc mentor khác.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="mentor-button"
          style={{ marginTop: 8 }}
        >
          Lưu cài đặt
        </button>
      </div>

      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">
            Bạn có thể trích dẫn nhanh cho học viên
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "#e5e7eb",
            whiteSpace: "pre-line",
            lineHeight: 1.6,
          }}
        >
          {experience}
        </p>
      </div>
    </div>
  );
};

export default MentorSettings;
