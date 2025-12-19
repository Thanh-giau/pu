import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, BarChart3, Clock, Mail, Phone, ArrowLeft } from 'lucide-react';
import '../../pages/common/about.css'; // IMPORT CSS

const About = () => {
  return (
    <div className="about-container">
      {/* Back Button */}
      <Link to="/" className="about-back">
        <ArrowLeft size={18} />
        Quay lại trang chủ
      </Link>

      <div className="about-content">
        {/* Hero */}
        <section className="about-hero">
          <h1>Về Chúng Tôi</h1>
          <p>Ứng dụng học tiếng Anh với AI hỗ trợ, giúp bạn nói tự tin, nghe hiểu chuẩn, chỉ trong vài phút mỗi ngày.</p>
        </section>

        {/* AI Learning */}
        <section className="about-ai">
          <div className="about-ai-grid">
            <div>
              <h2>
                <Headphones />
                Học Tiếng Anh AI
              </h2>
              <p>Nền tảng học tiếng Anh thông minh với AI hỗ trợ <strong>24/7</strong>. Bạn nói – AI sửa lỗi tức thì.</p>
              <ul>
                <li>Chat tự nhiên như người thật</li>
                <li>Phân tích lỗi & gợi ý cải thiện</li>
                <li>Cá nhân hóa lộ trình học</li>
              </ul>
            </div>
            <div className="about-stats">
              <div className="about-stat">
                <BarChart3 className="text-emerald-400" />
                <div>
                  <h3>87%</h3>
                  <p>Cải thiện sau 30 ngày</p>
                </div>
              </div>
              <div className="about-stat">
                <Clock className="text-blue-400" />
                <div>
                  <h3>5 phút</h3>
                  <p>Học mỗi ngày</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="about-links">
          <h3>Khám phá thêm</h3>
          <div className="about-links-grid">
            <Link to="/" className="about-link-card">
              <div className="about-link-icon">H</div>
              <h4>Trang chủ</h4>
              <p>Khám phá các tính năng chính</p>
            </Link>
            <Link to="/register" className="about-link-card">
              <div className="about-link-icon">R</div>
              <h4>Đăng ký</h4>
              <p>Bắt đầu học miễn phí</p>
            </Link>
            <Link to="/contact" className="about-link-card">
              <Mail />
              <h4>Liên hệ</h4>
              <p>Hỗ trợ 24/7</p>
            </Link>
          </div>
        </section>

        {/* Contact */}
        <section className="about-contact">
          <h3>Liên hệ ngay</h3>
          <div className="about-contact-grid">
            <div className="about-contact-card">
              <Mail />
              <p>Email</p>
              <a href="mailto:support@hocanhai.com">support@hocanhai.com</a>
            </div>
            <div className="about-contact-card">
              <Phone />
              <p>Hotline</p>
              <a href="tel:19001234">1900 1234</a>
            </div>
          </div>
        </section>

        {/* Mini Footer */}
        <div className="about-footer">
          © 2025 <span>Học Tiếng Anh với AI</span>
        </div>
      </div>
    </div>
  );
};

export default About;