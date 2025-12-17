import React, { useState } from 'react';
import { explainHashing } from '../services/geminiService';

interface HashDisplayProps {
  hash: string;
}

const HashDisplay: React.FC<HashDisplayProps> = ({ hash }) => {
  const [explanation, setExplanation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fetchExplanation = async () => {
    if (explanation) return;
    setLoading(true);
    const text = await explainHashing();
    setExplanation(text);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <div className="text-6xl font-mono text-cyan-500 font-bold select-none">#</div>
      </div>
      
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          SHA-256 Hash
        </h3>
        <button 
          onClick={fetchExplanation}
          className="text-xs flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors"
          disabled={loading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
          {loading ? 'Analyzing...' : 'What is this?'}
        </button>
      </div>

      <div className="relative group/hash">
        <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs md:text-sm text-cyan-500 break-all border border-slate-800 group-hover/hash:border-cyan-500/30 transition-colors">
          {hash || "Type a password to see its hash..."}
        </div>
        <button 
          onClick={handleCopy}
          className="absolute top-2 right-2 p-1.5 bg-slate-800 text-slate-400 rounded hover:bg-slate-700 hover:text-white transition-all opacity-0 group-hover/hash:opacity-100"
          title="Copy Hash"
        >
          {copied ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          )}
        </button>
      </div>

      {explanation && (
        <div className="mt-4 p-3 bg-cyan-950/30 border border-cyan-900/50 rounded text-sm text-cyan-100/80 animate-pulse-slow">
          <p className="leading-relaxed">{explanation}</p>
        </div>
      )}
    </div>
  );
};

export default HashDisplay;