import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content fade-in-up">
          <h1>🎓 Học Tiếng Anh với AI</h1>
          <p className="text-xl">
            Nền tảng học tiếng Anh thông minh với chatbot AI hỗ trợ 24/7. 
            Luyện nói, sửa lỗi ngữ pháp và theo dõi tiến độ học tập một cách khoa học.
          </p>
          <div className="btn-group">
            <Link to="/register" className="btn btn-primary">
              🚀 Bắt đầu học ngay
            </Link>
            <Link to="/about" className="btn btn-secondary">
              📖 Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="container">
        <div className="stats-grid">
          <div className="stat-card fade-in-up">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Học viên</div>
          </div>
          <div className="stat-card fade-in-up">
            <div className="stat-number">95%</div>
            <div className="stat-label">Tỷ lệ hài lòng</div>
          </div>
          <div className="stat-card fade-in-up">
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI hỗ trợ</div>
          </div>
          <div className="stat-card fade-in-up">
            <div className="stat-number">4.9⭐</div>
            <div className="stat-label">Đánh giá</div>
          </div>
        </div>

        {/* Features */}
        <div className="features-grid">
          <div className="feature-card fade-in-up">
            <div className="feature-icon">🎤</div>
            <h3 className="feature-title">Luyện Nói Thông Minh</h3>
            <p className="feature-description">
              Chat với AI sửa lỗi phát âm và ngữ pháp tức thì
            </p>
          </div>
          <div className="feature-card fade-in-up">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Theo Dõi Tiến Độ</h3>
            <p className="feature-description">
              Biểu đồ chi tiết và thống kê học tập cá nhân hóa
            </p>
          </div>
          <div className="feature-card fade-in-up">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Học Theo Mục Tiêu</h3>
            <p className="feature-description">
              Lộ trình học tập phù hợp với trình độ và mục tiêu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;