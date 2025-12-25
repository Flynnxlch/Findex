import { ArrowUp, ArrowDown } from 'lucide-react';
import React from 'react';

const TradeHistory = ({ coin }) => {
  // Sample trade history data
  const tradeHistory = [
    { id: 1, type: 'buy', amount: 0.5, price: 45230.50, total: 22615.25, time: '2024-01-20 14:30:25', status: 'completed' },
    { id: 2, type: 'sell', amount: 0.2, price: 45300.00, total: 9060.00, time: '2024-01-20 13:15:10', status: 'completed' },
    { id: 3, type: 'buy', amount: 0.3, price: 45100.00, total: 13530.00, time: '2024-01-20 12:00:05', status: 'completed' },
    { id: 4, type: 'buy', amount: 0.1, price: 45250.00, total: 4525.00, time: '2024-01-20 10:45:30', status: 'pending' },
  ];

  return (
    <div>
      <h3 className="text-base font-bold text-white mb-3">Trade History</h3>
      <div className="bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border-dark bg-surface-muted/50">
                <th className="text-left p-2 text-xs font-bold text-muted-text uppercase">Type</th>
                <th className="text-left p-2 text-xs font-bold text-muted-text uppercase">Amount</th>
                <th className="text-right p-2 text-xs font-bold text-muted-text uppercase">Price</th>
                <th className="text-right p-2 text-xs font-bold text-muted-text uppercase">Total</th>
                <th className="text-left p-2 text-xs font-bold text-muted-text uppercase">Time</th>
                <th className="text-center p-2 text-xs font-bold text-muted-text uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {tradeHistory.map((trade) => (
                <tr key={trade.id} className="border-b border-border-dark/50 hover:bg-surface-muted/30 transition-colors">
                  <td className="p-2">
                    <div className={`flex items-center gap-1.5 ${
                      trade.type === 'buy' ? 'text-primary' : 'text-danger'
                    }`}>
                      {trade.type === 'buy' ? (
                        <ArrowUp className="w-3.5 h-3.5" />
                      ) : (
                        <ArrowDown className="w-3.5 h-3.5" />
                      )}
                      <span className="font-semibold uppercase text-xs">{trade.type}</span>
                    </div>
                  </td>
                  <td className="p-2">
                    <span className="text-white font-mono text-sm">{trade.amount} {coin.symbol}</span>
                  </td>
                  <td className="p-2 text-right">
                    <span className="text-white font-mono text-sm">${trade.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </td>
                  <td className="p-2 text-right">
                    <span className="text-white font-mono font-semibold text-sm">${trade.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </td>
                  <td className="p-2">
                    <span className="text-muted-text text-xs">{trade.time}</span>
                  </td>
                  <td className="p-2 text-center">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${
                      trade.status === 'completed' 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-yellow-400/20 text-yellow-400'
                    }`}>
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;

