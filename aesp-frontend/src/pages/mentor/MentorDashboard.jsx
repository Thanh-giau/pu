// src/pages/mentor/MentorDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  BookOpen,
  Settings,
  Users,
  TrendingUp,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import { getCurrentUser } from "../../services/userApi";

const MentorDashboard = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [stats, setStats] = useState({
    feedbackCount: 0,
    learnerCount: 0,
    resourceCount: 0,
  });

  useEffect(() => {
    try {
      const fb = JSON.parse(localStorage.getItem("mentor_feedback_entries") || "[]");
      const res = JSON.parse(localStorage.getItem("mentor_resources") || "[]");
      const learners = new Set(fb.map((i) => i.learnerName?.toLowerCase()).filter(Boolean));
      setStats({
        feedbackCount: fb.length,
        learnerCount: learners.size,
        resourceCount: res.length,
      });
    } catch { }
  }, []);

  const statCards = [
    { label: "Phản hồi", value: stats.feedbackCount, icon: MessageSquare, gradient: "linear-gradient(135deg, #0ea5e9, #06b6d4)" },
    { label: "Học viên", value: stats.learnerCount, icon: Users, gradient: "linear-gradient(135deg, #10b981, #34d399)" },
    { label: "Tài nguyên", value: stats.resourceCount, icon: BookOpen, gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)" },
  ];

  const actions = [
    { title: "Phản hồi học viên", desc: "Đánh giá buổi thực hành và chỉ ra lỗi", icon: MessageSquare, path: "/mentor/feedback" },
    { title: "Quản lý tài nguyên", desc: "Thêm video, bài tập, link tham khảo", icon: BookOpen, path: "/mentor/resources" },
    { title: "Cài đặt", desc: "Tùy chỉnh trình độ mặc định, ghi chú", icon: Settings, path: "/mentor/settings" },
  ];

  const tips = [
    { icon: TrendingUp, text: "Ghi phản hồi ngay sau mỗi buổi để không quên chi tiết." },
    { icon: Clock, text: "Chia nhỏ mục tiêu cho học viên theo tuần, không theo tháng." },
    { icon: Star, text: "Dùng ví dụ cụ thể khi chỉ ra lỗi phát âm hoặc ngữ pháp." },
  ];

  return (
    <div className="mentor-page">
      {/* Hero */}
      <div className="md-hero">
        <div className="md-hero-glow" />
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 className="md-hero-title">
            Xin chào, {user?.user?.username || user?.username || "Mentor"} 👋
          </h1>
          <p className="md-hero-desc">
            Hôm nay hãy giúp học viên tiến bộ hơn. Dưới đây là tổng quan hoạt động của bạn.
          </p>
        </div>

        {/* Stats */}
        <div className="md-stats-row">
          {statCards.map((s) => (
            <div key={s.label} className="md-stat-item">
              <div className="md-stat-icon" style={{ background: s.gradient }}>
                <s.icon size={20} />
              </div>
              <div>
                <div className="md-stat-number">{s.value}</div>
                <div className="md-stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="md-section-title">Thao tác nhanh</h2>
        <div className="mentor-action-grid">
          {actions.map((a) => (
            <button
              key={a.title}
              className="mentor-action-card"
              onClick={() => navigate(a.path)}
            >
              <div className="mentor-action-icon">
                <a.icon size={20} color="#fff" />
              </div>
              <div className="mentor-action-title">{a.title}</div>
              <div className="mentor-action-desc">{a.desc}</div>
              <ChevronRight size={16} style={{ color: "rgba(255,255,255,.35)", marginTop: 4 }} />
            </button>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">
            <Star size={18} style={{ color: "#fbbf24" }} /> Mẹo cho Mentor
          </span>
        </div>
        <div className="md-tips-list">
          {tips.map((t, i) => (
            <div key={i} className="md-tip-item">
              <div className="md-tip-icon">
                <t.icon size={16} />
              </div>
              <span>{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .md-hero {
          position: relative;
          background: rgba(255,255,255,.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,.1);
          border-radius: 24px;
          padding: 2.5rem;
          overflow: hidden;
        }
        .md-hero-glow {
          position: absolute;
          top: -80px; right: -80px;
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(14,165,233,.25), transparent 65%);
          filter: blur(50px);
          pointer-events: none;
        }
        .md-hero-title {
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          margin: 0 0 8px;
          background: linear-gradient(135deg, #fff, #e0f2fe, #22d3ee);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .md-hero-desc {
          font-size: 0.95rem;
          color: rgba(255,255,255,.6);
          margin: 0 0 24px;
        }

        .md-stats-row {
          display: flex; flex-wrap: wrap; gap: 16px;
          position: relative; z-index: 1;
        }
        .md-stat-item {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 20px;
          background: rgba(0,0,0,.2);
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 16px;
          min-width: 160px;
          transition: all 0.3s ease;
        }
        .md-stat-item:hover {
          transform: translateY(-3px);
          border-color: rgba(255,255,255,.15);
          box-shadow: 0 8px 24px rgba(0,0,0,.2);
        }
        .md-stat-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          box-shadow: 0 4px 14px rgba(0,0,0,.2);
        }
        .md-stat-number { font-size: 1.5rem; font-weight: 800; color: #fff; }
        .md-stat-label { font-size: 0.78rem; color: rgba(255,255,255,.55); }

        .md-section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
        }

        .md-tips-list { display: flex; flex-direction: column; gap: 10px; }
        .md-tip-item {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 16px;
          background: rgba(255,255,255,.03);
          border-radius: 14px;
          font-size: 0.9rem;
          color: rgba(255,255,255,.75);
          transition: background 0.2s;
        }
        .md-tip-item:hover { background: rgba(255,255,255,.06); }
        .md-tip-icon {
          flex-shrink: 0;
          width: 32px; height: 32px;
          border-radius: 10px;
          background: rgba(14,165,233,.12);
          display: flex; align-items: center; justify-content: center;
          color: #22d3ee;
        }

        @media (max-width: 768px) {
          .md-hero { padding: 1.5rem; }
          .md-hero-title { font-size: 1.5rem; }
          .md-stats-row { flex-direction: column; }
          .md-stat-item { min-width: auto; }
        }
      `}</style>
    </div>
  );
};

export default MentorDashboard;
