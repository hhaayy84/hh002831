import { Coins, Plus, Hammer, Shuffle, Lightbulb, Bomb, Clock, RotateCcw } from 'lucide-react';
import { mockItems, mockUser } from '../data/mockData';
import TopHeader from '../components/TopHeader';

interface ShopPageProps {
  onNavigate: (page: string) => void;
}

const iconMap: Record<string, typeof Hammer> = {
  hammer: Hammer,
  shuffle: Shuffle,
  lightbulb: Lightbulb,
  bomb: Bomb,
  undo: RotateCcw,
  clock: Clock,
};

const bgColorMap: Record<string, string> = {
  hammer: 'bg-purple-50',
  shuffle: 'bg-pink-50',
  lightbulb: 'bg-green-50',
  bomb: 'bg-purple-50',
  undo: 'bg-orange-50',
  clock: 'bg-blue-50',
};

const iconColorMap: Record<string, string> = {
  hammer: 'text-purple-600',
  shuffle: 'text-pink-600',
  lightbulb: 'text-green-600',
  bomb: 'text-purple-600',
  undo: 'text-orange-600',
  clock: 'text-blue-600',
};

export default function ShopPage({ onNavigate }: ShopPageProps) {
  const handleBuy = (item: typeof mockItems[0]) => {
    if (item.isFree) {
      console.log('领取免费道具');
    } else if (mockUser.coins >= item.price) {
      console.log(`购买 ${item.name} 成功`);
    } else {
      console.log('金币不足');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      <TopHeader title="道具商店" showBack onBack={() => onNavigate('home')} />
      
      <main className="pt-20 pb-16 px-4">
        <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div>
                <p className="text-sm text-gray-500">今日限时礼包</p>
                <p className="text-xs text-gray-400">购买超级炸弹，附赠两次免费提示!</p>
              </div>
            </div>
            <div className="bg-secondary/20 text-secondary px-3 py-2 rounded-lg">
              <span className="font-bold">25% OFF</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Coins size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">我的金币</p>
              <p className="text-2xl font-bold text-yellow-600">{mockUser.coins}</p>
            </div>
          </div>
          <button className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
            <Plus size={20} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mockItems.map((item, index) => {
            const Icon = iconMap[item.icon] || Lightbulb;
            const bgColor = bgColorMap[item.icon] || 'bg-gray-50';
            const icColor = iconColorMap[item.icon] || 'text-gray-600';
            
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl p-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-full aspect-square ${bgColor} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={40} className={icColor} />
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-3 line-clamp-2">{item.description}</p>
                <button
                  onClick={() => handleBuy(item)}
                  className={`w-full py-2.5 rounded-xl font-medium transition-colors ${
                    item.isFree 
                      ? 'bg-accent-green text-white hover:bg-green-600' 
                      : mockUser.coins >= item.price
                        ? 'bg-primary text-white hover:bg-primary-light'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {item.isFree ? (
                    '领取'
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <Coins size={14} className="text-yellow-300" />
                      {item.price}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          道具可在游戏过程中随时使用，助你轻松过关!
        </p>
      </main>
    </div>
  );
}