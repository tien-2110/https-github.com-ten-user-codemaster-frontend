import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();

  if (!toast) return null;

  const isSuccess = toast.type === 'success';
  const isError = toast.type === 'error';

  return (
    <div className="fixed top-20 right-6 z-[70] animate-bounce-in">
      <div
        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-2xl backdrop-blur-xl border text-sm font-medium transition-all ${
          isSuccess
            ? 'bg-emerald-950/90 border-emerald-500/30 text-emerald-200 shadow-emerald-950/50'
            : isError
            ? 'bg-rose-950/90 border-rose-500/30 text-rose-200 shadow-rose-950/50'
            : 'bg-slate-900/95 border-brand-cyan/30 text-slate-100 shadow-cyan-950/50'
        }`}
      >
        {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
        {isError && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
        {!isSuccess && !isError && <Info className="w-5 h-5 text-brand-cyan shrink-0" />}
        
        <span className="leading-snug">{toast.message}</span>
      </div>
    </div>
  );
}
