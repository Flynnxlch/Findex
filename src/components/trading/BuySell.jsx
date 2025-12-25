import { ArrowUp, ArrowDown, Wallet } from 'lucide-react';
import React, { useState } from 'react';
import { useNotification } from '../NotificationProvider.jsx';

const BuySell = ({ coin }) => {
  const { showSuccess, showError } = useNotification();
  const [tradeType, setTradeType] = useState('buy'); // 'buy' or 'sell'
  const [amount, setAmount] = useState('');
  const [tradeMode, setTradeMode] = useState('amount'); // 'amount' or 'percentage'
  const [percentage, setPercentage] = useState('');

  const availableBalance = 15230.00; // From localStorage or props
  const currentPrice = coin.price;

  const handleTrade = () => {
    const tradeAmount = parseFloat(amount) || 0;
    const tradePercentage = parseFloat(percentage) || 0;

    if (tradeMode === 'amount') {
      if (tradeAmount <= 0) {
        showError('Please enter a valid amount');
        return;
      }
      if (tradeType === 'buy' && tradeAmount > availableBalance) {
        showError('Insufficient balance');
        return;
      }
      if (tradeType === 'sell') {
        // Check if user has enough coins (would need to check from user's holdings)
        showError('Insufficient coins');
        return;
      }
    } else {
      if (tradePercentage <= 0 || tradePercentage > 100) {
        showError('Please enter a valid percentage (1-100)');
        return;
      }
    }

    const finalAmount = tradeMode === 'amount' ? tradeAmount : (availableBalance * tradePercentage / 100);
    const coinsToGet = finalAmount / currentPrice;

    if (tradeType === 'buy') {
      showSuccess(`Buy order placed: ${coinsToGet.toFixed(6)} ${coin.symbol} for $${finalAmount.toFixed(2)}`);
    } else {
      showSuccess(`Sell order placed: ${coinsToGet.toFixed(6)} ${coin.symbol} for $${finalAmount.toFixed(2)}`);
    }

    // Reset form
    setAmount('');
    setPercentage('');
  };

  return (
    <div className="space-y-4">
      {/* Balance Info */}
      <div className="bg-surface-dark border border-border-dark rounded-lg p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-muted-text" />
            <span className="text-muted-text">Available Balance</span>
          </div>
          <span className="text-white font-mono font-bold text-lg">${availableBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Trade Type Toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setTradeType('buy')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all text-sm ${
            tradeType === 'buy'
              ? 'bg-primary text-background-dark shadow-neon-sm'
              : 'bg-surface-dark text-muted-text hover:text-white border border-border-dark'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <ArrowUp className="w-5 h-5" />
            Buy {coin.symbol}
          </div>
        </button>
        <button
          onClick={() => setTradeType('sell')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all text-sm ${
            tradeType === 'sell'
              ? 'bg-danger text-white shadow-neon-sm'
              : 'bg-surface-dark text-muted-text hover:text-white border border-border-dark'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <ArrowDown className="w-5 h-5" />
            Sell {coin.symbol}
          </div>
        </button>
      </div>

      {/* Trade Mode Toggle */}
      <div className="flex gap-2 bg-surface-dark border border-border-dark rounded-lg p-1.5">
        <button
          onClick={() => setTradeMode('amount')}
          className={`flex-1 py-1.5 px-3 rounded-md font-semibold transition-all text-xs ${
            tradeMode === 'amount'
              ? 'bg-primary text-background-dark'
              : 'text-muted-text hover:text-white'
          }`}
        >
          Amount ($)
        </button>
        <button
          onClick={() => setTradeMode('percentage')}
          className={`flex-1 py-1.5 px-3 rounded-md font-semibold transition-all text-xs ${
            tradeMode === 'percentage'
              ? 'bg-primary text-background-dark'
              : 'text-muted-text hover:text-white'
          }`}
        >
          Percentage (%)
        </button>
      </div>

      {/* Input */}
      <div className="space-y-3">
        {tradeMode === 'amount' ? (
          <div>
            <label className="block text-xs font-semibold text-muted-text mb-1.5">
              Amount (USD)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 bg-surface-dark border border-border-dark rounded-lg text-white font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {amount && (
              <p className="text-muted-text text-sm mt-2">
                ≈ {(parseFloat(amount) / currentPrice).toFixed(6)} {coin.symbol}
              </p>
            )}
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-muted-text mb-1.5">
              Percentage (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 bg-surface-dark border border-border-dark rounded-lg text-white font-mono text-sm focus:outline-none focus:border-primary transition-colors"
            />
            {percentage && (
              <p className="text-muted-text text-sm mt-2">
                ≈ ${(availableBalance * parseFloat(percentage) / 100).toFixed(2)} ≈ {(availableBalance * parseFloat(percentage) / 100 / currentPrice).toFixed(6)} {coin.symbol}
              </p>
            )}
          </div>
        )}

        {/* Price Info */}
        <div className="bg-surface-dark border border-border-dark rounded-lg p-3 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-muted-text">Price</span>
            <span className="text-white font-mono font-semibold">${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          {amount && tradeMode === 'amount' && (
            <div className="flex justify-between">
              <span className="text-muted-text">Total</span>
              <span className="text-white font-mono font-semibold">${parseFloat(amount || 0).toFixed(2)}</span>
            </div>
          )}
          {percentage && tradeMode === 'percentage' && (
            <div className="flex justify-between">
              <span className="text-muted-text">Total</span>
              <span className="text-white font-mono font-semibold">${(availableBalance * parseFloat(percentage) / 100).toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleTrade}
          className={`w-full py-2.5 px-4 rounded-lg font-bold text-sm transition-all shadow-neon-sm ${
            tradeType === 'buy'
              ? 'bg-primary hover:bg-primary-hover text-background-dark'
              : 'bg-danger hover:bg-danger/80 text-white'
          }`}
        >
          {tradeType === 'buy' ? 'Buy' : 'Sell'} {coin.symbol}
        </button>
      </div>
    </div>
  );
};

export default BuySell;

