import React, { useEffect, useState } from "react";

const emptyFeedback = {
  sessionName: "",
  learnerName: "",
  level: "A2 - Pre intermediate",
  pronunciationIssues: "",
  grammarIssues: "",
  vocabularyIssues: "",
  naturalnessIssues: "",
  strengths: "",
  suggestions: "",
  topics: "",
  vocabMethods: "",
  idioms: "",
};

const STORAGE_KEY = "mentor_feedback_entries";

const LearnerFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [form, setForm] = useState(emptyFeedback);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setFeedbackList(parsed);
    } catch (err) {
      console.error("Lỗi đọc feedback từ localStorage:", err);
    }
  }, []);

  const saveToStorage = (list) => {
    setFeedbackList(list);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (err) {
      console.error("Lỗi lưu feedback:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (!form.learnerName.trim()) {
      alert("Vui lòng nhập tên học viên.");
      return;
    }
    const newEntry = {
      id: Date.now().toString(),
      ...form,
      createdAt: new Date().toISOString(),
    };
    const next = [newEntry, ...feedbackList];
    saveToStorage(next);
    setForm(emptyFeedback);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Xóa phản hồi này?")) return;
    const next = feedbackList.filter((f) => f.id !== id);
    saveToStorage(next);
  };

  const filtered = feedbackList.filter((item) =>
    filterName
      ? item.learnerName
          ?.toLowerCase()
          .includes(filterName.trim().toLowerCase())
      : true
  );

  return (
    <div className="mentor-page">
      <div>
        <h2 className="mentor-title">Phản hồi Học viên</h2>
        <p className="mentor-subtitle">
          Ghi lại đánh giá sau mỗi buổi thực hành, xếp trình độ và chỉ ra các
          lỗi cụ thể.
        </p>
      </div>

      {/* Form tạo phản hồi */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">Tạo phản hồi mới</span>
          <span className="mentor-section-note">
            Nên viết ngắn gọn, rõ, để gửi lại cho học viên.
          </span>
        </div>

        <div className="mentor-stat-grid" style={{ marginTop: 10 }}>
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">Tên buổi học hoặc chủ đề</label>
              <input
                type="text"
                name="sessionName"
                value={form.sessionName}
                onChange={handleChange}
                className="mentor-input"
                placeholder="Ví dụ: Thực hành giới thiệu bản thân"
              />
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">Tên học viên</label>
              <input
                type="text"
                name="learnerName"
                value={form.learnerName}
                onChange={handleChange}
                className="mentor-input"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Trình độ gợi ý sau đánh giá
              </label>
              <select
                name="level"
                value={form.level}
                onChange={handleChange}
                className="mentor-select"
              >
                <option>A1 - Beginner</option>
                <option>A2 - Pre intermediate</option>
                <option>B1 - Intermediate</option>
                <option>B2 - Upper intermediate</option>
                <option>C1 - Advanced</option>
              </select>
              <p className="mentor-help">
                Có thể dự đoán từ bài test của hệ thống hoặc bài đánh giá bạn tự tổ chức.
              </p>
            </div>
          </div>

          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">Lỗi phát âm</label>
              <textarea
                name="pronunciationIssues"
                value={form.pronunciationIssues}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Thiếu ending sound s, z, phân biệt ship và sheep..."
              />
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">Lỗi ngữ pháp</label>
              <textarea
                name="grammarIssues"
                value={form.grammarIssues}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Sai thì quá khứ, quên thêm s cho he she it..."
              />
            </div>
          </div>
        </div>

        <div className="mentor-stat-grid" style={{ marginTop: 12 }}>
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Lỗi về từ vựng và cách dùng
              </label>
              <textarea
                name="vocabularyIssues"
                value={form.vocabularyIssues}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Dùng sai lose - loose, nhầm adv và adj..."
              />
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Điểm mạnh và tiến bộ của học viên
              </label>
              <textarea
                name="strengths"
                value={form.strengths}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Tự tin giao tiếp, phát âm tốt các âm có sẵn..."
              />
            </div>
          </div>

          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Độ tự nhiên và cách diễn đạt
              </label>
              <textarea
                name="naturalnessIssues"
                value={form.naturalnessIssues}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Câu còn dịch từng từ, gợi ý cách nói ngắn gọn, tự tin hơn..."
              />
            </div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Gợi ý để diễn đạt rõ ràng và tự tin hơn
              </label>
              <textarea
                name="suggestions"
                value={form.suggestions}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Tập nói theo khung câu, dùng câu mở đầu và câu chót..."
              />
            </div>
          </div>
        </div>

        <div className="mentor-stat-grid" style={{ marginTop: 12 }}>
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Chủ đề, tình huống hội thoại gợi ý
              </label>
              <textarea
                name="topics"
                value={form.topics}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Job interview, meeting online, travel, small talk..."
              />
            </div>
          </div>
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">
                Phương pháp học từ vựng, collocation
              </label>
              <textarea
                name="vocabMethods"
                value={form.vocabMethods}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: Học theo cụm đó homework, make a decision, dùng flashcard..."
              />
            </div>
          </div>
          <div>
            <div className="mentor-field-group">
              <label className="mentor-label">Idioms và cụm từ mẫu</label>
              <textarea
                name="idioms"
                value={form.idioms}
                onChange={handleChange}
                className="mentor-textarea"
                placeholder="Ví dụ: break the ice, once in a blue moon, piece of cake..."
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <button type="button" onClick={handleAdd} className="mentor-button">
            Lưu phản hồi
          </button>
        </div>
      </div>

      {/* danh sách phản hồi */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">Lịch sử phản hồi</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              className="mentor-input"
              style={{ maxWidth: 220 }}
              placeholder="Lọc theo tên học viên..."
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="mentor-section-note">
            Chưa có phản hồi nào. Sau mỗi buổi thực hành, bạn có thể lưu nhận
            xét tại đây để theo dõi tiến độ của từng học viên.
          </p>
        ) : (
          <div className="mentor-table-wrapper">
            <table className="mentor-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Học viên</th>
                  <th>Buổi học</th>
                  <th>Trình độ</th>
                  <th>Tóm tắt chính</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString("vi-VN")
                        : ""}
                    </td>
                    <td>
                      <div className="mentor-tag-strong">
                        {item.learnerName}
                      </div>
                    </td>
                    <td>{item.sessionName || "(Không đặt tên)"}</td>
                    <td>{item.level}</td>
                    <td>
                      <div>
                        <span className="mentor-tag-strong">Phát âm:</span>{" "}
                        {item.pronunciationIssues || "OK"}
                      </div>
                      <div>
                        <span className="mentor-tag-strong">Ngữ pháp:</span>{" "}
                        {item.grammarIssues || "OK"}
                      </div>
                      <div>
                        <span className="mentor-tag-strong">Từ vựng:</span>{" "}
                        {item.vocabularyIssues || "OK"}
                      </div>
                      <div>
                        <span className="mentor-tag-strong">Đề xuất:</span>{" "}
                        {item.suggestions || "Không có"}
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="mentor-button mentor-button-secondary"
                        style={{ paddingInline: 10, fontSize: 11 }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnerFeedback;
