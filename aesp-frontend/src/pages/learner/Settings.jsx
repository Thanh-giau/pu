// src/pages/learner/Settings.jsx
import React, { useState } from "react";
import { getCurrentUser } from "../../services/userApi";
import axios from "axios";
import "./learner-pages.css";

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
        displayName,
        targetLevel,
        weeklyTime,
        studyGoal,
        interests,
      });

      setMessage("Đã cập nhật hồ sơ học tập thành công.");
    } catch (err) {
      console.error(err);
      setMessage("Lỗi khi lưu hồ sơ. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Cài đặt và hồ sơ học tập
          </h1>
          <p className="mt-2 text-slate-200/80 max-w-2xl text-sm">
            Điều chỉnh hồ sơ, mục tiêu và sở thích học tập để hệ thống đề xuất
            lộ trình và bài nói phù hợp hơn với bạn.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="bg-slate-900/60 border border-slate-700 rounded-2xl px-5 py-3 text-sm text-slate-200">
            <div className="text-xs uppercase tracking-wide text-slate-400">
              Tên đăng nhập
            </div>
            <div className="font-semibold">
              {currentUser?.user?.username ||
                currentUser?.username ||
                "Học viên"}
            </div>
          </div>
        </div>
      </div>

      {/* Layout 2 cột */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form hồ sơ */}
        <form
          onSubmit={handleSave}
          className="lg:col-span-2 bg-slate-900/70 border border-slate-700 rounded-2xl p-8 shadow-lg shadow-slate-900/40"
        >
          <h2 className="text-xl font-semibold text-slate-50 mb-6">
            Hồ sơ học tập
          </h2>

          <div className="space-y-6">
            {/* Tên hiển thị */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Tên hiển thị
              </label>
              <input
                type="text"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Ví dụ: Linh Nguyễn"
              />
            </div>

            {/* Mức trình độ & thời gian */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Mức trình độ mong muốn đạt được
                </label>
                <select
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Chưa xác định</option>
                  <option value="b1">Giao tiếp hằng ngày (B1)</option>
                  <option value="b2">Giao tiếp công việc (B2)</option>
                  <option value="ielts6">IELTS 6.0</option>
                  <option value="ielts7">IELTS 7.0+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                  Thời gian dự định học mỗi tuần
                </label>
                <input
                  type="text"
                  value={weeklyTime}
                  onChange={(e) => setWeeklyTime(e.target.value)}
                  placeholder="Ví dụ: 3 giờ, 5 giờ mỗi tuần..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Mục tiêu */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Mục tiêu học tiếng Anh
              </label>
              <textarea
                value={studyGoal}
                onChange={(e) => setStudyGoal(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Ví dụ: tự tin giao tiếp với đối tác nước ngoài, thi IELTS, du học..."
              />
            </div>

            {/* Chủ đề quan tâm */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Chủ đề và lĩnh vực bạn quan tâm
              </label>
              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Ví dụ: kinh doanh, IT, phim ảnh, âm nhạc, du lịch..."
              />
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                {[
                  "Business English",
                  "Du lịch",
                  "Phỏng vấn xin việc",
                  "Thuyết trình",
                  "Giao tiếp hàng ngày",
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() =>
                      setInterests((prev) =>
                        prev
                          ? prev.includes(tag)
                            ? prev
                            : `${prev}, ${tag}`
                          : tag
                      )
                    }
                    className="px-3 py-1 rounded-full border border-slate-600 text-slate-200 hover:bg-slate-800 transition"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {message && (
              <div className="rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-sm text-slate-100">
                {message}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-6 py-2.5 rounded-xl text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {saving ? "Đang lưu..." : "Lưu hồ sơ"}
              </button>
            </div>
          </div>
        </form>

        {/* Cột bên phải */}
        <div className="space-y-6">
          <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-6 text-sm text-slate-200">
            <h3 className="font-semibold text-slate-50 mb-2">
              Cách hệ thống sử dụng hồ sơ của bạn
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Đề xuất bài nói và chủ đề phù hợp với mục tiêu.</li>
              <li>• Điều chỉnh độ khó và tốc độ bài tập.</li>
              <li>• Tạo nhắc nhở để giữ chuỗi luyện tập (streak).</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-emerald-500/80 via-teal-500/80 to-cyan-500/80 rounded-2xl p-6 text-sm text-white shadow-xl shadow-emerald-900/40">
            <h3 className="font-semibold mb-2">Mẹo giữ động lực học</h3>
            <ul className="space-y-1.5 text-xs text-emerald-50/90">
              <li>• Đặt mục tiêu nhỏ theo tuần thay vì chỉ mục tiêu lớn.</li>
              <li>• Chọn chủ đề gắn với công việc hoặc sở thích của bạn.</li>
              <li>• Luyện nói ít nhất 10 phút mỗi ngày để giữ nhịp.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
