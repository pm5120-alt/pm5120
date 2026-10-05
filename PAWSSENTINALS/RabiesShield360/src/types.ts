export type WhoCategory = 'Category I' | 'Category II' | 'Category III';
export type RegimenStatus = 'Done' | 'Pending' | 'Missed' | 'Refused';
export type DoseStatus = 'Done' | 'Pending' | 'Missed' | 'Refused' | 'Today';

export interface PatientRecord {
  id: string;
  regDate: string;
  rawDate: string;
  ageGroup: 'Child (<12)' | 'Adolescent (12-18)' | 'Adult (19-59)' | 'Elderly (60+)';
  ageText?: string;
  gender: 'Male' | 'Female' | 'Other';
  bitingAnimal: 'Dog' | 'Cat' | 'Monkey' | 'Other';
  animalDetail: string;
  whoCategory: WhoCategory;
  woundSite: string;
  washedAtHome: boolean;
  vaccineVial: string;
  rigGiven: 'Infiltrated (ERIG)' | 'HRIG Given' | 'None Required' | 'Yes - Infiltrated' | 'No / Unavailable' | 'N/A';
  currentDose: '1st Dose (Day 0)' | '2nd Dose (Day 3)' | '3rd Dose (Day 7)' | 'Booster (Day 14/28)';
  doses: {
    d1: { status: DoseStatus; label: string; date?: string };
    d2: { status: DoseStatus; label: string; date?: string };
    d3: { status: DoseStatus; label: string; date?: string };
    d4: { status: DoseStatus; label: string; date?: string };
  };
  overallStatus: RegimenStatus;
  nextDueText: string;
  overdueDays?: number;
  tehsil: 'Demo Zone A' | 'Demo Zone B' | 'Demo Zone C' | 'Demo Zone D' | 'Demo Zone E' | 'Other';
  areaDetail: string;
  animalVaccinationStatus?: 'Vaccinated' | 'Unknown' | 'Unvaccinated';
  notes: string;
  loggedTime: string;
}

export interface SurveillanceDay {
  date: string;
  dayNum: number;
  newCases: number;
  cat1: number;
  cat2: number;
  cat3: number;
  rigGiven: number;
  dose1: number;
  dose2: number;
  dose3: number;
  missed: number;
  refused: number;
}