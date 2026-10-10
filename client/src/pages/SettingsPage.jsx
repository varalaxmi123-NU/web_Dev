import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DemoBanner from '../components/DemoBanner';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Globe, Trash2, Save, CheckCircle2, AlertTriangle, LogOut } from 'lucide-react';

export default function SettingsPage() {
  const { user, isGuestMode, logout } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || 'Scholar User');
  const [prefLang, setPrefLang] = useState('en');
  const [savedMsg, setSavedMsg] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedMsg('Profile preferences updated successfully.');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans relative overflow-hidden tech-grid-pattern selection:bg-violet-500 selection:text-white">
      
      {/* Ambient Glow Orbs */}
      <div className="glow-orb-indigo top-10 left-10 opacity-50"></div>
      <div className="glow-orb-violet bottom-10 right-10 opacity-40"></div>

      <DemoBanner />
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-white">Profile & Security Settings</h1>
          <p className="text-xs text-slate-400">Manage your profile, default language preference, and privacy options.</p>
        </div>

        {savedMsg && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{savedMsg}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <User className="w-4 h-4 text-violet-400" /> Account Identity
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Display Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={user?.email || 'guest@sahaya.ai'}
                  disabled
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Preferred Language for Summaries</label>
              <select
                value={prefLang}
                onChange={(e) => setPrefLang(e.target.value)}
                className="w-full sm:w-1/2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
              >
                <option value="en">English</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="kn">Kannada (ಕನ್ನಡ)</option>
              </select>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="btn-gradient px-5 py-2.5 rounded-xl text-xs font-bold text-white flex items-center gap-2 shadow-glow-violet"
              >
                <Save className="w-4 h-4" /> Save Profile
              </button>
            </div>
          </form>
        </div>

        {/* Data & Privacy Card */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" /> Data Preservation & Privacy Explanation
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            SAHAYA AI stores extracted summary data and action checklists in a Supabase PostgreSQL database protected by Row Level Security (RLS). Passwords, raw secret tokens, and full unredacted document files are never logged publicly.
          </p>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block">Sign Out of Current Session</span>
              <span className="text-[11px] text-slate-400">Clear stored session token on this device.</span>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
