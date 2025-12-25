import React from 'react';

const RecommendedCoins = ({ onCoinClick }) => {
  const coins = [
    {
      asset: 'BTC/USD',
      type: 'LONG 10x',
      size: '0.45 BTC',
      entryPrice: 42150.00,
      markPrice: 45230.50,
      pnl: 1386.22,
      roe: 73.1,
      iconColor: 'bg-yellow-400',
      iconLetter: 'B',
    },
    {
      asset: 'ETH/USD',
      type: 'SHORT 5x',
      size: '5.20 ETH',
      entryPrice: 3250.00,
      markPrice: 3105.20,
      pnl: 752.96,
      roe: 4.45,
      iconColor: 'bg-purple-500',
      iconLetter: 'E',
    },
    {
      asset: 'SOL/USD',
      type: 'LONG 2x',
      size: '142.5 SOL',
      entryPrice: 98.50,
      markPrice: 104.20,
      pnl: 812.25,
      roe: 5.78,
      iconColor: 'bg-primary',
      iconLetter: 'S',
    },
  ];

  const formatPrice = (price) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl p-6 scrollbar-hide">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Recommended Coin to buy</h3>
        <button className="text-primary hover:text-primary-hover text-sm font-semibold">
          View All
        </button>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark text-left text-xs text-muted-text uppercase">
              <th className="pb-3 pr-4">ASSET</th>
              <th className="pb-3 pr-4">SIZE</th>
              <th className="pb-3 pr-4">ENTRY PRICE</th>
              <th className="pb-3 pr-4">MARK PRICE</th>
              <th className="pb-3 pr-4">PNL (ROE%)</th>
              <th className="pb-3">ACTION</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {coins.map((coin, index) => {
              // Extract coin name and symbol from asset (e.g., 'BTC/USD' -> name: 'Bitcoin', symbol: 'BTC')
              const coinData = {
                name: coin.asset.split('/')[0] === 'BTC' ? 'Bitcoin' : coin.asset.split('/')[0] === 'ETH' ? 'Ethereum' : coin.asset.split('/')[0] === 'SOL' ? 'Solana' : coin.asset.split('/')[0],
                symbol: coin.asset.split('/')[0],
                price: coin.markPrice,
                iconColor: coin.iconColor,
                iconLetter: coin.iconLetter,
                iconImage: null,
              };

              return (
                <tr 
                  key={index} 
                  onClick={() => onCoinClick && onCoinClick(coinData)}
                  className={`${index < coins.length - 1 ? 'border-b border-border-dark/50' : ''} ${onCoinClick ? 'cursor-pointer hover:bg-surface-muted/30 transition-colors' : ''}`}
                >
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className={`${coin.iconColor} w-8 h-8 rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-xs">{coin.iconLetter}</span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{coin.asset}</div>
                        <div className="text-xs text-muted-text">{coin.type}</div>
                      </div>
                    </div>
                  </td>
                <td className="py-4 text-white">{coin.size}</td>
                <td className="py-4 text-white font-mono">${formatPrice(coin.entryPrice)}</td>
                <td className="py-4 text-white font-mono">${formatPrice(coin.markPrice)}</td>
                <td className="py-4">
                  <div className="text-primary font-semibold">+${formatPrice(coin.pnl)}</div>
                  <div className="text-primary text-xs">+{coin.roe.toFixed(2)}%</div>
                </td>
                <td className="py-4">
                  <button className="px-3 py-1 bg-danger/20 text-danger rounded-lg text-xs font-semibold hover:bg-danger/30 transition-colors">
                    Close
                  </button>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecommendedCoins;

