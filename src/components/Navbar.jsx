import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Code2, 
  ShoppingCart, 
  Search, 
  Flame, 
  Menu, 
  X, 
  ChevronRight, 
  ChevronDown,
  GraduationCap,
  User,
  LogIn,
  LogOut,
  UserPlus,
  Settings,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { 
    currentPage, 
    navigateTo, 
    cart, 
    enrolledCourses, 
    isLoggedIn,
    user, 
    openAuthModal,
    logout,
    searchQuery, 
    setSearchQuery 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      navigateTo('home');
    }
    const coursesEl = document.getElementById('courses-section');
    if (coursesEl) {
      coursesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNav = (page) => {
    navigateTo(page);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-dark-950/80 border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-indigo to-brand-violet p-0.5 shadow-glow-cyan group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-dark-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-6 h-6 text-brand-cyan group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-brand-cyan transition-colors">
                  Code<span className="text-brand-cyan">Master</span>
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                  PRO
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">Học Lập Trình Thực Chiến</p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <form 
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md mx-4 relative"
          >
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm khóa học: Java, React, C++, SQL Server..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-900 border border-slate-700/80 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/50 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Xóa
                </button>
              )}
            </div>
          </form>

          {/* Desktop Navigation Links & Actions */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => handleNav('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home' ? 'text-brand-cyan font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Khám phá
            </button>

            <button
              onClick={() => {
                handleNav('home');
                setTimeout(() => {
                  const el = document.getElementById('courses-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Khóa học nổi bật
            </button>

            {/* My Courses Button with live enrolled badge */}
            <button
              onClick={() => handleNav('my-courses')}
              className={`relative flex items-center gap-2 text-sm font-medium px-3.5 py-1.5 rounded-lg border transition-all ${
                currentPage === 'my-courses'
                  ? 'bg-brand-indigo/15 border-brand-indigo/40 text-brand-indigo font-semibold'
                  : 'border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 bg-dark-900/60'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-brand-indigo" />
              <span>Khóa học của tôi</span>
              {enrolledCourses.length > 0 && (
                <span className="ml-0.5 text-xs font-bold px-1.5 py-0.2 rounded-full bg-brand-indigo text-white">
                  {enrolledCourses.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => handleNav('checkout')}
              className="relative p-2.5 rounded-xl bg-dark-900 border border-slate-700/80 text-slate-300 hover:text-brand-cyan hover:border-brand-cyan/40 transition-all group"
              title="Xem giỏ hàng"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cart.length}
                </span>
              )}
            </button>

            {/* Account / Avatar Section */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                {/* Student Profile Pill with Click to open dropdown */}
                <div 
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 pl-2 p-1.5 rounded-xl hover:bg-dark-900 border border-transparent hover:border-slate-800 cursor-pointer group transition-all"
                  title="Tài khoản học viên - Bấm để xem tùy chọn đăng nhập/đăng ký"
                >
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-9 h-9 rounded-full ring-2 ring-brand-cyan/40 object-cover group-hover:ring-brand-cyan transition-all"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-dark-950"></span>
                  </div>
                  <div className="hidden xl:block text-left">
                    <div className="text-xs font-semibold text-slate-200 group-hover:text-brand-cyan transition-colors flex items-center gap-1">
                      <span>{user.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-400 font-medium">
                      <Flame className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{user.streak} ngày streak</span>
                    </div>
                  </div>
                </div>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-dark-900/95 backdrop-blur-xl border border-slate-700/80 shadow-2xl shadow-cyan-950/40 p-2 z-50 animate-fadeIn space-y-1">
                    {/* User summary card */}
                    <div className="p-3 rounded-xl bg-dark-950 border border-slate-800/80 mb-2">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-cyan/40" />
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-white truncate">{user.name}</div>
                          <div className="text-[11px] text-slate-400 truncate">{user.email}</div>
                          <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.2 rounded bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
                            {user.role || 'PRO STUDENT'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <button
                      onClick={() => handleNav('my-courses')}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 hover:text-brand-cyan transition-colors"
                    >
                      <GraduationCap className="w-4 h-4 text-brand-indigo" />
                      <span>Khóa học của tôi</span>
                      {enrolledCourses.length > 0 && (
                        <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-brand-indigo/30 text-brand-indigo">
                          {enrolledCourses.length}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        openAuthModal('login');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 hover:text-brand-cyan transition-colors"
                    >
                      <LogIn className="w-4 h-4 text-brand-cyan" />
                      <span>Đăng nhập tài khoản khác</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        openAuthModal('register');
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:bg-slate-800/70 hover:text-brand-cyan transition-colors"
                    >
                      <UserPlus className="w-4 h-4 text-emerald-400" />
                      <span>Tạo tài khoản mới</span>
                    </button>

                    <div className="pt-1 border-t border-slate-800 mt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/40 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* If not logged in: Guest avatar & Auth buttons */
              <div className="flex items-center gap-2.5">
                {/* Guest Avatar - Clicking it directly triggers Auth Modal */}
                <div
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl bg-dark-900/90 hover:bg-dark-900 border border-slate-800 hover:border-brand-cyan/50 cursor-pointer group transition-all"
                  title="Tài khoản học viên - Bấm để Đăng nhập hoặc Đăng ký"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-brand-cyan group-hover:border-brand-cyan/60 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-slate-300 group-hover:text-brand-cyan transition-colors">
                      Tài khoản
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Đăng nhập / Đăng ký
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openAuthModal('register')}
                  className="hidden xl:flex px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo text-dark-950 hover:from-cyan-400 hover:to-indigo-500 font-extrabold text-xs shadow-glow-cyan transition-all items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Đăng Ký</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Right Controls: Cart & Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => handleNav('checkout')}
              className="relative p-2 rounded-lg bg-dark-900 border border-slate-800 text-slate-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search bar */}
        <div className="pb-3 md:hidden">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm khóa học..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-dark-900 border border-slate-800 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-cyan"
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800/80 bg-dark-950/95 backdrop-blur-2xl px-4 py-5 space-y-4">
          {isLoggedIn ? (
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'} alt={user?.name || 'Học viên'} className="w-10 h-10 rounded-full ring-2 ring-brand-cyan" />
                <div>
                  <div className="text-sm font-semibold text-white">{user?.name || 'Học viên CodeMaster'}</div>
                  <div className="flex items-center gap-1 text-xs text-amber-400">
                    <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Streak {user?.streak || 1} ngày</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="p-2 rounded-lg bg-dark-900 text-rose-400 text-xs flex items-center gap-1"
                title="Đăng xuất"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="py-2.5 rounded-xl border border-slate-700 text-slate-200 text-xs font-bold text-center flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-4 h-4 text-brand-cyan" />
                <span>Đăng Nhập</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('register');
                }}
                className="py-2.5 rounded-xl bg-brand-cyan text-dark-950 text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow"
              >
                <UserPlus className="w-4 h-4" />
                <span>Đăng Ký</span>
              </button>
            </div>
          )}

          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'home' ? 'bg-brand-cyan/15 text-brand-cyan' : 'text-slate-300'
              }`}
            >
              <span>Trang chủ</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleNav('my-courses')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'my-courses' ? 'bg-brand-cyan/15 text-brand-cyan' : 'text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-brand-indigo" />
                <span>Khóa học của tôi</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-brand-indigo/30 text-brand-indigo font-bold">
                {enrolledCourses.length}
              </span>
            </button>

            <button
              onClick={() => handleNav('checkout')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                currentPage === 'checkout' ? 'bg-brand-cyan/15 text-brand-cyan' : 'text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-brand-cyan" />
                <span>Giỏ hàng & Thanh toán</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-xs bg-rose-500/20 text-rose-400 font-bold">
                {cart.length}
              </span>
            </button>

            {isLoggedIn && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-brand-cyan" />
                  <span>Đổi tài khoản đăng nhập</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
