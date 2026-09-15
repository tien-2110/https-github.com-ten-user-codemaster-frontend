import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  Maximize2, 
  Code, 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  ShoppingCart,
  CheckCircle2 
} from 'lucide-react';
import { formatVND } from './CourseCard';

export default function LessonPreviewModal() {
  const { previewModal, closeTrialModal, addToCart, navigateTo } = useApp();
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'code'
  const [copied, setCopied] = useState(false);

  if (!previewModal) return null;

  const { course, lesson } = previewModal;

  const handleCopyCode = () => {
    if (lesson.codeSnippet) {
      navigator.clipboard.writeText(lesson.codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleEnrollNow = () => {
    addToCart(course);
    closeTrialModal();
    navigateTo('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-dark-900 border border-slate-700/80 shadow-2xl shadow-cyan-950/40 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-dark-950/90">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Học Thử Miễn Phí
            </span>
            <h3 className="text-base font-bold text-white line-clamp-1">
              {lesson.title}
            </h3>
          </div>
          <button
            onClick={closeTrialModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
          {lesson.videoUrl ? (
            <video
              src={lesson.videoUrl}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-brand-cyan/20 border border-brand-cyan flex items-center justify-center mx-auto mb-4 text-brand-cyan">
                <Play className="w-8 h-8 fill-brand-cyan" />
              </div>
              <p className="text-slate-300 font-medium">Bản trình chiếu bài giảng đang sẵn sàng</p>
            </div>
          )}
        </div>

        {/* Content Tabs & Details */}
        <div className="p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 text-sm font-semibold pb-2 -mb-3 transition-colors border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-brand-cyan text-brand-cyan'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Nội dung bài học</span>
              </button>

              {lesson.codeSnippet && (
                <button
                  onClick={() => setActiveTab('code')}
                  className={`flex items-center gap-2 text-sm font-semibold pb-2 -mb-3 transition-colors border-b-2 ${
                    activeTab === 'code'
                      ? 'border-brand-cyan text-brand-cyan'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  <span>Mã nguồn mẫu</span>
                </button>
              )}
            </div>

            <span className="text-xs text-slate-400 font-mono">
              Thời lượng: {lesson.duration}
            </span>
          </div>

          {activeTab === 'overview' && (
            <div className="space-y-4 text-sm text-slate-300">
              <p className="leading-relaxed bg-dark-950/60 p-4 rounded-xl border border-slate-800/80">
                {lesson.summary || 'Bài học cung cấp kiến thức nền tảng thực chiến, kết hợp các ví dụ minh họa và bài tập áp dụng trực tiếp vào dự án lớn.'}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Hiểu sâu bản chất kỹ thuật qua từng dòng code</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Kèm file mã nguồn có thể clone chạy ngay</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Giải đáp thắc mắc trực tiếp cùng Giảng viên</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Truy cập trọn đời và cập nhật định kỳ</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'code' && lesson.codeSnippet && (
            <div className="relative rounded-xl bg-dark-950 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
                <span>Code Example • {course.categoryName}</span>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Đã sao chép' : 'Sao chép mã'}</span>
                </button>
              </div>
              <pre className="text-brand-cyan/90 leading-relaxed whitespace-pre font-mono">
                {lesson.codeSnippet}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-dark-950 border-t border-slate-800">
          <div>
            <span className="text-xs text-slate-400 block">Đăng ký toàn bộ khóa học:</span>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-white">{formatVND(course.price)}</span>
              <span className="text-xs text-slate-400 line-through">{formatVND(course.originalPrice)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                addToCart(course);
                closeTrialModal();
              }}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-700 hover:border-brand-cyan text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Thêm vào giỏ</span>
            </button>

            <button
              onClick={handleEnrollNow}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-indigo hover:from-cyan-400 hover:to-indigo-500 text-dark-950 font-bold text-xs shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <span>Mua khóa học ngay</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
