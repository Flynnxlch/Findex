import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React, { useState } from 'react';

const markets = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45230.50,
    change24h: 2.4,
    volume24h: 32100000000,
    marketCap: 885200000000,
    iconColor: 'bg-yellow-400',
    iconLetter: 'B',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3105.20,
    change24h: -1.1,
    volume24h: 15400000000,
    marketCap: 372100000000,
    iconColor: 'bg-purple-500',
    iconLetter: 'E',
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 104.20,
    change24h: 8.45,
    volume24h: 4200000000,
    marketCap: 45100000000,
    iconColor: 'bg-primary',
    iconLetter: 'S',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.52,
    change24h: 0.0,
    volume24h: 320000000,
    marketCap: 18200000000,
    iconColor: 'bg-blue-500',
    iconLetter: 'A',
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 0.61,
    change24h: -0.5,
    volume24h: 980000000,
    marketCap: 33500000000,
    iconColor: 'bg-gray-500',
    iconLetter: 'X',
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 7.45,
    change24h: 4.9,
    volume24h: 210000000,
    marketCap: 9400000000,
    iconColor: 'bg-purple-500',
    iconLetter: 'D',
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 15.30,
    change24h: 2.8,
    volume24h: 450000000,
    marketCap: 8900000000,
    iconColor: 'bg-cyan',
    iconLetter: 'L',
  },
];

const MarketList = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const formatPrice = (price) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  const formatVolume = (volume) => {
    if (volume >= 1000000000) {
      return `$${(volume / 1000000000).toFixed(1)}B`;
    }
    return `$${(volume / 1000000).toFixed(0)}M`;
  };

  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(1)}B`;
    }
    return `$${(marketCap / 1000000).toFixed(0)}M`;
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
      setSortConfig({ key: null, direction: null });
      return;
    }
    setSortConfig({ key, direction });
  };

  const sortedMarkets = [...markets].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (sortConfig.key === 'price') {
      return sortConfig.direction === 'asc' ? a.price - b.price : b.price - a.price;
    }
    if (sortConfig.key === 'change24h') {
      return sortConfig.direction === 'asc' ? a.change24h - b.change24h : b.change24h - a.change24h;
    }
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-3 h-3 text-muted-text" />;
    }
    if (sortConfig.direction === 'asc') {
      return <ArrowUp className="w-3 h-3 text-primary" />;
    }
    return <ArrowDown className="w-3 h-3 text-primary" />;
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden scrollbar-hide">
      {/* Table Header */}
      <div className="hidden md:grid md:grid-cols-5 gap-4 p-4 border-b border-border-dark bg-surface-muted/50">
        <div className="text-xs font-bold text-muted-text uppercase tracking-wider">Name</div>
        <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">
          <button
            onClick={() => handleSort('price')}
            className="flex items-center gap-1 ml-auto hover:text-white transition-colors"
          >
            Price
            {getSortIcon('price')}
          </button>
        </div>
        <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">
          <button
            onClick={() => handleSort('change24h')}
            className="flex items-center gap-1 ml-auto hover:text-white transition-colors"
          >
            24H Change
            {getSortIcon('change24h')}
          </button>
        </div>
        <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">24H Volume</div>
        <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">Market Cap</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-border-dark">
        {sortedMarkets.map((market) => (
          <div
            key={market.symbol}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 hover:bg-surface-muted/30 transition-colors cursor-pointer group"
          >
            {/* Name with Icon */}
            <div className="flex items-center gap-3">
              <div className={`${market.iconColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <span className="text-white font-bold text-xl">{market.iconLetter}</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-white font-bold text-base group-hover:text-primary transition-colors">
                  {market.name}
                </span>
                <span className="text-muted-text text-xs font-mono">{market.symbol}</span>
              </div>
            </div>

            {/* Price */}
            <div className="text-right md:text-right">
              <div className="text-white font-mono font-bold text-base">
                ${formatPrice(market.price)}
              </div>
            </div>

            {/* 24h Change */}
            <div className="flex items-center justify-end gap-1">
              {market.change24h > 0 ? (
                <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary font-mono font-semibold text-sm">
                  +{market.change24h.toFixed(2)}%
                </span>
              ) : market.change24h < 0 ? (
                <span className="px-3 py-1 rounded-lg bg-danger/20 text-danger font-mono font-semibold text-sm">
                  {market.change24h.toFixed(2)}%
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-muted-text/20 text-muted-text font-mono font-semibold text-sm">
                  {market.change24h.toFixed(1)}%
                </span>
              )}
            </div>

            {/* 24h Volume */}
            <div className="hidden md:block text-right">
              <div className="text-white font-mono text-sm">{formatVolume(market.volume24h)}</div>
            </div>

            {/* Market Cap */}
            <div className="hidden md:block text-right">
              <div className="text-white font-mono text-sm">{formatMarketCap(market.marketCap)}</div>
            </div>

            {/* Mobile: Volume and Market Cap */}
            <div className="md:hidden flex flex-col items-end gap-1">
              <div className="text-xs text-muted-text">Vol: {formatVolume(market.volume24h)}</div>
              <div className="text-xs text-muted-text">Cap: {formatMarketCap(market.marketCap)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketList;
