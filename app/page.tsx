"use client";

import { useState } from 'react';
import BottomNav from '../components/BottomNav';
import HomePage from '../pages/HomePage';
import LevelsPage from '../pages/LevelsPage';
import GamePage from '../pages/GamePage';
import ShopPage from '../pages/ShopPage';
import SettingsPage from '../pages/SettingsPage';
import AchievementsPage from '../pages/AchievementsPage';

type PageType = 'home' | 'levels' | 'game' | 'shop' | 'settings' | 'achievements';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const handleNavigate = (page: string, levelId?: number) => {
    if (levelId) {
      setSelectedLevel(levelId);
    }
    setCurrentPage(page as PageType);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'levels':
        return <LevelsPage onNavigate={handleNavigate} />;
      case 'game':
        return <GamePage levelId={selectedLevel} onBack={() => setCurrentPage('levels')} />;
      case 'shop':
        return <ShopPage onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      case 'achievements':
        return <AchievementsPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const showBottomNav = !['game'].includes(currentPage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {renderPage()}
      {showBottomNav && (
        <BottomNav activeTab={currentPage} onTabChange={(tab) => setCurrentPage(tab as PageType)} />
      )}
    </div>
  );
}