import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Award, Download, Share2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function CertificateModal() {
  const { certificateModal, closeCertificate, user } = useApp();

  if (!certificateModal) return null;

  const course = certificateModal;
  const certId = `CM-${course.id.toUpperCase().replace('COURSE-', '')}-9928`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark-950/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-dark-900 border border-amber-500/40 shadow-2xl shadow-amber-950/50 p-6 sm:p-10 my-auto overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={closeCertificate}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-dark-950/60 border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Inner Border */}
        <div className="border-2 border-amber-500/30 rounded-2xl p-6 sm:p-10 bg-dark-950/70 relative">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 text-dark-950">
              <Award className="w-8 h-8" />
            </div>
          </div>

          <div className="text-xs uppercase tracking-[0.25em] font-extrabold text-amber-400 mb-1">
            Học Viện Đào Tạo Kỹ Sư Lập Trình CodeMaster
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mb-6">
            CHỨNG NHẬN HOÀN THÀNH XUẤT SẮC
          </h2>

          <p className="text-sm text-slate-400 font-light">Chứng nhận này được trang trọng trao cho</p>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gradient-cyan my-3">
            {user.name}
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed mb-6">
            Đã hoàn thành toàn bộ bài giảng, bài tập thực hành và vượt qua kỳ đánh giá năng lực của khóa học chuyên sâu:
          </p>

          <div className="inline-block px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-base sm:text-lg font-bold text-white mb-8 shadow-inner">
            {course.title}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-xs text-slate-400 text-left">
            <div>
              <span className="block text-slate-500 text-[11px]">MÃ XÁC THỰC:</span>
              <span className="font-mono font-semibold text-slate-200">{certId}</span>
            </div>

            <div>
              <span className="block text-slate-500 text-[11px]">GIẢNG VIÊN ĐÀO TẠO:</span>
              <span className="font-semibold text-slate-200">{course.instructor.name}</span>
            </div>

            <div>
              <span className="block text-slate-500 text-[11px]">NGÀY CẤP:</span>
              <span className="font-semibold text-slate-200">{new Date().toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
          <button 
            onClick={() => window.print()}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Tải chứng chỉ PDF</span>
          </button>

          <button 
            onClick={() => alert(`Đã sao chép link chia sẻ chứng chỉ: https://codemaster.vn/verify/${certId}`)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 bg-dark-900 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Chia sẻ LinkedIn / CV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
