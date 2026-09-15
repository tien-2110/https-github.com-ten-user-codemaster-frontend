import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, LEVELS, TESTIMONIALS } from '../data/mockCourses';
import CourseCard from '../components/CourseCard';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  BookCheck, 
  Briefcase, 
  TrendingUp, 
  Code2, 
  Layers, 
  Zap,
  ChevronDown,
  HelpCircle
} from 'lucide-react';

export default function HomePage() {
  const { 
    courses, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    selectedLevel, 
    setSelectedLevel,
    navigateTo 
  } = useApp();

  // Filter courses based on search, category and level
  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel || course.level === 'all';

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const scrollToCourses = () => {
    const el = document.getElementById('courses-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-cyan/15 rounded-full blur-[120px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-brand-violet/15 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-brand-cyan/30 text-brand-cyan text-xs font-semibold shadow-glow-cyan animate-pulse-slow">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nền tảng Lập trình Thực chiến Thế hệ Mới 2026</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Chinh phục kỹ năng <br className="hidden sm:inline" />
                <span className="text-gradient-cyan">Lập trình Chuyên sâu</span> <br className="hidden sm:inline" />
                cùng các Tech Lead
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Đào tạo chuyên sâu kiến trúc <strong className="text-white">Java Spring Boot 3</strong>, tối ưu hiệu năng <strong className="text-white">C/C++</strong>, xây dựng giao diện hiện đại <strong className="text-white">Front-end React 19</strong> và phân tích CSDL <strong className="text-white">SQL Server</strong>. Tự tin vào các công ty công nghệ top đầu!
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={scrollToCourses}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-cyan via-brand-indigo to-brand-violet hover:from-cyan-400 hover:to-violet-500 text-dark-950 font-extrabold text-sm shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <span>Khám phá khóa học ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('my-courses')}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-dark-900 hover:bg-dark-800 border border-slate-700/80 hover:border-slate-600 text-slate-200 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Khóa học của tôi</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">50.000+</div>
                  <div className="text-xs text-slate-400">Học viên theo học</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-brand-cyan">98.5%</div>
                  <div className="text-xs text-slate-400">Hài lòng & có việc</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400">4.9/5★</div>
                  <div className="text-xs text-slate-400">Đánh giá trung bình</div>
                </div>
              </div>
            </div>

            {/* Right Terminal / IDE Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-dark-900/95 border border-slate-700/80 shadow-2xl shadow-cyan-950/40 overflow-hidden font-mono text-xs">
                {/* Header bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-dark-950 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 text-slate-400 text-[11px] font-medium">main.dev.sh — CodeMaster IDE</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                    LIVE
                  </span>
                </div>

                {/* Code Body */}
                <div className="p-5 space-y-2 text-slate-300 leading-relaxed overflow-x-auto">
                  <p className="text-slate-500">// 1. Khởi tạo kỹ năng lập trình đỉnh cao</p>
                  <p>
                    <span className="text-brand-violet">const</span> student = <span className="text-brand-cyan">new</span> <span className="text-amber-300">SoftwareEngineer</span>({`{`}
                  </p>
                  <p className="pl-4">
                    name: <span className="text-emerald-400">"Học viên CodeMaster"</span>,
                  </p>
                  <p className="pl-4">
                    skills: [<span className="text-emerald-400">"Java"</span>, <span className="text-emerald-400">"C++"</span>, <span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"SQL"</span>],
                  </p>
                  <p className="pl-4">
                    mindset: <span className="text-emerald-400">"Clean Code & High Performance"</span>,
                  </p>
                  <p className="pl-4">
                    targetSalary: <span className="text-amber-400">"$2,500+"</span>
                  </p>
                  <p>{`});`}</p>
                  
                  <div className="pt-2">
                    <p className="text-slate-500">// 2. Thực thi dự án thực tế</p>
                    <p className="text-brand-cyan">await</p>
                    <p className="pl-2 text-slate-200">student.<span className="text-amber-300">deployProductionSystems</span>();</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>✓ Build passed in 142ms • Zero Memory Leaks!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COURSES SECTION (FILTERS & GRID) */}
      <section id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4" />
              <span>Chương Trình Đào Tạo Trọng Điểm</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Khóa Học Lập Trình Nổi Bật
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Được thiết kế từ bài toán thực tế của các tập đoàn, có lộ trình rõ ràng từ nền tảng đến tối ưu hiệu năng cao.
            </p>
          </div>

          <div className="text-xs text-slate-400 font-medium">
            Hiển thị <span className="text-brand-cyan font-bold">{filteredCourses.length}</span> / {courses.length} khóa học
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="py-6 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-cyan text-dark-950 shadow-glow-cyan font-bold'
                    : 'bg-dark-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Level Filter Dropdown & Clear Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">Cấp độ học:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {LEVELS.map(lvl => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      selectedLevel === lvl.id
                        ? 'bg-brand-indigo/30 text-brand-indigo border border-brand-indigo/50'
                        : 'text-slate-400 hover:text-slate-200 bg-dark-900/60 border border-slate-800/80'
                    }`}
                  >
                    {lvl.name}
                  </button>
                ))}
              </div>
            </div>

            {(selectedCategory !== 'all' || selectedLevel !== 'all' || searchQuery !== '') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchQuery('');
                }}
                className="text-xs text-brand-cyan hover:underline font-medium"
              >
                Đặt lại bộ lọc
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-dark-900/40 border border-slate-800">
            <Code2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">Không tìm thấy khóa học nào phù hợp</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Thử thay đổi từ khóa tìm kiếm hoặc bấm "Đặt lại bộ lọc" để khám phá toàn bộ danh sách khóa học.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-brand-cyan text-dark-950 text-xs font-bold shadow"
            >
              Xem tất cả khóa học
            </button>
          </div>
        )}
      </section>

      {/* 3. LEARNING PATHS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-brand-cyan tracking-wider">Lộ trình bài bản</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
            Định Hướng Sự Nghiệp Công Nghệ
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Không học dàn trải, chọn ngay lộ trình nghề nghiệp bạn mong muốn để tiến thẳng tới mục tiêu.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Path 1 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-dark-900 to-dark-950 border border-slate-800 hover:border-brand-cyan/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-brand-cyan uppercase">Lộ trình 1</span>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-brand-cyan transition-colors">
              Java & Golang Backend Master
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Trang bị kiến thức Spring Boot, Microservices, Message Queues (Kafka) và tối ưu hóa hệ thống phân tán chịu tải lớn.
            </p>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>Thời gian: ~4 - 6 tháng</span>
              <button onClick={scrollToCourses} className="text-brand-cyan font-semibold flex items-center gap-1">
                Chi tiết <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Path 2 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-dark-900 to-dark-950 border border-slate-800 hover:border-brand-violet/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-violet/10 border border-brand-violet/20 flex items-center justify-center text-brand-violet mb-4 group-hover:scale-110 transition-transform">
              <Code2 className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-brand-violet uppercase">Lộ trình 2</span>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-brand-violet transition-colors">
              Modern Front-end Engineer
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Từ tư duy Component, TypeScript, React 19 đến Next.js 15 App Router và xây dựng các Web App đẳng cấp thế giới.
            </p>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>Thời gian: ~3 - 5 tháng</span>
              <button onClick={scrollToCourses} className="text-brand-violet font-semibold flex items-center gap-1">
                Chi tiết <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Path 3 */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-dark-900 to-dark-950 border border-slate-800 hover:border-brand-amber/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-brand-amber/10 border border-brand-amber/20 flex items-center justify-center text-brand-amber mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-bold text-brand-amber uppercase">Lộ trình 3</span>
            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-brand-amber transition-colors">
              Systems & High Performance (C++/SQL)
            </h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Hiểu sâu phần cứng, giải phẫu CPU Cache, tối ưu từng Byte bộ nhớ và Tuning câu lệnh SQL Server hàng triệu bản ghi.
            </p>
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>Thời gian: ~4 - 5 tháng</span>
              <button onClick={scrollToCourses} className="text-brand-amber font-semibold flex items-center gap-1">
                Chi tiết <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-brand-emerald tracking-wider">Học viên thành đạt</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            Hơn 50.000 Kỹ Sư Đã Đồng Hành
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Xem học viên nói gì sau khi hoàn thành các khóa học tại CodeMaster
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.id} className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-6">
                "{t.content}"
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-cyan/40" />
                <div>
                  <div className="text-xs font-bold text-white">{t.name}</div>
                  <div className="text-[11px] text-slate-400">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
