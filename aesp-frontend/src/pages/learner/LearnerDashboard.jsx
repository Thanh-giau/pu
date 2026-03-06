// src/pages/learner/LearnerDashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Mic,
  BarChart2,
  CreditCard,
  Target,
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react";
import "./styles/learner-dashboard.css";

const LearnerDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Đánh giá năng lực",
      desc: "Làm bài test để hệ thống hiểu trình độ của bạn",
      button: "Bắt đầu đánh giá",
      icon: Target,
      color: "blue",
      onClick: () => navigate("/learner/assessment"),
    },
    {
      title: "Danh sách khóa học",
      desc: "Xem và đăng ký các khóa học phù hợp",
      button: "Xem khóa học",
      icon: BookOpen,
      color: "purple",
      onClick: () => navigate("/learner/courses"),
    },
    {
      title: "Theo dõi tiến độ",
      desc: "Xem số bài hoàn thành và tỉ lệ cho từng khóa",
      button: "Xem tiến độ",
      icon: BarChart2,
      color: "green",
      onClick: () => navigate("/learner/progress"),
    },
  ];

  const practiceCards = [
    {
      title: "Luyện nói cùng AI",
      desc: "Thực hành nói tiếng Anh theo chủ đề với phản hồi realtime từ AI thông minh",
      button: "Vào phòng luyện nói",
      icon: Mic,
      gradient: "linear-gradient(135deg, #10b981, #06b6d4)",
      onClick: () => navigate("/learner/speaking"),
    },
    {
      title: "Thanh toán gói học",
      desc: "Quản lý gói học, lịch sử thanh toán và gia hạn dễ dàng",
      button: "Quản lý thanh toán",
      icon: CreditCard,
      gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
      onClick: () => navigate("/learner/payment"),
    },
  ];

  return (
    <div className="ld-page">
      {/* Hero Banner */}
      <div className="ld-hero">
        <div className="ld-hero-glow" />
        <div className="ld-hero-content">
          <div className="ld-hero-left">
            <div className="ld-hero-badge">
              <Sparkles size={14} />
              <span>AI-Powered Learning</span>
            </div>
            <h2 className="ld-hero-title">
              Bắt đầu bằng một bài đánh giá
            </h2>
            <p className="ld-hero-desc">
              Chỉ với 10–15 phút, hệ thống sẽ giúp bạn xác định trình độ và đề xuất lộ trình phù hợp nhất.
            </p>
            <button
              onClick={() => navigate("/learner/assessment")}
              className="ld-hero-btn"
            >
              <span>Bắt đầu đánh giá ngay</span>
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="ld-hero-stats">
            {[
              { icon: Target, label: "Mục tiêu", value: "Giao tiếp cơ bản" },
              { icon: Clock, label: "Thời lượng gợi ý", value: "30 phút/ngày" },
              { icon: TrendingUp, label: "Số buổi/tuần", value: "5 buổi" },
              { icon: Award, label: "Dự kiến hoàn thành", value: "3 tháng" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="ld-hero-stat">
                  <Icon size={16} style={{ opacity: 0.8 }} />
                  <div>
                    <div className="ld-stat-label">{stat.label}</div>
                    <div className="ld-stat-value">{stat.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="ld-grid-3">
        {quickActions.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={`ld-card ld-card-${card.color}`}>
              <div className="ld-card-glow" />
              <div className="ld-card-icon">
                <Icon size={24} />
              </div>
              <h3 className="ld-card-title">{card.title}</h3>
              <p className="ld-card-desc">{card.desc}</p>
              <button onClick={card.onClick} className="ld-card-btn">
                <span>{card.button}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Practice Cards */}
      <div className="ld-grid-2">
        {practiceCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="ld-practice-card">
              <div className="ld-practice-gradient" style={{ background: card.gradient }} />
              <div className="ld-practice-content">
                <div className="ld-practice-icon" style={{ background: card.gradient }}>
                  <Icon size={28} color="#fff" />
                </div>
                <h3 className="ld-practice-title">{card.title}</h3>
                <p className="ld-practice-desc">{card.desc}</p>
                <button onClick={card.onClick} className="ld-practice-btn">
                  <span>{card.button}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default LearnerDashboard;
