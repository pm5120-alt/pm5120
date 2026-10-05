import React from 'react';
import { AppView } from './ViewSwitcher';

interface AdminSidebarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  overdueCount?: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ currentView, onNavigate, overdueCount = 4 }) => {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed left-0 top-0 bottom-0 bg-white border-r border-outline-variant shadow-xs z-30 justify-between shrink-0">
      <div className="p-4 flex flex-col gap-6 overflow-y-auto">
        <div className="flex items-center gap-3 px-2 pt-1">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-white flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-2xl">health_and_safety</span>
          </div>
          <div className="overflow-hidden">
            <div className="text-base font-bold text-primary truncate leading-tight">RabiesShield 360</div>
            <div className="text-xs text-on-surface-variant truncate">SRM KTR • Hackathon Prototype</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant">
          <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">PM</div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-on-surface truncate flex items-center gap-1.5"><span>Team RabiesShield</span><span className="w-2 h-2 rounded-full bg-emerald-500" title="On Shift"></span></div>
            <div className="text-[11px] text-on-surface-variant truncate">SRM Institute of Science and Technology • KTR</div>
          </div>
        </div>
        <button onClick={() => onNavigate('entry')} className="w-full flex items-center justify-center gap-2 bg-primary-container hover:bg-primary text-white py-2.5 px-4 rounded-lg font-semibold text-xs sm:text-sm shadow-sm active:scale-[0.99] transition-transform duration-100 cursor-pointer">
          <span className="material-symbols-outlined text-lg">add_circle</span><span>New Exposure Entry</span>
        </button>
        <nav className="flex flex-col gap-1 text-sm font-medium">
          {[
            ['dashboard','dashboard','Dashboard'],
            ['entry','edit_calendar','Daily Entry'],
            ['records','clinical_notes','Records'],
            ['followups','notifications_active','Follow-ups'],
            ['report','summarize','Monthly Report'],
          ].map(([v,icon,label]) => (
            <button key={v} onClick={() => onNavigate(v as AppView)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${currentView === v ? 'bg-surface-container text-primary font-bold shadow-2xs' : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'}`}>
              <span className="material-symbols-outlined text-xl">{icon}</span><span className="flex-1">{label}</span>
              {v === 'records' && currentView === 'records' && <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">Active</span>}
              {v === 'followups' && overdueCount > 0 && <span className="bg-error text-white px-2 py-0.5 rounded-full text-xs font-bold">{overdueCount}</span>}
            </button>
          ))}
          <button onClick={() => alert('Demo settings: RabiesShield 360 v1.0.0 • SRM KTR Hackathon configuration.')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer text-left">
            <span className="material-symbols-outlined text-xl">settings</span><span>Settings</span>
          </button>
        </nav>
      </div>
      <div className="p-4 border-t border-outline-variant flex flex-col gap-2">
        <a className="flex items-center gap-2.5 px-3 py-1.5 text-on-surface-variant hover:text-primary transition-colors text-xs font-medium" href="#data-safety" onClick={(e) => { e.preventDefault(); alert('Data Safety Demo: Use synthetic patient codes only; never enter real names or contact details.'); }}>
          <span className="material-symbols-outlined text-base">verified_user</span><span>Data Safety Info</span>
        </a>
        <a className="flex items-center gap-2.5 px-3 py-1.5 text-on-surface-variant hover:text-primary transition-colors text-xs font-medium" href="tel:112">
          <span className="material-symbols-outlined text-base">help_outline</span><span>Emergency Guidance</span>
        </a>
        <div className="px-3 pt-1 text-[10px] text-outline">Version 1.0.0 • RabiesShield 360</div>
      </div>
    </aside>
  );
};