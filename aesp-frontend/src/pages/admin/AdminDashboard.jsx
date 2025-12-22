import React from "react";
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Plus,
  Mail,
  FileText,
  Settings,
  MoreHorizontal,
  Star,
  UserCheck,
  CreditCard,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // 1. Mock Data: Stats Cards
  const stats = [
    {
      id: 1,
      label: "Tổng người dùng",
      value: "12,345",
      trend: "+12%",
      icon: Users,
      color: "blue",
    },
    {
      id: 2,
      label: "Khóa học đang hoạt động",
      value: "48",
      trend: "+5%",
      icon: BookOpen,
      color: "purple",
    },
    {
      id: 3,
      label: "Doanh thu tháng",
      value: "₫2.4B",
      trend: "+18%",
      icon: DollarSign,
      color: "green",
    },
    {
      id: 4,
      label: "Tỷ lệ hoàn thành",
      value: "87%",
      trend: "+3%",
      icon: TrendingUp,
      color: "pink",
    },
  ];

  // 2. Mock Data: Quick Actions
  const quickActions = [
    { label: "Thêm người dùng", icon: Plus, style: "action-blue" },
    { label: "Tạo khóa học", icon: FileText, style: "action-purple" },
    { label: "Gửi thông báo", icon: Mail, style: "action-green" },
    { label: "Cấu hình hệ thống", icon: Settings, style: "action-pink" },
  ];

  // 3. Mock Data: Recent Activities
  const activities = [
    {
      user: "Nguyễn Văn A",
      action: "đã đăng ký khóa",
      target: "React Pro",
      time: "2 phút trước",
      type: "enroll",
      icon: UserCheck,
    },
    {
      user: "Trần Thị B",
      action: "đã hoàn thành",
      target: "Node.js Master",
      time: "15 phút trước",
      type: "complete",
      icon: Star,
    },
    {
      user: "Lê Văn C",
      action: "thanh toán thành công",
      target: "Gói Premium",
      time: "1 giờ trước",
      type: "payment",
      icon: CreditCard,
    },
    {
      user: "Phạm Thị D",
      action: "đã bình luận vào",
      target: "Bài 4: Hooks",
      time: "3 giờ trước",
      type: "comment",
      icon: MessageCircle,
    },
  ];

  // 4. Mock Data: Top Courses
  const topCourses = [
    {
      rank: 1,
      name: "Fullstack Web Development",
      students: 1240,
      rating: 4.9,
      revenue: "₫1.2B",
    },
    {
      rank: 2,
      name: "ReactJS Advanced",
      students: 850,
      rating: 4.8,
      revenue: "₫890M",
    },
    {
      rank: 3,
      name: "Python for Data Science",
      students: 620,
      rating: 4.7,
      revenue: "₫560M",
    },
    {
      rank: 4,
      name: "UI/UX Design Fundamentals",
      students: 450,
      rating: 4.6,
      revenue: "₫320M",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-container">
        {/* ===== SECTION 1: STATS CARDS ===== */}
        <div className="admin-stats-grid">
          {stats.map((stat) => (
            <div key={stat.id} className={`admin-stat-card stat-${stat.color}`}>
              {/* Hiệu ứng Glow nền */}
              <div className="stat-glow"></div>
              
              <div className="stat-content">
                <div className="stat-header">
                  <div className="stat-icon-wrapper">
                    <stat.icon size={28} strokeWidth={2.5} />
                  </div>
                  <div className="stat-trend up">
                    <ArrowUpRight size={16} />
                    {stat.trend}
                  </div>
                </div>
                
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== SECTION 2: QUICK ACTIONS ===== */}
        <div className="quick-actions">
          <h2 className="section-title">Hành động nhanh</h2>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <button key={index} className={`quick-action-btn ${action.style}`}>
                <action.icon size={20} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===== SECTION 3: 2-COLUMN LAYOUT ===== */}
        <div className="admin-two-col">
          {/* Left Col: Recent Activities */}
          <div className="admin-card">
            <div className="card-header">
              <h3 className="card-title">
                <TrendingUp size={20} className="text-blue-400" />
                Hoạt động gần đây
              </h3>
              <button className="icon-btn">
                <MoreHorizontal size={20} color="rgba(255,255,255,0.5)" />
              </button>
            </div>
            
            <div className="activities-list">
              {activities.map((item, idx) => (
                <div key={idx} className="activity-item">
                  <div className={`activity-icon ${item.type}`}>
                    <item.icon size={18} />
                  </div>
                  <div className="activity-content">
                    <p className="activity-text">
                      <strong>{item.user}</strong> {item.action}{" "}
                      <span className="activity-target">{item.target}</span>
                    </p>
                    <p className="activity-time">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Top Courses */}
          <div className="admin-card">
            <div className="card-header">
              <h3 className="card-title">
                <Star size={20} className="text-yellow-400" />
                Khóa học hàng đầu
              </h3>
              <button className="view-all-btn">Xem tất cả</button>
            </div>

            <div className="courses-list">
              {topCourses.map((course, idx) => (
                <div key={idx} className="course-item">
                  <div className="course-rank">{course.rank}</div>
                  <div className="course-info">
                    <h4 className="course-name">{course.name}</h4>
                    <div className="course-meta">
                      <div className="course-students">
                        <Users size={14} /> {course.students}
                      </div>
                      <div className="course-rating">
                        <Star size={14} fill="#fbbf24" stroke="none" /> {course.rating}
                      </div>
                    </div>
                  </div>
                  <div className="course-revenue">{course.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;