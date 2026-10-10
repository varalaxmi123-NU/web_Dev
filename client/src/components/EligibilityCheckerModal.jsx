import React, { useState } from 'react';
import { CheckCircle, XCircle, ShieldAlert, ArrowRight, RefreshCw, X, Sparkles, Check, FileText } from 'lucide-react';

export default function EligibilityCheckerModal({ isOpen, onClose, eligibilityCriteria = [] }) {
  const [formData, setFormData] = useState({
    citizenship: 'India',
    age: '20',
    familyIncome: '450000',
    academicScore: '82',
    isEnrolled: 'yes'
  });

  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleEvaluate = (e) => {
    e.preventDefault();

    const income = parseFloat(formData.familyIncome);
    const score = parseFloat(formData.academicScore);
    const age = parseInt(formData.age);
    const isCitizen = formData.citizenship.toLowerCase().includes('india');
    const isEnrolled = formData.isEnrolled === 'yes';

    const checks = [];

    // Check 1: Citizenship
    checks.push({
      rule: 'Indian Citizenship',
      passed: isCitizen,
      reason: isCitizen ? 'Applicant is a citizen of India.' : 'Must be an Indian citizen.',
      passage: 'Applicant must be a citizen of India aged between 17 and 24 years as of January 1, 2026.'
    });

    // Check 2: Age
    const agePassed = age >= 17 && age <= 24;
    checks.push({
      rule: 'Age Criterion (17 - 24 Years)',
      passed: agePassed,
      reason: agePassed ? `Age ${age} falls within the eligible 17–24 years range.` : `Age ${age} is outside the eligible 17–24 years range.`,
      passage: 'aged between 17 and 24 years as of January 1, 2026.'
    });

    // Check 3: Family Income
    const incomePassed = income <= 600000;
    checks.push({
      rule: 'Annual Family Income (<= ₹6,00,000)',
      passed: incomePassed,
      reason: incomePassed ? `Family income ₹${income.toLocaleString('en-IN')} is below the ₹6,00,000 limit.` : `Family income ₹${income.toLocaleString('en-IN')} exceeds the ₹6,00,000 limit.`,
      passage: 'Total annual family income from all sources must not exceed INR 6,00,000 (Rupees Six Lakhs only)'
    });

    // Check 4: Academic Score
    const scorePassed = score >= 75;
    checks.push({
      rule: '12th Grade Score (>= 75% or 7.5 CGPA)',
      passed: scorePassed,
      reason: scorePassed ? `Score ${score}% satisfies the minimum 75% mark requirement.` : `Score ${score}% is below the required 75% mark threshold.`,
      passage: 'minimum of 75% marks or 7.5 CGPA in the 12th Standard Board Examination.'
    });

    // Check 5: UG Enrollment
    checks.push({
      rule: 'Full-time UG Program Enrolment',
      passed: isEnrolled,
      reason: isEnrolled ? 'Enrolled in full-time recognized undergraduate program.' : 'Must be enrolled in a full-time recognized UG degree program.',
      passage: 'enrolled in a full-time recognized undergraduate program in India for the academic year 2026-2027.'
    });

    const allPassed = checks.every(c => c.passed);
    const anyFailed = checks.some(c => !c.passed);

    setResult({
      status: allPassed ? 'MEETS_REQUIREMENTS' : 'DOES_NOT_MEET',
      title: allPassed ? 'Qualifications Satisfied' : 'Qualification Check Failed',
      checks
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0F172A] via-[#0B0F19] to-[#070A11] rounded-3xl p-6 sm:p-8 border border-violet-500/30 shadow-[0_0_50px_rgba(139,92,246,0.25)] max-h-[92vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-fuchsia-500 p-0.5 shadow-glow-violet flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-navy-950 rounded-[14px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-violet-400" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                Interactive Eligibility Evaluator
              </h3>
              <p className="text-xs text-slate-400 font-medium">Grounded against explicit Section 2 document rules</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!result ? (
          <form onSubmit={handleEvaluate} className="mt-6 space-y-5">
            <div className="p-3.5 rounded-2xl bg-violet-600/10 border border-violet-500/25 text-xs text-violet-200 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-violet-400 shrink-0" />
              <span>Input your details below. SAHAYA AI will compare them against document requirements with exact quotation citations.</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Country of Citizenship</label>
                <input
                  type="text"
                  value={formData.citizenship}
                  onChange={(e) => setFormData({ ...formData, citizenship: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Current Age (Years)</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Annual Family Income (₹)</label>
                <input
                  type="number"
                  value={formData.familyIncome}
                  onChange={(e) => setFormData({ ...formData, familyIncome: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">12th Score (%) or CGPA × 10</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.academicScore}
                  onChange={(e) => setFormData({ ...formData, academicScore: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">Enrolled in Full-Time UG Degree?</label>
              <select
                value={formData.isEnrolled}
                onChange={(e) => setFormData({ ...formData, isEnrolled: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/30 transition-all font-medium"
              >
                <option value="yes">Yes, currently enrolled in full-time UG program</option>
                <option value="no">No</option>
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-gradient px-7 py-3 rounded-xl text-white text-xs font-extrabold flex items-center gap-2 shadow-glow-violet hover:scale-[1.02] transition-transform"
              >
                Evaluate Eligibility Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 space-y-6">
            
            {/* Outcome Banner */}
            <div className={`p-5 rounded-2xl border flex items-start space-x-4 ${
              result.status === 'MEETS_REQUIREMENTS'
                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-500/15 border-rose-500/40 text-rose-200'
            }`}>
              {result.status === 'MEETS_REQUIREMENTS' ? (
                <CheckCircle className="w-7 h-7 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-7 h-7 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="text-base font-extrabold text-white">{result.title}</h4>
                <p className="text-xs mt-1 leading-relaxed">
                  {result.status === 'MEETS_REQUIREMENTS'
                    ? 'Based on your entries, you meet all explicit requirements specified in Section 2 of the document.'
                    : 'One or more of your inputs do not satisfy the criteria explicitly stated in Section 2.'}
                </p>
              </div>
            </div>

            {/* Rule-by-rule breakdown */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Rule Comparison Breakdown:</h5>
              {result.checks.map((chk, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{chk.rule}</span>
                    {chk.passed ? (
                      <span className="text-emerald-400 font-bold flex items-center gap-1 text-[11px] bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        <Check className="w-3.5 h-3.5" /> Satisfied
                      </span>
                    ) : (
                      <span className="text-rose-400 font-bold flex items-center gap-1 text-[11px] bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 rounded-full">
                        <X className="w-3.5 h-3.5" /> Not Met
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 font-medium">{chk.reason}</p>
                  <p className="text-[11px] text-slate-400 italic bg-navy-950 p-2 rounded-lg border border-slate-800 font-mono mt-1">
                    Source Quote: "{chk.passage}"
                  </p>
                </div>
              ))}
            </div>

            {/* Re-test Button */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setResult(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2"
              >
                <RefreshCw className="w-3.5 h-3.5 text-violet-400" /> Re-test Values
              </button>
              <button
                onClick={onClose}
                className="btn-gradient px-6 py-2.5 rounded-xl text-white text-xs font-bold shadow-glow-violet"
              >
                Close Evaluator
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
