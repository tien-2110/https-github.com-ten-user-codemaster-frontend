import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Code2
} from 'lucide-react';

export default function AuthModal() {
  const { authModal, closeAuthModal, login, register } = useApp();
  const [tab, setTab] = useState(authModal.initialMode || 'login'); // 'login' | 'register'
  
  // Sync tab with initialMode whenever modal opens
  React.useEffect(() => {
    if (authModal.initialMode) {
      setTab(authModal.initialMode);
    }
  }, [authModal.initialMode, authModal.isOpen]);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  if (!authModal.isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const userEmail = email.trim();
    const userName = userEmail ? userEmail.split('@')[0] : 'Học viên CodeMaster';
    login({
      email: userEmail,
      name: userName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password && confirmPassword && password !== confirmPassword) {
      alert('Mật khẩu xác nhận không trùng khớp!');
      return;
    }
    register({
      name: name.trim() || 'Học viên mới',
      email: email.trim() || 'student@codemaster.vn'
    });
  };

  // Demo accounts quick fill
  const handleDemoStudentLogin = () => {
    login({
      name: 'Nguyễn Hoàng Long',
      email: 'hoanglong.dev@codemaster.vn',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
    });
  };

  const handleDemoInstructorLogin = () => {
    login({
      name: 'Trần Minh Đức',
      email: 'duc.tran@codemaster.vn',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-md rounded-3xl bg-dark-900 border border-slate-700/80 shadow-2xl shadow-cyan-950/40 p-6 sm:p-8 my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-violet/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-dark-950/60 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header brand */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-indigo p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
              <Code2 className="w-5 h-5 text-brand-cyan" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-white">
              Code<span className="text-brand-cyan">Master</span> ID
            </h3>
            <p className="text-[11px] text-slate-400">Tài khoản học lập trình thực chiến</p>
          </div>
        </div>

        {/* Tabs: Đăng Nhập vs Đăng Ký */}
        <div className="grid grid-cols-2 p-1 rounded-xl bg-dark-950 border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => setTab('login')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-brand-cyan text-dark-950 shadow font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng Nhập
          </button>
          <button
            type="button"
            onClick={() => setTab('register')}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'register'
                ? 'bg-brand-cyan text-dark-950 shadow font-extrabold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Đăng Ký
          </button>
        </div>

        {/* Form: LOGIN */}
        {tab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Email hoặc tên đăng nhập</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hoanglong.dev@codemaster.vn"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs text-slate-300 font-medium">Mật khẩu</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Link đặt lại mật khẩu đã được gửi tới email của bạn!'); }} className="text-[11px] text-brand-cyan hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-dark-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-brand-cyan focus:ring-brand-cyan bg-dark-950"
                />
                <span>Ghi nhớ đăng nhập</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-dark-950 font-bold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <span>Đăng Nhập Ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Login Shortcut */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-500 block text-center">Hoặc đăng nhập nhanh bằng tài khoản thử nghiệm:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDemoStudentLogin}
                  className="px-2.5 py-2 rounded-xl bg-dark-950 border border-slate-800 hover:border-brand-cyan text-[11px] text-slate-300 hover:text-brand-cyan transition-colors flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5 text-brand-cyan" />
                  <span>Học viên Long</span>
                </button>

                <button
                  type="button"
                  onClick={handleDemoInstructorLogin}
                  className="px-2.5 py-2 rounded-xl bg-dark-950 border border-slate-800 hover:border-amber-400 text-[11px] text-slate-300 hover:text-amber-400 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mentor Minh Đức</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Form: REGISTER */}
        {tab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Họ và tên của bạn</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Hoàng Minh Tuấn"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Địa chỉ Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Mật khẩu (tối thiểu 6 ký tự)</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-dark-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Nhập lại mật khẩu</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-950 border border-slate-700/80 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
              <input type="checkbox" required defaultChecked className="mt-0.5 rounded border-slate-700 text-brand-cyan bg-dark-950" />
              <span>Tôi đồng ý với Điều khoản dịch vụ và Chính sách bảo mật của CodeMaster</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-dark-950 font-bold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <span>Đăng Ký Tài Khoản</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Social Authentication buttons */}
        <div className="mt-6 pt-5 border-t border-slate-800 text-center">
          <span className="text-[11px] text-slate-500 block mb-3">Hoặc tiếp tục với</span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDemoStudentLogin}
              className="flex-1 py-2 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={handleDemoStudentLogin}
              className="flex-1 py-2 rounded-xl bg-dark-950 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
