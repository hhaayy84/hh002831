import { Share2, Star, ArrowLeft, Menu } from 'lucide-react';

interface TopHeaderProps {
  title: string;
  showBack?: boolean;
  showStars?: boolean;
  stars?: number;
  onBack?: () => void;
}

export default function TopHeader({ title, showBack = false, showStars = false, stars = 0, onBack }: TopHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 px-4 py-3 flex items-center justify-between border-b border-gray-100">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button 
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </button>
        ) : (
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <Share2 size={20} strokeWidth={2} />
          </button>
        )}
      </div>
      
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
      
      <div className="flex items-center gap-3">
        {showStars ? (
          <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold text-yellow-700">{stars}</span>
          </div>
        ) : (
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
            <Menu size={20} strokeWidth={2} />
          </button>
        )}
      </div>
    </header>
  );
}