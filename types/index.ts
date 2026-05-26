export interface Level {
  id: number;
  stars: number;
  isLocked: boolean;
  isCurrent: boolean;
}

export interface User {
  name: string;
  uid: string;
  level: number;
  title: string;
  xp: number;
  maxXp: number;
  coins: number;
  stars: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
  isFree?: boolean;
  count: number;
}

export interface GameState {
  score: number;
  targetScore: number;
  remainingSteps: number;
  grid: string[][];
}

export interface Setting {
  backgroundMusic: boolean;
  soundEffects: boolean;
  notifications: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  progress: number;
  target: number;
}

export interface DailyChallenge {
  id: string;
  name: string;
  progress: number;
  target: number;
  icon: string;
}