import React, { useEffect, useState } from "react";

const STORAGE_KEY = "mentor_resources";

const defaultTopics = [
  "Giới thiệu bản thân và công việc",
  "Phỏng vấn xin việc bằng tiếng Anh",
  "Hội thoại trong cuộc họp online",
  "Small talk với đồng nghiệp và đối tác nước ngoài",
  "Tình huống tại sân bay và khách sạn",
  "Thuyết trình ngắn về dự án",
];

const vocabTips = [
  "Học từ vựng theo cụm collocation: make a decision, do homework, take a risk...",
  "Tạo flashcard và ôn lại theo chu kỳ spaced repetition.",
  "Ghi chép câu mẫu nguyên vẹn, không học từng từ lẻ.",
  "Luyện shadowing theo đoạn hội thoại thật, lặp lại nguyên câu.",
  "Chọn 3 đến 5 idioms phù hợp và dùng lặp lại trong buổi thực hành.",
];

const idiomExamples = [
  "break the ice - phá vỡ không khí ngại ngùng khi mới bắt đầu nói chuyện",
  "once in a blue moon - rất hiếm khi xảy ra",
  "piece of cake - quá dễ, dễ như ăn kẹo",
  "hit the nail on the head - nói chính xác vấn đề",
  "get the ball rolling - bắt đầu một hoạt động nào đó",
];

const ResourceManagement = () => {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "Video",
    link: "",
    note: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setResources(raw ? JSON.parse(raw) : []);
    } catch (err) {
      console.error("Lỗi đọc resource:", err);
    }
  }, []);

  const save = (list) => {
    setResources(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error("Lỗi lưu resource:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.title.trim()) {
      alert("Vui lòng nhập tên tài nguyên.");
      return;
    }
    const newItem = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString(),
    };
    save([newItem, ...resources]);
    setForm({ title: "", type: "Video", link: "", note: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Xóa tài nguyên này?")) return;
    save(resources.filter((r) => r.id !== id));
  };

  return (
    <div className="mentor-page">
      <div>
        <h2 className="mentor-title">Quản lý Tài nguyên</h2>
        <p className="mentor-subtitle">
          Lưu và chia sẻ tài liệu, video, bài tập để gửi cho học viên khi cần.
        </p>
      </div>

      {/* Thêm tài nguyên */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">Thêm tài nguyên mới</span>
          <span className="mentor-section-note">
            Có thể là video, PDF, link web hoặc bài tập.
          </span>
        </div>

        <div className="mentor-stat-grid" style={{ marginTop: 8 }}>
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">Tiêu đề</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="mentor-input"
                placeholder="Ví dụ: Video luyện phát âm ending sound"
              />
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">Loại tài nguyên</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="mentor-select"
              >
                <option>Video</option>
                <option>PDF</option>
                <option>Bài tập</option>
                <option>Web</option>
                <option>Khác</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">Link hoặc đường dẫn</label>
              <input
                type="text"
                name="link"
                value={form.link}
                onChange={handleChange}
                className="mentor-input"
                placeholder="https://..."
              />
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">Ghi chú cách sử dụng</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: giao bài tập sau buổi luyện nói, xem trước khi vào lớp..."
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="mentor-button"
          style={{ marginTop: 8 }}
        >
          Lưu tài nguyên
        </button>
      </div>

      {/* Danh sách tài nguyên */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">Danh sách tài nguyên</span>
        </div>

        {resources.length === 0 ? (
          <p className="mentor-section-note">
            Chưa có tài nguyên nào. Bạn có thể lưu link video, bài PDF, bài tập
            để gửi nhanh cho học viên.
          </p>
        ) : (
          <div className="mentor-stat-grid">
            {resources.map((r) => (
              <div key={r.id} className="mentor-stat-card">
                <div style={{ marginBottom: 6 }}>
                  <span
                    className="mentor-badge"
                    style={{ marginRight: 8, fontSize: 10 }}
                  >
                    {r.type}
                  </span>
                  <span
                    style={{ fontWeight: 600, fontSize: 15, color: "#f9fafb" }}
                  >
                    {r.title}
                  </span>
                </div>
                {r.link && (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      fontSize: 12,
                      color: "#bfdbfe",
                      textDecoration: "underline",
                      wordBreak: "break-all",
                    }}
                  >
                    {r.link}
                  </a>
                )}
                {r.note && (
                  <p
                    style={{
                      marginTop: 6,
                      fontSize: 12,
                      color: "#e5e7eb",
                    }}
                  >
                    {r.note}
                  </p>
                )}
                <div style={{ marginTop: 10 }}>
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    className="mentor-button mentor-button-secondary"
                    style={{ fontSize: 11, paddingInline: 10 }}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chủ đề & mẹo học */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">
            Chủ đề hội thoại và mẹo từ vựng
          </span>
        </div>

        <div className="mentor-stat-grid">
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">Chủ đề hội thoại thực tế</label>
              <ul className="mentor-list">
                {defaultTopics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Mẹo học từ vựng, collocation
              </label>
              <ul className="mentor-list">
                {vocabTips.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Idioms gợi ý để dùng trong lớp
              </label>
              <ul className="mentor-list">
                {idiomExamples.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagement;
