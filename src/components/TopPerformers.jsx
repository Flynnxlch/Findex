import { ArrowDown, ArrowUp, TrendingUp } from 'lucide-react';
import React from 'react';

const topPerformers = [
  {
    rank: 1,
    pair: 'SOL',
    name: 'Solana',
    price: 104.20,
    change24h: 8.45,
    iconColor: 'bg-primary',
    iconPattern: 'bg-white/20',
  },
  {
    rank: 2,
    pair: 'AVAX',
    name: 'Avalanche',
    price: 36.80,
    change24h: 6.12,
    iconColor: 'bg-cyan',
    iconPattern: 'bg-white/20',
  },
  {
    rank: 3,
    pair: 'DOT',
    name: 'Polkadot',
    price: 7.45,
    change24h: 4.90,
    iconColor: 'bg-purple-500',
    iconPattern: 'bg-white/20',
  },
  {
    rank: 4,
    pair: 'UNI',
    name: 'Uniswap',
    price: 6.20,
    change24h: 3.25,
    iconColor: 'bg-pink-500',
    iconPattern: 'bg-white/20',
  },
  {
    rank: 5,
    pair: 'LINK',
    name: 'Chainlink',
    price: 15.30,
    change24h: 2.80,
    iconColor: 'bg-cyan',
    iconPattern: 'bg-white/20',
  },
];

const TopPerformers = () => {
  const formatPrice = (price) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {topPerformers.map((coin) => (
        <div
          key={coin.rank}
          className="bg-surface-dark border border-border-dark rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
        >
          {/* Icon */}
          <div className={`${coin.iconColor} w-14 h-14 rounded-full flex items-center justify-center mb-4 relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '6px 6px'
            }} />
            <span className="text-white font-bold text-xl relative z-10">{coin.pair[0]}</span>
          </div>

          {/* Coin Info */}
          <div className="mb-3">
            <h3 className="text-white font-bold text-lg mb-1">{coin.pair}</h3>
            <p className="text-muted-text text-xs">{coin.name}</p>
          </div>

          {/* Price */}
          <div className="text-white font-mono font-bold text-xl mb-2">
            ${formatPrice(coin.price)}
          </div>

          {/* Change */}
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4 text-primary" />
            <span className="text-primary font-mono font-semibold text-sm">
              +{coin.change24h.toFixed(2)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopPerformers;
