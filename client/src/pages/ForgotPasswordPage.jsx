import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';
import { Sparkles, Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('');
    setErrorMsg('');
    setLoading(true);

    if (!isSupabaseConfigured || !supabase) {
      setStatusMsg('Supabase Auth is not configured. In Guest Demo mode, password resets are not required.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`
      });
      if (error) throw error;
      setStatusMsg('Password recovery email sent! Please check your inbox for instructions.');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send password recovery email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060814] text-slate-100 flex flex-col font-sans relative overflow-hidden tech-grid-pattern selection:bg-violet-500 selection:text-white">
      
      {/* Ambient Glow Orbs */}
      <div className="glow-orb-indigo top-10 left-10 opacity-50"></div>
      <div className="glow-orb-violet bottom-10 right-10 opacity-40"></div>

      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-md glass-panel-elevated rounded-3xl p-8 sm:p-10 border border-slate-700/60 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-0.5 mx-auto flex items-center justify-center shadow-glow-violet">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white">Reset Your Password</h2>
            <p className="text-xs text-slate-400">Enter your registered email address to receive password recovery instructions</p>
          </div>

          {statusMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient py-3 rounded-xl text-xs font-bold text-white shadow-glow-violet flex items-center justify-center gap-2"
            >
              {loading ? 'Sending link...' : 'Send Password Reset Link'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-slate-400 border-t border-slate-800">
            Remembered your password?{' '}
            <Link to="/login" className="text-violet-400 font-semibold hover:underline">Return to Sign In</Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
