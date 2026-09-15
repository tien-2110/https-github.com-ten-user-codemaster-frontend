import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  PlayCircle, 
  Lock, 
  ChevronRight, 
  Code, 
  FileText, 
  Copy, 
  Check, 
  Award, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  Volume2
} from 'lucide-react';

export default function CoursePlayerPage() {
  const { 
    courses, 
    playerLesson, 
    navigateTo, 
    toggleLessonCompleted, 
    getCourseProgress, 
    enrolledCourses, 
    openCertificate,
    showToast 
  } = useApp();

  const courseId = playerLesson?.courseId || courses[0].id;
  const course = courses.find(c => c.id === courseId) || courses[0];
  
  // Find initial lesson
  const allLessons = course.modules.flatMap(m => m.lessons);
  const initialLesson = allLessons.find(l => l.id === playerLesson?.lessonId) || allLessons[0];
  
  const [currentLesson, setCurrentLesson] = useState(initialLesson);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('notes'); // 'notes' | 'code'

  const enrolledData = enrolledCourses.find(e => e.courseId === course.id);
  const completedLessons = enrolledData?.completedLessonIds || [];
  const isCurrentLessonDone = completedLessons.includes(currentLesson.id);
  const progress = getCourseProgress(course.id);

  const handleToggleComplete = () => {
    toggleLessonCompleted(course.id, currentLesson.id);
    const willBeDone = !isCurrentLessonDone;
    
    if (willBeDone) {
      showToast(`Đã hoàn thành: "${currentLesson.title}"! 🎉`, 'success');
      
      // Check if this completes the course (100%)
      if (completedLessons.length + 1 >= allLessons.length) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });
        showToast('Chúc mừng bạn đã hoàn thành 100% khóa học! Bạn có thể nhận chứng chỉ ngay.', 'success');
      }
    } else {
      showToast(`Đã bỏ đánh dấu hoàn thành bài học.`, 'info');
    }
  };

  const handleCopyCode = () => {
    if (currentLesson.codeSnippet) {
      navigator.clipboard.writeText(currentLesson.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col">
      {/* 1. TOP PLAYER NAV */}
      <div className="h-16 px-4 sm:px-6 bg-dark-900 border-b border-slate-800 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div className="flex items-center gap-4 min-w-0">
          <button
            onClick={() => navigateTo('my-courses')}
            className="p-2 rounded-xl bg-dark-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Quay lại khóa học của tôi"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-brand-cyan uppercase block truncate">
              {course.title}
            </span>
            <h2 className="text-xs sm:text-sm font-bold text-white truncate">
              {currentLesson.title}
            </h2>
          </div>
        </div>

        {/* Course Progress Mini Bar */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:block text-right">
            <div className="text-[11px] text-slate-400">Tiến trình khóa học</div>
            <div className="text-xs font-bold text-brand-cyan">
              {progress.percent}% ({progress.completed}/{progress.total} bài)
            </div>
          </div>

          {progress.percent === 100 && (
            <button
              onClick={() => openCertificate(course)}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20"
            >
              <Award className="w-4 h-4" />
              <span>Chứng chỉ</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. PLAYER BODY */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Main Video & Content Area (col-span-8 or 9) */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col p-4 sm:p-6 space-y-6 overflow-y-auto">
          
          {/* Video Player */}
          <div className="aspect-video w-full rounded-2xl bg-black overflow-hidden relative shadow-2xl border border-slate-800 flex items-center justify-center">
            {currentLesson.videoUrl ? (
              <video
                key={currentLesson.id}
                src={currentLesson.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center mx-auto mb-4 text-brand-cyan">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white mb-1">{currentLesson.title}</h4>
                <p className="text-xs text-slate-400">Video thực hành đang nạp dữ liệu stream...</p>
              </div>
            )}
          </div>

          {/* Action Row & Completion Toggle */}
          <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white">
                {currentLesson.title}
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Thời lượng: {currentLesson.duration} • Giảng viên: {course.instructor.name}
              </span>
            </div>

            <button
              onClick={handleToggleComplete}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                isCurrentLessonDone
                  ? 'bg-emerald-500/20 border border-emerald-500/50 text-emerald-400'
                  : 'bg-gradient-to-r from-brand-cyan to-brand-indigo text-dark-950 shadow-glow-cyan'
              }`}
            >
              {isCurrentLessonDone ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
                  <span>Đã hoàn thành (Bấm để hủy)</span>
                </>
              ) : (
                <>
                  <Circle className="w-4 h-4" />
                  <span>Đánh dấu hoàn thành bài học</span>
                </>
              )}
            </button>
          </div>

          {/* Lesson Details Tabs */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-6 border-b border-slate-800 pb-3">
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 text-xs font-bold pb-2 -mb-3 transition-colors border-b-2 ${
                  activeTab === 'notes'
                    ? 'border-brand-cyan text-brand-cyan'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Ghi chú & Tóm tắt bài giảng</span>
              </button>

              {currentLesson.codeSnippet && (
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-2 text-xs font-bold pb-2 -mb-3 transition-colors border-b-2 ${
                    activeTab === 'code'
                      ? 'border-brand-cyan text-brand-cyan'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Source Code mẫu</span>
                </button>
              )}
            </div>

            {activeTab === 'notes' && (
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <p className="leading-relaxed bg-dark-950/60 p-4 rounded-xl border border-slate-800/80">
                  {currentLesson.summary || 'Nội dung bài học hướng dẫn từng bước áp dụng kiến thức thực tế vào xây dựng ứng dụng quy mô lớn, kèm các quy chuẩn viết mã sạch Clean Code.'}
                </p>
                <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-white">Lời khuyên từ Mentor:</strong> Hãy tự tay gõ lại mã nguồn thay vì sao chép. Việc gặp lỗi cú pháp và tự sửa lỗi (debugging) sẽ giúp bạn hiểu sâu bản chất kỹ thuật hơn gấp 10 lần.
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && currentLesson.codeSnippet && (
              <div className="relative rounded-xl bg-dark-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
                  <span>IDE Sandbox • {course.categoryName}</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Đã sao chép' : 'Sao chép mã'}</span>
                  </button>
                </div>
                <pre className="text-brand-cyan/90 leading-relaxed whitespace-pre font-mono">
                  {currentLesson.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Curriculum Sidebar (col-span-4 or 3) */}
        <div className="lg:col-span-4 xl:col-span-3 border-t lg:border-t-0 lg:border-l border-slate-800 bg-dark-900/60 overflow-y-auto max-h-[85vh] lg:max-h-none">
          <div className="p-4 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Nội Dung Khóa Học
            </h3>
            <div className="text-xs text-slate-300 mt-1">
              Đã xong {completedLessons.length} / {allLessons.length} bài học
            </div>
          </div>

          <div className="divide-y divide-slate-800">
            {course.modules.map((module, mIdx) => (
              <div key={module.id}>
                <div className="px-4 py-3 bg-dark-950/80 text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span className="truncate">{mIdx + 1}. {module.title}</span>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                    {module.lessons.length} bài
                  </span>
                </div>

                <div className="divide-y divide-slate-800/60">
                  {module.lessons.map(lesson => {
                    const isDone = completedLessons.includes(lesson.id);
                    const isCurrent = currentLesson.id === lesson.id;

                    return (
                      <div
                        key={lesson.id}
                        onClick={() => setCurrentLesson(lesson)}
                        className={`p-3.5 px-4 flex items-center justify-between gap-3 text-xs cursor-pointer transition-colors ${
                          isCurrent
                            ? 'bg-brand-cyan/15 text-white border-l-4 border-brand-cyan'
                            : 'hover:bg-dark-900/80 text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <PlayCircle className={`w-4 h-4 shrink-0 ${isCurrent ? 'text-brand-cyan' : 'text-slate-500'}`} />
                          )}
                          <span className={`truncate font-medium ${isCurrent ? 'text-brand-cyan font-bold' : ''}`}>
                            {lesson.title}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono text-slate-500 shrink-0">
                          {lesson.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
