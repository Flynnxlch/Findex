import { Edit, Trash2, Settings, BarChart3, Play, Square } from 'lucide-react';
import React from 'react';

const CoinTable = ({ coins, searchTerm, onSetVolatility, onSetSubVolatility, onEdit, onDelete, onToggleTrading }) => {
  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark bg-surface-muted/50">
              <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Coin</th>
              <th className="text-left p-4 text-xs font-bold text-muted-text uppercase">Symbol</th>
              <th className="text-right p-4 text-xs font-bold text-muted-text uppercase">Price</th>
              <th className="text-right p-4 text-xs font-bold text-muted-text uppercase">Volatility</th>
              <th className="text-center p-4 text-xs font-bold text-muted-text uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id} className="border-b border-border-dark/50 hover:bg-surface-muted/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    {coin.iconImage ? (
                      <img 
                        src={coin.iconImage} 
                        alt={coin.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-border-dark"
                      />
                    ) : (
                      <div className={`${coin.iconColor} w-10 h-10 rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold">{coin.iconLetter}</span>
                      </div>
                    )}
                    <span className="text-white font-semibold">{coin.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-muted-text font-mono">{coin.symbol}</span>
                </td>
                <td className="p-4 text-right">
                  <span className="text-white font-mono font-semibold">${coin.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-primary font-semibold">{coin.volatility}</span>
                    {coin.isRunning && (
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-semibold">Live</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onToggleTrading(coin.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        coin.isRunning 
                          ? 'bg-danger/20 text-danger hover:bg-danger/30' 
                          : 'bg-primary/20 text-primary hover:bg-primary/30'
                      }`}
                      title={coin.isRunning ? "Stop Trading" : "Start Trading"}
                    >
                      {coin.isRunning ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => onSetVolatility(coin)}
                      className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-colors"
                      title="Set Volatility"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onSetSubVolatility(coin)}
                      className="p-2 bg-yellow-400/20 text-yellow-400 rounded-lg hover:bg-yellow-400/30 transition-colors"
                      title="Set Sub-Volatility"
                    >
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(coin)}
                      className="p-2 bg-cyan/20 text-cyan rounded-lg hover:bg-cyan/30 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(coin.id)}
                      className="p-2 bg-danger/20 text-danger rounded-lg hover:bg-danger/30 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;

