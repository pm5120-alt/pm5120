export const APP_CONFIG = {
  name: 'RabiesShield 360',
  shortName: 'RS360',
  tagline: 'Rabies Care • Community Surveillance • Prevention',
  institution: 'SRM Institute of Science and Technology • KTR',
  hackathon: 'PAWS for Protection – Rabies Awareness Hackathon',
  hackathonDate: '07 Oct 2026',
  registrationDeadline: '05 Oct 2026',
  team: ['Priyanshu Mishra', 'Argha Atta', 'Sarhan Sheriff'],
  leadEmail: 'pm5120@srmist.edu.in',
  demoPassword: 'priyanshu1234',
  referenceDate: '2026-10-05',
  storageKey: 'rabies_shield_srm_records_v2',
  authKey: 'rabies_shield_srm_auth_v1',
};

export const formatLongDate = (iso: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));

export const formatShortDate = (iso: string) =>
  new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
  }).format(new Date(`${iso}T00:00:00`));

export const addDays = (iso: string, days: number) => {
  const date = new Date(`${iso}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

export const displayReferenceDate = formatLongDate(APP_CONFIG.referenceDate);