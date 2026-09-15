import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  Clock, 
  Award, 
  BookOpen, 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function MyCoursesPage() {
  const { 
    courses, 
    enrolledCourses, 
    getCourseProgress, 
    navigateTo, 
    openCertificate,
    isLoggedIn,
    openAuthModal, 
    user 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'in-progress' | 'completed'

  // If user is not logged in
  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-dark-900 border border-slate-800 flex items-center justify-center mx-auto text-brand-cyan shadow-xl shadow-cyan-950/30">
          <BookOpen className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Bạn chưa đăng nhập tài khoản</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Vui lòng đăng nhập hoặc tạo tài khoản mới để theo dõi tiến trình học tập, lưu bài giảng và nhận chứng chỉ tốt nghiệp.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => openAuthModal('login')}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo text-dark-950 font-extrabold text-xs shadow-glow-cyan transition-all hover:scale-105"
          >
            Đăng Nhập Ngay
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="w-full sm:w-auto px-7 py-3 rounded-xl bg-dark-900 border border-slate-700 text-slate-200 font-bold text-xs transition-all hover:border-brand-cyan hover:text-white"
          >
            Tạo Tài Khoản Mới
          </button>
        </div>
      </div>
    );
  }

  // Map enrolled data to full course objects
  const ownedCourses = enrolledCourses.map(item => {
    const course = courses.find(c => c.id === item.courseId);
    const progress = getCourseProgress(item.courseId);
    return {
      ...course,
      enrolledInfo: item,
      progress
    };
  }).filter(c => c.id); // guard

  // Filter based on progress tab
  const filteredOwned = ownedCourses.filter(item => {
    if (activeTab === 'in-progress') return item.progress.percent < 100;
    if (activeTab === 'completed') return item.progress.percent === 100;
    return true;
  });

  const completedCount = ownedCourses.filter(c => c.progress.percent === 100).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* 1. STUDENT PROFILE & STATS BANNER */}
      <div className="relative rounded-3xl bg-gradient-to-r from-dark-900 via-dark-900/90 to-dark-850 border border-slate-800 p-6 sm:p-8 overflow-hidden shadow-2xl">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-brand-indigo/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* User Info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-brand-cyan shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-lg ring-2 ring-dark-950 text-dark-950">
                <CheckCircle2 className="w-4 h-4 text-dark-950 stroke-[3]" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan text-[11px] font-bold border border-brand-cyan/30">
                  PRO STUDENT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-mono">{user.email}</p>
              <div className="flex items-center gap-3 pt-1 text-xs text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-semibold">
                  <Flame className="w-4 h-4 fill-amber-400" />
                  Streak {user.streak} ngày liên tiếp
                </span>
                <span>•</span>
                <span>{ownedCourses.length} khóa học đang theo</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-center">
              <div className="text-lg sm:text-2xl font-extrabold text-white">
                {ownedCourses.length}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Khóa học</div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-center">
              <div className="text-lg sm:text-2xl font-extrabold text-brand-cyan">
                {user.hoursLearned}h
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Đã học</div>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-950/80 border border-slate-800 text-center">
              <div className="text-lg sm:text-2xl font-extrabold text-amber-400">
                {completedCount}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Chứng chỉ</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB CONTROLS & HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Khóa Học Của Tôi
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Theo dõi tiến độ học tập hàng ngày và nhận chứng nhận kỹ sư
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'all'
                ? 'bg-brand-cyan text-dark-950 font-bold shadow'
                : 'text-slate-400 hover:text-white bg-dark-900 border border-slate-800'
            }`}
          >
            Tất cả ({ownedCourses.length})
          </button>

          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'in-progress'
                ? 'bg-brand-cyan text-dark-950 font-bold shadow'
                : 'text-slate-400 hover:text-white bg-dark-900 border border-slate-800'
            }`}
          >
            Đang học ({ownedCourses.length - completedCount})
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'completed'
                ? 'bg-brand-cyan text-dark-950 font-bold shadow'
                : 'text-slate-400 hover:text-white bg-dark-900 border border-slate-800'
            }`}
          >
            Đã xong ({completedCount})
          </button>
        </div>
      </div>

      {/* 3. OWNED COURSES LIST */}
      {filteredOwned.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOwned.map(item => {
            const isCompleted = item.progress.percent === 100;
            const firstLessonId = item.modules[0]?.lessons[0]?.id;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-dark-900/80 border border-slate-800 hover:border-brand-cyan/40 p-5 space-y-4 transition-all group flex flex-col justify-between"
              >
                <div className="flex gap-4 items-start">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-20 sm:w-28 sm:h-24 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-brand-cyan uppercase">
                        {item.categoryName}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {item.enrolledInfo.lastAccessed}
                      </span>
                    </div>

                    <h3 
                      onClick={() => navigateTo('course-detail', { courseId: item.id })}
                      className="text-sm sm:text-base font-bold text-white group-hover:text-brand-cyan cursor-pointer transition-colors line-clamp-2"
                    >
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-400">
                      Giảng viên: {item.instructor.name}
                    </p>
                  </div>
                </div>

                {/* Progress Bar & Counter */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      Tiến trình: <strong className="text-white">{item.progress.completed}</strong> / {item.progress.total} bài
                    </span>
                    <span className={`font-bold ${isCompleted ? 'text-emerald-400' : 'text-brand-cyan'}`}>
                      {item.progress.percent}% {isCompleted && '✓ Hoàn thành'}
                    </span>
                  </div>

                  <div className="h-2 w-full bg-dark-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isCompleted
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                          : 'bg-gradient-to-r from-brand-cyan to-brand-indigo'
                      }`}
                      style={{ width: `${item.progress.percent}%` }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => navigateTo('player', { 
                      player: { 
                        courseId: item.id, 
                        lessonId: firstLessonId 
                      } 
                    })}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-brand-cyan/15 hover:bg-brand-cyan text-brand-cyan hover:text-dark-950 border border-brand-cyan/40 hover:border-brand-cyan text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>{isCompleted ? 'Học lại' : 'Tiếp tục bài học'}</span>
                  </button>

                  {isCompleted && (
                    <button
                      onClick={() => openCertificate(item)}
                      className="py-2.5 px-4 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-dark-950 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      title="Xem chứng chỉ tốt nghiệp"
                    >
                      <Award className="w-4 h-4 text-amber-400" />
                      <span>Chứng chỉ</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-2xl bg-dark-900/40 border border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">Chưa có khóa học nào trong mục này</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Hãy đăng ký thêm các khóa học chất lượng để nâng tầm sự nghiệp lập trình của bạn!
          </p>
          <button
            onClick={() => navigateTo('home')}
            className="mt-4 px-5 py-2.5 rounded-xl bg-brand-cyan text-dark-950 text-xs font-bold shadow-glow-cyan"
          >
            Khám phá khóa học
          </button>
        </div>
      )}
    </div>
  );
}
