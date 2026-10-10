import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Mail, Lock, ArrowRight, AlertCircle, Sparkles, ArrowLeft, Sun, Moon } from 'lucide-react';
import Logo from '../components/Logo';
import AIMotionBackground from '../components/AIMotionBackground';

export default function LoginPage() {
  const { login, enableGuestMode } = useAuth();
  const { isLightMode, toggleTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      if (err.message?.toLowerCase().includes('email not confirmed')) {
        setErrorMsg('Email not confirmed! Please check your email inbox to verify your account, OR turn off "Confirm email" in Supabase Auth settings.');
      } else {
        setErrorMsg(err.message || 'Failed to sign in. Please check your email and password.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    enableGuestMode();
    navigate('/dashboard');
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center font-sans relative overflow-hidden p-4 transition-colors duration-500 ${
      isLightMode 
        ? 'bg-[#f8fafc] text-slate-900 selection:bg-indigo-500 selection:text-white' 
        : 'bg-[#060814] text-slate-100 selection:bg-violet-500 selection:text-white'
    }`}>
      
      {/* Dynamic AI Motion Background */}
      <AIMotionBackground density={45} speed={0.6} isLightMode={isLightMode} />

      {/* Top Controls Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-4 relative z-10">
        <Link 
          to="/" 
          className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
            isLightMode ? 'text-slate-600 hover:text-indigo-600' : 'text-slate-300 hover:text-white'
          }`}
        >
          <ArrowLeft className="w-4 h-4 text-violet-500" /> Back to Welcome Page
        </Link>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={isLightMode ? "Switch to Dark Mode" : "Switch to Light White Mode"}
          className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
            isLightMode 
              ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800 shadow-sm' 
              : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-amber-300 shadow-md'
          }`}
        >
          {isLightMode ? (
            <Moon className="w-4 h-4 text-indigo-600" />
          ) : (
            <Sun className="w-4 h-4 text-amber-400" />
          )}
        </button>
      </div>

      {/* Focused Auth Card */}
      <main className="w-full max-w-md relative z-10">
        <div className={`rounded-3xl p-8 sm:p-10 border shadow-2xl space-y-6 transition-colors ${
          isLightMode 
            ? 'bg-white/95 border-slate-200/90 shadow-slate-200/80 text-slate-900' 
            : 'glass-panel-elevated border-slate-700/60 shadow-black/80 text-slate-100'
        }`}>
          
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <Logo size="lg" showTagline={true} />
            </div>
            <h2 className={`text-2xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Sign In to SAHAYA AI
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Access grounded summaries & action checklists
            </p>
          </div>

          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3.5 text-xs text-rose-600 dark:text-rose-300 flex items-start gap-2.5 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-extrabold uppercase tracking-wider mb-1 ${
                isLightMode ? 'text-slate-700' : 'text-slate-300'
              }`}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className={`w-full border rounded-xl pl-10 pr-4 py-3 text-xs font-medium focus:outline-none transition-all ${
                    isLightMode 
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600 focus:bg-white' 
                      : 'bg-slate-900/90 border-slate-700 text-white focus:border-violet-400'
                  }`}
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={`block text-xs font-extrabold uppercase tracking-wider ${
                  isLightMode ? 'text-slate-700' : 'text-slate-300'
                }`}>
                  Password
                </label>
                <Link to="/forgot-password" className="text-[11px] text-indigo-600 dark:text-violet-400 font-bold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full border rounded-xl pl-10 pr-4 py-3 text-xs font-medium focus:outline-none transition-all ${
                    isLightMode 
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-600 focus:bg-white' 
                      : 'bg-slate-900/90 border-slate-700 text-white focus:border-violet-400'
                  }`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient py-3.5 rounded-xl text-xs font-extrabold text-white shadow-glow-violet flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In & Open Dashboard'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>



          <div className={`pt-3 text-center text-xs border-t ${
            isLightMode ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
          }`}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 dark:text-violet-400 font-extrabold hover:underline">
              Create an Account
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
}
