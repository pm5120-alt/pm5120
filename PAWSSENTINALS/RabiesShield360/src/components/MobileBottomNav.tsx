import React from 'react';
import { AppView } from './ViewSwitcher';

interface MobileBottomNavProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  overdueCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentView, onNavigate, overdueCount = 14 }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-1.5 lg:hidden bg-white border-t border-outline-variant shadow-lg">
      {[
        ['dashboard','dashboard','Dashboard'],
        ['entry','add_circle','Entry'],
        ['records','folder_shared','Records'],
        ['followups','event_upcoming','Follow-ups'],
        ['report','bar_chart','Reports'],
      ].map(([v,icon,label]) => (
        <button key={v} onClick={() => onNavigate(v as AppView)} className={`relative flex flex-col items-center justify-center px-3 py-1.5 rounded-lg transition-transform active:scale-95 ${currentView === v ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-low'}`}>
          {v === 'followups' && overdueCount > 0 && <span className="absolute -top-1 right-2 w-4 h-4 rounded-full bg-error text-white text-[9px] flex items-center justify-center font-bold">{overdueCount}</span>}
          <span className="material-symbols-outlined text-xl">{icon}</span><span className="text-[11px] mt-0.5">{label}</span>
        </button>
      ))}
    </nav>
  );
};