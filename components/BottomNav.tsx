
import React from 'react';
import { AppView } from '../types';

interface BottomNavProps {
  activeView: AppView;
  setView: (view: AppView) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeView, setView }) => {
  const items = [
    { view: AppView.DASHBOARD, label: 'Home', icon: 'home' },
    { view: AppView.ACADEMY, label: 'Learn', icon: 'school' },
    { view: AppView.PRACTICE, label: 'Practice', icon: 'smartphone' },
    { view: AppView.ANALYTICS, label: 'Stats', icon: 'bar_chart' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/5 pb-6">
      <div className="flex h-16 items-center justify-around px-2">
        {items.map((item) => (
          <button
            key={item.view}
            onClick={() => setView(item.view)}
            className={`group flex flex-1 flex-col items-center justify-center gap-1 transition-all ${
              activeView === item.view ? 'text-primary' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-2xl transition-transform active:scale-90 ${
                activeView === item.view ? 'fill-1' : ''
              }`}
            >
              {item.icon}
            </span>
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
