
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, Platform, Challenge, AnalysisResult } from './types';
import Onboarding from './views/Onboarding';
import Dashboard from './views/Dashboard';
import ChallengeView from './views/ChallengeView';
import FeedbackView from './views/FeedbackView';
import BottomNav from './components/BottomNav';
import { generateChallenge } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.ONBOARDING);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [lastAnalysis, setLastAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with a default challenge for the dashboard
  useEffect(() => {
    if (user && !activeChallenge) {
      loadNewChallenge();
    }
  }, [user]);

  const loadNewChallenge = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const challenge = await generateChallenge(user.specialty);
      setActiveChallenge(challenge);
    } catch (error) {
      console.error("Failed to load challenge", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUser(profile);
    setView(AppView.DASHBOARD);
  };

  const handleChallengeStart = () => {
    setView(AppView.CHALLENGE);
  };

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setLastAnalysis(result);
    setView(AppView.FEEDBACK);
    // Update user XP
    if (user) {
      setUser({ ...user, xp: user.xp + 250, streak: user.streak + 1 });
    }
  };

  const renderView = () => {
    switch (view) {
      case AppView.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case AppView.DASHBOARD:
        return (
          <Dashboard 
            user={user!} 
            challenge={activeChallenge} 
            onStartChallenge={handleChallengeStart}
            isLoadingChallenge={isLoading}
          />
        );
      case AppView.CHALLENGE:
        return (
          <ChallengeView 
            challenge={activeChallenge!} 
            onAnalysisComplete={handleAnalysisComplete}
            onBack={() => setView(AppView.DASHBOARD)}
          />
        );
      case AppView.FEEDBACK:
        return (
          <FeedbackView 
            result={lastAnalysis!} 
            onClose={() => setView(AppView.DASHBOARD)}
            onNewChallenge={loadNewChallenge}
          />
        );
      default:
        return <Dashboard user={user!} onStartChallenge={handleChallengeStart} />;
    }
  };

  return (
    <div className="min-h-screen max-w-md mx-auto relative flex flex-col bg-background-light dark:bg-background-dark shadow-2xl">
      <div className="flex-1 pb-20 overflow-y-auto no-scrollbar">
        {renderView()}
      </div>
      
      {view !== AppView.ONBOARDING && (
        <BottomNav activeView={view} setView={setView} />
      )}
    </div>
  );
};

export default App;
