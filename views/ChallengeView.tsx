
import React, { useState } from 'react';
// Added Platform to the imports from types.ts
import { Challenge, AnalysisResult, Platform } from '../types';
import { analyzeSubmission } from '../services/geminiService';

interface ChallengeViewProps {
  challenge: Challenge;
  onAnalysisComplete: (result: AnalysisResult) => void;
  onBack: () => void;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ challenge, onAnalysisComplete, onBack }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeSubmission(challenge.platform, caption, image || undefined);
      onAnalysisComplete(result);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Something went wrong with the AI analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isAnalyzing) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-8 text-center bg-background-dark">
        <div className="relative size-32 mb-8">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-4xl animate-pulse">auto_awesome</span>
          </div>
        </div>
        <h2 className="text-xl font-black mb-2">Analyzing your work...</h2>
        <p className="text-gray-400 text-sm">Our AI mentor is evaluating your visuals, copy, and strategy.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex items-center justify-between sticky top-0 bg-background-dark/90 backdrop-blur-md z-10 border-b border-white/5">
        <button onClick={onBack} className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-sm font-black uppercase tracking-widest">Training Ground</h1>
        <button className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center">
          <span className="material-symbols-outlined">help</span>
        </button>
      </header>

      <div className="p-5 flex flex-col gap-6">
        <section className="bg-surface-dark rounded-3xl p-6 border border-white/5 overflow-hidden">
           <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">The Brief</div>
           <h2 className="text-2xl font-black mb-2">{challenge.title}</h2>
           <p className="text-sm text-gray-400 mb-6">{challenge.description}</p>
           
           <div className="space-y-3">
             {challenge.requirements.map((req, i) => (
               <div key={i} className="flex items-start gap-3 text-xs font-medium text-gray-300">
                 <span className="material-symbols-outlined text-primary text-[14px] mt-0.5">check_circle</span>
                 {req}
               </div>
             ))}
           </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full rounded-3xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center group overflow-hidden">
            {image ? (
              <>
                <img src={image} className="w-full h-full object-cover" alt="Upload" />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 size-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </>
            ) : (
              <>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                <div className="size-16 rounded-full bg-surface-dark flex items-center justify-center text-primary mb-4 border border-primary/20">
                  <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                </div>
                <p className="text-sm font-bold text-gray-400">Tap to upload media</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Challenge focus: Lighting & Depth</p>
              </>
            )}
          </div>

          <div className="bg-surface-dark rounded-2xl p-4 border border-white/5">
            <div className="flex gap-3 items-start">
              <div className="size-8 rounded-full bg-gradient-to-tr from-primary to-blue-600 shrink-0"></div>
              <textarea 
                className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 placeholder-gray-500 resize-none"
                placeholder="Write a caption that stops the scroll..."
                rows={4}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
              <div className="flex gap-4 text-gray-500">
                <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">sentiment_satisfied</span>
                <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">alternate_email</span>
                <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-primary">location_on</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500">{caption.length}/2200</span>
            </div>
          </div>
        </section>

        <button 
          onClick={handleSubmit}
          // Fix: Platform enum is now correctly imported and used here
          disabled={!caption || (challenge.platform !== Platform.GBP && !image)}
          className="w-full bg-primary text-black font-black py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 mt-4"
        >
          SUBMIT FOR AI REVIEW
        </button>
      </div>
    </div>
  );
};

export default ChallengeView;
