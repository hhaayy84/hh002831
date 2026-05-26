import { Level, User, Item, Setting, Achievement, DailyChallenge } from '../types';

export const mockLevels: Level[] = [
  { id: 1, stars: 3, isLocked: false, isCurrent: false },
  { id: 2, stars: 2, isLocked: false, isCurrent: false },
  { id: 3, stars: 3, isLocked: false, isCurrent: false },
  { id: 4, stars: 1, isLocked: false, isCurrent: false },
  { id: 5, stars: 3, isLocked: false, isCurrent: false },
  { id: 6, stars: 2, isLocked: false, isCurrent: false },
  { id: 7, stars: 0, isLocked: false, isCurrent: true },
  { id: 8, stars: 0, isLocked: true, isCurrent: false },
  { id: 9, stars: 0, isLocked: true, isCurrent: false },
  { id: 10, stars: 0, isLocked: true, isCurrent: false },
];

export const mockUser: User = {
  name: '王小砖',
  uid: '88481234',
  level: 24,
  title: '瓷砖大师',
  xp: 850,
  maxXp: 1000,
  coins: 1250,
  stars: 128,
};

export const mockItems: Item[] = [
  {
    id: 'hammer',
    name: '神奇锤子',
    description: '可以击碎地上任何一个你指定的方块',
    icon: 'hammer',
    price: 150,
    count: 3,
  },
  {
    id: 'shuffle',
    name: '全面刷新',
    description: '对当前所有剩余方块进行随机重新排列',
    icon: 'shuffle',
    price: 100,
    count: 5,
  },
  {
    id: 'hint',
    name: '智慧提示',
    description: '自动为你寻找并高亮一组可消除的方块',
    icon: 'lightbulb',
    price: 0,
    isFree: true,
    count: 2,
  },
  {
    id: 'bomb',
    name: '威力炸弹',
    description: '瞬间消除目标区域及其周围的9个方块',
    icon: 'bomb',
    price: 200,
    count: 1,
  },
  {
    id: 'timeflow',
    name: '时光倒流',
    description: '撤销上一步操作，给你重新选择的机会',
    icon: 'undo',
    price: 80,
    count: 4,
  },
  {
    id: 'clock',
    name: '延时闹钟',
    description: '为当前关卡额外增加30秒的操作时间',
    icon: 'clock',
    price: 120,
    count: 2,
  },
];

export const mockSettings: Setting = {
  backgroundMusic: true,
  soundEffects: true,
  notifications: false,
};

export const mockAchievements: Achievement[] = [
  { id: '1', name: '新手入门', description: '完成第一次消除', icon: 'star', isUnlocked: true, progress: 1, target: 1 },
  { id: '2', name: '连续消除', description: '连续消除5次', icon: 'zap', isUnlocked: true, progress: 5, target: 5 },
  { id: '3', name: '完美通关', description: '获得3星评价', icon: 'trophy', isUnlocked: true, progress: 12, target: 48 },
  { id: '4', name: '金币收集', description: '累计获得1000金币', icon: 'coins', isUnlocked: false, progress: 850, target: 1000 },
];

export const mockDailyChallenge: DailyChallenge = {
  id: '1',
  name: '森林奇遇记',
  progress: 75,
  target: 100,
  icon: 'trees',
};

export const gameIcons = [
  '🍎', '🍇', '🍀', '🍊', '🍦', '👻', '🍩', '🌙',
  '🍎', '🍇', '🍀', '🍊', '💎', '👻', '🍩', '🌙',
  '🟣', '🍇', '🍀', '🍊', '💎', '👻', '🍩', '🌙',
  '🍎', '🍀', '🍊', '🍦', '💎', '👻', '🍩', '🌙',
  '🍎', '🍇', '🍊', '🍦', '💎', '👻', '❤️', '🌙',
  '🍏', '🍇', '🍦', '🍊', '🍦', '💎', '❤️', '🌙',
  '🍎', '🍇', '🍀', '🍊', '🍦', '👻', '❤️', '🌙',
  '🍎', '🍇', '🍀', '🟣', '🍦', '👻', '🍩', '🌙',
  '🍎', '🍇', '🍀', '🍊', '🍦', '👻', '🍩', '🌙',
  '🍎', '🍇', '🍀', '🍊', '🍦', '👻', '❤️', '🌙',
];

export const generateGameGrid = (): string[][] => {
  const grid: string[][] = [];
  const shuffled = [...gameIcons].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < 10; i++) {
    grid.push(shuffled.slice(i * 8, (i + 1) * 8));
  }
  
  return grid;
};