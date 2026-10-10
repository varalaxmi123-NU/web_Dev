import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DocumentUploadModal from '../components/DocumentUploadModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { fetchUserDocuments, deleteDocument, loadDemoDocument, updateActionStatus } from '../lib/api';
import { 
  FileText, Upload, Plus, CheckSquare, Clock, Trash2, ArrowRight, Sparkles, 
  MessageSquare, ShieldCheck, CheckCircle2, AlertCircle, LayoutDashboard, Zap
} from 'lucide-react';
import { SAMPLE_DOCUMENT } from '../lib/demoData';
import AIMotionBackground from '../components/AIMotionBackground';

export default function DashboardPage() {
  const { user, isGuestMode } = useAuth();
  const { isLightMode } = useTheme();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isGuestMode) {
      navigate('/login');
      return;
    }
    loadDocuments();
  }, [user, isGuestMode]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetchUserDocuments(isGuestMode);
      if (res.success && Array.isArray(res.data)) {
        setDocuments(res.data);
      } else {
        setDocuments([SAMPLE_DOCUMENT]);
      }
    } catch (err) {
      console.warn('Error loading user documents:', err);
      setDocuments([SAMPLE_DOCUMENT]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (!window.confirm('Are you sure you want to delete this document analysis?')) return;

    setDeletingId(id);
    try {
      await deleteDocument(id, isGuestMode);
      setDocuments(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      alert('Failed to delete document');
    } finally {
      setDeletingId(null);
    }
  };

  const handleAnalysisComplete = (docData) => {
    setDocuments(prev => [docData, ...prev.filter(d => d.id !== docData.id)]);
    navigate(`/documents/${docData.id}`, { state: { docData } });
  };

  const handleToggleTask = async (actionId, currentStatus) => {
    const newStatus = !currentStatus;
    setDocuments(prevDocs => 
      prevDocs.map(d => ({
        ...d,
        action_items: (d.action_items || []).map(a => 
          a.id === actionId ? { ...a, is_completed: newStatus } : a
        )
      }))
    );
    try {
      await updateActionStatus(actionId, newStatus);
    } catch (e) {}
  };

  // Collect stats
  const totalDocs = documents.length;
  const allActionItems = documents.flatMap(d => d.action_items || []);
  const pendingActions = allActionItems.filter(a => !a.is_completed);
  const completedActions = allActionItems.filter(a => a.is_completed);

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden antialiased transition-colors duration-500 ${
      isLightMode 
        ? 'bg-[#f8fafc] text-slate-900 selection:bg-indigo-500 selection:text-white' 
        : 'bg-[#050711] text-white selection:bg-white selection:text-black'
    }`}>
      
      {/* Interactive AI Motion Background */}
      <AIMotionBackground density={45} speed={0.6} isLightMode={isLightMode} />

      {/* Navbar */}
      <Navbar onOpenUpload={() => setIsUploadOpen(true)} />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* Welcome Header Hero Banner */}
        <div className={`relative p-6 sm:p-8 rounded-3xl overflow-hidden shadow-2xl border transition-all ${
          isLightMode 
            ? 'bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white border-indigo-200/20' 
            : 'glass-panel-elevated border-white/15'
        }`}>

          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-600/30 via-indigo-600/20 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-gray-200 text-xs font-bold mb-3">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>SAHAYA AI — Document Intelligence Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Welcome back, <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">{displayName}</span>! 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed font-medium">
                Transform official notices, scholarship guidelines, and complex circulars into plain language summaries, verified citations, and deadline checklists.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
              <button
                onClick={() => setIsUploadOpen(true)}
                className="btn-gradient px-7 py-3.5 rounded-2xl text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-500/30 hover:scale-105 transition-all cursor-pointer w-full sm:w-auto"
              >
                <Upload className="w-4 h-4" />
                Upload New Document
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 space-y-3 relative overflow-hidden group shadow-lg ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-slate-200/80' 
              : 'glass-card border-slate-700/60 hover:border-indigo-500/40'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold tracking-wide">
              <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>Analyzed Documents</span>
              <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-500">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className={`text-3xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{totalDocs}</p>
              <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Total processed PDFs & circulars</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 space-y-3 relative overflow-hidden group shadow-lg ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-slate-200/80' 
              : 'glass-card border-slate-700/60 hover:border-amber-500/40'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold tracking-wide">
              <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>Pending Tasks</span>
              <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className={`text-3xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{pendingActions.length}</p>
              <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Action items requiring attention</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 space-y-3 relative overflow-hidden group shadow-lg ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-slate-200/80' 
              : 'glass-card border-slate-700/60 hover:border-emerald-500/40'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold tracking-wide">
              <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>Completed Actions</span>
              <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500">
                <CheckSquare className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className={`text-3xl font-black ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{completedActions.length}</p>
              <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Fulfilled checklist steps</p>
            </div>
          </div>

          <div className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 space-y-3 relative overflow-hidden group shadow-lg ${
            isLightMode 
              ? 'bg-white border-slate-200 shadow-slate-200/80' 
              : 'glass-card border-slate-700/60 hover:border-violet-500/40'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold tracking-wide">
              <span className={isLightMode ? 'text-slate-700' : 'text-slate-300'}>Grounded AI Engine</span>
              <div className="p-2 rounded-xl bg-violet-500/15 border border-violet-500/30 text-violet-500">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-500 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </p>
              <p className={`text-[11px] mt-1 ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>Zero hallucination citations ready</p>
            </div>
          </div>

        </div>

        {/* Main Grid: Documents & Action Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Documents Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-extrabold flex items-center gap-2.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-500 border border-violet-500/30">
                  <FileText className="w-4 h-4" />
                </div>
                Your Document Library
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isLightMode ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800/90 text-slate-300 border-slate-700'
              }`}>
                {documents.length} document(s)
              </span>
            </div>

            {loading ? (
              <div className={`py-16 text-center text-xs rounded-2xl border ${
                isLightMode ? 'bg-white border-slate-200 text-slate-600' : 'glass-panel border-slate-800 text-slate-400'
              }`}>
                <div className="inline-block animate-spin rounded-full h-7 w-7 border-2 border-indigo-600 border-t-transparent mb-3"></div>
                <p>Loading your document library...</p>
              </div>
            ) : documents.length === 0 ? (
              <div className={`p-10 text-center rounded-3xl border space-y-4 shadow-xl ${
                isLightMode ? 'bg-white border-slate-200' : 'glass-panel-elevated border-slate-700/60'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 mx-auto">
                  <FileText className="w-7 h-7" />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>No documents uploaded yet</h4>
                  <p className={`text-xs max-w-sm mx-auto mt-1 leading-relaxed ${isLightMode ? 'text-slate-600' : 'text-slate-400'}`}>
                    Upload your first scholarship announcement, college circular, or official notice to extract key facts & action steps.
                  </p>
                </div>
                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setIsUploadOpen(true)}
                    className="btn-gradient px-6 py-3 rounded-xl text-xs font-extrabold text-white shadow-lg shadow-indigo-500/30 cursor-pointer"
                  >
                    Upload Document
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => navigate(`/documents/${doc.id}`)}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 hover:-translate-y-1 group space-y-4 shadow-lg ${
                      isLightMode 
                        ? 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-slate-200/80' 
                        : 'glass-panel-elevated border-slate-700/60 hover:border-violet-500/50 hover:shadow-violet-500/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-400/30 flex items-center justify-center text-indigo-600 dark:text-violet-300 shrink-0 group-hover:scale-105 transition-transform">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold transition-colors flex items-center gap-2 flex-wrap ${
                            isLightMode ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-violet-300'
                          }`}>
                            {doc.filename?.toLowerCase().includes('sample') || doc.filename?.toLowerCase().includes('demo')
                              ? 'National_Bright_Future_Grant_2026.pdf'
                              : doc.filename}
                            <span className="text-[10px] font-extrabold bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                              Verified Circular
                            </span>
                          </h4>
                          <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed font-medium ${
                            isLightMode ? 'text-slate-600' : 'text-slate-300/80'
                          }`}>
                            {doc.summary}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => handleDelete(e, doc.id)}
                        title="Delete document"
                        disabled={deletingId === doc.id}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-500/10 transition-colors shrink-0 border border-transparent hover:border-rose-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between text-[11px] ${
                      isLightMode ? 'border-slate-100 text-slate-500' : 'border-slate-800/80 text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span>Status: <strong className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wide">Analyzed</strong></span>
                      </div>
                      <span className="text-indigo-600 dark:text-violet-400 group-hover:translate-x-1 transition-all flex items-center gap-1 font-extrabold">
                        Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Action Items Sidebar */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-extrabold flex items-center gap-2.5 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-500 border border-indigo-500/30">
                  <CheckSquare className="w-4 h-4" />
                </div>
                Pending Action Tasks
              </h3>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                isLightMode ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-slate-800/90 text-slate-300 border-slate-700'
              }`}>
                {pendingActions.length} item(s)
              </span>
            </div>

            <div className={`p-5 rounded-2xl border space-y-3 shadow-lg ${
              isLightMode ? 'bg-white border-slate-200' : 'glass-panel-elevated border-slate-700/60'
            }`}>
              {pendingActions.length === 0 ? (
                <div className="text-center py-8 text-xs space-y-2">
                  <CheckCircle2 className="w-9 h-9 text-emerald-500 mx-auto" />
                  <p className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-slate-200'}`}>No pending action items!</p>
                  <p className={`text-[11px] ${isLightMode ? 'text-slate-500' : 'text-slate-400'}`}>All required checklist steps completed.</p>
                </div>
              ) : (
                pendingActions.slice(0, 6).map((action) => (
                  <div 
                    key={action.id} 
                    onClick={() => handleToggleTask(action.id, action.is_completed)}
                    className={`p-3.5 rounded-xl border text-xs space-y-1.5 transition-all cursor-pointer ${
                      isLightMode 
                        ? 'bg-slate-50 border-slate-200 hover:border-indigo-300' 
                        : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={action.is_completed}
                          onChange={() => {}}
                          className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                        />
                        <span className={`font-bold leading-snug ${isLightMode ? 'text-slate-800' : 'text-slate-200'}`}>{action.title}</span>
                      </div>
                      <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full shrink-0">
                        {action.priority || 'Medium'}
                      </span>
                    </div>
                    {action.due_date && action.due_date !== 'Not specified' && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 ml-6">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Due: {action.due_date}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </main>

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
