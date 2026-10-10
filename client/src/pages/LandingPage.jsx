import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import DocumentUploadModal from '../components/DocumentUploadModal';
import AIMotionBackground from '../components/AIMotionBackground';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Sparkles, FileText, CheckCircle2, ShieldCheck, ArrowRight, Zap, 
  ChevronDown, ChevronUp, CheckSquare, UserPlus, Play, Sun, Moon
} from 'lucide-react';
import { SAMPLE_DOCUMENT } from '../lib/demoData';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function LandingPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { isLightMode, toggleTheme } = useTheme();
  const [activeFaq, setActiveFaq] = useState(null);
  const navigate = useNavigate();
  const { enableGuestMode } = useAuth();

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  const handleGuestDemo = () => {
    enableGuestMode();
    navigate('/dashboard');
  };

  const handleRunSampleDemo = () => {
    navigate(`/documents/${SAMPLE_DOCUMENT.id}`, { state: { docData: SAMPLE_DOCUMENT } });
  };

  const handleAnalysisComplete = (docData) => {
    navigate(`/documents/${docData.id}`, { state: { docData } });
  };

  const faqs = [
    {
      q: 'Does SAHAYA AI guarantee official scholarship or government eligibility?',
      a: 'No. SAHAYA AI is an informational analysis assistant. It extracts explicit requirements from uploaded text to help you understand them, but it is not an official legal or government decision maker.'
    },
    {
      q: 'How does SAHAYA AI prevent AI hallucinations?',
      a: 'SAHAYA AI enforces strict document grounding. For every extracted deadline, fee, or requirement, it cites the exact supporting passage and page number from your document. If information is missing, it explicitly tells you it was not found.'
    },
    {
      q: 'Are my uploaded documents private and secure?',
      a: 'Yes. Files are processed securely. Your data is isolated to your account using Supabase Row Level Security (RLS). You can delete your documents and analysis history at any time.'
    },
    {
      q: 'Can I test SAHAYA AI without uploading a document or API key?',
      a: 'Absolutely! Click "Try Sample Demo" or "Instant Guest Demo" to inspect a complete demonstration using an official fictional scholarship notice.'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative antialiased overflow-x-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-[#f8fafc] text-slate-900 selection:bg-indigo-500 selection:text-white' : 'bg-[#060814] text-slate-100 selection:bg-violet-500 selection:text-white'
    }`}>
      
      {/* Dynamic AI Motion Background (Adapts to Dark / Light Mode) */}
      <AIMotionBackground density={60} speed={0.6} isLightMode={isLightMode} />

      {/* 1. Navbar */}
      <Navbar onOpenUpload={() => setIsUploadOpen(true)} />


      {/* 2. Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Clean Main Headline */}
          <FadeIn delay={100} duration={800}>
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight max-w-4xl mx-auto leading-tight transition-colors ${
              isLightMode ? 'text-slate-900' : 'text-white'
            }`}>
              Understand Every Document.<br />
              <span className={isLightMode ? 'text-indigo-600' : 'text-gradient-violet'}>Know Exactly What To Do Next.</span>
            </h1>
          </FadeIn>

          {/* Subheading */}
          <FadeIn delay={300} duration={800}>
            <p className={`mt-5 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto font-medium leading-relaxed transition-colors ${
              isLightMode ? 'text-slate-600' : 'text-slate-300'
            }`}>
              Turn confusing notices, scholarship guidelines, and official letters into clear summaries, evidence-backed answers, and interactive action plans.
            </p>
          </FadeIn>

          {/* Action CTA Buttons */}
          <FadeIn delay={500} duration={800}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleCreateAccount}
                className="w-full sm:w-auto btn-gradient px-8 py-4 rounded-2xl text-sm sm:text-base font-extrabold text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-3 transition-transform hover:scale-105 cursor-pointer"
              >
                <UserPlus className="w-5 h-5" />
                Create Account & Get Started
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleRunSampleDemo}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl text-sm sm:text-base font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-xl ${
                  isLightMode 
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-slate-200' 
                    : 'bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-violet-400/50'
                }`}
              >
                <Sparkles className="w-5 h-5 text-indigo-500" />
                Explore Live Workspace
              </button>
            </div>
          </FadeIn>



        </div>
      </section>

      {/* 3. Core Features Section */}
      <section id="features" className={`py-20 relative z-10 border-t ${isLightMode ? 'border-slate-200' : 'border-slate-800/80'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Key Capabilities</span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Everything You Need for Document Clarity</h2>
            <p className={`text-sm max-w-xl mx-auto ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
              Eliminate misunderstandings, track strict deadlines, and stay 100% compliant with official guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className={`p-6 rounded-2xl border space-y-3 transition-colors ${
              isLightMode ? 'bg-white border-slate-200 shadow-md shadow-slate-100' : 'glass-card border-slate-800 hover:border-violet-500/40'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-600">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Plain Language Summaries</h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Translates complex legal notices and scholarship guidelines into simple, easy-to-read key takeaways in English, Hindi, or Kannada.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 transition-colors ${
              isLightMode ? 'bg-white border-slate-200 shadow-md shadow-slate-100' : 'glass-card border-slate-800 hover:border-indigo-500/40'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Zero-Hallucination Citations</h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Every extracted deadline, fee, or requirement is paired with direct text quote citations and explicit page number references.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 transition-colors ${
              isLightMode ? 'bg-white border-slate-200 shadow-md shadow-slate-100' : 'glass-card border-slate-800 hover:border-emerald-500/40'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Eligibility Checker</h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Compare your personal qualifications (family income, age, marks) against document rules with instant pass/fail breakdowns.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 transition-colors ${
              isLightMode ? 'bg-white border-slate-200 shadow-md shadow-slate-100' : 'glass-card border-slate-800 hover:border-amber-500/40'
            }`}>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Persistent Checklists</h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                Generates actionable step-by-step deadline checklists saved directly to your Supabase PostgreSQL database.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className={`py-20 relative z-10 border-t ${isLightMode ? 'border-slate-200 bg-slate-100/50' : 'border-slate-800/80 bg-slate-950/60'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Simple 3-Step Process</span>
            <h2 className={`text-3xl sm:text-5xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>How SAHAYA AI Operates</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className={`p-8 rounded-3xl border space-y-4 relative ${isLightMode ? 'bg-white border-slate-200 shadow-md' : 'glass-panel-elevated border-slate-800'}`}>
              <span className={`text-4xl font-black ${isLightMode ? 'text-slate-300' : 'text-slate-700'}`}>01</span>
              <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Upload Your Document</h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                Upload any scholarship PDF, official circular, college fee notice, or government scheme document.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border space-y-4 relative ${isLightMode ? 'bg-white border-slate-200 shadow-md' : 'glass-panel-elevated border-slate-800'}`}>
              <span className={`text-4xl font-black ${isLightMode ? 'text-slate-300' : 'text-slate-700'}`}>02</span>
              <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Instant Grounded Analysis</h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                SAHAYA AI extracts key facts, mandatory documents, eligibility rules, and explicit page citations.
              </p>
            </div>

            <div className={`p-8 rounded-3xl border space-y-4 relative ${isLightMode ? 'bg-white border-slate-200 shadow-md' : 'glass-panel-elevated border-slate-800'}`}>
              <span className={`text-4xl font-black ${isLightMode ? 'text-slate-300' : 'text-slate-700'}`}>03</span>
              <h3 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Execute Action Plan</h3>
              <p className={`text-xs leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-300'}`}>
                Review your personalized action checklist, ask grounded questions, and complete requirements on time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FAQ Section */}
      <section id="faq" className={`py-20 relative z-10 border-t ${isLightMode ? 'border-slate-200' : 'border-slate-800/80'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className={`text-3xl sm:text-4xl font-extrabold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Got Questions? We Have Answers</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`rounded-2xl border overflow-hidden transition-colors ${
                  isLightMode ? 'bg-white border-slate-200 shadow-sm' : 'glass-panel border-slate-800'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className={`w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm cursor-pointer ${
                    isLightMode ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  <span>{faq.q}</span>
                  {activeFaq === i ? <ChevronUp className="w-4 h-4 text-indigo-600" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {activeFaq === i && (
                  <div className={`px-5 pb-5 text-xs leading-relaxed border-t pt-3 ${
                    isLightMode ? 'text-slate-600 border-slate-100' : 'text-slate-300 border-slate-800/80'
                  }`}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />

    </div>
  );
}
