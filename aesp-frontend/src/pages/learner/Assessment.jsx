import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/userApi";
import axios from "axios";
import "./learner-pages.css";
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
      setMessage("Khong tim thay thong tin nguoi dung. Vui long dang nhap lai.");
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

      setMessage("Da luu danh gia ban dau thanh cong.");
    } catch (err) {
      console.error(err);
      setMessage("Loi khi luu danh gia. Vui long thu lai.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="learner-page-root learner-assessment space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Đánh giá năng lực ban đầu
          </h1>
          <p className="mt-2 text-slate-200/80 max-w-2xl text-sm">
            Bài đánh giá này sẽ giúp hệ thống hiểu rõ hơn về trình độ và mục
            tiêu học tập của bạn.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-indigo-500/40 rounded-2xl px-6 py-4 text-right">
          <div className="text-xs uppercase tracking-wide text-slate-400">
            Tài khoản
          </div>
          <div className="text-white font-semibold">
            {currentUser?.user?.username || currentUser?.username || "Hoc vien"}
          </div>
          <div className="mt-1 text-xs text-slate-400">
            ID: {userId || "khong ro"}
          </div>
        </div>
      </div>

      {/* Layout 2 cot */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Form chinh */}
        <form
          onSubmit={handleSubmit}
          className="xl:col-span-2 bg-slate-900/70 border border-slate-700/80 rounded-2xl p-8 shadow-lg shadow-slate-900/40"
        >
          <div className="space-y-6">
            {/* Trinh do hien tai */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Trình độ hiện tại của bạn
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Chọn trình độ </option>
                <option value="beginner">Mới bắt đầu </option>
                <option value="elementary">Cơ bản </option>
                <option value="intermediate">Trung binh</option>
                <option value="upper_intermediate">Khá</option>
                <option value="advanced">Nâng cao</option>
              </select>
            </div>

            {/* Diem phat am */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                    Điểm phát âm (0-100)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={pronunciationScore}
                    onChange={(e) => setPronunciationScore(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Vi du 65"
                  />
                  <span className="text-xs text-slate-400">/100</span>
                </div>
              </div>

              {/* Do tu tin */}
              <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                    Mức độ tự tin khi nói tiếng Anh
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={confidence}
                    onChange={(e) => setConfidence(e.target.value)}
                    className="flex-1 accent-indigo-500"
                  />
                  <div className="w-10 text-sm text-right text-indigo-300 font-semibold">
                    {confidence}/5
                  </div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-slate-400">
                  <span>Rất ngại nói</span>
                  <span>Rất tự tin</span>
                </div>
              </div>
            </div>

            {/* Muc tieu */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Mục tiêu học tập chính của bạn là gì?
              </label>
              <textarea
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Vi du: thi IELTS 6.5, giao tiep cong viec, du hoc..."
              />
            </div>

            {/* Chu de */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Chủ đề hoặc lĩnh vực bạn quan tâm nhất là gì?
              </label>
              <textarea
                value={focusTopics}
                onChange={(e) => setFocusTopics(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                placeholder="Vi du: du lich, kinh doanh, IT, y te, phat bieu truoc dam dong..."
              />
            </div>

            {/* Thong bao */}
            {message && (
              <div className="rounded-xl bg-slate-800 border border-slate-600 px-4 py-3 text-sm text-slate-100">
                {message}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigate("/learner")}
                className="inline-flex items-center px-4 py-2.5 rounded-xl border border-slate-600 text-sm font-medium text-slate-200 hover:bg-slate-800 transition"
              >
                Quay lai dashboard
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/40 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {saving ? "Dang luu..." : "Luu danh gia"}
              </button>
            </div>
          </div>
        </form>

        {/* Card ben phai */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-500/80 via-violet-500/80 to-blue-500/80 rounded-2xl p-6 shadow-xl shadow-indigo-900/50 text-white">
            <h3 className="text-lg font-semibold mb-2">
                Tại sao cần đánh giá ban đầu?
            </h3>
            <p className="text-sm text-indigo-50/90">
                Bài đánh giá ban đầu giúp hệ thống hiểu rõ hơn về trình độ và mục
            </p>
            <ul className="mt-4 space-y-2 text-sm text-indigo-50/90">
              <li>• Đề xuất gói học phù hợp</li>
              <li>• Tính toán độ khó bài nói</li>
              <li>• Theo dõi tiến độ thời gian</li>
            </ul>
          </div>

          <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 text-sm text-slate-200 space-y-3">
            <h4 className="font-semibold text-slate-100">
                Mẹo để hoàn thành bài đánh giá tốt nhất
            </h4>
            <ul className="space-y-1.5 text-slate-300 text-xs">
              <li>• Nhớ lại những tình huống bạn thường dùng tiếng anh.</li>
              <li>
                • Tự hỏi: Mình muốn đạt được điều gì khi học tiếng Anh?
              </li>
              <li>
                • Nếu không chắc chắn về trình độ, hãy chọn mức thấp hơn một chút.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
