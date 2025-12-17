import React, { useState } from 'react';
import { getSecurityAdvice } from '../services/geminiService';

const SecurityAdvice: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(false);

  const topics = ['Phishing', '2FA', 'Public Wi-Fi', 'Social Engineering'];

  const handleAsk = async (query: string) => {
    if (!query) return;
    setLoading(true);
    setTopic(query);
    const result = await getSecurityAdvice(query);
    setAdvice(result);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <h3 className="text-lg font-semibold text-white">Security Expert AI</h3>
      </div>
      
      <div className="flex-1 min-h-[100px] mb-4 bg-slate-950/50 rounded-lg p-4 border border-slate-800">
        {loading ? (
          <div className="flex items-center justify-center h-full text-slate-500 gap-2">
            <span className="animate-pulse">Consulting security database...</span>
          </div>
        ) : advice ? (
          <div>
             <h4 className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">Advice: {topic}</h4>
             <p className="text-slate-300 text-sm leading-relaxed">{advice}</p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-600 text-sm text-center">
            Select a topic or ask a question to get expert security tips.
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {topics.map(t => (
          <button
            key={t}
            onClick={() => handleAsk(t)}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 py-2 px-3 rounded border border-slate-700 hover:border-cyan-500/50 transition-all text-left"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative">
        <input 
            type="text" 
            placeholder="Ask about something else..." 
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-3 pr-10 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
            onKeyDown={(e) => {
                if (e.key === 'Enter') handleAsk(e.currentTarget.value);
            }}
        />
        <button 
            className="absolute right-2 top-2 text-slate-400 hover:text-cyan-400"
            onClick={(e) => {
                const input = e.currentTarget.previousSibling as HTMLInputElement;
                handleAsk(input.value);
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  );
};

export default SecurityAdvice;