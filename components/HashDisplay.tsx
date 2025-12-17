import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, HelpCircle } from 'lucide-react';
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
    if (explanation) return; // Don't refetch if already present
    setLoading(true);
    const text = await explainHashing();
    setExplanation(text);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <div className="text-6xl font-mono text-cyan-500 font-bold select-none">#</div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="