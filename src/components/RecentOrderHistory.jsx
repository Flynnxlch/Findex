import React from 'react';

const RecentOrderHistory = () => {
  const orders = [
    {
      date: '2023-11-22 14:32',
      pair: 'BTC/USDT',
      type: 'Limit',
      side: 'Buy',
      price: 43500.00,
      amount: '0.05 BTC',
      total: 2175.00,
      status: 'Filled',
      sideColor: 'text-primary',
    },
    {
      date: '2023-11-21 09:15',
      pair: 'ETH/USDT',
      type: 'Market',
      side: 'Sell',
      price: 2950.00,
      amount: '1.5 ETH',
      total: 4425.00,
      status: 'Filled',
      sideColor: 'text-danger',
    },
    {
      date: '2023-11-20 18:45',
      pair: 'SOL/USDT',
      type: 'Limit',
      side: 'Buy',
      price: 92.00,
      amount: '20 SOL',
      total: 1840.00,
      status: 'Canceled',
      sideColor: 'text-primary',
    },
  ];

  const formatPrice = (price) => {
    return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-xl p-6 scrollbar-hide">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Recent Order History</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-primary text-background-dark text-xs font-semibold rounded-lg">
            All
          </button>
          <button className="px-3 py-1 bg-surface-muted text-muted-text text-xs font-semibold rounded-lg hover:text-white">
            Buy
          </button>
          <button className="px-3 py-1 bg-surface-muted text-muted-text text-xs font-semibold rounded-lg hover:text-white">
            Sell
          </button>
        </div>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark text-left text-xs text-muted-text uppercase">
              <th className="pb-3 pr-4">DATE</th>
              <th className="pb-3 pr-4">PAIR</th>
              <th className="pb-3 pr-4">TYPE</th>
              <th className="pb-3 pr-4">SIDE</th>
              <th className="pb-3 pr-4">PRICE</th>
              <th className="pb-3 pr-4">AMOUNT</th>
              <th className="pb-3 pr-4">TOTAL</th>
              <th className="pb-3">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order, index) => (
              <tr key={index} className={index < orders.length - 1 ? 'border-b border-border-dark/50' : ''}>
                <td className="py-4 text-muted-text">{order.date}</td>
                <td className="py-4 text-white">{order.pair}</td>
                <td className="py-4 text-white">{order.type}</td>
                <td className={`py-4 font-semibold ${order.sideColor}`}>{order.side}</td>
                <td className="py-4 text-white font-mono">${formatPrice(order.price)}</td>
                <td className="py-4 text-white">{order.amount}</td>
                <td className="py-4 text-white font-mono">${formatPrice(order.total)}</td>
                <td className={`py-4 font-semibold ${
                  order.status === 'Filled' ? 'text-primary' : 'text-muted-text'
                }`}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrderHistory;

