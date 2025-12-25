import React from 'react';

const VolatilityModal = ({ selectedCoin, formData, onFormChange, onClose, onUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-2">Set Volatility for {selectedCoin.name}</h3>
        <p className="text-muted-text text-sm mb-4">Current volatility: {selectedCoin.volatility}</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Volatility (1-100)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.volatility}
              onChange={(e) => onFormChange({ ...formData, volatility: e.target.value })}
              className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
            />
            <p className="text-xs text-muted-text mt-2">
              Higher volatility means more price movement. Range: 1 (low) to 100 (very high)
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-surface-muted text-white rounded-lg hover:bg-surface-muted/80 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all"
          >
            Update Volatility
          </button>
        </div>
      </div>
    </div>
  );
};

export default VolatilityModal;

