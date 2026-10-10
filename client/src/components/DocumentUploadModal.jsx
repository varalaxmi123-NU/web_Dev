import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2, X, Sparkles, ArrowRight } from 'lucide-react';
import { uploadAndAnalyzeDocument, loadDemoDocument } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function DocumentUploadModal({ isOpen, onClose, onAnalysisComplete }) {
  const { isGuestMode } = useAuth();
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState('idle'); // idle, uploading, extracting, analyzing, preparing, error
  const [errorMsg, setErrorMsg] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;
    
    const validTypes = ['application/pdf', 'text/plain', 'text/markdown'];
    const isExtensionValid = selectedFile.name.endsWith('.pdf') || selectedFile.name.endsWith('.txt') || selectedFile.name.endsWith('.md');

    if (!validTypes.includes(selectedFile.type) && !isExtensionValid) {
      setErrorMsg('Invalid file type. Only PDF (.pdf) and plain text (.txt) documents are supported.');
      return false;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMsg('File size exceeds the 10 MB limit. Please upload a smaller document.');
      return false;
    }

    setErrorMsg('');
    return true;
  };

  const handleFileSelect = (e) => {
    const selected = e.target.files[0];
    if (selected && validateFile(selected)) {
      setFile(selected);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && validateFile(dropped)) {
      setFile(dropped);
    }
  };

  const handleStartAnalysis = async () => {
    if (!file) return;

    try {
      setStage('uploading');
      await new Promise(r => setTimeout(r, 600));

      setStage('extracting');
      await new Promise(r => setTimeout(r, 700));

      setStage('analyzing');
      const response = await uploadAndAnalyzeDocument(file, isGuestMode);

      setStage('preparing');
      await new Promise(r => setTimeout(r, 500));

      setStage('completed');
      setTimeout(() => {
        onAnalysisComplete(response.data);
        onClose();
        resetState();
      }, 600);

    } catch (err) {
      setStage('error');
      setErrorMsg(err.message || 'Analysis failed. Please check your document and try again.');
    }
  };

  const handleTrySample = async () => {
    try {
      setStage('analyzing');
      const res = await loadDemoDocument(isGuestMode);
      setStage('completed');
      setTimeout(() => {
        onAnalysisComplete(res.data);
        onClose();
        resetState();
      }, 500);
    } catch (err) {
      setStage('error');
      setErrorMsg('Failed to load sample document.');
    }
  };

  const resetState = () => {
    setFile(null);
    setStage('idle');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
              <FileText className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Upload & Analyze Document</h3>
              <p className="text-xs text-slate-400">PDF or TXT (Max 10 MB)</p>
            </div>
          </div>
          <button
            onClick={() => { resetState(); onClose(); }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-6">

          {stage === 'idle' && (
            <div className="space-y-6">
              
              {/* Drop Area */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                  isDragOver
                    ? 'border-violet-500 bg-violet-500/10 scale-[1.01]'
                    : file
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.txt,.md"
                  className="hidden"
                />

                {file ? (
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-white">{file.name}</span>
                    <span className="text-xs text-slate-400">({(file.size / 1024).toFixed(1)} KB)</span>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="text-xs text-red-400 hover:underline pt-1"
                    >
                      Remove and select another
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-violet-600/10 text-violet-400 flex items-center justify-center">
                      <Upload className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-200">
                        Drag and drop your document here, or <span className="text-violet-400 hover:underline">browse</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">Supports Official Notices, Scholarship PDFs, Guidelines, Bills</p>
                    </div>
                  </div>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleTrySample}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Load Featured Scholarship Notice
                </button>

                <button
                  type="button"
                  disabled={!file}
                  onClick={handleStartAnalysis}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    file
                      ? 'btn-gradient text-white shadow-glow-violet hover:scale-[1.02]'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-800'
                  }`}
                >
                  Start Analysis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* Loading States */}
          {stage !== 'idle' && stage !== 'error' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-violet-500/20 border-t-violet-500 animate-spin flex items-center justify-center"></div>
                <Sparkles className="w-6 h-6 text-violet-400 absolute inset-0 m-auto" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-bold text-white uppercase tracking-wider">
                  {stage === 'uploading' && '1. Uploading Document...'}
                  {stage === 'extracting' && '2. Extracting Page Text...'}
                  {stage === 'analyzing' && '3. AI Fact & Eligibility Analysis...'}
                  {stage === 'preparing' && '4. Preparing Action Plan & Evidence...'}
                  {stage === 'completed' && 'Analysis Complete!'}
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Extracting deadlines, explicit eligibility criteria, and required documents with citations.
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {stage === 'error' && (
            <div className="py-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <p className="text-sm text-red-300 font-medium">{errorMsg}</p>
              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => setStage('idle')}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700"
                >
                  Try Again
                </button>
                <button
                  onClick={handleTrySample}
                  className="px-4 py-2 rounded-lg btn-gradient text-white text-xs font-semibold"
                >
                  Load Featured Scholarship Notice
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
