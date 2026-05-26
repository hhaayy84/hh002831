import { Play, Trophy, ShoppingCart, Settings, Star, Gamepad2 } from 'lucide-react';
import { mockUser, mockAchievements, mockDailyChallenge } from '../data/mockData';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const completedAchievements = mockAchievements.filter(a => a.isUnlocked).length;
  const totalAchievements = mockAchievements.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20 animate-fade-in">
      <header className="bg-gradient-to-r from-primary to-primary-light text-white px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">你好，探险家!</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm opacity-80">LV.{mockUser.level}</span>
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={12} 
                  className={`${i < 3 ? 'fill-yellow-300 text-yellow-300' : 'fill-transparent text-white/50'}`} 
                />
              ))}
            </div>
          </div>
          <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <Gamepad2 size={24} />
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-80">每日挑战</span>
            <span className="text-sm font-semibold">{mockDailyChallenge.progress}%</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">森林奇遇记</h3>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-300 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${mockDailyChallenge.progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-4">
        <button 
          onClick={() => onNavigate('levels')}
          className="w-full bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-purple-200 animate-slide-up"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Play size={28} />
              </div>
              <div>
                <h2 className="text-lg font-bold">开始挑战</h2>
                <p className="text-sm opacity-80">继续你的第 24 关</p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('achievements')}
          className="w-full bg-gradient-to-r from-secondary to-pink-400 text-white rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-pink-200 animate-slide-up"
          style={{ animationDelay: '0.1s' }}
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Trophy size={28} />
              </div>
              <div>
                <h2 className="text-lg font-bold">成就勋章</h2>
                <p className="text-sm opacity-80">已解锁 {completedAchievements}/{totalAchievements} 个成就</p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('shop')}
          className="w-full bg-gradient-to-r from-accent-green to-emerald-400 text-white rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-green-200 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <ShoppingCart size={28} />
              </div>
              <div>
                <h2 className="text-lg font-bold">道具工坊</h2>
                <p className="text-sm opacity-80">查看你的神奇强化道具</p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('settings')}
          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl p-5 flex items-center justify-between shadow-lg shadow-gray-200 animate-slide-up"
          style={{ animationDelay: '0.3s' }}
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Settings size={28} />
              </div>
              <div>
                <h2 className="text-lg font-bold">系统设置</h2>
                <p className="text-sm opacity-80">音乐、音效与账号管理</p>
              </div>
            </div>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        <div className="text-center pt-6 pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-12 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">TILE FUN</span>
            <span className="w-12 h-px bg-gray-200" />
          </div>
          <p className="text-xs text-gray-400">V1.0.4 · 快乐消消乐</p>
        </div>
      </main>
    </div>
  );
}