import React, { useState } from 'react';
import { AppView } from './ViewSwitcher';
import { APP_CONFIG } from '../config';

interface AdminLoginProps {
  onNavigate: (view: AppView) => void;
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() !== APP_CONFIG.leadEmail || password !== APP_CONFIG.demoPassword) {
      setStatusMessage('Demo login failed. Use the registered SRM team email and demo password.');
      return;
    }

    setIsLoading(true);
    setStatusMessage('Verifying SRM KTR demo credentials...');

    setTimeout(() => {
      setStatusMessage('Session authorized. Launching RabiesShield 360...');
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess();
        onNavigate('dashboard');
      }, 600);
    }, 900);
  };

  const handleQuickDemo = () => {
    setIsLoading(true);
    setStatusMessage('Authorizing Team RabiesShield Station Session...');
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
      onNavigate('dashboard');
    }, 500);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] antialiased min-h-screen flex flex-col justify-between bg-medical-grid selection:bg-secondary-container">
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-outline-variant/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('public')}
              className="inline-flex items-center gap-2 text-primary hover:text-primary-container text-xs sm:text-sm font-semibold transition-colors group cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg group-hover:-translate-x-0.5 transition-transform">arrow_back</span>
              <span>Return to Public Awareness & First Aid Portal</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-on-surface-variant text-xs px-3 py-1 rounded-full bg-surface-container-low border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span>RabiesShield 360 Demo Response Center (Operational)</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-error">
              <span className="material-symbols-outlined text-base">phone_in_talk</span>
              <span>Emergency: local services</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8 md:py-12">
        <div className="w-full max-w-[520px]">
          <div className="bg-white rounded-xl border border-outline-variant/50 shadow-lg overflow-hidden relative transition-all duration-200">
            <div className="h-1.5 w-full bg-primary-container"></div>
            <div className="p-6 sm:p-10">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant/40 mb-4 shadow-xs">
                  <span className="material-symbols-outlined text-primary text-base">local_hospital</span>
                  <span className="text-[11px] text-primary tracking-wider uppercase font-bold">SRM Institute of Science and Technology • Hackathon Demo</span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-[11px] text-on-surface-variant font-medium">SRM KTR Hackathon</span>
                </div>
                <h1 className="text-2xl font-bold text-on-surface tracking-tight">Rabies Prophylaxis & Surveillance System</h1>
                <p className="text-sm text-on-surface-variant mt-1.5">Authorized Clinical Administration Portal</p>
              </div>

              <div className="mb-6 p-4 rounded-lg bg-surface-container-low border border-outline-variant/40 border-l-4 border-l-primary-container">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-container shrink-0 mt-0.5 text-lg">verified_user</span>
                  <div className="space-y-1 text-left">
                    <p className="text-xs text-on-surface font-semibold leading-relaxed">Protected Demo Portal: Restricted to registered team members and faculty mentors.</p>
                    <p className="text-xs text-on-surface-variant leading-relaxed">This educational prototype manages anonymized rabies post-exposure surveillance records for the SRM KTR hackathon demonstration.</p>
                  </div>
                </div>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1.5" htmlFor="staffEmail">Team / Faculty Email</label>
                  <div className="relative rounded-lg shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline"><span className="material-symbols-outlined text-lg">badge</span></div>
                    <input className="block w-full pl-11 pr-4 py-2.5 bg-white text-sm text-on-surface border border-outline-variant/80 rounded-lg focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all font-mono" id="staffEmail" name="email" placeholder={APP_CONFIG.leadEmail} required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <p className="mt-1 text-[11px] text-outline">Demo account for the SRM KTR hackathon presentation.</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-on-surface" htmlFor="staffPassword">Demo Password</label>
                    <button type="button" onClick={() => alert(`Demo password: ${APP_CONFIG.demoPassword}`)} className="text-xs text-primary hover:underline">Forgot Password?</button>
                  </div>
                  <div className="relative rounded-lg shadow-2xs">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline"><span className="material-symbols-outlined text-lg">lock</span></div>
                    <input className="block w-full pl-11 pr-11 py-2.5 bg-white text-sm text-on-surface border border-outline-variant/80 rounded-lg focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all" id="staffPassword" name="password" placeholder="••••••••••••" required type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-outline hover:text-on-surface transition-colors cursor-pointer">
                      <span className="material-symbols-outlined text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-1">
                  <div className="flex items-center h-5">
                    <input checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 rounded border-outline-variant text-primary-container focus:ring-primary-container/30 bg-white" id="rememberMe" type="checkbox" />
                  </div>
                  <div className="text-left">
                    <label className="text-xs text-on-surface select-none cursor-pointer" htmlFor="rememberMe">Maintain active station session for 8 hours (Clinical shift mode)</label>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container/60 border border-outline-variant/40">
                  <span className="material-symbols-outlined text-outline text-[18px]">lock</span>
                  <p className="text-xs text-on-surface-variant font-medium">Authorized admin access only. All actions are logged.</p>
                </div>

                <div className="pt-2 space-y-2">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-primary-container hover:bg-[#0b656d] text-white font-bold text-sm shadow-sm transition-all duration-150 active:scale-[0.99] cursor-pointer disabled:opacity-80" disabled={isLoading} type="submit">
                    {isLoading ? (
                      <>
                        <span className="animate-spin material-symbols-outlined text-lg">progress_activity</span>
                        <span>{statusMessage || 'Verifying...'}</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-lg">login</span>
                        <span>Sign In to Tracker</span>
                      </>
                    )}
                  </button>

                  <button type="button" onClick={handleQuickDemo} className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-primary text-xs font-semibold border border-outline-variant transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-base">verified</span>
                    <span>Instant Demo Sign-In (Team RabiesShield)</span>
                  </button>
                </div>
              </form>

              {statusMessage && !isLoading && (
                <div className="mt-4 rounded-lg border border-outline-variant bg-surface-container-low px-3 py-2 text-xs text-on-surface-variant">{statusMessage}</div>
              )}

              <div className="mt-6 pt-5 border-t border-outline-variant/40 text-center">
                <p className="text-xs text-outline">
                  Experiencing credential failure? Contact Project Admin or Team RabiesShield:
                  <a className="text-primary font-semibold hover:underline block sm:inline sm:ml-1" href="mailto:pm5120@srmist.edu.in">pm5120@srmist.edu.in</a>
                </p>
              </div>
            </div>

            <div className="bg-surface-container-low px-8 py-3.5 border-t border-outline-variant/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">cloud_sync</span>
                <span className="text-xs text-on-surface-variant font-medium">Protected Demo Session • Synthetic Data</span>
              </div>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-wider bg-surface-container px-2 py-0.5 rounded border border-outline-variant/30 font-bold">Synthetic data • demo session</span>
            </div>
          </div>

          <div className="mt-6 text-center space-y-1 text-on-surface-variant">
            <p className="text-xs">Managed by: <span className="font-semibold text-on-surface">Team RabiesShield</span>, SRM KTR Hackathon Demo</p>
            <p className="text-xs text-outline">Emergency guidance: <span className="font-medium text-on-surface">Use local emergency services or the nearest healthcare facility</span></p>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 bg-surface-container-low border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-xs">
          <div><p className="text-on-surface-variant">© 2026 SRM Institute of Science and Technology • KTR. Rabies Prophylaxis & Surveillance Initiative.</p></div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 font-medium">
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">WHO Rabies Protocols</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">PEP clinical references</a>
            <a className="text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy & Data Safety Policy</a>
            <a className="text-primary font-semibold hover:underline" href="mailto:pm5120@srmist.edu.in">pm5120@srmist.edu.in</a>
          </div>
        </div>
      </footer>
    </div>
  );
};