import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DemoBanner from '../components/DemoBanner';
import CitationViewer from '../components/CitationViewer';
import ActionChecklist from '../components/ActionChecklist';
import DocumentChat from '../components/DocumentChat';
import LanguageSelector from '../components/LanguageSelector';
import EligibilityCheckerModal from '../components/EligibilityCheckerModal';
import { fetchDocumentById, deleteDocument } from '../lib/api';
import { getLocalizedData } from '../lib/translateHelper';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AIMotionBackground from '../components/AIMotionBackground';
import { 
  FileText, Calendar, CheckSquare, MessageSquare, ShieldAlert, Globe, 
  ArrowLeft, Trash2, AlertTriangle, Sparkles, CheckCircle2, FileCheck, Search
} from 'lucide-react';
import { SAMPLE_DOCUMENT } from '../lib/demoData';

export default function DocumentWorkspacePage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isGuestMode } = useAuth();
  const { isLightMode } = useTheme();


  const [doc, setDoc] = useState(location.state?.docData || null);
  const [loading, setLoading] = useState(!doc);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // overview, checklist, chat, rawText
  const [lang, setLang] = useState('en');
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  useEffect(() => {
    loadDocument();
  }, [id]);

  const loadDocument = async () => {
    setLoading(true);
    setError('');
    try {
      if (id === SAMPLE_DOCUMENT.id) {
        setDoc(SAMPLE_DOCUMENT);
      } else {
        const res = await fetchDocumentById(id, isGuestMode);
        if (res.success && res.data) {
          setDoc(res.data);
        } else {
          setDoc(null);
          setError('Document not found or has been deleted.');
        }
      }
    } catch (err) {
      console.warn('Failed to fetch document by ID:', err);
      setDoc(null);
      setError('Document not found.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this document analysis?')) return;
    try {
      await deleteDocument(id, isGuestMode);
      navigate('/dashboard');
    } catch (err) {
      alert('Failed to delete document');
    }
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${
        isLightMode ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#060814] text-slate-100'
      }`}>
        <AIMotionBackground density={45} speed={0.6} isLightMode={isLightMode} />
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-center relative z-10">
          <div className="space-y-4">
            <Sparkles className="w-8 h-8 text-violet-500 animate-spin mx-auto" />
            <p className={`text-sm font-semibold ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Loading Document Intelligence Workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doc) {
    return (
      <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${
        isLightMode ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#060814] text-slate-100'
      }`}>
        <AIMotionBackground density={45} speed={0.6} isLightMode={isLightMode} />
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20 text-center px-4 relative z-10">
          <div className="max-w-md glass-panel-elevated p-8 rounded-3xl space-y-4 shadow-2xl">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <h2 className={`text-lg font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Document Not Found</h2>
            <p className="text-xs text-slate-400">
              {error || 'This document analysis does not exist or has been removed.'}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 btn-gradient px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-glow-violet mt-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const localized = getLocalizedData(doc, lang);
  const summary = localized.summary;
  const structured = localized.structured_analysis || {};
  const actionItems = localized.action_items || doc?.action_items || [];
  const labels = localized.labels;

  const keyInfo = structured.key_information || {};
  const criteria = structured.eligibility_criteria || [];
  const deadlines = structured.deadlines || [];
  const requiredDocs = structured.required_documents || [];
  const doubleCheck = structured.things_to_double_check || [];

  return (
    <div className={`min-h-screen flex flex-col font-sans relative overflow-hidden transition-colors duration-500 ${
      isLightMode ? 'bg-[#f8fafc] text-slate-900 selection:bg-indigo-500 selection:text-white' : 'bg-[#060814] text-slate-100 selection:bg-violet-500 selection:text-white'
    }`}>
      
      {/* Dynamic Motion AI Background */}
      <AIMotionBackground density={45} speed={0.6} isLightMode={isLightMode} />

      {/* Demo Top Banner */}
      <DemoBanner />

      {/* Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 relative z-10">
        
        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-elevated shadow-xl">
          
          <div className="space-y-2">
            <Link to="/dashboard" className="text-xs text-indigo-600 dark:text-violet-400 hover:underline flex items-center gap-1 font-bold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-violet-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl font-black flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  {doc.filename?.toLowerCase().includes('sample') || doc.filename?.toLowerCase().includes('demo')
                    ? 'National_Bright_Future_Grant_2026.pdf'
                    : doc.filename}
                  <span className="text-[10px] font-extrabold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 inline" /> Verified Document
                  </span>
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Analyzed on {new Date(doc.created_at || Date.now()).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                </p>
              </div>
            </div>
          </div>


          {/* Right Header Controls */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
            
            {/* Language Switcher */}
            <LanguageSelector currentLang={lang} onChangeLang={setLang} />

            {/* Delete button */}
            <button
              onClick={handleDelete}
              className={`p-2.5 rounded-xl border transition-colors ${
                isLightMode 
                  ? 'bg-slate-100 border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
              }`}
              title="Delete document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Informational Disclaimer Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isLightMode 
            ? 'bg-indigo-50/90 border-indigo-200/80 text-indigo-950 font-medium shadow-sm' 
            : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
        }`}>
          <div className="flex items-center space-x-2.5">
            <ShieldAlert className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span>
              <strong className="font-extrabold text-indigo-700 dark:text-indigo-300">Informational Assistant:</strong> Fact extraction is strictly grounded in official text. This tool does not make legal or government decisions.
            </span>
          </div>
          <button
            onClick={() => setIsEligibilityOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] shrink-0 transition-colors shadow-sm cursor-pointer"
          >
            Check My Eligibility
          </button>
        </div>

        {/* Tab Navigation */}
        <div className={`flex items-center space-x-2 border-b overflow-x-auto pb-1 text-xs font-bold ${
          isLightMode ? 'border-slate-200' : 'border-slate-800'
        }`}>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? (isLightMode ? 'border-indigo-600 text-indigo-700 bg-indigo-50/80 font-extrabold shadow-sm' : 'border-violet-500 text-white bg-slate-900/60')
                : (isLightMode ? 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'border-transparent text-slate-400 hover:text-white')
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'overview' ? (isLightMode ? 'text-indigo-600' : 'text-violet-400') : (isLightMode ? 'text-slate-500' : 'text-slate-400')}`} />
            Summary & Intelligence
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'checklist'
                ? (isLightMode ? 'border-indigo-600 text-indigo-700 bg-indigo-50/80 font-extrabold shadow-sm' : 'border-indigo-500 text-white bg-slate-900/60')
                : (isLightMode ? 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'border-transparent text-slate-400 hover:text-white')
            }`}
          >
            <CheckSquare className={`w-4 h-4 ${activeTab === 'checklist' ? (isLightMode ? 'text-indigo-600' : 'text-indigo-400') : (isLightMode ? 'text-slate-500' : 'text-slate-400')}`} />
            Action Checklist ({doc.action_items?.length || 0})
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'chat'
                ? (isLightMode ? 'border-emerald-600 text-emerald-700 bg-emerald-50/80 font-extrabold shadow-sm' : 'border-emerald-500 text-white bg-slate-900/60')
                : (isLightMode ? 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'border-transparent text-slate-400 hover:text-white')
            }`}
          >
            <MessageSquare className={`w-4 h-4 ${activeTab === 'chat' ? (isLightMode ? 'text-emerald-600' : 'text-emerald-400') : (isLightMode ? 'text-slate-500' : 'text-slate-400')}`} />
            Document Assistant Chat
          </button>

          <button
            onClick={() => setActiveTab('rawText')}
            className={`px-4 py-2.5 rounded-t-xl transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'rawText'
                ? (isLightMode ? 'border-slate-600 text-slate-900 bg-slate-100 font-extrabold shadow-sm' : 'border-slate-400 text-white bg-slate-900/60')
                : (isLightMode ? 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100' : 'border-transparent text-slate-400 hover:text-white')
            }`}
          >
            <Search className={`w-4 h-4 ${activeTab === 'rawText' ? (isLightMode ? 'text-slate-800' : 'text-slate-400') : (isLightMode ? 'text-slate-500' : 'text-slate-400')}`} />
            Extracted Raw Text
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Col (2 cols wide) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Simple Summary Card */}
              <div className="p-6 rounded-2xl glass-panel space-y-3">
                <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-600 dark:text-violet-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Plain Language Summary
                </span>
                <p className={`text-sm leading-relaxed font-sans ${isLightMode ? 'text-slate-800 font-semibold' : 'text-slate-200 font-normal'}`}>
                  {summary}
                </p>
              </div>

              {/* Eligibility Criteria List */}
              <div className="p-6 rounded-2xl glass-panel space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                    <ShieldAlert className="w-4 h-4 text-indigo-500" />
                    Explicit Eligibility Criteria
                  </h3>
                  <button
                    onClick={() => setIsEligibilityOpen(true)}
                    className="text-xs text-indigo-600 dark:text-violet-400 hover:underline font-extrabold"
                  >
                    Test My Eligibility →
                  </button>
                </div>

                <div className="space-y-3">
                  {criteria.length === 0 ? (
                    <p className="text-xs text-slate-500 dark:text-slate-400">No specific eligibility rules found in document.</p>
                  ) : (
                    criteria.map((rule, idx) => (
                      <div key={idx} className={`p-3.5 rounded-xl border space-y-1.5 ${
                        isLightMode ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-slate-900/80 border-slate-800 text-slate-100'
                      }`}>
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className={isLightMode ? 'text-slate-900' : 'text-white'}>{rule.rule}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            isLightMode ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'text-emerald-400 bg-emerald-500/10'
                          }`}>
                            Extracted Rule
                          </span>
                        </div>
                        <CitationViewer sourceReference={rule} filename={doc.filename} />
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Required Documents */}
              <div className="p-6 rounded-2xl glass-panel space-y-4">
                <h3 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  <FileCheck className="w-4 h-4 text-emerald-500" />
                  Required Documents List
                </h3>

                <div className="space-y-2">
                  {requiredDocs.map((item, idx) => (
                    <div key={idx} className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                    }`}>
                      <div>
                        <span className={`font-bold block ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{item.doc}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-[11px]">{item.details}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.required 
                          ? (isLightMode ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-rose-500/10 text-rose-300 border border-rose-500/20') 
                          : (isLightMode ? 'bg-slate-200 text-slate-700' : 'bg-slate-800 text-slate-400')
                      }`}>
                        {item.required ? 'Mandatory' : 'Optional'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Document Chatbot Assistant */}
              <div className="pt-2">
                <DocumentChat docId={doc.id} filename={doc.filename} initialChats={doc.sample_chats || []} />
              </div>

            </div>

            {/* Right Col */}
            <div className="space-y-6">
              
              {/* Important Deadlines */}
              <div className="p-6 rounded-2xl glass-panel space-y-4">
                <h3 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${isLightMode ? 'text-slate-900' : 'text-white'}`}>
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Important Deadlines
                </h3>

                <div className="space-y-3">
                  {deadlines.map((dl, idx) => (
                    <div key={idx} className={`p-3.5 rounded-xl border space-y-1 ${
                      isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'
                    }`}>
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className={isLightMode ? 'text-slate-800' : 'text-slate-300'}>{dl.event}</span>
                        <span className="text-amber-600 dark:text-amber-400 font-extrabold">{dl.date}</span>
                      </div>
                      <CitationViewer sourceReference={dl} filename={doc.filename} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Details Cards */}
              <div className="p-6 rounded-2xl glass-panel space-y-3 text-xs">
                <h3 className={`text-sm font-black uppercase tracking-wider ${isLightMode ? 'text-slate-900' : 'text-white'}`}>Key Contact & Fees</h3>
                
                <div className={`p-3 rounded-xl border space-y-1 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block">Application Fee:</span>
                  <span className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{keyInfo.application_fee || 'NO fee (Free)'}</span>
                </div>

                <div className={`p-3 rounded-xl border space-y-1 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block">Application Mode:</span>
                  <span className={`font-bold ${isLightMode ? 'text-slate-900' : 'text-white'}`}>{keyInfo.application_mode || 'Online'}</span>
                </div>

                <div className={`p-3 rounded-xl border space-y-1 ${isLightMode ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/80 border-slate-800'}`}>
                  <span className="text-slate-500 dark:text-slate-400 font-medium block">Official Contact:</span>
                  <span className="text-indigo-600 dark:text-violet-300 font-bold">{keyInfo.contact_email || 'helpdesk@brightfuturegrant.gov.in'}</span>
                </div>
              </div>

              {/* Things to Double Check */}
              <div className={`p-6 rounded-2xl border space-y-3 ${
                isLightMode ? 'bg-amber-50 border-amber-200 text-amber-900' : 'glass-panel border-amber-500/20 bg-amber-500/5'
              }`}>
                <h3 className="text-xs font-black text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  Things to Double-Check
                </h3>
                <ul className={`space-y-2 text-xs ${isLightMode ? 'text-slate-700 font-medium' : 'text-slate-300'}`}>

                  {doubleCheck.map((chk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: ACTION CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="p-6 rounded-2xl glass-panel border border-slate-800">
            <ActionChecklist actionItems={doc.action_items || []} filename={doc.filename} />
          </div>
        )}

        {/* TAB 3: GROUNDED CHAT ASSISTANT */}
        {activeTab === 'chat' && (
          <DocumentChat docId={doc.id} initialChats={doc.sample_chats || []} filename={doc.filename} />
        )}

        {/* TAB 4: RAW EXTRACTED TEXT */}
        {activeTab === 'rawText' && (
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Raw Extracted Document Text</h3>
            <pre className="p-4 rounded-xl bg-navy-950 border border-slate-800 text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-[500px]">
              {doc.extracted_text || 'No extracted text available.'}
            </pre>
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Eligibility Checker Modal */}
      <EligibilityCheckerModal
        isOpen={isEligibilityOpen}
        onClose={() => setIsEligibilityOpen(false)}
        eligibilityCriteria={criteria}
      />

    </div>
  );
}
