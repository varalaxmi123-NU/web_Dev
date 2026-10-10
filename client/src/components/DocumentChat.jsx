import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Copy, Check, MessageSquare, AlertCircle, RefreshCw, FileText } from 'lucide-react';
import { askDocumentQuestion } from '../lib/api';
import CitationViewer from './CitationViewer';
import { useAuth } from '../context/AuthContext';

export default function DocumentChat({ docId, initialChats = [], filename }) {
  const { isGuestMode } = useAuth();
  const [messages, setMessages] = useState(
    initialChats.length > 0
      ? initialChats.flatMap((c, i) => [
          { id: `init-q-${i}`, role: 'user', content: c.question },
          { id: `init-a-${i}`, role: 'assistant', content: c.answer, sources: c.sources || [] }
        ])
      : [
          {
            id: 'welcome-msg',
            role: 'assistant',
            content: `Hello! I am your SAHAYA AI Document Assistant. Ask me anything about **${filename || 'this document'}**. My responses are strictly grounded in the official text.`,
            sources: []
          }
        ]
  );

  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatEndRef = useRef(null);

  const suggestedQuestions = [
    'What is the last date to apply?',
    'Is there any application fee?',
    'What are the eligibility criteria?',
    'Which documents do I need to prepare?'
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (questionToSend) => {
    const query = (questionToSend || inputQuestion).trim();
    if (!query || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const assistantMsgId = `asst-${Date.now()}`;

    setMessages(prev => [...prev, { id: userMsgId, role: 'user', content: query }]);
    setInputQuestion('');
    setLoading(true);

    try {
      const history = messages.filter(m => m.id !== 'welcome-msg').map(m => ({ role: m.role, content: m.content }));
      const response = await askDocumentQuestion(docId, query, history, isGuestMode);

      setMessages(prev => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: response.data.answer,
          sources: response.data.sources || []
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: assistantMsgId,
          role: 'assistant',
          content: 'I encountered an error retrieving answers. Please try asking again.',
          sources: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col h-[600px] glass-panel rounded-2xl border border-slate-800 overflow-hidden font-sans">
      
      {/* Header */}
      <div className="px-6 py-4 bg-navy-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Document Assistant Chat
            </h3>
            <p className="text-[11px] text-slate-400">Strictly grounded in extracted document facts</p>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="px-6 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try asking:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs border border-slate-700 shrink-0 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
              msg.role === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-violet-600/20 border border-violet-500/30 text-violet-400'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-none shadow-glow-indigo'
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
            }`}>
              
              <div className="whitespace-pre-wrap font-sans">{msg.content}</div>

              {/* Citations if available */}
              {msg.role === 'assistant' && msg.sources && msg.sources.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-violet-400 block mb-1">
                    Verified Source Quotation:
                  </span>
                  {msg.sources.map((src, i) => (
                    <CitationViewer key={i} sourceReference={src} filename={filename} />
                  ))}
                </div>
              )}

              {/* Copy action */}
              {msg.role === 'assistant' && (
                <div className="mt-2 pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/40">
                  <button
                    onClick={() => handleCopy(msg.content, msg.id)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy answer
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none text-xs text-slate-400 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-violet-400 animate-spin" />
              <span>Scanning document text for grounded response...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-4 bg-navy-950 border-t border-slate-800 flex items-center space-x-3"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask a question about this document (e.g. eligibility, fees, deadlines)..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || loading}
          className={`p-2.5 rounded-xl transition-all ${
            inputQuestion.trim() && !loading
              ? 'btn-gradient text-white shadow-glow-violet hover:scale-105'
              : 'bg-slate-800 text-slate-600 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
}
