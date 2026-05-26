import { Star, Lock, Play } from 'lucide-react';
import { mockLevels } from '../data/mockData';
import TopHeader from '../components/TopHeader';

interface LevelsPageProps {
  onNavigate: (page: string, levelId?: number) => void;
}

export default function LevelsPage({ onNavigate }: LevelsPageProps) {
  const handleLevelClick = (level: typeof mockLevels[0]) => {
    if (!level.isLocked) {
      onNavigate('game', level.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      <TopHeader title="关卡选择" showStars stars={128} />
      
      <main className="pt-20 pb-16 px-6">
        <div className="relative">
          {mockLevels.map((level, index) => {
            const isOdd = index % 2 === 0;
            
            return (
              <div key={level.id} className="relative mb-8 last:mb-0">
                <div className={`flex items-center ${isOdd ? 'justify-center' : 'justify-end'}`}>
                  <button
                    onClick={() => handleLevelClick(level)}
                    disabled={level.isLocked}
                    className={`
                      relative w-24 h-24 rounded-full flex items-center justify-center
                      transition-all duration-300 transform hover:scale-105
                      ${level.isLocked 
                        ? 'bg-gray-100 cursor-not-allowed' 
                        : level.isCurrent 
                          ? 'bg-secondary text-white animate-pulse-glow shadow-lg shadow-pink-300' 
                          : 'bg-gradient-to-br from-primary to-primary-light text-white shadow-lg shadow-purple-200'
                      }
                    `}
                  >
                    {level.isLocked ? (
                      <Lock size={24} className="text-gray-400" />
                    ) : level.isCurrent ? (
                      <div className="flex flex-col items-center">
                        <Play size={20} className="mb-1" />
                        <span className="text-lg font-bold">{level.id}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-bold">{level.id}</span>
                    )}
                    
                    {level.isCurrent && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Play size={14} className="text-white" />
                      </div>
                    )}
                  </button>
                </div>
                
                {!level.isLocked && (
                  <div className={`flex ${isOdd ? 'justify-center' : 'justify-end'} mt-2`}>
                    <div className="flex gap-0.5">
                      {[...Array(3)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${i < level.stars ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                {index < mockLevels.length - 1 && (
                  <div className={`absolute ${isOdd ? 'left-1/2' : 'right-8'} top-12 w-0.5 h-12 bg-gray-200`} />
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}