import React from 'react';

const EditCoinModal = ({ selectedCoin, formData, onFormChange, onClose, onUpdate }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Edit Coin</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Coin Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Symbol</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => onFormChange({ 
                ...formData, 
                symbol: e.target.value.toUpperCase(), 
                iconLetter: e.target.value.toUpperCase()[0] || '' 
              })}
              className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-muted-text mb-2">Price</label>
            <input
              type="number"
              value={formData.initialPrice}
              onChange={(e) => onFormChange({ ...formData, initialPrice: e.target.value })}
              className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white"
            />
          </div>
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
          </div>
          
          {/* Read-only System Parameters */}
          <div className="bg-surface-muted/30 border border-border-dark rounded-lg p-4 space-y-3">
            <p className="text-xs font-semibold text-muted-text uppercase mb-2">System Parameters (Fixed)</p>
            <div>
              <label className="block text-xs font-semibold text-muted-text mb-1">Base Sigma</label>
              <div className="px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white font-mono">
                0.008
              </div>
              <p className="text-xs text-muted-text mt-1">Base sigma constant for price movement algorithm</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-text mb-1">Floor Price</label>
              <div className="px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white font-mono">
                0.0001
              </div>
              <p className="text-xs text-muted-text mt-1">Minimum price to prevent zero or negative prices</p>
            </div>
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCoinModal;

