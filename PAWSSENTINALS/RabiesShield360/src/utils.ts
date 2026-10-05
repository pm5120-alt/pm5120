import { APP_CONFIG, addDays } from './config';
import { PatientRecord, SurveillanceDay } from './types';

export const createPatientCode = (records: PatientRecord[]) => {
  const used = new Set(records.map((r) => r.id));
  let code = '';
  do {
    const n = Math.floor(1000 + Math.random() * 8999);
    code = `SRM-RB-${APP_CONFIG.referenceDate.slice(0, 4)}-${n}`;
  } while (used.has(code));
  return code;
};

export const doseDateMap = (rawDate: string) => ({
  d1: addDays(rawDate, 0),
  d2: addDays(rawDate, 3),
  d3: addDays(rawDate, 7),
  d4: addDays(rawDate, 28),
});

export const statusLabel = (status: string) => {
  switch (status) {
    case 'Done': return 'Done';
    case 'Today': return 'Today';
    case 'Missed': return 'Missed';
    case 'Refused': return 'Refused';
    default: return 'Pending';
  }
};

export const calculateDerivedStatus = (record: PatientRecord) => {
  if (record.overallStatus === 'Refused') return 'Refused';
  if (record.doses.d3.status === 'Done') return 'Done';
  if (record.doses.d2.status === 'Missed' || record.doses.d3.status === 'Missed') return 'Missed';
  return 'Pending';
};

export const calculateOverdueDays = (record: PatientRecord) => {
  const dueDates = [record.doses.d2, record.doses.d3, record.doses.d4]
    .filter((dose) => dose.status === 'Missed' && dose.date)
    .map((dose) => new Date(`${dose.date}T00:00:00`).getTime());
  if (!dueDates.length) return 0;
  const diff = Math.floor((new Date(`${APP_CONFIG.referenceDate}T00:00:00`).getTime() - Math.min(...dueDates)) / 86400000);
  return Math.max(diff, 0);
};

export const buildDailyLedger = (records: PatientRecord[], year: number, monthIndex: number): SurveillanceDay[] => {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const rawDate = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const sameDay = records.filter((r) => r.rawDate === rawDate);
    return {
      date: new Intl.DateTimeFormat('en-IN', {day:'2-digit',month:'short',year:'numeric'}).format(new Date(`${rawDate}T00:00:00`)),
      dayNum: day,
      newCases: sameDay.length,
      cat1: sameDay.filter((r) => r.whoCategory === 'Category I').length,
      cat2: sameDay.filter((r) => r.whoCategory === 'Category II').length,
      cat3: sameDay.filter((r) => r.whoCategory === 'Category III').length,
      rigGiven: sameDay.filter((r) => r.rigGiven !== 'None Required' && r.rigGiven !== 'N/A').length,
      dose1: sameDay.filter((r) => r.doses.d1.status === 'Done').length,
      dose2: sameDay.filter((r) => r.doses.d2.status === 'Done').length,
      dose3: sameDay.filter((r) => r.doses.d3.status === 'Done').length,
      missed: sameDay.filter((r) => r.overallStatus === 'Missed' || r.doses.d2.status === 'Missed' || r.doses.d3.status === 'Missed').length,
      refused: sameDay.filter((r) => r.overallStatus === 'Refused').length,
    };
  });
};

export const monthName = (monthIndex: number) =>
  new Intl.DateTimeFormat('en-IN', { month: 'long' }).format(new Date(2026, monthIndex, 1));

export const csvEscape = (value: unknown) => `"${String(value ?? '').replaceAll('"', '""')}"`;