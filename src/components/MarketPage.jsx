import { CandlestickChart, TrendingUp, BarChart3, Activity, TrendingDown, PieChart, Gauge } from 'lucide-react';
import React from 'react';
import TopPerformers from './TopPerformers.jsx';
import MarketList from './MarketList.jsx';

const MarketPage = () => {
  return (
    <section className="py-24 relative overflow-hidden" id="markets">
      {/* Background Effects */}
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1280px] w-full px-4 md:px-8 mx-auto relative z-10">
        {/* Market Overview Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Market Overview</h1>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {/* Global Market Cap */}
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 opacity-10">
              <TrendingUp className="w-full h-full text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-text uppercase tracking-wider">GLOBAL MARKET CAP</span>
              </div>
              <div className="text-3xl font-bold text-white font-mono mb-2">$2.45T</div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-primary font-semibold text-sm">+1.2%</span>
              </div>
            </div>
          </div>

          {/* 24H Volume */}
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 opacity-10">
              <BarChart3 className="w-full h-full text-cyan" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="w-4 h-4 text-cyan" />
                <span className="text-xs text-muted-text uppercase tracking-wider">24H VOLUME</span>
              </div>
              <div className="text-3xl font-bold text-white font-mono mb-2">$84.2B</div>
              <div className="flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-danger" />
                <span className="text-danger font-semibold text-sm">-5.4%</span>
              </div>
            </div>
          </div>

          {/* BTC Dominance */}
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 opacity-10">
              <PieChart className="w-full h-full text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <PieChart className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-text uppercase tracking-wider">BTC DOMINANCE</span>
              </div>
              <div className="text-3xl font-bold text-white font-mono mb-1">52.1%</div>
              <div className="text-sm text-muted-text">ETH: 17.8%</div>
            </div>
          </div>

          {/* Sentiment */}
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-colors relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 opacity-10">
              <Gauge className="w-full h-full text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-text uppercase tracking-wider">SENTIMENT</span>
              </div>
              <div className="text-3xl font-bold text-primary font-mono mb-3">Greed</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-surface-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '75%' }} />
                </div>
                <span className="text-sm text-muted-text font-mono">75/100</span>
              </div>
            </div>
          </div>
        </div>


        {/* Top 5 Performers Section */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-2xl md:text-3xl font-bold text-white">Top 5 Performers (24h)</h3>
          </div>
          <TopPerformers />
        </div>

        {/* Market List Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
            <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <CandlestickChart className="w-6 h-6 text-primary" />
              All Markets
            </h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border-dark to-transparent" />
          </div>
          <MarketList isClickable={false} />
        </div>

        {/* Bottom Stats Summary */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
            <div className="text-muted-text text-sm mb-2 uppercase tracking-wider">Total Markets</div>
            <div className="text-3xl font-bold text-white font-mono">8</div>
            <div className="text-xs text-primary mt-2">All trading pairs</div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
            <div className="text-muted-text text-sm mb-2 uppercase tracking-wider">Total Volume (24h)</div>
            <div className="text-3xl font-bold text-primary font-mono">$5.67M</div>
            <div className="text-xs text-muted-text mt-2">Combined trading volume</div>
          </div>
          <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
            <div className="text-muted-text text-sm mb-2 uppercase tracking-wider">Gaining Markets</div>
            <div className="text-3xl font-bold text-white font-mono">6/8</div>
            <div className="text-xs text-primary mt-2">Positive 24h change</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketPage;

