
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    studioName: '',
    specialty: 'Hair Salon',
    level: 'Beginner' as const
  });

  const specialties = [
    'Hair Salon', 'Tattoo Studio', 'Nail Art', 'Permanent Makeup', 'Barber Shop'
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      onComplete({
        ...formData,
        streak: 0,
        xp: 0
      });
    }
  };

  return (
    <div className="flex flex-col h-screen p-8 bg-background-dark text-white justify-between">
      <div className="mt-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/40">
             <span className="material-symbols-outlined text-primary text-4xl">content_cut</span>
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tighter mb-2">STUDIO SOCIAL</h1>
        <p className="text-gray-400 text-sm">Master the art of booking via AI mentorship.</p>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-8 py-10">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold">What's your name?</h2>
            <input 
              type="text" 
              placeholder="e.g. Alex"
              className="w-full bg-surface-dark border-white/10 rounded-xl p-4 focus:ring-primary focus:border-primary"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Studio Name"
              className="w-full bg-surface-dark border-white/10 rounded-xl p-4 focus:ring-primary focus:border-primary"
              value={formData.studioName}
              onChange={(e) => setFormData({...formData, studioName: e.target.value})}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold">What's your specialty?</h2>
            <div className="grid grid-cols-1 gap-3">
              {specialties.map(s => (
                <button
                  key={s}
                  onClick={() => setFormData({...formData, specialty: s})}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    formData.specialty === s ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-surface-dark'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-xl font-bold">Current skill level?</h2>
            <div className="grid grid-cols-1 gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                <button
                  key={l}
                  onClick={() => setFormData({...formData, level: l as any})}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    formData.level === l ? 'border-primary bg-primary/10 text-primary' : 'border-white/10 bg-surface-dark'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pb-8">
        <button 
          onClick={handleNext}
          disabled={step === 1 && !formData.name}
          className="w-full bg-primary text-black font-black py-4 rounded-2xl shadow-lg shadow-primary/20 disabled:opacity-50"
        >
          {step === 3 ? "LET'S START" : "CONTINUE"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
