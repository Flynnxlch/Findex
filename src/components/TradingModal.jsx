import { X } from 'lucide-react';
import React from 'react';
import TradingChart from './trading/TradingChart.jsx';
import BuySell from './trading/BuySell.jsx';
import TradeHistory from './trading/TradeHistory.jsx';

const TradingModal = ({ coin, onClose }) => {
  if (!coin) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Trading Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-background-dark border border-border-dark rounded-2xl overflow-hidden w-full max-w-7xl max-h-[90vh] flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border-dark">
            <div className="flex items-center gap-4">
              {coin.iconImage ? (
                <img 
                  src={coin.iconImage} 
                  alt={coin.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className={`${coin.iconColor} w-12 h-12 rounded-full flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{coin.iconLetter}</span>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-white">{coin.name}</h2>
                <p className="text-muted-text font-mono">{coin.symbol}</p>
              </div>
              <div className="ml-4">
                <p className="text-muted-text text-sm">Current Price</p>
                <p className="text-white font-mono font-bold text-xl">${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-dark border border-border-dark text-muted-text hover:text-white hover:bg-surface-muted transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content: Chart (left) and Buy/Sell (right) */}
          <div className="flex-1 flex gap-4 p-4 overflow-hidden">
            {/* Left: Trading Chart */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <TradingChart coin={coin} />
            </div>

            {/* Right: Buy/Sell */}
            <div className="w-80 flex-shrink-0 overflow-y-auto scrollbar-hide">
              <BuySell coin={coin} />
            </div>
          </div>

          {/* Bottom: Trade History */}
          <div className="border-t border-border-dark p-4 max-h-48 overflow-y-auto scrollbar-hide">
            <TradeHistory coin={coin} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TradingModal;

