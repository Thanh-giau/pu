// src/pages/learner/LearnerDashboard.jsx
import "./styles/learner-dashboard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const LearnerDashboard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Đánh giá năng lực ban đầu",
      desc: "Làm bài test để hệ thống hiểu trình độ hiện tại của bạn.",
      button: "Bắt đầu đánh giá",
      onClick: () => navigate("/learner/assessment"),
    },
    {
      title: "Danh sách khóa học",
      desc: "Xem và đăng ký các khóa học phù hợp với mục tiêu của bạn.",
      button: "Xem khóa học",
      onClick: () => navigate("/learner/courses"),
    },
    {
      title: "Theo dõi tiến độ",
      desc: "Xem số bài đã hoàn thành và tỉ lệ hoàn thành cho từng khóa.",
      button: "Xem tiến độ",
      onClick: () => navigate("/learner/progress"),
    },
  ];

  const practiceCards = [
    {
      title: "Luyện nói cùng AI",
      desc: "Thực hành nói tiếng Anh theo chủ đề với phản hồi realtime.",
      button: "Vào phòng luyện nói",
      onClick: () => navigate("/learner/speaking"),
    },
    {
      title: "Thanh toán gói học",
      desc: "Quản lý gói học, lịch sử thanh toán và gia hạn.",
      button: "Quản lý thanh toán",
      onClick: () => navigate("/learner/payment"),
    },
  ];

  return (
    <div className="learner-dashboard space-y-8">
      {/* Hàng đầu: card lớn đánh giá */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-lg">
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Bắt đầu bằng một bài đánh giá
          </h2>
          <p className="text-sm md:text-base text-indigo-100 max-w-xl">
            Chỉ với 10 đến 15 phút, hệ thống sẽ giúp bạn xác định trình độ và
            đề xuất lộ trình học tập phù hợp nhất.
          </p>
          <button
            onClick={() => navigate("/learner/assessment")}
            className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-white text-indigo-700 font-medium text-sm hover:bg-indigo-50 transition"
          >
            Bắt đầu đánh giá ngay
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-100">Mục tiêu</p>
            <p className="text-lg font-semibold">Giao tiếp cơ bản</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-100">Thời lượng gợi ý</p>
            <p className="text-lg font-semibold">30 phút/ngày</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-100">Số buổi/tuần</p>
            <p className="text-lg font-semibold">5 buổi</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-100">Dự kiến hoàn thành</p>
            <p className="text-lg font-semibold">3 tháng</p>
          </div>
        </div>
      </div>

      {/* Hàng 2: các hành động nhanh */}
      <div className="grid md:grid-cols-3 gap-6">
        {quickActions.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
            <button
              onClick={card.onClick}
              className="mt-4 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {card.button}
            </button>
          </div>
        ))}
      </div>

      {/* Hàng 3: luyện tập và thanh toán */}
      <div className="grid md:grid-cols-2 gap-6">
        {practiceCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.desc}</p>
            </div>
            <button
              onClick={card.onClick}
              className="mt-4 inline-flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
            >
              {card.button}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnerDashboard;
