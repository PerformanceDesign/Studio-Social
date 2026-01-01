
export enum AppView {
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  CHALLENGE = 'CHALLENGE',
  FEEDBACK = 'FEEDBACK',
  ACADEMY = 'ACADEMY',
  PRACTICE = 'PRACTICE',
  ANALYTICS = 'ANALYTICS'
}

export enum Platform {
  INSTAGRAM = 'Instagram',
  TIKTOK = 'TikTok',
  FACEBOOK = 'Facebook',
  GBP = 'Google Business Profile',
  WHATSAPP = 'WhatsApp Business'
}

export interface UserProfile {
  name: string;
  studioName: string;
  specialty: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  streak: number;
  xp: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  platform: Platform;
  requirements: string[];
  imageUrl: string;
  category: string;
}

export interface AnalysisResult {
  overallScore: number;
  potentialStatus: string;
  breakdown: {
    visuals: { score: number; feedback: string };
    copywriting: { score: number; feedback: string };
    strategy: { score: number; feedback: string };
    engagement: { score: number; feedback: string };
  };
}
