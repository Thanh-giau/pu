// src/pages/common/About.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, BarChart3, Clock, Mail, Phone, ArrowLeft, Sparkles, Users, Award } from 'lucide-react';
import './about.css'; // Import CSS file

const About = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const scrolled = window.pageYOffset;
            const opacity = Math.max(0, 1 - scrolled / 500);
            heroRef.current.style.opacity = opacity;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="premium-about-container">
      {/* Animated Background Particles */}
      <div className="about-particles-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="about-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Background Glow */}
      <div className="about-bg-glow-1" />
      <div className="about-bg-glow-2" />

      {/* Back Button */}
      <Link to="/" className="premium-back-btn">
        <ArrowLeft size={20} />
        <span>Quay lại trang chủ</span>
      </Link>

      <div className="about-content-wrapper">
        {/* Hero Section */}
        <section className="about-hero-section" ref={heroRef}>
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Về chúng tôi</span>
          </div>
          
          <h1 className="about-hero-title">
            <span className="gradient-text">Học Tiếng Anh</span>
            <br />
            với AI thông minh
          </h1>
          
          <p className="about-hero-description">
            Ứng dụng học tiếng Anh với AI hỗ trợ, giúp bạn nói tự tin,
            <br className="hidden md:block" />
            nghe hiểu chuẩn, chỉ trong vài phút mỗi ngày.
          </p>
        </section>

        {/* Mission Statement */}
        <section className="about-mission">
          <div className="mission-card">
            <div className="mission-icon">
              <Sparkles size={32} />
            </div>
            <h2 className="mission-title">Sứ mệnh của chúng tôi</h2>
            <p className="mission-description">
              Chúng tôi tin rằng mọi người đều có thể học tiếng Anh hiệu quả với công nghệ AI tiên tiến. 
              Mục tiêu của chúng tôi là tạo ra một nền tảng học tập thông minh, cá nhân hóa và dễ tiếp cận 
              cho tất cả mọi người.
            </p>
          </div>
        </section>

        {/* AI Learning Features */}
        <section className="about-features-section">
          <div className="features-grid-container">
            <div className="feature-content">
              <div className="feature-header">
                <div className="feature-icon-large">
                  <Headphones size={40} />
                </div>
                <h2 className="feature-main-title">Học Tiếng Anh với AI</h2>
              </div>
              
              <p className="feature-main-description">
                Nền tảng học tiếng Anh thông minh với AI hỗ trợ <strong>24/7</strong>. 
                Bạn nói – AI sửa lỗi tức thì.
              </p>
              
              <ul className="feature-list">
                <li className="feature-list-item">
                  <div className="list-icon">✓</div>
                  <span>Chat tự nhiên như người thật</span>
                </li>
                <li className="feature-list-item">
                  <div className="list-icon">✓</div>
                  <span>Phân tích lỗi & gợi ý cải thiện</span>
                </li>
                <li className="feature-list-item">
                  <div className="list-icon">✓</div>
                  <span>Cá nhân hóa lộ trình học</span>
                </li>
                <li className="feature-list-item">
                  <div className="list-icon">✓</div>
                  <span>Theo dõi tiến độ chi tiết</span>
                </li>
              </ul>
            </div>

            {/* Stats Cards */}
            <div className="stats-card-grid">
              <div className="mini-stat-card">
                <div className="stat-icon stat-icon-purple">
                  <Users size={32} />
                </div>
                <h3 className="stat-number">10,000+</h3>
                <p className="stat-label">Học viên</p>
              </div>

              <div className="mini-stat-card">
                <div className="stat-icon stat-icon-green">
                  <BarChart3 size={32} />
                </div>
                <h3 className="stat-number">87%</h3>
                <p className="stat-label">Cải thiện sau 30 ngày</p>
              </div>

              <div className="mini-stat-card">
                <div className="stat-icon stat-icon-blue">
                  <Clock size={32} />
                </div>
                <h3 className="stat-number">5 phút</h3>
                <p className="stat-label">Học mỗi ngày</p>
              </div>

              <div className="mini-stat-card">
                <div className="stat-icon stat-icon-pink">
                  <Award size={32} />
                </div>
                <h3 className="stat-number">4.9⭐</h3>
                <p className="stat-label">Đánh giá</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="about-quick-links">
          <h2 className="section-title">
            <span className="title-icon">🔗</span>
            Khám phá thêm
          </h2>
          
          <div className="quick-links-grid">
            <Link to="/" className="quick-link-card">
              <div className="link-card-glow link-glow-blue" />
              <div className="link-card-icon link-icon-blue">
                <span>🏠</span>
              </div>
              <h4 className="link-card-title">Trang chủ</h4>
              <p className="link-card-description">Khám phá các tính năng chính</p>
              <div className="link-arrow">→</div>
            </Link>

            <Link to="/register" className="quick-link-card">
              <div className="link-card-glow link-glow-green" />
              <div className="link-card-icon link-icon-green">
                <span>🚀</span>
              </div>
              <h4 className="link-card-title">Đăng ký</h4>
              <p className="link-card-description">Bắt đầu học miễn phí</p>
              <div className="link-arrow">→</div>
            </Link>

            <Link to="/login" className="quick-link-card">
              <div className="link-card-glow link-glow-purple" />
              <div className="link-card-icon link-icon-purple">
                <span>🔐</span>
              </div>
              <h4 className="link-card-title">Đăng nhập</h4>
              <p className="link-card-description">Truy cập tài khoản của bạn</p>
              <div className="link-arrow">→</div>
            </Link>
          </div>
        </section>

        {/* Contact Section */}
        <section className="about-contact-section">
          <h2 className="section-title">
            <span className="title-icon">📞</span>
            Liên hệ với chúng tôi
          </h2>
          
          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="contact-icon contact-icon-blue">
                <Mail size={28} />
              </div>
              <p className="contact-label">Email</p>
              <a href="mailto:support@hocanhai.com" className="contact-link">
                support@hocanhai.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-icon contact-icon-green">
                <Phone size={28} />
              </div>
              <p className="contact-label">Hotline</p>
              <a href="tel:19001234" className="contact-link">
                1900 1234
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="about-footer">
          <p className="footer-text">
            © 2025 <span className="footer-brand">Học Tiếng Anh với AI</span> - Tất cả quyền được bảo lưu
          </p>
        </footer>
      </div>
    </div>
  );
};

export default About;