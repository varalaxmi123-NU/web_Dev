import React, { useState } from 'react';
import { CheckSquare, Square, Calendar, AlertTriangle, ArrowUpDown, Filter, CheckCircle2 } from 'lucide-react';
import CitationViewer from './CitationViewer';
import { updateActionStatus } from '../lib/api';
import { useAuth } from '../context/AuthContext';

export default function ActionChecklist({ actionItems = [], filename, onTaskToggle }) {
  const { isGuestMode } = useAuth();
  const [items, setItems] = useState(actionItems);
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [sortBy, setSortBy] = useState('priority'); // priority, deadline

  const handleToggle = async (id, currentStatus) => {
    const newStatus = !currentStatus;
    // Optimistic UI update
    const updated = items.map(item => item.id === id ? { ...item, is_completed: newStatus } : item);
    setItems(updated);
    if (onTaskToggle) onTaskToggle(updated);

    try {
      await updateActionStatus(id, newStatus, isGuestMode);
    } catch (err) {
      console.warn('Action status persist warning:', err);
    }
  };

  const priorityWeight = { High: 3, Medium: 2, Low: 1 };

  const filteredItems = items.filter(item => {
    if (filter === 'pending') return !item.is_completed;
    if (filter === 'completed') return item.is_completed;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'priority') {
      return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
    }
    return (a.due_date || '').localeCompare(b.due_date || '');
  });

  const completedCount = items.filter(i => i.is_completed).length;

  return (
    <div className="space-y-4 font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-indigo-400" />
            Personalized Action Checklist
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {completedCount} of {items.length} tasks completed ({items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0}%)
          </p>
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex items-center gap-3 text-xs w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <div className="flex items-center gap-1.5 bg-navy-950 p-1 rounded-lg border border-slate-800">
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-1" />
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${filter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${filter === 'pending' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Pending ({items.length - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Done ({completedCount})
            </button>
          </div>

          <button
            onClick={() => setSortBy(sortBy === 'priority' ? 'deadline' : 'priority')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center gap-1.5 shrink-0"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-violet-400" />
            Sort: <span className="font-semibold text-white capitalize">{sortBy}</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400 transition-all duration-500"
          style={{ width: `${items.length > 0 ? (completedCount / items.length) * 100 : 0}%` }}
        ></div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center bg-slate-900/40 rounded-xl border border-slate-800/80 text-slate-400 text-xs">
            No action items match the selected filter.
          </div>
        ) : (
          filteredItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`p-4 rounded-xl border transition-all ${
                item.is_completed
                  ? 'bg-slate-900/40 border-slate-800 opacity-75'
                  : 'bg-slate-900/80 border-slate-800 hover:border-violet-500/40 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => handleToggle(item.id, item.is_completed)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                  >
                    {item.is_completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                    ) : (
                      <Square className="w-5 h-5 hover:border-indigo-400" />
                    )}
                  </button>

                  <div>
                    <h4 className={`text-sm font-bold ${item.is_completed ? 'line-through text-slate-400' : 'text-white'}`}>
                      {item.title}
                    </h4>
                    {item.description && (
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                    item.priority === 'High'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : item.priority === 'Medium'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    {item.priority || 'Medium'}
                  </span>
                </div>
              </div>

              {/* Due date badge */}
              {item.due_date && item.due_date !== 'Not specified' && (
                <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md w-fit font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due: {item.due_date}</span>
                </div>
              )}

              {/* Citation passage */}
              {item.source_reference && (
                <CitationViewer sourceReference={item.source_reference} filename={filename} />
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
