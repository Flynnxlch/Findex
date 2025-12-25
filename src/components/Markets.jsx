import { ArrowDown, ArrowUp } from 'lucide-react';
import React from 'react';

const markets = [
  {
    pair: 'SOB/TOK',
    price: 65300.00,
    change24h: 2.4,
    volume24h: 1245000,
    high24h: 65800.00,
    low24h: 64100.00,
    type: 'PERP',
  },
  {
    pair: 'ETH/USD',
    price: 3245.50,
    change24h: -1.2,
    volume24h: 890000,
    high24h: 3320.00,
    low24h: 3180.00,
    type: 'SPOT',
  },
  {
    pair: 'BTC/USD',
    price: 67250.00,
    change24h: 3.8,
    volume24h: 2100000,
    high24h: 68500.00,
    low24h: 65100.00,
    type: 'PERP',
  },
  {
    pair: 'SOL/USD',
    price: 185.75,
    change24h: 5.6,
    volume24h: 567000,
    high24h: 192.00,
    low24h: 175.00,
    type: 'SPOT',
  },
  {
    pair: 'MATIC/USD',
    price: 0.85,
    change24h: -0.8,
    volume24h: 234000,
    high24h: 0.89,
    low24h: 0.82,
    type: 'SPOT',
  },
  {
    pair: 'AVAX/USD',
    price: 42.30,
    change24h: 1.5,
    volume24h: 456000,
    high24h: 44.00,
    low24h: 41.00,
    type: 'PERP',
  },
  {
    pair: 'ADA/USD',
    price: 0.52,
    change24h: -2.1,
    volume24h: 189000,
    high24h: 0.55,
    low24h: 0.50,
    type: 'SPOT',
  },
  {
    pair: 'DOT/USD',
    price: 7.85,
    change24h: 0.9,
    volume24h: 312000,
    high24h: 8.10,
    low24h: 7.60,
    type: 'PERP',
  },
];

const Markets = () => {

  const formatPrice = (price) => {
    if (price >= 1000) {
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  };

  const formatVolume = (volume) => {
    if (volume >= 1000000) {
      return `$${(volume / 1000000).toFixed(2)}M`;
    }
    return `$${(volume / 1000).toFixed(0)}K`;
  };

  return (
    <section className="py-24 relative overflow-hidden" id="markets">
      <div className="absolute left-0 top-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 w-[400px] h-[400px] bg-cyan/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] w-full px-4 md:px-8 mx-auto relative z-10">

        {/* Markets Table */}
        <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-7 gap-4 p-4 border-b border-border-dark bg-surface-muted/50">
            <div className="text-xs font-bold text-muted-text uppercase tracking-wider">Pair</div>
            <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">Price</div>
            <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">24h Change</div>
            <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">24h High</div>
            <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">24h Low</div>
            <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-right">24h Volume</div>
            <div className="text-xs font-bold text-muted-text uppercase tracking-wider text-center">Type</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border-dark">
            {markets.map((market, index) => (
              <div
                key={market.pair}
                className="grid grid-cols-2 md:grid-cols-7 gap-4 p-4 hover:bg-surface-muted/30 transition-colors cursor-pointer group"
              >
                {/* Pair */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-base group-hover:text-primary transition-colors">
                      {market.pair}
                    </span>
                    <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-full font-mono">
                      {market.type}
                    </span>
                  </div>
                  <div className="md:hidden text-xs text-muted-text mt-1">
                    {formatVolume(market.volume24h)} · {market.change24h > 0 ? '+' : ''}
                    {market.change24h.toFixed(2)}%
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-white font-mono font-bold text-base">
                    ${formatPrice(market.price)}
                  </div>
                  <div className="md:hidden text-xs text-muted-text mt-1">
                    H: ${formatPrice(market.high24h)} · L: ${formatPrice(market.low24h)}
                  </div>
                </div>

                {/* 24h Change - Desktop */}
                <div className="hidden md:flex items-center justify-end gap-1">
                  {market.change24h > 0 ? (
                    <>
                      <ArrowUp className="w-4 h-4 text-primary" />
                      <span className="text-primary font-mono font-semibold">
                        +{market.change24h.toFixed(2)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="w-4 h-4 text-danger" />
                      <span className="text-danger font-mono font-semibold">
                        {market.change24h.toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>

                {/* 24h High - Desktop */}
                <div className="hidden md:block text-right">
                  <div className="text-white font-mono text-sm">${formatPrice(market.high24h)}</div>
                </div>

                {/* 24h Low - Desktop */}
                <div className="hidden md:block text-right">
                  <div className="text-white font-mono text-sm">${formatPrice(market.low24h)}</div>
                </div>

                {/* 24h Volume - Desktop */}
                <div className="hidden md:block text-right">
                  <div className="text-white font-mono text-sm">{formatVolume(market.volume24h)}</div>
                </div>

                {/* Type - Desktop */}
                <div className="hidden md:flex items-center justify-center">
                  <span className="text-xs bg-primary/15 text-primary px-2 py-1 rounded-full font-mono">
                    {market.type}
                  </span>
                </div>

                {/* Mobile: 24h Change */}
                <div className="md:hidden flex items-center justify-end gap-1">
                  {market.change24h > 0 ? (
                    <>
                      <ArrowUp className="w-4 h-4 text-primary" />
                      <span className="text-primary font-mono font-semibold text-sm">
                        +{market.change24h.toFixed(2)}%
                      </span>
                    </>
                  ) : (
                    <>
                      <ArrowDown className="w-4 h-4 text-danger" />
                      <span className="text-danger font-mono font-semibold text-sm">
                        {market.change24h.toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Markets;

