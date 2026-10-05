import React, { useEffect, useState } from 'react';
import { ViewSwitcher } from './components/ViewSwitcher';
import { PublicPortal } from './components/PublicPortal';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { DailyEntry } from './components/DailyEntry';
import { AdminRecords } from './components/AdminRecords';
import { AdminFollowups } from './components/AdminFollowups';
import { MonthlyReport } from './components/MonthlyReport';
import { MobileBottomNav } from './components/MobileBottomNav';
import { INITIAL_PATIENT_RECORDS } from './data/mockData';
import { PatientRecord } from './types';
import { APP_CONFIG } from './config';

const isStoredAuth = () => {
  try { return sessionStorage.getItem(APP_CONFIG.authKey) === 'true'; }
  catch { return false; }
};

export default function App() {
  const [currentView, setCurrentView] = useState('public' as any);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isStoredAuth);

  const [patientRecords, setPatientRecords] = useState<PatientRecord[]>(() => {
    try {
      const stored = localStorage.getItem(APP_CONFIG.storageKey);
      if (!stored) return INITIAL_PATIENT_RECORDS;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length ? parsed : INITIAL_PATIENT_RECORDS;
    } catch {
      return INITIAL_PATIENT_RECORDS;
    }
  });

  useEffect(() => {
    try { localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(patientRecords)); }
    catch { /* demo continues */ }
  }, [patientRecords]);

  const guardedNavigate = (view: any) => {
    const adminViews = ['dashboard', 'entry', 'records', 'followups', 'report'];
    if (adminViews.includes(view) && !isAuthenticated) { setCurrentView('login'); return; }
    setCurrentView(view);
  };

  const handleLogin = () => {
    try { sessionStorage.setItem(APP_CONFIG.authKey, 'true'); } catch {}
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    try { sessionStorage.removeItem(APP_CONFIG.authKey); } catch {}
    setIsAuthenticated(false);
    setCurrentView('public');
  };

  const handleAddPatient = (record: PatientRecord) => setPatientRecords(prev => [record, ...prev]);
  const handleDeleteRecord = (id: string) => setPatientRecords(prev => prev.filter(r => r.id !== id));
  const handleUpdateRecord = (updated: PatientRecord) => setPatientRecords(prev => prev.map(r => r.id === updated.id ? updated : r));

  const handleMarkDoseDone = (id: string, doseKey: 'd2'|'d3'|'d4') => {
    setPatientRecords(prev => prev.map(record => {
      if (record.id !== id) return record;
      const today = APP_CONFIG.referenceDate;
      const doses = {...record.doses, [doseKey]: {...record.doses[doseKey], status:'Done' as const, label:'Done', date:today}};
      const completedThroughD3 = doses.d3.status === 'Done';
      return {...record, doses, overallStatus: completedThroughD3 ? 'Done' : 'Pending', nextDueText: completedThroughD3 ? 'Course Complete' : 'Next scheduled dose pending', overdueDays:0};
    }));
  };

  const overdueCount = patientRecords.filter(r => r.overallStatus === 'Missed' || (r.overdueDays ?? 0) > 0).length;

  return <div className="min-h-screen flex flex-col font-sans bg-[#faf8ff] text-[#131b2e]">
    <ViewSwitcher currentView={currentView} onViewChange={guardedNavigate} overdueCount={overdueCount} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
    <div className="flex-1 flex flex-col">
      {currentView === 'public' && <PublicPortal onNavigate={guardedNavigate} />}
      {currentView === 'login' && <AdminLogin onNavigate={guardedNavigate} onLoginSuccess={handleLogin} />}
      {currentView === 'dashboard' && <AdminDashboard currentView={currentView} onNavigate={guardedNavigate} patientRecords={patientRecords} />}
      {currentView === 'entry' && <DailyEntry onNavigate={guardedNavigate} onAddPatient={handleAddPatient} patientRecords={patientRecords} onMarkDoseDone={handleMarkDoseDone} />}
      {currentView === 'records' && <AdminRecords currentView={currentView} onNavigate={guardedNavigate} patientRecords={patientRecords} onDeleteRecord={handleDeleteRecord} onUpdateRecord={handleUpdateRecord} />}
      {currentView === 'followups' && <AdminFollowups currentView={currentView} onNavigate={guardedNavigate} patientRecords={patientRecords} onMarkDoseDone={handleMarkDoseDone} />}
      {currentView === 'report' && <MonthlyReport currentView={currentView} onNavigate={guardedNavigate} patientRecords={patientRecords} />}
    </div>
    {currentView !== 'login' && <MobileBottomNav currentView={currentView} onNavigate={guardedNavigate} overdueCount={overdueCount} />}
  </div>;
}