import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, MessageCircle, BookOpen, Sparkles } from "lucide-react";

const MentorDashboard = () => {
  const [stats, setStats] = useState({
    feedbackCount: 0,
    learnerCount: 0,
    resourceCount: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const feedbackRaw = localStorage.getItem("mentor_feedback_entries");
      const resourcesRaw = localStorage.getItem("mentor_resources");

      const feedback = feedbackRaw ? JSON.parse(feedbackRaw) : [];
      const resources = resourcesRaw ? JSON.parse(resourcesRaw) : [];

      const learnerNames = new Set(
        feedback
          .map((f) => f.learnerName && f.learnerName.trim().toLowerCase())
          .filter(Boolean)
      );

      setStats({
        feedbackCount: feedback.length,
        learnerCount: learnerNames.size,
        resourceCount: resources.length,
      });
    } catch (err) {
      console.error("Lỗi đọc thống kê mentor:", err);
    }
  }, []);

  const quickActions = [
    {
      icon: ClipboardList,
      title: "Đánh giá và xếp trình độ",
      desc: "Ghi lại kết quả bài đánh giá và trình độ gợi ý cho từng học viên.",
      onClick: () => navigate("/mentor/feedback"),
    },
    {
      icon: MessageCircle,
      title: "Phản hồi sau buổi thực hành",
      desc: "Lưu nhận xét chi tiết về phát âm, ngữ pháp, từ vựng và độ tự nhiên.",
      onClick: () => navigate("/mentor/feedback"),
    },
    {
      icon: BookOpen,
      title: "Tài liệu bổ sung",
      desc: "Quản lý tài liệu, bài tập và link video để gửi cho học viên.",
      onClick: () => navigate("/mentor/resources"),
    },
  ];

  const supportCards = [
    {
      title: "Chủ đề hội thoại thực tế",
      desc: "Tổng hợp sẵn nhiều chủ đề và tình huống để dùng ngay trong lớp.",
      badge: "Topics",
    },
    {
      title: "Phương pháp học từ vựng",
      desc: "Collocation, idioms và cách ôn tập để nhớ lâu hơn.",
      badge: "Vocabulary",
    },
    {
      title: "Kinh nghiệm giao tiếp với người bản xứ",
      desc: "Chia sẻ trong mục Cài đặt để làm tài liệu chung.",
      badge: "Sharing",
    },
  ];

  return (
    <div className="mentor-page">
      <div>
        <h2 className="mentor-title">Mentor Dashboard</h2>
        <p className="mentor-subtitle">
          Tổng quan công việc cố vấn và các công cụ hỗ trợ học viên.
        </p>
      </div>

      {/* thong ke */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">Thống kê nhanh</span>
          <span className="mentor-badge">Chỉ mình thấy</span>
        </div>

        <div className="mentor-stat-grid">
          <div className="mentor-stat-card">
            <div className="mentor-stat-label">Học viên đã có phản hồi</div>
            <div className="mentor-stat-value">{stats.learnerCount}</div>
          </div>
          <div className="mentor-stat-card">
            <div className="mentor-stat-label">Số buổi phản hồi</div>
            <div className="mentor-stat-value">{stats.feedbackCount}</div>
          </div>
          <div className="mentor-stat-card">
            <div className="mentor-stat-label">Tài nguyên đang có</div>
            <div className="mentor-stat-value">{stats.resourceCount}</div>
          </div>
        </div>
      </div>

      {/* hanh dong nhanh */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">Hành động chính</span>
          <span className="mentor-section-note">
            Nhảy nhanh đến các trang bạn sử dụng nhiều nhất.
          </span>
        </div>
        <div className="mentor-action-grid">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.title}
                type="button"
                onClick={item.onClick}
                className="mentor-action-card"
              >
                <div>
                  <div className="mentor-action-icon">
                    <Icon size={18} color="#e5e7ff" />
                  </div>
                  <div className="mentor-action-title">{item.title}</div>
                </div>
                <div className="mentor-action-desc">{item.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ho tro them */}
      <div className="mentor-section">
        <div className="mentor-section-header">
          <span className="mentor-section-title">
            Hỗ trợ kỹ năng giao tiếp
          </span>
          <Sparkles size={18} color="#facc15" />
        </div>
        <div className="mentor-stat-grid">
          {supportCards.map((card) => (
            <div key={card.title} className="mentor-stat-card">
              <div className="mentor-badge" style={{ marginBottom: 6 }}>
                {card.badge}
              </div>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  marginBottom: 4,
                  color: "#f9fafb",
                }}
              >
                {card.title}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "#d1d5db",
                }}
              >
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
