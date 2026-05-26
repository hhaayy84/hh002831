import { Trophy, Star, Zap, Coins, Lock, ChevronRight } from 'lucide-react';
import { mockAchievements } from '../data/mockData';
import TopHeader from '../components/TopHeader';

interface AchievementsPageProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, typeof Trophy> = {
  star: Star,
  zap: Zap,
  trophy: Trophy,
  coins: Coins,
};

export default function AchievementsPage({ onNavigate }: AchievementsPageProps) {
  const completedCount = mockAchievements.filter(a => a.isUnlocked).length;
  const totalCount = mockAchievements.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      <TopHeader title="成就勋章" showBack onBack={() => onNavigate('home')} />
      
      <main className="pt-20 pb-16 px-4">
        <div className="bg-gradient-to-r from-secondary to-pink-400 rounded-2xl p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">已解锁成就</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold">{completedCount}</span>
                <span className="text-lg">/{totalCount}</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Trophy size={32} />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {mockAchievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || Star;
            
            return (
              <div 
                key={achievement.id}
                className={`bg-white rounded-2xl p-4 animate-slide-up ${achievement.isUnlocked ? '' : 'opacity-60'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                    achievement.isUnlocked 
                      ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.isUnlocked ? (
                      <Icon size={28} />
                    ) : (
                      <Lock size={20} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${achievement.isUnlocked ? 'text-gray-800' : 'text-gray-400'}`}>
                        {achievement.name}
                      </h3>
                      {achievement.isUnlocked && (
                        <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full font-medium">
                          已完成
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{achievement.description}</p>
                    
                    {!achievement.isUnlocked && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-500">进度</span>
                          <span className="text-gray-600">{achievement.progress}/{achievement.target}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-500"
                            style={{ width: `${(achievement.progress / achievement.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}