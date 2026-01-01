
import React from 'react';
import { UserProfile, Challenge } from '../types';

interface DashboardProps {
  user: UserProfile;
  challenge: Challenge | null;
  onStartChallenge: () => void;
  isLoadingChallenge: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ user, challenge, onStartChallenge, isLoadingChallenge }) => {
  return (
    <div className="p-5 flex flex-col gap-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Welcome back</h2>
          <h1 className="text-2xl font-black tracking-tight">{user.name} @ {user.studioName}</h1>
        </div>
        <div className="size-12 rounded-full bg-surface-dark border border-white/5 flex items-center justify-center text-primary">
          <span className="material-symbols-outlined">person</span>
        </div>
      </header>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-dark p-5 rounded-2xl border border-white/5 shadow-xl">
          <div className="flex items-center gap-2 text-orange-400 mb-1">
            <span className="material-symbols-outlined text-sm">local_fire_department</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Streak</span>
          </div>
          <p className="text-3xl font-black tracking-tighter">{user.streak} Days</p>
        </div>
        <div className="bg-surface-dark p-5 rounded-2xl border border-white/5 shadow-xl">
          <div className="flex items-center gap-2 text-primary mb-1">
            <span className="material-symbols-outlined text-sm">bolt</span>
            <span className="text-[10px] font-bold uppercase tracking-wider">Total XP</span>
          </div>
          <p className="text-3xl font-black tracking-tighter">{user.xp.toLocaleString()}</p>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">Daily Quest</h3>
          <span className="text-[10px] font-bold text-primary">LVL UP +250 XP</span>
        </div>

        {isLoadingChallenge ? (
          <div className="h-64 bg-surface-dark rounded-3xl animate-pulse flex items-center justify-center">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Generating your path...</p>
          </div>
        ) : challenge ? (
          <div className="relative group overflow-hidden rounded-3xl border border-white/10 bg-surface-dark shadow-2xl">
            <div className="absolute inset-0 opacity-40">
              <img src={challenge.imageUrl} alt="Challenge" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
            <div className="relative p-6 pt-32">
              <div className="inline-flex px-2 py-1 bg-primary/20 text-primary border border-primary/30 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-md">
                {challenge.platform} Challenge
              </div>
              <h2 className="text-2xl font-black leading-tight mb-2">{challenge.title}</h2>
              <p className="text-sm text-gray-300 line-clamp-2 mb-6">{challenge.description}</p>
              <button 
                onClick={onStartChallenge}
                className="w-full bg-primary text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/20 active:scale-95 transition-all"
              >
                START TRAINING
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        ) : null}
      </section>

      <section>
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Your Academy Path</h3>
        <div className="space-y-4">
          {[
            { title: 'The Hook Factor', module: 'Module 1', progress: 100, icon: 'auto_fix_high' },
            { title: 'Lighting Mastery', module: 'Module 2', progress: 65, icon: 'light_mode' },
            { title: 'Direct Booking CTAs', module: 'Module 3', progress: 0, icon: 'calendar_month' }
          ].map((m, i) => (
            <div key={i} className="bg-surface-dark p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className={`size-12 rounded-xl flex items-center justify-center ${m.progress === 100 ? 'bg-primary/10 text-primary' : 'bg-white/5 text-gray-500'}`}>
                <span className="material-symbols-outlined">{m.icon}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-sm font-bold">{m.title}</h4>
                  <span className="text-[10px] font-bold text-gray-500">{m.module}</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full transition-all" style={{ width: `${m.progress}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
