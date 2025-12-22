// src/pages/learner/ProgressTracking.jsx
import React, { useEffect, useState } from "react";
import "./styles/learner-progress-tracking.css";

import {
  getProgressByUser,
  addProgress,
  updateProgress,
  deleteProgress,
  incrementCompletedLessons,
  getUserProgressOverview,
} from "../../services/progressApi";
import { getCurrentUser } from "../../services/userApi";

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
    setNewProgress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProgress = async () => {
    if (!userId) {
      alert("Vui lòng đăng nhập lại.");
      return;
    }
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

      setNewProgress({
        course_id: "",
        completed_lessons: "",
        total_lessons: "",
      });
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
    const completed = prompt(
      "Nhập số bài học đã hoàn thành:",
      currentProgress.completed_lessons
    );
    if (completed === null) return;

    const total = prompt(
      "Nhập tổng số bài học:",
      currentProgress.total_lessons
    );
    if (total === null) return;

    try {
      await updateProgress(id, {
        completed_lessons: parseInt(completed),
        total_lessons: parseInt(total),
      });
      if (userId) {
        await fetchProgress(userId);
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật tiến độ:", err);
      alert("Không cập nhật được tiến độ.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tiến độ này không?")) return;
    try {
      await deleteProgress(id);
      if (userId) {
        await fetchProgress(userId);
      }
    } catch (err) {
      console.error("Lỗi khi xóa tiến độ:", err);
      alert("Không xóa được tiến độ.");
    }
  };

  const calculatePercentage = (completed, total) => {
    if (!total) return 0;
    return ((completed / total) * 100).toFixed(1);
  };

  if (!user) {
    return (
      <div className="p-6">
        <p>Vui lòng đăng nhập để xem tiến độ học.</p>
      </div>
    );
  }

  return (
    <div className="learner-progress-tracking p-6 bg-gray-50 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        📊 Theo dõi tiến độ học tập
      </h2>

      {/* Form thêm tiến độ */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Mã khóa học</label>
          <input
            type="number"
            name="course_id"
            value={newProgress.course_id}
            onChange={handleChange}
            className="border rounded px-3 py-1 w-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Bài đã hoàn thành
          </label>
          <input
            type="number"
            name="completed_lessons"
            value={newProgress.completed_lessons}
            onChange={handleChange}
            className="border rounded px-3 py-1 w-32"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tổng số bài
          </label>
          <input
            type="number"
            name="total_lessons"
            value={newProgress.total_lessons}
            onChange={handleChange}
            className="border rounded px-3 py-1 w-32"
          />
        </div>

        <button
          onClick={handleAddProgress}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Thêm tiến độ
        </button>
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {error}
        </div>
      )}

      {/* Bảng hiển thị tiến độ */}
      {loading ? (
        <p>Đang tải...</p>
      ) : progressList.length === 0 ? (
        <p>Chưa có dữ liệu tiến độ.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">Khóa học</th>
                <th className="px-3 py-2 text-left">Đã hoàn thành</th>
                <th className="px-3 py-2 text-left">Tổng bài</th>
                <th className="px-3 py-2 text-left">Tỉ lệ</th>
                <th className="px-3 py-2 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {progressList.map((p) => (
                <tr key={p._id || `${p.user_id}-${p.course_id}`}>
                  <td className="border-t px-3 py-2">{p.course_id}</td>
                  <td className="border-t px-3 py-2">
                    {p.completed_lessons}
                  </td>
                  <td className="border-t px-3 py-2">
                    {p.total_lessons}
                  </td>
                  <td className="border-t px-3 py-2">
                    {calculatePercentage(
                      p.completed_lessons,
                      p.total_lessons
                    )}
                    %
                  </td>
                  <td className="border-t px-3 py-2 space-x-2">
                    <button
                      onClick={() => handleIncrementLesson(p.course_id)}
                      className="px-2 py-1 text-xs bg-emerald-500 text-white rounded"
                    >
                      +1 bài
                    </button>
                    <button
                      onClick={() => handleUpdate(p._id, p)}
                      className="px-2 py-1 text-xs bg-yellow-500 text-white rounded"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="px-2 py-1 text-xs bg-red-500 text-white rounded"
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
  );
};

export default ProgressTracking;
