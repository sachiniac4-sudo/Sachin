import React, { useState } from 'react';
import { PasswordState, StrengthLevel } from '../types';
import { generateSecurePassword } from '../services/geminiService';

interface PasswordStrengthProps {
  passwordState: PasswordState;
  onPasswordChange: (newPassword: string) => void;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ passwordState, onPasswordChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const newPass = await generateSecurePassword();
    onPasswordChange(newPass);
    setIsGenerating(false);
  };

  const getStrengthColor = (score: number) => {
    if (score <= 1) return 'bg-red-500';
    if (score === 2) return 'bg-orange-500';
    if (score === 3) return 'bg-yellow-500';
    if (score === 4) return 'bg-lime-500';
    return 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]';
  };

  const getStrengthLabel = (score: number) => {
    if (score <= 1) return StrengthLevel.Weak;
    if (score === 2) return StrengthLevel.Fair;
    if (score === 3) return StrengthLevel.Good;
    if (score === 4) return StrengthLevel.Strong;
    return StrengthLevel.Excellent;
  };

  const criteriaList = [
    { label: 'At least 8 characters', met: passwordState.criteria.minLength },
    { label: 'Uppercase letter (A-Z)', met: passwordState.criteria.hasUpper },
    { label: 'Lowercase letter (a-z)', met: passwordState.criteria.hasLower },
    { label: 'Number (0-9)', met: passwordState.criteria.hasNumber },
    { label: 'Special character (@#$%&!)', met: passwordState.criteria.hasSpecial },
  ];

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Password Audit
        </h2>
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="text-xs bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1.5 rounded-full transition-all flex items-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isGenerating ? (
            <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/></svg>
          )}
          Generate Secure
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type={showPassword ? "text" : "password"}
          value={passwordState.value}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Enter password to audit..."
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5 text-slate-400 hover:text-white transition-colors"
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7c.44 0 .87-.03 1.28-.09"/><line x1="2" x2="22" y1="2" y2="22"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          )}
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-slate-400">Strength</span>
          <span className={`font-bold ${
            passwordState.score >= 4 ? 'text-green-400' : 
            passwordState.score >= 2 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {getStrengthLabel(passwordState.score)}
          </span>
        </div>
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ease-out ${getStrengthColor(passwordState.score)}`}
            style={{ width: `${(passwordState.score / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Security Criteria</h3>
        {criteriaList.map((criterion, idx) => (
          <div key={idx} className="flex items-center gap-3 text-sm">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
              criterion.met ? 'bg-green-500/20 text-green-500' : 'bg-slate-800 text-slate-600'
            }`}>
              {criterion.met ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
              )}
            </div>
            <span className={criterion.met ? 'text-slate-200' : 'text-slate-500'}>
              {criterion.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrength;