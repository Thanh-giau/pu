import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900/30 to-blue-900/20 border-t border-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 lg:py-16">
            {/* Brand */}
            <div className="text-center md:text-left">
              <div className="flex flex-col items-center md:items-start gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full flex items-center justify-center border border-white/20">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Học Tiếng Anh AI
                  </h3>
                  <p className="text-sm text-white/60 mt-2 max-w-sm leading-relaxed">
                    Nền tảng học tiếng Anh thông minh với AI hỗ trợ 24/7
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-white/90 mb-6 text-sm tracking-wide">Quick Links</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <a
                    href="#home"
                    className="block text-white/70 hover:text-blue-400 transition-all duration-300 hover:translate-x-2 text-sm font-medium"
                  >
                    Trang chủ
                  </a>
                  <a
                    href="#about"
                    className="block text-white/70 hover:text-purple-400 transition-all duration-300 hover:translate-x-2 text-sm font-medium"
                  >
                    Giới thiệu
                  </a>
                </div>
                <div className="space-y-3">
                  <a
                    href="#features"
                    className="block text-white/70 hover:text-emerald-400 transition-all duration-300 hover:translate-x-2 text-sm font-medium"
                  >
                    Tính năng
                  </a>
                  <a
                    href="#contact"
                    className="block text-white/70 hover:text-rose-400 transition-all duration-300 hover:translate-x-2 text-sm font-medium"
                  >
                    Liên hệ
                  </a>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-white/90 mb-6 text-sm tracking-wide">Liên hệ</h4>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <p className="text-white/70 text-sm">Email</p>
                  <a
                    href="mailto:support@hocanhai.com"
                    className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors duration-300"
                  >
                    support@hocanhai.com
                  </a>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="text-white/70 text-sm">Hotline</p>
                  <a
                    href="tel:19001234"
                    className="text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors duration-300"
                  >
                    1900 1234
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 pb-6">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
              <p className="text-white/50 text-sm">
                © {new Date().getFullYear()} Học Tiếng Anh với AI. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-white/60 text-sm font-medium">Made with ❤️ in Vietnam</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;