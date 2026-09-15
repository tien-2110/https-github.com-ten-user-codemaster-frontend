import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatVND } from '../components/CourseCard';
import { 
  Star, 
  Clock, 
  BookOpen, 
  Calendar, 
  ShieldCheck, 
  Award, 
  PlayCircle, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ShoppingCart, 
  ArrowLeft, 
  Sparkles,
  Share2,
  Users,
  Video
} from 'lucide-react';

export default function CourseDetailPage() {
  const { 
    courses, 
    selectedCourseId, 
    navigateTo, 
    addToCart, 
    isInCart, 
    isEnrolled, 
    openTrialModal,
    showToast 
  } = useApp();

  const course = courses.find(c => c.id === selectedCourseId) || courses[0];
  const enrolled = isEnrolled(course.id);
  const inCart = isInCart(course.id);

  // Accordion state: open all by default
  const [openModules, setOpenModules] = useState(() => {
    return course.modules.reduce((acc, m) => ({ ...acc, [m.id]: true }), {});
  });

  const toggleModule = (id) => {
    setOpenModules(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBuyNow = () => {
    if (!enrolled && !inCart) {
      addToCart(course);
    }
    navigateTo('checkout');
  };

  const firstTrialLesson = course.modules
    .flatMap(m => m.lessons)
    .find(l => l.isPreview);

  return (
    <div className="space-y-10 pb-20">
      {/* 1. TOP BREADCRUMB & BACK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-brand-cyan transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách khóa học</span>
        </button>
      </div>

      {/* 2. HERO COURSE HEADER */}
      <section className="relative bg-dark-900/80 border-y border-slate-800/80 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Course Overview */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
                  {course.categoryName}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-lg bg-dark-950 text-slate-300 border border-slate-800">
                  {course.levelName}
                </span>
                {course.badge && (
                  <span className="px-3 py-1 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-white flex items-center gap-1 shadow">
                    <Sparkles className="w-3 h-3" />
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {course.fullDesc}
              </p>

              {/* Meta stats row */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.ratingCount} đánh giá)</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-slate-400" />
                  <span>{course.studentsCount.toLocaleString()} học viên</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.hours} giờ thời lượng</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Cập nhật {course.lastUpdated}</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-3">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-cyan/40"
                />
                <div>
                  <div className="text-xs text-slate-400">Giảng viên phụ trách</div>
                  <div className="text-sm font-bold text-white hover:text-brand-cyan transition-colors">
                    {course.instructor.name} • <span className="text-xs font-normal text-slate-400">{course.instructor.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT (SYLLABUS + DETAILS) & STICKY PURCHASE SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Info Column (col-span-8) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* What you'll learn */}
            <div className="p-6 rounded-2xl bg-dark-900/60 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-cyan" />
                <span>Những gì bạn sẽ làm chủ sau khóa học</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Roadmap */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">Lộ Trình Học Tập Chi Tiết</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {course.modules.length} chương • {course.lessonsCount} bài học • {course.hours} giờ video thực hành
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">
                    Có bài học thử miễn phí
                  </span>
                  <button
                    onClick={() => {
                      const allOpen = Object.values(openModules).every(v => v);
                      const nextState = course.modules.reduce((acc, m) => ({ ...acc, [m.id]: !allOpen }), {});
                      setOpenModules(nextState);
                    }}
                    className="text-xs font-semibold text-brand-cyan hover:underline"
                  >
                    {Object.values(openModules).every(v => v) ? 'Thu gọn tất cả' : 'Mở rộng tất cả'}
                  </button>
                </div>
              </div>

              {/* Module Accordions */}
              <div className="space-y-3">
                {course.modules.map((module, mIdx) => {
                  const isOpen = openModules[module.id];
                  const previewCount = module.lessons.filter(l => l.isPreview).length;

                  return (
                    <div
                      key={module.id}
                      className="rounded-2xl bg-dark-900 border border-slate-800 overflow-hidden transition-all"
                    >
                      {/* Module Header */}
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="w-full flex items-center justify-between p-4 text-left bg-dark-900/90 hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-lg bg-dark-950 border border-slate-700 flex items-center justify-center text-xs font-bold text-brand-cyan">
                            {mIdx + 1}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {module.title}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {previewCount > 0 && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40">
                              {previewCount} bài học thử
                            </span>
                          )}
                          <span className="text-xs text-slate-400 font-mono">
                            {module.lessons.length} bài
                          </span>
                          {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </button>

                      {/* Module Lessons List */}
                      {isOpen && (
                        <div className="divide-y divide-slate-800/80 bg-dark-950/60">
                          {module.lessons.map(lesson => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3.5 sm:px-5 hover:bg-dark-900/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                {lesson.isPreview ? (
                                  <PlayCircle className="w-4 h-4 text-brand-cyan shrink-0" />
                                ) : (
                                  <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                                )}
                                <div>
                                  <div className="text-xs sm:text-sm font-medium text-slate-200">
                                    {lesson.title}
                                  </div>
                                  {lesson.summary && (
                                    <div className="text-[11px] text-slate-500 line-clamp-1">
                                      {lesson.summary}
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {lesson.isPreview ? (
                                  <button
                                    onClick={() => openTrialModal(course, lesson)}
                                    className="px-2.5 py-1 rounded-lg bg-brand-cyan/20 hover:bg-brand-cyan text-brand-cyan hover:text-dark-950 font-bold text-xs border border-brand-cyan/40 transition-colors flex items-center gap-1 shadow-sm"
                                  >
                                    <Video className="w-3.5 h-3.5" />
                                    <span>Học thử</span>
                                  </button>
                                ) : (
                                  <span className="text-[11px] text-slate-500 font-mono">
                                    Khóa
                                  </span>
                                )}
                                <span className="text-xs text-slate-400 font-mono w-14 text-right">
                                  {lesson.duration}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Instructor Deep-dive */}
            <div className="p-6 rounded-2xl bg-dark-900/70 border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">Về Giảng Viên</h3>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-16 h-16 rounded-2xl object-cover ring-2 ring-brand-cyan"
                />
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">{course.instructor.name}</h4>
                  <p className="text-xs text-brand-cyan font-medium">{course.instructor.role}</p>
                  <p className="text-xs text-slate-400">{course.instructor.experience} • {course.instructor.students.toLocaleString()} học viên đã đào tạo</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {course.instructor.bio}
              </p>
            </div>
          </div>

          {/* Right Sticky Purchase Sidebar (col-span-4) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-2xl bg-dark-900 border border-slate-700/80 shadow-2xl p-6 space-y-6">
              {/* Preview Thumbnail */}
              <div 
                onClick={() => firstTrialLesson && openTrialModal(course, firstTrialLesson)}
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-brand-cyan/90 text-dark-950 flex items-center justify-center shadow-glow-cyan group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8 fill-dark-950 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 text-center text-[11px] font-bold text-white bg-dark-950/80 py-1 rounded">
                  Bấm để xem video giới thiệu
                </div>
              </div>

              {/* Price Block */}
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold text-white">
                    {formatVND(course.price)}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    {formatVND(course.originalPrice)}
                  </span>
                </div>
                <div className="text-xs text-rose-400 font-semibold mt-1">
                  🔥 Tiết kiệm {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% • Ưu đãi giới hạn tuần này!
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {enrolled ? (
                  <button
                    onClick={() => navigateTo('player', { player: { courseId: course.id, lessonId: course.modules[0].lessons[0].id } })}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Tiếp tục học ngay</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleBuyNow}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-dark-950 font-extrabold text-sm shadow-glow-cyan transition-all transform hover:-translate-y-0.5"
                    >
                      Mua ngay
                    </button>

                    <button
                      onClick={() => addToCart(course)}
                      className={`w-full py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        inCart
                          ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan'
                          : 'bg-dark-800 border-slate-700 text-slate-200 hover:border-brand-cyan hover:text-white'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>{inCart ? 'Đã có trong giỏ hàng' : 'Thêm vào giỏ hàng'}</span>
                    </button>
                  </>
                )}
              </div>

              {/* Guarantee items */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hoàn tiền 100% trong 7 ngày nếu không hài lòng</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-cyan shrink-0" />
                  <span>Quyền truy cập học trọn đời không giới hạn</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Cấp chứng chỉ tốt nghiệp sau khi hoàn thành</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
