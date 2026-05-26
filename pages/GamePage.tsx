import { useState, useEffect } from 'react';
import { Settings, Pause, Hammer, Shuffle, Wand2, Lightbulb, Star } from 'lucide-react';
import { generateGameGrid, mockItems } from '../data/mockData';

interface GamePageProps {
  levelId: number;
  onBack: () => void;
}

export default function GamePage({ levelId, onBack }: GamePageProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [score, setScore] = useState(1250);
  const [targetScore] = useState(2500);
  const [remainingSteps, setRemainingSteps] = useState(24);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPause, setShowPause] = useState(false);

  useEffect(() => {
    setGrid(generateGameGrid());
  }, []);

  const handleCellClick = (row: number, col: number) => {
    if (isAnimating) return;

    if (!selectedCell) {
      setSelectedCell({ row, col });
      return;
    }

    const { row: prevRow, col: prevCol } = selectedCell;
    
    const isAdjacent = 
      (Math.abs(row - prevRow) === 1 && col === prevCol) || 
      (Math.abs(col - prevCol) === 1 && row === prevRow);

    if (isAdjacent && (row !== prevRow || col !== prevCol)) {
      swapCells(prevRow, prevCol, row, col);
    } else {
      setSelectedCell({ row, col });
    }
  };

  const swapCells = (r1: number, c1: number, r2: number, c2: number) => {
    setIsAnimating(true);
    
    const newGrid = grid.map(row => [...row]);
    const temp = newGrid[r1][c1];
    newGrid[r1][c1] = newGrid[r2][c2];
    newGrid[r2][c2] = temp;
    
    setGrid(newGrid);
    setSelectedCell(null);

    setTimeout(() => {
      checkMatches(newGrid);
    }, 200);
  };

  const checkMatches = (currentGrid: string[][]) => {
    const matches: Set<string> = new Set();

    for (let row = 0; row < currentGrid.length; row++) {
      for (let col = 0; col < currentGrid[row].length; col++) {
        const current = currentGrid[row][col];
        
        if (col <= currentGrid[row].length - 3) {
          if (current === currentGrid[row][col + 1] && current === currentGrid[row][col + 2]) {
            matches.add(`${row}-${col}`);
            matches.add(`${row}-${col + 1}`);
            matches.add(`${row}-${col + 2}`);
          }
        }
        
        if (row <= currentGrid.length - 3) {
          if (current === currentGrid[row + 1][col] && current === currentGrid[row + 2][col]) {
            matches.add(`${row}-${col}`);
            matches.add(`${row + 1}-${col}`);
            matches.add(`${row + 2}-${col}`);
          }
        }
      }
    }

    if (matches.size > 0) {
      const newGrid = currentGrid.map(row => [...row]);
      matches.forEach(key => {
        const [r, c] = key.split('-').map(Number);
        newGrid[r][c] = '';
      });
      
      setGrid(newGrid);
      setScore(prev => prev + matches.size * 100);
      setRemainingSteps(prev => prev - 1);

      setTimeout(() => {
        fillEmptyCells(newGrid);
      }, 300);
    } else {
      setIsAnimating(false);
    }
  };

  const fillEmptyCells = (currentGrid: string[][]) => {
    const newGrid = currentGrid.map(row => [...row]);
    const icons = ['🍎', '🍇', '🍀', '🍊', '🍦', '👻', '🍩', '🌙', '💎', '❤️', '🟣', '🍏'];

    for (let col = 0; col < currentGrid[0].length; col++) {
      let emptyRow = -1;
      for (let row = currentGrid.length - 1; row >= 0; row--) {
        if (newGrid[row][col] === '') {
          if (emptyRow === -1) emptyRow = row;
        } else if (emptyRow !== -1) {
          newGrid[emptyRow][col] = newGrid[row][col];
          newGrid[row][col] = '';
          emptyRow--;
        }
      }
      
      for (let row = emptyRow; row >= 0; row--) {
        newGrid[row][col] = icons[Math.floor(Math.random() * icons.length)];
      }
    }

    setGrid(newGrid);

    setTimeout(() => {
      checkMatches(newGrid);
    }, 200);
  };

  const handlePowerUp = (type: string) => {
    const item = mockItems.find(i => i.id === type);
    if (item && item.count > 0) {
      setIsAnimating(true);
      
      if (type === 'shuffle') {
        setGrid(generateGameGrid());
      } else if (type === 'hint') {
        console.log('Showing hint');
      } else if (type === 'hammer') {
        console.log('Using hammer');
      }
      
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const progressPercent = Math.min((score / targetScore) * 100, 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      <header className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="bg-purple-100 rounded-xl px-4 py-2">
          <p className="text-xs text-purple-500">剩余步数</p>
          <p className="text-2xl font-bold text-purple-700">{remainingSteps}</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPause(true)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <Settings size={18} />
          </button>
          <button 
            onClick={() => setShowPause(true)}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center"
          >
            <Pause size={18} />
          </button>
        </div>
      </header>

      <div className="px-4 py-3 bg-white">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">当前得分:</span>
          <span className="text-gray-400">目标: {targetScore}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{score}</span>
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden mx-3">
            <div 
              className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <Star size={20} className="text-yellow-500 fill-yellow-500" />
        </div>
        <div className="flex justify-between mt-1">
          <div className="flex gap-3">
            {[...Array(3)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(progressPercent / 33) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} 
              />
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1 px-4 py-4">
        <div className="bg-white rounded-2xl p-3 shadow-lg">
          <div className="grid grid-cols-8 gap-1">
            {grid.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={isAnimating}
                  className={`
                    w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center text-xl
                    transition-all duration-200
                    ${selectedCell?.row === rowIndex && selectedCell?.col === colIndex 
                      ? 'ring-2 ring-primary scale-110 bg-purple-50' 
                      : 'hover:scale-105 bg-gray-50'
                    }
                    ${isAnimating ? 'opacity-70' : ''}
                  `}
                >
                  {cell}
                </button>
              ))
            )}
          </div>
        </div>
      </main>

      <div className="bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex justify-around">
          <button 
            onClick={() => handlePowerUp('hammer')}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Hammer size={24} className="text-purple-600" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                {mockItems.find(i => i.id === 'hammer')?.count}
              </span>
            </div>
            <span className="text-xs text-gray-500">锤子</span>
          </button>
          
          <button 
            onClick={() => handlePowerUp('shuffle')}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <Shuffle size={24} className="text-pink-600" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                {mockItems.find(i => i.id === 'shuffle')?.count}
              </span>
            </div>
            <span className="text-xs text-gray-500">洗牌</span>
          </button>
          
          <button 
            onClick={() => handlePowerUp('magic')}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Wand2 size={24} className="text-blue-600" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </div>
            <span className="text-xs text-gray-500">魔法</span>
          </button>
          
          <button 
            onClick={() => handlePowerUp('hint')}
            className="flex flex-col items-center gap-1"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Lightbulb size={24} className="text-green-600" />
              </div>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-xs rounded-full flex items-center justify-center">
                {mockItems.find(i => i.id === 'hint')?.count}
              </span>
            </div>
            <span className="text-xs text-gray-500">提示</span>
          </button>
        </div>
      </div>

      {showPause && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm animate-slide-up">
            <h3 className="text-xl font-bold text-center mb-6">游戏暂停</h3>
            <div className="space-y-3">
              <button 
                onClick={() => setShowPause(false)}
                className="w-full py-3 bg-primary text-white rounded-xl font-medium"
              >
                继续游戏
              </button>
              <button 
                onClick={() => {
                  setShowPause(false);
                  onBack();
                }}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium"
              >
                返回关卡选择
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}