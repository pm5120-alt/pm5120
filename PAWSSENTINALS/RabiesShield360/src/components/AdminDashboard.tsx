import React, { useMemo } from 'react';
import { AppView } from './ViewSwitcher';
import { AdminSidebar } from './AdminSidebar';
import { PatientRecord } from '../types';
import { APP_CONFIG, formatLongDate, formatShortDate } from '../config';

interface AdminDashboardProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  patientRecords: PatientRecord[];
}

const pct = (part: number, total: number) => (total ? Math.round((part / total) * 100) : 0);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentView, onNavigate, patientRecords }) => {
  const analytics = useMemo(() => {
    const total = patientRecords.length;
    const today = patientRecords.filter((r) => r.rawDate === APP_CONFIG.referenceDate).length;
    const cat1 = patientRecords.filter((r) => r.whoCategory === 'Category I').length;
    const cat2 = patientRecords.filter((r) => r.whoCategory === 'Category II').length;
    const cat3 = patientRecords.filter((r) => r.whoCategory === 'Category III').length;
    const pending = patientRecords.filter((r) => r.overallStatus === 'Pending').length;
    const missed = patientRecords.filter((r) => r.overallStatus === 'Missed').length;
    const completed = patientRecords.filter((r) => r.overallStatus === 'Done').length;
    const pepEligible = patientRecords.filter((r) => r.whoCategory !== 'Category I');
    const completed3 = pepEligible.filter((r) => r.doses.d3.status === 'Done').length;
    const compliance = pct(completed3, pepEligible.length);
    const rig = patientRecords.filter((r) => r.rigGiven !== 'None Required' && r.rigGiven !== 'N/A').length;

    const animalCounts = (['Dog', 'Cat', 'Monkey', 'Other'] as const).map((animal) => ({
      animal,
      count: patientRecords.filter((r) => r.bitingAnimal === animal).length,
    }));

    const zoneCounts = Array.from(new Set(patientRecords.map((r) => r.tehsil))).map((zone) => ({
      zone,
      count: patientRecords.filter((r) => r.tehsil === zone).length,
      missed: patientRecords.filter((r) => r.tehsil === zone && r.overallStatus === 'Missed').length,
    }));

    const sevenDayTrend = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(`${APP_CONFIG.referenceDate}T00:00:00`);
      date.setDate(date.getDate() - (6 - index));
      const iso = date.toISOString().slice(0, 10);
      return { iso, label: formatShortDate(iso), count: patientRecords.filter((r) => r.rawDate === iso).length };
    });

    return { total, today, cat1, cat2, cat3, pending, missed, completed, compliance, rig, animalCounts, zoneCounts, sevenDayTrend };
  }, [patientRecords]);

  const maxTrend = Math.max(...analytics.sevenDayTrend.map((d) => d.count), 1);
  const missedRecords = patientRecords.filter((r) => r.overallStatus === 'Missed').slice(0, 3);
  const recentRecords = patientRecords.slice(0, 6);

  const exportSummary = () => {
    const headers = ['Metric', 'Value'];
    const rows = [
      ['Generated', formatLongDate(APP_CONFIG.referenceDate)],
      ['Total exposure records', analytics.total],
      ['New records today', analytics.today],
      ['Category I', analytics.cat1],
      ['Category II', analytics.cat2],
      ['Category III', analytics.cat3],
      ['Pending follow-ups', analytics.pending],
      ['Missed follow-ups', analytics.missed],
      ['Completed regimens', analytics.completed],
      ['3-dose progression', `${analytics.compliance}%`],
    ];
    const csv = [headers, ...rows].map((row) => row.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'RabiesShield360_Dashboard_Summary.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen bg-[#faf8ff] text-[#131b2e] antialiased">
      <AdminSidebar currentView={currentView} onNavigate={onNavigate} overdueCount={analytics.missed} />

      <main className="lg:ml-64 flex-1 min-w-0 pb-20 lg:pb-8">
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-outline-variant px-4 sm:px-8 py-4 shadow-2xs">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-primary">SURVEILLANCE DASHBOARD</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">DEMO DATA</span>
              </div>
              <h1 className="text-2xl font-bold text-on-surface">RabiesShield 360 Command Center</h1>
              <p className="text-xs text-on-surface-variant mt-1">SRM KTR • {APP_CONFIG.hackathon} • Reference date {formatLongDate(APP_CONFIG.referenceDate)}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button onClick={exportSummary} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-outline-variant bg-white text-xs font-semibold hover:bg-surface-container-low">
                <span className="material-symbols-outlined text-base">download</span> Export Summary
              </button>
              <button onClick={() => onNavigate('entry')} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-white text-xs font-bold hover:bg-primary-container">
                <span className="material-symbols-outlined text-base">add_circle</span> New Exposure
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 sm:p-8 space-y-6">
          <section className="rounded-2xl bg-gradient-to-r from-[#0f2a43] to-[#0f8191] text-white p-5 sm:p-6 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div>
                <p className="text-xs font-bold tracking-wider uppercase text-white/75">PAWS for Protection • Team RabiesShield</p>
                <h2 className="text-2xl sm:text-3xl font-bold mt-1">From bite report to follow-up.</h2>
                <p className="text-sm text-white/85 mt-2 max-w-2xl">A single demo workflow connects exposure triage, vaccination progress, follow-up alerts and community surveillance using synthetic data.</p>
              </div>
              <div className="grid grid-cols-2 gap-2 min-w-[280px]">
                <div className="rounded-xl bg-white/10 border border-white/15 p-3"><div className="text-xs text-white/70">New today</div><div className="text-2xl font-bold">{analytics.today}</div></div>
                <div className="rounded-xl bg-white/10 border border-white/15 p-3"><div className="text-xs text-white/70">Missed follow-ups</div><div className="text-2xl font-bold">{analytics.missed}</div></div>
              </div>
            </div>
          </section>

          {analytics.missed > 0 && (
            <section className="rounded-xl border border-error/20 bg-error-container/30 p-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-error text-white flex items-center justify-center"><span className="material-symbols-outlined">priority_high</span></div>
                  <div><div className="font-bold text-on-error-container">{analytics.missed} follow-up record{analytics.missed === 1 ? '' : 's'} need attention</div><p className="text-xs text-on-error-container/90 mt-0.5">These are synthetic demo records flagged for review in the next workflow step.</p></div>
                </div>
                <button onClick={() => onNavigate('followups')} className="px-3 py-2 rounded-lg bg-error text-white text-xs font-bold">Open Follow-ups</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                {missedRecords.map((r) => (
                  <button key={r.id} onClick={() => onNavigate('followups')} className="text-left rounded-lg bg-white border border-outline-variant p-3 hover:border-error transition-colors">
                    <div className="font-mono text-xs font-bold text-on-surface">{r.id}</div>
                    <div className="text-xs text-on-surface-variant mt-1">{r.whoCategory} • {r.bitingAnimal} • {r.tehsil}</div>
                    <div className="text-[11px] text-error font-semibold mt-2">Follow-up required</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
            {[
              ['Total cases', analytics.total, 'dataset'],
              ['New today', analytics.today, 'today'],
              ['Category III', analytics.cat3, 'priority_high'],
              ['Pending', analytics.pending, 'schedule'],
              ['Missed', analytics.missed, 'notifications_active'],
              ['3-dose progress', `${analytics.compliance}%`, 'verified'],
            ].map(([label, value, icon], i) => (
              <div key={label} className={`rounded-xl bg-white border p-4 shadow-2xs ${i === 4 && analytics.missed ? 'border-error/30' : 'border-outline-variant'}`}>
                <div className="flex items-center justify-between text-on-surface-variant"><span className="text-[11px] font-semibold">{label}</span><span className="material-symbols-outlined text-primary text-base">{icon}</span></div>
                <div className="text-2xl font-bold text-on-surface mt-2">{value}</div>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 bg-white border border-outline-variant rounded-xl p-5 shadow-2xs">
              <div className="flex items-center justify-between"><div><h2 className="font-bold text-lg">Exposure trend</h2><p className="text-xs text-on-surface-variant">Last 7 demo days</p></div><span className="px-2 py-1 rounded-full bg-surface-container text-[10px] font-bold text-on-surface-variant">{formatLongDate(APP_CONFIG.referenceDate)}</span></div>
              <div className="h-56 mt-6 flex items-end gap-3 sm:gap-5">
                {analytics.sevenDayTrend.map((d) => (
                  <div key={d.iso} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                    <span className="text-[11px] font-bold text-primary">{d.count}</span>
                    <div className="w-full max-w-[56px] rounded-t-lg bg-primary/15 overflow-hidden" style={{ height: `${Math.max(8, (d.count / maxTrend) * 82)}%` }}>
                      <div className="w-full h-full bg-primary rounded-t-lg" />
                    </div>
                    <span className="text-[10px] text-on-surface-variant">{d.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-2xs">
              <div><h2 className="font-bold text-lg">WHO exposure mix</h2><p className="text-xs text-on-surface-variant">Based on records in this prototype</p></div>
              <div className="space-y-4 mt-6">
                {[
                  ['Category I', analytics.cat1, 'Low exposure', 'bg-secondary-fixed-dim'],
                  ['Category II', analytics.cat2, 'Moderate exposure', 'bg-primary-container'],
                  ['Category III', analytics.cat3, 'High exposure', 'bg-error'],
                ].map(([label, count, note, bar]) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs"><span className="font-semibold">{label}</span><span className="font-bold">{count}</span></div>
                    <div className="h-2 rounded-full bg-surface-container mt-1.5 overflow-hidden"><div className={`${bar} h-full rounded-full`} style={{ width: `${pct(count as number, analytics.total)}%` }} /></div>
                    <div className="text-[10px] text-on-surface-variant mt-1">{note} • {pct(count as number, analytics.total)}%</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-4"><div><h2 className="font-bold text-lg">Animal vector profile</h2><p className="text-xs text-on-surface-variant">Reported exposure sources</p></div><span className="material-symbols-outlined text-primary">pets</span></div>
              <div className="grid grid-cols-2 gap-3">
                {analytics.animalCounts.map((item) => (
                  <div key={item.animal} className="rounded-lg bg-surface-container-low border border-outline-variant p-3"><div className="text-xs text-on-surface-variant">{item.animal}</div><div className="text-xl font-bold text-on-surface mt-1">{item.count}</div><div className="text-[10px] text-primary font-semibold">{pct(item.count, analytics.total)}% of cases</div></div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-outline-variant rounded-xl p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-4"><div><h2 className="font-bold text-lg">Community zones</h2><p className="text-xs text-on-surface-variant">Case concentration and follow-up load</p></div><span className="material-symbols-outlined text-primary">map</span></div>
              <div className="space-y-2.5">
                {analytics.zoneCounts.map((z) => (
                  <div key={z.zone} className="flex items-center gap-3 rounded-lg border border-outline-variant p-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{z.count}</div>
                    <div className="flex-1"><div className="text-xs font-bold">{z.zone}</div><div className="text-[10px] text-on-surface-variant">{z.missed} flagged for follow-up</div></div>
                    <button onClick={() => onNavigate('records')} className="text-[11px] font-bold text-primary hover:underline">View</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white border border-outline-variant rounded-xl shadow-2xs overflow-hidden">
            <div className="px-5 py-4 border-b border-outline-variant flex items-center justify-between"><div><h2 className="font-bold text-lg">Recent exposure records</h2><p className="text-xs text-on-surface-variant">Synthetic entries shared across the app workflow</p></div><button onClick={() => onNavigate('records')} className="text-xs font-bold text-primary hover:underline">View all records</button></div>
            <div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-surface-container-low text-[10px] uppercase tracking-wider text-on-surface-variant"><tr><th className="px-5 py-3">Patient code</th><th className="px-3 py-3">Date</th><th className="px-3 py-3">Vector</th><th className="px-3 py-3">WHO</th><th className="px-3 py-3">Zone</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-outline-variant">{recentRecords.map((r) => <tr key={r.id} className="hover:bg-surface-container-low/60"><td className="px-5 py-3 font-mono font-bold text-primary">{r.id}</td><td className="px-3 py-3 whitespace-nowrap">{r.regDate}</td><td className="px-3 py-3">{r.animalDetail}</td><td className="px-3 py-3"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${r.whoCategory === 'Category III' ? 'bg-error-container text-on-error-container' : r.whoCategory === 'Category II' ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface-variant'}`}>{r.whoCategory}</span></td><td className="px-3 py-3">{r.tehsil}</td><td className="px-5 py-3"><span className={`font-semibold ${r.overallStatus === 'Missed' ? 'text-error' : r.overallStatus === 'Done' ? 'text-primary' : 'text-amber-700'}`}>{r.overallStatus}</span></td></tr>)}</tbody></table></div>
          </section>

          <footer className="pt-2 text-center text-[11px] text-on-surface-variant">{APP_CONFIG.name} • SRM KTR • {APP_CONFIG.hackathon} • {APP_CONFIG.team.join(' • ')} • Synthetic educational prototype</footer>
        </div>
      </main>
    </div>
  );
};