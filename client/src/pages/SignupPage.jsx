import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2, Sparkles, ArrowLeft, Sun, Moon } from 'lucide-react';
import Logo from '../components/Logo';
import AIMotionBackground from '../components/AIMotionBackground';

export default function SignupPage() {
  const { signup, enableGuestMode } = useAuth();
  const { isLightMode, toggleTheme } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  // Validation rules
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isPasswordStrong = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecial;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!isEmailValid) {
      setErrorMsg('Please enter a valid email address format (e.g. user@example.com).');
      return;
    }

    if (!isPasswordStrong) {
      setErrorMsg('Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.');
      return;
    }

    setLoading(true);
    try {
      await signup(fullName, email, password);
      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create account. Please check your details.');
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
      <main className="w-full max-w-md relative z-10 my-4">
        <div className={`rounded-3xl p-8 sm:p-10 border shadow-2xl space-y-5 transition-colors ${
          isLightMode 
            ? 'bg-white/95 border-slate-200/90 shadow-slate-200/80 text-slate-900' 
            : 'glass-panel-elevated border-slate-700/60 shadow-black/80 text-slate-100'
        }`}>
          
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <Logo size="lg" showTagline={true} />
            </div>
            <h2 className={`text-2xl font-black tracking-tight ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
              Create SAHAYA AI Account
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Save your document analysis & action checklists
            </p>
          </div>

          {errorMsg && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 text-xs text-rose-600 dark:text-rose-300 flex items-start gap-2 leading-relaxed">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs text-emerald-700 dark:text-emerald-300 flex items-start gap-2 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-xs font-extrabold uppercase tracking-wider mb-1 ${
                isLightMode ? 'text-slate-700' : 'text-slate-300'
              }`}>
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
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
                  placeholder="jane@example.com"
                  className={`w-full border rounded-xl pl-10 pr-4 py-3 text-xs font-medium focus:outline-none transition-all ${
                    email 
                      ? (isEmailValid ? 'border-emerald-500' : 'border-rose-500') 
                      : (isLightMode ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-900/90 border-slate-700 text-white')
                  }`}
                  required
                />
              </div>
              {email && !isEmailValid && (
                <p className="text-[10px] text-rose-500 mt-1 font-bold">Please enter a valid email format (e.g. name@domain.com)</p>
              )}
            </div>

            <div>
              <label className={`block text-xs font-extrabold uppercase tracking-wider mb-1 ${
                isLightMode ? 'text-slate-700' : 'text-slate-300'
              }`}>
                Strong Password
              </label>
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

              {/* Real-time Checklist */}
              {password.length > 0 && (
                <div className={`mt-2.5 p-3 rounded-xl border text-[11px] space-y-1 ${
                  isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                }`}>
                  <p className="font-bold mb-1 text-slate-500 dark:text-slate-400">Password Strength Requirements:</p>
                  <div className="grid grid-cols-2 gap-1 font-semibold">
                    <span className={hasMinLength ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                      {hasMinLength ? '✓' : '○'} 8+ characters
                    </span>
                    <span className={hasUppercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                      {hasUppercase ? '✓' : '○'} Uppercase (A-Z)
                    </span>
                    <span className={hasLowercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                      {hasLowercase ? '✓' : '○'} Lowercase (a-z)
                    </span>
                    <span className={hasNumber ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                      {hasNumber ? '✓' : '○'} Number (0-9)
                    </span>
                    <span className={hasSpecial ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}>
                      {hasSpecial ? '✓' : '○'} Special character (!@#)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gradient py-3.5 rounded-xl text-xs font-extrabold text-white shadow-glow-violet flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform cursor-pointer mt-2"
            >
              {loading ? 'Creating Account...' : 'Create Account & Start'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>



          <div className={`pt-3 text-center text-xs border-t ${
            isLightMode ? 'border-slate-200 text-slate-600' : 'border-slate-800 text-slate-400'
          }`}>
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 dark:text-violet-400 font-extrabold hover:underline">
              Sign In
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
}
