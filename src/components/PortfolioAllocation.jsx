import React from 'react';

const PortfolioAllocation = () => {
  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl p-6 scrollbar-hide">
      <h3 className="text-lg font-bold text-white mb-4">Portfolio Allocation</h3>
      <div className="flex items-center gap-8">
        <div className="w-32 h-32 rounded-full border-8 border-primary/30 flex items-center justify-center relative">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">12</div>
            <div className="text-xs text-muted-text">ASSETS</div>
          </div>
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-white">Bitcoin</span>
            </div>
            <span className="text-white font-semibold">68%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-cyan"></div>
              <span className="text-white">Ethereum</span>
            </div>
            <span className="text-white font-semibold">20%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-white">Solana</span>
            </div>
            <span className="text-white font-semibold">12%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAllocation;

