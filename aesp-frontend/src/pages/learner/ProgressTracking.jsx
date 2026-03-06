// src/pages/learner/ProgressTracking.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart2,
  Plus,
  Edit2,
  Trash2,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

import {
  getProgressByUser,
  addProgress,
  updateProgress,
  deleteProgress,
  incrementCompletedLessons,
  getUserProgressOverview,
} from "../../services/progressApi";
import { getCurrentUser } from "../../services/userApi";
import "./styles/learner-progress-tracking.css";

const ProgressTracking = () => {
  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProgress, setNewProgress] = useState({
    course_id: "",
    completed_lessons: "",
    total_lessons: "",
  });
  const [error, setError] = useState("");

  const user = getCurrentUser();
  const userId =
    user?.user?._id || user?._id || user?.id || user?.userId || null;

  useEffect(() => {
    if (userId) {
      fetchProgress(userId);
    } else {
      setLoading(false);
    }
  }, [userId]);

  const fetchProgress = async (uid) => {
    try {
      setLoading(true);
      setError("");
      let data;
      try {
        data = await getUserProgressOverview(uid);
      } catch (err) {
        console.log("Chuyển sang getProgressByUser (dự phòng):", err?.message);
        data = await getProgressByUser(uid);
      }
      setProgressList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi khi tải tiến độ:", err);
      setError("Không tải được tiến độ, vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProgress = async () => {
    if (!userId) { alert("Vui lòng đăng nhập lại."); return; }
    if (!newProgress.course_id || !newProgress.total_lessons) {
      alert("Vui lòng nhập mã khóa học và tổng số bài.");
      return;
    }
    try {
      await addProgress({
        user_id: userId,
        course_id: parseInt(newProgress.course_id),
        completed_lessons: parseInt(newProgress.completed_lessons) || 0,
        total_lessons: parseInt(newProgress.total_lessons),
      });
      setNewProgress({ course_id: "", completed_lessons: "", total_lessons: "" });
      await fetchProgress(userId);
    } catch (err) {
      console.error("Lỗi khi thêm tiến độ:", err);
      alert("Không thêm được tiến độ, hãy kiểm tra lại dữ liệu.");
    }
  };

  const handleIncrementLesson = async (courseId) => {
    if (!userId) return;
    try {
      await incrementCompletedLessons(userId, courseId);
      await fetchProgress(userId);
    } catch (err) {
      console.error("Lỗi khi cập nhật bài học:", err);
      alert("Không cập nhật được số bài đã hoàn thành.");
    }
  };

  const handleUpdate = async (id, currentProgress) => {
    const completed = prompt("Nhập số bài học đã hoàn thành:", currentProgress.completed_lessons);
    if (completed === null) return;
    const total = prompt("Nhập tổng số bài học:", currentProgress.total_lessons);
    if (total === null) return;
    try {
      await updateProgress(id, { completed_lessons: parseInt(completed), total_lessons: parseInt(total) });
      if (userId) await fetchProgress(userId);
    } catch (err) {
      console.error("Lỗi khi cập nhật tiến độ:", err);
      alert("Không cập nhật được tiến độ.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tiến độ này không?")) return;
    try {
      await deleteProgress(id);
      if (userId) await fetchProgress(userId);
    } catch (err) {
      console.error("Lỗi khi xóa tiến độ:", err);
      alert("Không xóa được tiến độ.");
    }
  };

  const pct = (c, t) => (t ? ((c / t) * 100).toFixed(1) : 0);

  if (!user) {
    return (
      <div style={{ padding: 24, color: "rgba(255,255,255,.7)" }}>
        <p>Vui lòng đăng nhập để xem tiến độ học.</p>
      </div>
    );
  }

  return (
    <div className="pt-page">
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <BarChart2 size={28} style={{ color: "#818cf8" }} />
        <div>
          <h2 className="pt-title">Theo dõi tiến độ</h2>
          <p className="pt-subtitle">Quản lý tiến độ học tập theo từng khóa học.</p>
        </div>
      </div>

      {/* Add Form */}
      <div className="pt-glass-card">
        <h3 className="pt-card-title">
          <Plus size={18} /> Thêm tiến độ mới
        </h3>
        <div className="pt-form-row">
          <div className="pt-field">
            <label>Mã khóa học</label>
            <input type="number" name="course_id" value={newProgress.course_id} onChange={handleChange} placeholder="VD: 1" />
          </div>
          <div className="pt-field">
            <label>Bài đã hoàn thành</label>
            <input type="number" name="completed_lessons" value={newProgress.completed_lessons} onChange={handleChange} placeholder="0" />
          </div>
          <div className="pt-field">
            <label>Tổng số bài</label>
            <input type="number" name="total_lessons" value={newProgress.total_lessons} onChange={handleChange} placeholder="20" />
          </div>
          <button onClick={handleAddProgress} className="pt-add-btn">
            <Plus size={16} /> Thêm
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="pt-error">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Progress Table */}
      {loading ? (
        <p style={{ color: "rgba(255,255,255,.6)" }}>Đang tải...</p>
      ) : progressList.length === 0 ? (
        <div className="pt-empty">Chưa có dữ liệu tiến độ.</div>
      ) : (
        <div className="pt-glass-card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="pt-table">
            <thead>
              <tr>
                <th>Khóa học</th>
                <th>Đã hoàn thành</th>
                <th>Tổng bài</th>
                <th>Tiến độ</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {progressList.map((p) => {
                const percent = pct(p.completed_lessons, p.total_lessons);
                return (
                  <tr key={p._id || `${p.user_id}-${p.course_id}`}>
                    <td style={{ fontWeight: 600 }}>{p.course_id}</td>
                    <td>{p.completed_lessons}</td>
                    <td>{p.total_lessons}</td>
                    <td>
                      <div className="pt-progress-wrap">
                        <div className="pt-progress-bar">
                          <div className="pt-progress-fill" style={{ width: `${Math.min(percent, 100)}%` }} />
                        </div>
                        <span className="pt-progress-text">{percent}%</span>
                      </div>
                    </td>
                    <td>
                      <div className="pt-action-group">
                        <button onClick={() => handleIncrementLesson(p.course_id)} className="pt-btn pt-btn-green" title="+1 bài">
                          <ChevronUp size={14} /> +1
                        </button>
                        <button onClick={() => handleUpdate(p._id, p)} className="pt-btn pt-btn-amber" title="Sửa">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(p._id)} className="pt-btn pt-btn-red" title="Xóa">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default ProgressTracking;
