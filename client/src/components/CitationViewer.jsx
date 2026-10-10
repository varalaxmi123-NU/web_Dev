import React from 'react';
import { Quote, FileText, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CitationViewer({ sourceReference, filename = 'Uploaded Document.pdf' }) {
  const { isLightMode } = useTheme();

  if (!sourceReference || (!sourceReference.passage && !sourceReference.quote)) {
    return (
      <span className={`text-[11px] italic block mt-1 ${isLightMode ? 'text-slate-400' : 'text-slate-400'}`}>
        Source location unavailable in extracted text
      </span>
    );
  }

  const passage = sourceReference.passage || sourceReference.quote || '';
  const page = sourceReference.page || 1;

  return (
    <div className={`mt-2 p-3 rounded-xl border text-xs space-y-1.5 font-sans transition-colors ${
      isLightMode 
        ? 'bg-indigo-50/50 border-indigo-200/80 text-slate-900' 
        : 'bg-slate-900/90 border-violet-500/20 text-slate-100'
    }`}>
      <div className="flex items-center justify-between font-bold text-[11px]">
        <span className={`flex items-center gap-1.5 ${isLightMode ? 'text-indigo-700' : 'text-violet-400'}`}>
          <FileText className="w-3.5 h-3.5 shrink-0" />
          {filename} — Page {page}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold ${
          isLightMode 
            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
        }`}>
          <CheckCircle2 className="w-3 h-3" /> Grounded Fact
        </span>
      </div>
      
      <div className={`flex items-start gap-2 p-2.5 rounded-lg border italic font-mono text-[11px] ${
        isLightMode 
          ? 'bg-white text-slate-800 border-indigo-200/70 shadow-xs' 
          : 'bg-navy-950/60 text-slate-200 border-slate-800/80'
      }`}>
        <Quote className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isLightMode ? 'text-indigo-600' : 'text-violet-400'}`} />
        <span className="leading-relaxed">"{passage}"</span>
      </div>
    </div>
  );
}
