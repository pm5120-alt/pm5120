import React from 'react';

export type AppView = 'public' | 'login' | 'dashboard' | 'entry' | 'records' | 'followups' | 'report';

interface ViewSwitcherProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  overdueCount?: number;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  currentView,
  onViewChange,
  overdueCount = 14,
  isAuthenticated,
  onLogout,
}) => {
  return (
    <div className="bg-[#131b2e] text-white border-b border-outline/30 sticky top-0 z-50 text-xs px-4 py-1.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-slate-200">RabiesShield 360 • Rabies Care & Community Surveillance</span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Priyanshu Mishra • Argha Atta • Sarhan Sheriff</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mr-1 shrink-0">Screens:</span>
          {[
            ['public','public','Public Portal'],
            ['login','lock','Staff Login'],
            ['dashboard','dashboard','Dashboard'],
            ['entry','add_circle','Daily Entry'],
            ['records','clinical_notes','Records'],
            ['followups','notifications_active','Follow-ups'],
            ['report','summarize','Monthly Report'],
          ].map(([v,icon,label]) => (
            <button key={v} onClick={() => onViewChange(v as AppView)} className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap flex items-center gap-1 ${currentView === v ? 'bg-primary text-white font-bold' : 'text-slate-300 hover:bg-slate-800'}`}>
              <span className="material-symbols-outlined text-[15px]">{icon}</span><span>{label}</span>
              {v === 'followups' && overdueCount > 0 && <span className="bg-error text-white text-[9px] px-1.5 py-0.2 rounded-full font-bold">{overdueCount}</span>}
            </button>
          ))}
          {isAuthenticated ? (
            <button onClick={onLogout} className="ml-2 text-rose-300 hover:text-white px-2 py-1 rounded hover:bg-rose-950/40 text-[11px] font-semibold flex items-center gap-1" title="End session">
              <span className="material-symbols-outlined text-[14px]">logout</span><span>Sign Out</span>
            </button>
          ) : (
            <button onClick={() => onViewChange('login')} className="ml-2 bg-primary hover:bg-primary-container text-white px-2 py-1 rounded text-[11px] font-semibold flex items-center gap-1" title="Open demo staff login">
              <span>Staff Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};