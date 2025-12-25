import { ArrowUp, Plus } from 'lucide-react';
import React, { useState } from 'react';
import MarketList from './MarketList.jsx';
import PortfolioAllocation from './PortfolioAllocation.jsx';
import RecentOrderHistory from './RecentOrderHistory.jsx';
import RecommendedCoins from './RecommendedCoins.jsx';
import TokenChart from './TokenChart.jsx';
import TradingModal from './TradingModal.jsx';

const DashboardContent = ({ activeMenu, onMenuChange }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [showTradingModal, setShowTradingModal] = useState(false);
  if (activeMenu === 'coins') {
    return (
      <>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Markets</h2>
          <MarketList 
            onCoinClick={(coin) => {
              setSelectedCoin(coin);
              setShowTradingModal(true);
            }}
            isClickable={true}
          />
        </div>
        {showTradingModal && selectedCoin && (
          <TradingModal
            coin={selectedCoin}
            onClose={() => {
              setShowTradingModal(false);
              setSelectedCoin(null);
            }}
          />
        )}
      </>
    );
  }

  if (activeMenu === 'dashboard') {
    return (
      <>
        <div className="p-6 space-y-6">
          {/* Welcome Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex</h1>
              <p className="text-muted-text">Here's what's happening with your portfolio today.</p>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => onMenuChange && onMenuChange('coins')}
                className="px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Buy Coin
              </button>
            </div>
          </div>

          {/* Total Token Card */}
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Total Token</h3>
              <div className="flex items-center gap-2 text-primary">
                <ArrowUp className="w-4 h-4" />
                <span className="font-semibold text-sm">+$3,420.12 (2.8%) vs last 24h</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-4xl font-bold text-white font-mono">$124,592.45</div>
            </div>
            
            {/* Portfolio Chart */}
            <div className="h-80 bg-background-dark rounded-lg border border-border-dark overflow-hidden scrollbar-hide">
              <TokenChart />
            </div>

            <div className="mt-4 flex gap-6 text-sm">
              <div>
                <p className="text-muted-text">Available for Trade</p>
                <p className="text-white font-semibold">$15,230.00</p>
              </div>
              <div>
                <p className="text-muted-text">In Assets</p>
                <p className="text-white font-semibold">$109,362.45</p>
              </div>
            </div>
          </div>

          <RecommendedCoins 
            onCoinClick={(coin) => {
              setSelectedCoin(coin);
              setShowTradingModal(true);
            }}
          />
          <PortfolioAllocation />
          <RecentOrderHistory />
        </div>
        {showTradingModal && selectedCoin && (
          <TradingModal
            coin={selectedCoin}
            onClose={() => {
              setShowTradingModal(false);
              setSelectedCoin(null);
            }}
          />
        )}
      </>
    );
  }

  return null;
};

export default DashboardContent;

