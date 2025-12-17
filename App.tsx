import React, { useState, useEffect } from 'react';
import PasswordStrength from './components/PasswordStrength';
import HashDisplay from './components/HashDisplay';
import SecurityAdvice from './components/SecurityAdvice';
import { PasswordState, PasswordCriteria } from './types';

const App: React.FC = () => {
  const [passwordState, setPasswordState] = useState<PasswordState>({
    value: '',
    score: 0,
    criteria: {
      minLength: false,
      hasUpper: false,
      hasLower: false,
      hasNumber: false,
      hasSpecial: false,
    },
    hash: ''
  });

  // Function to calculate SHA-256 hash using Web Crypto API
  const calculateHash = async (text: string) => {
    if (!text) return '';
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const evaluatePassword = async (password: string) => {
    // Regex checks mirroring the Python script
    const criteria: PasswordCriteria = {
      minLength: password.length >= 8,
      hasUpper: /[A-Z]/.test(password),
      hasLower: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[@#$%&!]/.test(password),
    };

    // Calculate Score (Simple addition based on criteria met)
    let score = 0;
    if (criteria.minLength) score++;
    if (criteria.hasUpper) score++;
    if (criteria.hasLower) score++;
    if (criteria.hasNumber) score++;
    if (criteria.hasSpecial) score++;

    // Calculate Hash
    const hash = await calculateHash(password);

    setPasswordState({
      value: password,
      score,
      criteria,
      hash
    });
  };

  const handlePasswordChange = (newPassword: string) => {
    evaluatePassword(newPassword);
  };

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-500/10 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">CyberGuard</h1>
              <p className="text-xs text-slate-500 font-mono">SECURE LOGIN SYSTEM</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-slate-500">
             <span className="flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
               SYSTEM ACTIVE
             </span>
             <span>v2.0.1</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Password Strength */}
          <div className="lg:col-span-7 space-y-8">
            <PasswordStrength 
              passwordState={passwordState} 
              onPasswordChange={handlePasswordChange} 
            />
            
            <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">System Log</h3>
              <div className="font-mono text-xs text-slate-500 space-y-1">
                <p>> Initializing security protocols...</p>
                <p>> Loading heuristic analysis engine...</p>
                <p>> SHA-256 hashing algorithm ready.</p>
                <p>> Connected to Gemini AI Security Module.</p>
                {passwordState.value && (
                  <p className="text-cyan-500/80">> Analyzing input strength: {passwordState.score}/5 check(s) passed.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Hash & Advice */}
          <div className="lg:col-span-5 space-y-6 flex flex-col">
            <HashDisplay hash={passwordState.hash} />
            <div className="flex-1">
              <SecurityAdvice />
            </div>
          </div>

        </div>
      </main>

      <footer className="border-t border-slate-800 mt-12 py-8 text-center text-slate-600 text-sm">
        <p>&copy; {new Date().getFullYear()} CyberGuard Security Systems. Powered by Gemini.</p>
      </footer>
    </div>
  );
};

export default App;