import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  Clock, 
  BookOpen, 
  ShoppingCart, 
  Check, 
  PlayCircle, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function formatVND(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export default function CourseCard({ course }) {
  const { 
    navigateTo, 
    addToCart, 
    isInCart, 
    isEnrolled, 
    getCourseProgress 
  } = useApp();

  const enrolled = isEnrolled(course.id);
  const inCart = isInCart(course.id);
  const progress = enrolled ? getCourseProgress(course.id) : null;
  const discountPercent = Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);

  const handleCardClick = () => {
    navigateTo('course-detail', { courseId: course.id });
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (enrolled) {
      navigateTo('player', { 
        player: { 
          courseId: course.id, 
          lessonId: course.modules[0]?.lessons[0]?.id 
        } 
      });
    } else if (inCart) {
      navigateTo('checkout');
    } else {
      addToCart(course);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative flex flex-col rounded-2xl bg-dark-900/90 border border-slate-800/90 hover:border-brand-cyan/40 hover:shadow-2xl hover:shadow-cyan-950/30 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      {/* Thumbnail Banner */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/30" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-dark-950/80 backdrop-blur-md border border-white/10 text-brand-cyan shadow">
            {course.categoryName}
          </span>

          {course.badge && (
            <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {course.badge}
            </span>
          )}
        </div>

        {/* Play Icon Hint on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-brand-cyan/90 backdrop-blur text-dark-950 flex items-center justify-center shadow-glow-cyan transform scale-75 group-hover:scale-100 transition-transform">
            <PlayCircle className="w-7 h-7 fill-dark-950 text-white" />
          </div>
        </div>

        {/* Enrolled Progress Bar overlay */}
        {enrolled && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div 
              className="h-full bg-gradient-to-r from-brand-cyan to-brand-emerald transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        {/* Instructor */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <img 
            src={course.instructor.avatar} 
            alt={course.instructor.name} 
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="font-medium text-slate-300">{course.instructor.name}</span>
          <span>•</span>
          <span className="text-slate-400">{course.levelName}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-2 leading-snug">
          {course.title}
        </h3>

        {/* Short description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
          {course.shortDesc}
        </p>

        {/* Course Stats */}
        <div className="flex items-center gap-4 text-xs text-slate-400 pt-1 border-t border-slate-800/60">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{course.rating}</span>
            <span className="text-slate-400 font-normal">({course.ratingCount})</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.hours} giờ</span>
          </div>

          <div className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>{course.lessonsCount} bài</span>
          </div>
        </div>

        {/* Price & Action Section */}
        <div className="pt-2 mt-auto flex items-center justify-between gap-2 border-t border-slate-800/80">
          {enrolled ? (
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-emerald-400 font-medium">Đã đăng ký</span>
                <span className="font-bold text-white">{progress.percent}%</span>
              </div>
              <button
                onClick={handleActionClick}
                className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-950/40 transition-all"
              >
                <PlayCircle className="w-4 h-4" />
                <span>{progress.percent === 100 ? 'Học lại' : 'Tiếp tục học'}</span>
              </button>
            </div>
          ) : (
            <>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-extrabold text-white">
                    {formatVND(course.price)}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                    -{discountPercent}%
                  </span>
                </div>
                <div className="text-xs text-slate-400 line-through">
                  {formatVND(course.originalPrice)}
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={handleActionClick}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center ${
                    inCart
                      ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan shadow-glow-cyan'
                      : 'bg-dark-800 border-slate-700 text-slate-200 hover:border-brand-cyan/60 hover:text-white hover:bg-slate-800'
                  }`}
                  title={inCart ? 'Xem giỏ hàng' : 'Thêm vào giỏ'}
                >
                  {inCart ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleCardClick}
                  className="px-3.5 py-2 rounded-xl bg-brand-cyan/15 hover:bg-brand-cyan text-brand-cyan hover:text-dark-950 border border-brand-cyan/30 hover:border-brand-cyan text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <span>Chi tiết</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
