import { useState } from 'react';
import { Music, Volume2, Bell, HelpCircle, MessageCircle, Shield, Info, ChevronRight, LogOut } from 'lucide-react';
import { mockUser, mockSettings } from '../data/mockData';
import TopHeader from '../components/TopHeader';

interface SettingsPageProps {
  onNavigate: (page: string) => void;
}

export default function SettingsPage({ onNavigate }: SettingsPageProps) {
  const [settings, setSettings] = useState(mockSettings);

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      <TopHeader title="游戏设置" showBack onBack={() => onNavigate('home')} />
      
      <main className="pt-20 pb-16 px-4">
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold text-white">{mockUser.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-800">{mockUser.name}</h2>
                <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full font-medium">PRO</span>
              </div>
              <p className="text-sm text-gray-500">UID: {mockUser.uid}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-primary font-medium">Lv.{mockUser.level}</span>
                <span className="text-xs text-gray-400">{mockUser.title}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">升级进度</span>
              <span className="text-sm font-medium text-primary">{mockUser.xp} / {mockUser.maxXp} XP</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                style={{ width: `${(mockUser.xp / mockUser.maxXp) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">声音与通知</h3>
          
          <button 
            onClick={() => toggleSetting('backgroundMusic')}
            className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Music size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">背景音乐</p>
                <p className="text-xs text-gray-500">开启游戏内的美妙背景音乐</p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleSetting('backgroundMusic');
              }}
              className={`w-12 h-7 rounded-full transition-colors ${settings.backgroundMusic ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${settings.backgroundMusic ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </button>

          <button 
            onClick={() => toggleSetting('soundEffects')}
            className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Volume2 size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">音效</p>
                <p className="text-xs text-gray-500">消除方块与点击时的清脆响声</p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleSetting('soundEffects');
              }}
              className={`w-12 h-7 rounded-full transition-colors ${settings.soundEffects ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${settings.soundEffects ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </button>

          <button 
            onClick={() => toggleSetting('notifications')}
            className="w-full flex items-center justify-between py-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Bell size={20} className="text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">系统通知</p>
                <p className="text-xs text-gray-500">体力恢复和限时任务提醒</p>
              </div>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                toggleSetting('notifications');
              }}
              className={`w-12 h-7 rounded-full transition-colors ${settings.notifications ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${settings.notifications ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </button>
        </div>

        <div className="bg-white rounded-2xl p-4 mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">帮助与支持</h3>
          
          <button className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <HelpCircle size={20} className="text-green-600" />
              </div>
              <span className="font-medium text-gray-800">玩法指南</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageCircle size={20} className="text-blue-600" />
              </div>
              <span className="font-medium text-gray-800">常见问题</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Shield size={20} className="text-red-600" />
              </div>
              <span className="font-medium text-gray-800">隐私协议</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Info size={20} className="text-gray-600" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">关于 Tile Fun</span>
                <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full">v2.4.0</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        <button className="w-full bg-red-50 text-red-500 rounded-2xl py-4 font-medium flex items-center justify-center gap-2">
          <LogOut size={20} />
          退出当前账户
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          已开启云端同步，您的游戏进度非常安全
        </p>
      </main>
    </div>
  );
}