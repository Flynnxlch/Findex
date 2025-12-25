import React from 'react';

const pairs = [
  { symbol: 'BTC/USD', price: '64,231.50', change: '+2.4%' },
  { symbol: 'ETH/USD', price: '3,452.12', change: '+1.8%' },
  { symbol: 'SOL/USD', price: '145.80', change: '-0.5%', negative: true },
  { symbol: 'ADA/USD', price: '0.45', change: '+5.2%' },
  { symbol: 'XRP/USD', price: '0.62', change: '+0.9%' },
];

const Ticker = () => {
  const items = Array.from({ length: 40 }, (_, idx) => pairs[idx % pairs.length]);

  return (
    <div className="mt-20 w-full bg-surface-dark border-b border-border-dark overflow-hidden py-2 relative">
      <div className="flex animate-ticker-scroll whitespace-nowrap w-max gap-8 font-mono text-xs">
        <div className="flex gap-8 items-center">
          {items.map((p, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-muted-text">{p.symbol}</span>
              <span className="text-white">{p.price}</span>
              <span className={p.negative ? 'text-danger' : 'text-primary'}>{p.change}</span>
            </span>
          ))}
        </div>
      </div>
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background-dark to-transparent z-10" />
    </div>
  );
};

export default Ticker;


