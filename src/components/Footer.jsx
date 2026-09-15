import React from 'react';
import { 
  Code2, 
  ShieldCheck, 
  Clock, 
  Award, 
  Headphones, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { navigateTo } = useApp();

  return (
    <footer className="border-t border-slate-800/80 bg-dark-950 text-slate-400 mt-20">
      {/* Feature Highlights Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-800/60">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-brand-cyan" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Chứng chỉ giá trị</h4>
              <p className="text-xs text-slate-400 mt-0.5">Xác thực kỹ năng thực chiến với nhà tuyển dụng</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-brand-indigo" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Sở hữu trọn đời</h4>
              <p className="text-xs text-slate-400 mt-0.5">Học mọi lúc, mọi nơi, tự chủ tiến độ cá nhân</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-brand-emerald" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Hoàn tiền 100%</h4>
              <p className="text-xs text-slate-400 mt-0.5">Cam kết hài lòng trong 7 ngày đầu trải nghiệm</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-dark-900/60 border border-slate-800/80">
            <div className="w-12 h-12 rounded-xl bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6 text-brand-amber" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Hỗ trợ 1-1 Discord</h4>
              <p className="text-xs text-slate-400 mt-0.5">Mentor giải đáp thắc mắc code 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-indigo p-0.5 shadow-glow-cyan">
                <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-brand-cyan" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Code<span className="text-brand-cyan">Master</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Nền tảng đào tạo kỹ sư phần mềm thực chiến hàng đầu Việt Nam. Chúng tôi thu hẹp khoảng cách giữa giảng đường và yêu cầu tuyển dụng khắt khe của các công ty công nghệ lớn.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#github" className="w-9 h-9 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-brand-cyan transition-colors" title="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href="#youtube" className="w-9 h-9 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:border-rose-400/50 transition-colors" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#facebook" className="w-9 h-9 rounded-lg bg-dark-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:border-blue-400/50 transition-colors" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 1: Courses */}
          <div>
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Khóa Học Trọng Điểm</h5>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => navigateTo('home')} className="hover:text-brand-cyan transition-colors">Java Spring Boot 3</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-brand-cyan transition-colors">Lập trình C/C++ Hệ thống</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-brand-cyan transition-colors">Front-end React 19 & Next.js</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-brand-cyan transition-colors">SQL Server & Database Tuning</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-brand-cyan transition-colors">Python & Generative AI</button></li>
              <li><button onClick={() => navigateTo('home')} className="hover:text-brand-cyan transition-colors">Golang Microservices</button></li>
            </ul>
          </div>

          {/* Col 2: Learning & Support */}
          <div>
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Học Viên & Hỗ Trợ</h5>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => navigateTo('my-courses')} className="hover:text-brand-cyan transition-colors">Khóa học của tôi</button></li>
              <li><button onClick={() => navigateTo('checkout')} className="hover:text-brand-cyan transition-colors">Giỏ hàng & Thanh toán</button></li>
              <li><a href="#discord" className="hover:text-brand-cyan transition-colors">Cộng đồng Discord 20K+ dev</a></li>
              <li><a href="#faq" className="hover:text-brand-cyan transition-colors">Câu hỏi thường gặp (FAQ)</a></li>
              <li><a href="#privacy" className="hover:text-brand-cyan transition-colors">Chính sách bảo mật</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h5 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Liên Hệ Trực Tiếp</h5>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
                <span>Tòa nhà Keangnam Landmark 72, Cầu Giấy, Hà Nội</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="font-mono text-white">1900 6868 - (024) 7300 8888</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-cyan shrink-0" />
                <span>support@codemaster.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 CodeMaster Vietnam. Bản quyền thuộc về CodeMaster Academy.</p>
          <div className="flex items-center gap-6">
            <span>Điều khoản dịch vụ</span>
            <span>Chính sách hoàn tiền</span>
            <span>Quy chế hoạt động</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
