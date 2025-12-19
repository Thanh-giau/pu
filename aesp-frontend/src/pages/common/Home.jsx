// src/pages/common/Home.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    
    // Smooth parallax & fade effect for hero
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            const scrolled = window.pageYOffset;
            const opacity = Math.max(0, 1 - scrolled / 600);
            const translateY = scrolled * 0.3;
            
            heroRef.current.style.transform = `translateY(${translateY}px)`;
            heroRef.current.style.opacity = opacity;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.fade-in-up, .stat-card, .feature-card').forEach(el => {
      observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="page-container">
      {/* Animated Background Particles */}
      <div className="particles-bg">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section - Enhanced */}
      <section className="hero enhanced-hero" ref={heroRef}>
        <div className="hero-glow-effect" />
        
        <div className="hero-content fade-in-up">
          {/* Premium Badge */}
          <div className="premium-badge">
            <span className="badge-icon">✨</span>
            <span className="badge-text">Nền tảng học AI #1 Việt Nam</span>
          </div>

          <h1 className="hero-title">
            🎓 Học Tiếng Anh<br />
            <span className="gradient-text">với AI thông minh</span>
          </h1>
          
          <p className="hero-description">
            Nền tảng học tiếng Anh thông minh với chatbot AI hỗ trợ 24/7.<br />
            Luyện nói, sửa lỗi ngữ pháp và theo dõi tiến độ học tập một cách khoa học.
          </p>

          <div className="btn-group">
            <Link to="/register" className="btn btn-primary premium-btn">
              <span className="btn-icon">🚀</span>
              <span className="btn-text">Bắt đầu học ngay</span>
              <div className="btn-shine" />
            </Link>
            <Link to="/about" className="btn btn-secondary glass-btn">
              <span className="btn-icon">📖</span>
              <span className="btn-text">Tìm hiểu thêm</span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🏆</span>
              <span className="trust-text">Chứng nhận quốc tế</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">👥</span>
              <span className="trust-text">10,000+ học viên</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <span className="trust-text">Đánh giá 4.9/5</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          <span className="scroll-text">Cuộn xuống để khám phá</span>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <div className="container" ref={statsRef}>
        <div className="stats-grid enhanced-stats">
          <div className="stat-card premium-stat">
            <div className="stat-glow stat-glow-blue" />
            <div className="stat-icon-wrapper">
              <span className="stat-emoji">👥</span>
            </div>
            <div className="stat-number" data-target="10000">10,000+</div>
            <div className="stat-label">Học viên</div>
            <div className="stat-decoration" />
          </div>

          <div className="stat-card premium-stat">
            <div className="stat-glow stat-glow-green" />
            <div className="stat-icon-wrapper">
              <span className="stat-emoji">📈</span>
            </div>
            <div className="stat-number">95%</div>
            <div className="stat-label">Tỷ lệ hài lòng</div>
            <div className="stat-decoration" />
          </div>

          <div className="stat-card premium-stat">
            <div className="stat-glow stat-glow-purple" />
            <div className="stat-icon-wrapper">
              <span className="stat-emoji">🤖</span>
            </div>
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI hỗ trợ</div>
            <div className="stat-decoration" />
          </div>

          <div className="stat-card premium-stat">
            <div className="stat-glow stat-glow-yellow" />
            <div className="stat-icon-wrapper">
              <span className="stat-emoji">⭐</span>
            </div>
            <div className="stat-number">4.9</div>
            <div className="stat-label">Đánh giá</div>
            <div className="stat-decoration" />
          </div>
        </div>

        {/* Features Section - Enhanced */}
        <div className="features-section" ref={featuresRef}>
          <div className="section-header">
            <h2 className="section-title">
              <span className="title-decoration">✨</span>
              Tính năng nổi bật
              <span className="title-decoration">✨</span>
            </h2>
            <p className="section-subtitle">
              Công nghệ AI tiên tiến giúp bạn học hiệu quả hơn
            </p>
          </div>

          <div className="features-grid enhanced-features">
            <div className="feature-card premium-feature">
              <div className="feature-glow feature-glow-blue" />
              <div className="feature-icon gradient-icon-blue">
                <span className="icon-emoji">🎤</span>
              </div>
              <h3 className="feature-title">Luyện Nói Thông Minh</h3>
              <p className="feature-description">
                Chat với AI sửa lỗi phát âm và ngữ pháp tức thì
              </p>
              <div className="feature-arrow">→</div>
            </div>

            <div className="feature-card premium-feature featured-highlight">
              <div className="featured-badge">🔥 Phổ biến</div>
              <div className="feature-glow feature-glow-purple" />
              <div className="feature-icon gradient-icon-purple">
                <span className="icon-emoji">📊</span>
              </div>
              <h3 className="feature-title">Theo Dõi Tiến Độ</h3>
              <p className="feature-description">
                Biểu đồ chi tiết và thống kê học tập cá nhân hóa
              </p>
              <div className="feature-arrow">→</div>
            </div>

            <div className="feature-card premium-feature">
              <div className="feature-glow feature-glow-green" />
              <div className="feature-icon gradient-icon-green">
                <span className="icon-emoji">🎯</span>
              </div>
              <h3 className="feature-title">Học Theo Mục Tiêu</h3>
              <p className="feature-description">
                Lộ trình học tập phù hợp với trình độ và mục tiêu
              </p>
              <div className="feature-arrow">→</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section">
          <div className="cta-card">
            <div className="cta-glow" />
            <h2 className="cta-title">Sẵn sàng bắt đầu hành trình?</h2>
            <p className="cta-description">
              Tham gia cùng 10,000+ học viên đã cải thiện tiếng Anh của họ
            </p>
            <Link to="/register" className="cta-button">
              <span className="cta-btn-text">Đăng ký miễn phí ngay</span>
              <span className="cta-btn-icon">✨</span>
              <div className="cta-btn-shine" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        /* Particles Background */
        .particles-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
          border-radius: 50%;
          animation: float-particle linear infinite;
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        /* Enhanced Hero */
        .enhanced-hero {
          position: relative;
          overflow: hidden;
          transition: opacity 0.1s linear, transform 0.1s linear;
          will-change: transform, opacity;
        }

        .hero-glow-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(106,17,203,0.3), transparent 70%);
          filter: blur(80px);
          animation: pulse-glow 4s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }

        .premium-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50px;
          margin-bottom: 30px;
          animation: float-badge 3s ease-in-out infinite;
        }

        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .badge-icon {
          font-size: 18px;
          animation: rotate-sparkle 2s linear infinite;
        }

        @keyframes rotate-sparkle {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
        }

        .badge-text {
          font-size: 14px;
          font-weight: 600;
          color: #fff;
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 24px;
          position: relative;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255,255,255,0.9);
          margin-bottom: 40px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        /* Premium Buttons */
        .premium-btn {
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(106,17,203,0.4);
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 60px rgba(106,17,203,0.6);
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { left: -100%; }
          50%, 100% { left: 100%; }
        }

        .glass-btn {
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s ease;
        }

        .glass-btn:hover {
          background: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }

        /* Trust Indicators */
        .trust-indicators {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 50px;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.8);
          font-size: 14px;
          font-weight: 500;
        }

        .trust-icon {
          font-size: 20px;
        }

        /* Scroll Indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          animation: bounce-slow 2s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }

        .scroll-mouse {
          width: 28px;
          height: 45px;
          border: 2px solid rgba(255,255,255,0.5);
          border-radius: 15px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
        }

        .scroll-wheel {
          width: 4px;
          height: 8px;
          background: rgba(255,255,255,0.8);
          border-radius: 2px;
          animation: scroll-wheel 1.5s ease-in-out infinite;
        }

        @keyframes scroll-wheel {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(12px); }
        }

        .scroll-text {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Premium Stats */
        .enhanced-stats {
          margin-top: -80px;
          position: relative;
          z-index: 10;
        }

        .premium-stat {
          position: relative;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          transform: translateY(0);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-stat:hover {
          transform: translateY(-12px) scale(1.05);
          border-color: rgba(255,255,255,0.3);
        }

        .stat-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .premium-stat:hover .stat-glow {
          opacity: 0.6;
        }

        .stat-glow-blue { background: #667eea; }
        .stat-glow-green { background: #10b981; }
        .stat-glow-purple { background: #764ba2; }
        .stat-glow-yellow { background: #f59e0b; }

        .stat-icon-wrapper {
          width: 60px;
          height: 60px;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .stat-emoji {
          font-size: 32px;
        }

        .stat-decoration {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .premium-stat:hover .stat-decoration {
          opacity: 1;
        }

        /* Enhanced Features */
        .features-section {
          margin-top: 100px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 3rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .title-decoration {
          font-size: 2rem;
          animation: twinkle 2s ease-in-out infinite;
        }

        @keyframes twinkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: rgba(255,255,255,0.7);
        }

        .premium-feature {
          position: relative;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .premium-feature:hover {
          transform: translateY(-16px) rotateX(5deg);
          border-color: rgba(255,255,255,0.3);
        }

        .featured-highlight {
          border: 2px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 40px rgba(106,17,203,0.4);
        }

        .featured-badge {
          position: absolute;
          top: -12px;
          right: 20px;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: #fff;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(245,87,108,0.4);
        }

        .feature-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .premium-feature:hover .feature-glow {
          opacity: 0.4;
        }

        .feature-glow-blue { background: #667eea; }
        .feature-glow-purple { background: #764ba2; }
        .feature-glow-green { background: #10b981; }

        .gradient-icon-blue {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .gradient-icon-purple {
          background: linear-gradient(135deg, #764ba2, #f093fb);
        }

        .gradient-icon-green {
          background: linear-gradient(135deg, #10b981, #06b6d4);
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transition: transform 0.4s ease;
        }

        .premium-feature:hover .feature-icon {
          transform: scale(1.1) rotateY(10deg);
        }

        .icon-emoji {
          font-size: 40px;
        }

        .feature-arrow {
          position: absolute;
          bottom: 24px;
          right: 24px;
          font-size: 24px;
          color: rgba(255,255,255,0.5);
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.4s ease;
        }

        .premium-feature:hover .feature-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* CTA Section */
        .cta-section {
          margin-top: 120px;
          margin-bottom: 80px;
        }

        .cta-card {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 30px;
          padding: 80px 40px;
          text-align: center;
          overflow: hidden;
        }

        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%);
          filter: blur(60px);
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .cta-title {
          position: relative;
          z-index: 1;
          font-size: 2.5rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 20px;
        }

        .cta-description {
          position: relative;
          z-index: 1;
          font-size: 1.25rem;
          color: rgba(255,255,255,0.9);
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 20px 50px;
          background: #fff;
          color: #764ba2;
          font-size: 1.25rem;
          font-weight: 700;
          border-radius: 16px;
          text-decoration: none;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          transition: transform 0.3s ease;
          z-index: 1;
        }

        .cta-button:hover {
          transform: translateY(-4px) scale(1.05);
        }

        .cta-btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(106,17,203,0.2), transparent);
          animation: shine 3s infinite;
        }

        .cta-btn-icon {
          font-size: 24px;
          animation: rotate-sparkle 2s linear infinite;
        }

        /* Animation Classes */
        .fade-in-up,
        .stat-card,
        .feature-card {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        .animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Performance optimizations */
        .premium-stat,
        .premium-feature,
        .btn {
          will-change: transform;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .trust-indicators {
            gap: 20px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .premium-badge {
            font-size: 12px;
            padding: 8px 16px;
          }

          .trust-indicators {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;