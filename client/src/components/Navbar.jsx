import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FileText, LayoutDashboard, LogOut, Menu, X, ShieldCheck, Sun, Moon, Home, Settings, Upload } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenUpload }) {
  const { user, isGuestMode, logout } = useAuth();
  const { isLightMode, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAppView = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/documents') || location.pathname.startsWith('/settings');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 ${
      isLightMode 
        ? 'bg-white/90 border-b border-slate-200/90 backdrop-blur-md text-slate-900 shadow-sm' 
        : 'glass-panel border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-md text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <Logo size="md" />

          {/* Center Navigation Links - Adaptive per page */}
          <nav className={`hidden md:flex items-center space-x-6 text-sm font-semibold transition-colors ${
            isLightMode ? 'text-slate-600' : 'text-slate-300'
          }`}>
            {isAppView ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    location.pathname === '/dashboard'
                      ? (isLightMode ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200' : 'bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30')
                      : (isLightMode ? 'hover:text-indigo-600 text-slate-700' : 'hover:text-violet-300 text-slate-300')
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-indigo-500" /> Dashboard Hub
                </Link>
                <Link 
                  to="/settings" 
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                    location.pathname === '/settings'
                      ? (isLightMode ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200' : 'bg-violet-500/20 text-violet-300 font-bold border border-violet-500/30')
                      : (isLightMode ? 'hover:text-indigo-600 text-slate-700' : 'hover:text-violet-300 text-slate-300')
                  }`}
                >
                  <Settings className="w-4 h-4 text-indigo-500" /> Settings
                </Link>
              </>
            ) : (
              <>
                <a href="#how-it-works" className="hover:text-indigo-400 transition-colors">How It Works</a>
                <a href="#features" className="hover:text-indigo-400 transition-colors">Key Features</a>
                <a href="#faq" className="hover:text-indigo-400 transition-colors">FAQ</a>
              </>
            )}
          </nav>

          {/* Right Action Buttons & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-3.5">
            
            {/* Theme Toggle Button (Light White <-> Dark Mode) */}
            <button
              onClick={toggleTheme}
              title={isLightMode ? "Switch to Dark Mode" : "Switch to Light White Mode"}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
                isLightMode 
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-inner' 
                  : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-amber-300 shadow-md'
              }`}
            >
              {isLightMode ? (
                <>
                  <Moon className="w-4 h-4 text-indigo-600" />
                  <span>Dark</span>
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light</span>
                </>
              )}
            </button>

            {/* Actions for authenticated user */}

            {user || isGuestMode ? (
              <div className="flex items-center space-x-3">
                {!isAppView && (
                  <Link
                    to="/dashboard"
                    className="btn-gradient px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-glow-violet flex items-center gap-2 hover:scale-105 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4 text-white" />
                    Go to Dashboard
                  </Link>
                )}
                {onOpenUpload && isAppView && (
                  <button
                    onClick={onOpenUpload}
                    className="btn-gradient px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white flex items-center gap-2 shadow-glow-indigo transition-all cursor-pointer hover:scale-105"
                  >
                    <Upload className="w-4 h-4 text-white" />
                    Upload Document
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className={`p-2 rounded-xl transition-colors cursor-pointer border ${
                    isLightMode 
                      ? 'text-slate-600 hover:text-red-600 hover:bg-red-50 border-slate-200' 
                      : 'text-slate-300 hover:text-red-400 hover:bg-red-500/10 border-slate-800'
                  }`}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 text-xs sm:text-sm font-bold transition-all rounded-xl ${
                    isLightMode ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-100' : 'text-slate-200 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="btn-gradient px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white shadow-glow-violet transition-all cursor-pointer hover:scale-105"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border flex items-center text-xs transition-all ${
                isLightMode ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-800 border-slate-700 text-amber-300'
              }`}
            >
              {isLightMode ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg ${isLightMode ? 'text-slate-600 hover:bg-slate-100' : 'text-slate-400 hover:bg-slate-800'}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 transition-colors ${
          isLightMode ? 'bg-white border-slate-200 text-slate-800' : 'glass-panel border-slate-800 text-slate-200'
        }`}>
          {isAppView ? (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800 text-indigo-600 dark:text-violet-400"
              >
                Dashboard Workspace
              </Link>
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                Settings
              </Link>
            </>
          ) : (
            <>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                How It Works
              </a>
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                Key Features
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-semibold hover:bg-indigo-50 dark:hover:bg-slate-800"
              >
                FAQ
              </a>
            </>
          )}

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            {user || isGuestMode ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl btn-gradient text-white font-extrabold shadow-glow-violet"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="block w-full text-center px-4 py-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-300 font-bold border border-red-500/20"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-extrabold border border-slate-300 dark:border-slate-700"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl btn-gradient text-white font-extrabold shadow-glow-violet"
                >
                  Get Started Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
