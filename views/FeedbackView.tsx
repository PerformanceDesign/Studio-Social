
import React from 'react';
import { AnalysisResult } from '../types';

interface FeedbackViewProps {
  result: AnalysisResult;
  onClose: () => void;
  onNewChallenge: () => void;
}

const FeedbackView: React.FC<FeedbackViewProps> = ({ result, onClose, onNewChallenge }) => {
  const getColorForScore = (score: number) => {
    if (score >= 80) return '#0df2f2';
    if (score >= 60) return '#facc15';
    return '#f87171';
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-10">
        <button onClick={onClose} className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined">close</span>
        </button>
        <h1 className="text-sm font-black uppercase tracking-widest">AI Performance Scan</h1>
        <div className="size-10"></div>
      </header>

      <div className="p-5 flex flex-col gap-6">
        <section className="flex flex-col items-center justify-center py-8 rounded-3xl bg-gradient-to-b from-surface-dark to-transparent border border-white/5">
          <div 
            className="relative size-44 rounded-full flex items-center justify-center conic-gradient-score" 
            style={{ 
              '--percentage': `${result.overallScore}%`, 
              '--score-color': getColorForScore(result.overallScore) 
            } as any}
          >
            <div className="size-[10rem] rounded-full bg-background-dark flex flex-col items-center justify-center">
              <span className="text-5xl font-black tracking-tighter" style={{ color: getColorForScore(result.overallScore) }}>
                {result.overallScore}
              </span>
              <span className="text-[10px] font-bold text-gray-500 uppercase mt-1">Skill Index</span>
            </div>
          </div>
          <h2 className="text-2xl font-black mt-6 tracking-tight">{result.potentialStatus}</h2>
          <p className="text-gray-400 text-sm mt-1">Evaluation based on booking intent & aesthetic.</p>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 pl-1">Category Breakdown</h3>
          
          {[
            { label: 'Visuals', data: result.breakdown.visuals, icon: 'image', color: 'primary' },
            { label: 'Copywriting', data: result.breakdown.copywriting, icon: 'edit_note', color: 'orange-400' },
            { label: 'Strategy', data: result.breakdown.strategy, icon: 'tag', color: 'primary' },
            { label: 'Engagement', data: result.breakdown.engagement, icon: 'favorite', color: 'primary' }
          ].map((cat, idx) => (
            <div key={idx} className="bg-surface-dark p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-end mb-2">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-gray-500 text-xl`}>{cat.icon}</span>
                  <span className="text-sm font-bold">{cat.label}</span>
                </div>
                <div className="text-sm font-black">
                  <span className={`text-${cat.color}`}>{cat.data.score}</span>
                  <span className="text-gray-600 text-[10px] ml-1">/100</span>
                </div>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mb-3">
                <div 
                  className={`h-full bg-${cat.color} transition-all duration-1000`} 
                  style={{ width: `${cat.data.score}%` }}
                ></div>
              </div>
              <div className="flex gap-2 items-start text-xs text-gray-400 leading-normal">
                <span className="material-symbols-outlined text-[14px] text-primary mt-0.5">auto_awesome</span>
                {cat.data.feedback}
              </div>
            </div>
          ))}
        </section>
      </div>

      <div className="sticky bottom-0 left-0 right-0 p-4 bg-background-dark/90 backdrop-blur-xl border-t border-white/5 z-40">
        <div className="flex gap-3">
          <button 
            onClick={() => { onNewChallenge(); onClose(); }}
            className="flex-1 h-14 rounded-2xl border border-white/10 font-bold text-sm hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            NEW QUEST
          </button>
          <button 
            onClick={onClose}
            className="flex-1 h-14 rounded-2xl bg-primary text-black font-black text-sm shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">check</span>
            DASHBOARD
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackView;
