import React from 'react';
import { Shield, CheckCircle2, Lock, Sparkles, FileText, LayoutDashboard, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { isLightMode } = useTheme();

  return (
    <footer className={`border-t font-sans relative z-10 transition-colors duration-300 ${
      isLightMode 
        ? 'bg-slate-100/90 border-slate-200/90 text-slate-800' 
        : 'bg-[#04060f] border-slate-800/90 text-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" showTagline={true} />
            <p className={`text-xs leading-relaxed font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
              Complex notices into plain language summaries, verified evidence citations, and action checklists.
            </p>
            <div className={`inline-flex items-center space-x-2 text-[11px] px-3 py-1.5 rounded-full font-bold ${
              isLightMode 
                ? 'bg-indigo-100/80 text-indigo-900 border border-indigo-200' 
                : 'text-indigo-300 bg-indigo-500/15 border border-indigo-500/30'
            }`}>
              <Shield className="w-3.5 h-3.5 text-indigo-500" />
              <span>Grounded Intelligence System</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/dashboard" className={`flex items-center gap-2 transition-colors ${
                  isLightMode ? 'text-slate-700 hover:text-indigo-600' : 'text-slate-300 hover:text-violet-300'
                }`}>
                  <LayoutDashboard className="w-3.5 h-3.5 text-indigo-500" /> Dashboard Workspace
                </Link>
              </li>
              <li>
                <Link to="/settings" className={`flex items-center gap-2 transition-colors ${
                  isLightMode ? 'text-slate-700 hover:text-indigo-600' : 'text-slate-300 hover:text-violet-300'
                }`}>
                  <Settings className="w-3.5 h-3.5 text-violet-500" /> Settings & Appearance
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Core Features */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Platform Pillars
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>Plain Language Summarizer</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>Grounded Fact Citations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>Deadline Action Plan</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Privacy & Notice */}
          <div className="space-y-3">
            <h4 className={`text-xs font-black uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Notice & Security
            </h4>
            <p className={`text-xs leading-relaxed font-medium ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
              Fact extraction is strictly grounded in official text. Always verify official deadlines directly with issuing departments.
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Guaranteed</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className={`border-t pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-medium gap-3 ${
          isLightMode ? 'border-slate-300/80 text-slate-600' : 'border-slate-800/80 text-slate-400'
        }`}>
          <p>© 2026 SAHAYA AI — Document Intelligence Workspace</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-violet-400">
              <Sparkles className="w-3 h-3 inline" /> Powered by Grounded AI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
