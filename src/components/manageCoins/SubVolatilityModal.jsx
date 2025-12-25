import React from 'react';

const SubVolatilityModal = ({ 
  selectedCoin, 
  subVolatilityData, 
  onSubVolatilityChange, 
  onRangeChange, 
  getTotalRate, 
  onClose, 
  onUpdate 
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-2">Set Sub-Volatility for {selectedCoin.name}</h3>
        <p className="text-muted-text text-sm mb-4">
          Configure volatility rate distribution per 15 seconds. Main volatility: <span className="text-primary font-semibold">{selectedCoin.volatility}</span>
        </p>
        
        <div className="space-y-4 mb-6">
          {/* Low Volatility */}
          <div className="bg-background-dark rounded-lg p-4 border border-border-dark">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-white mb-1">Low Volatility</label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-text">Range:</span>
                  <input
                    type="number"
                    min="1"
                    max={selectedCoin.volatility}
                    value={subVolatilityData.low.range.min}
                    onChange={(e) => onRangeChange('low', 'min', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">-</span>
                  <input
                    type="number"
                    min={subVolatilityData.low.range.min + 1}
                    max={selectedCoin.volatility}
                    value={subVolatilityData.low.range.max}
                    onChange={(e) => onRangeChange('low', 'max', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">(Max: {selectedCoin.volatility})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={subVolatilityData.low.rate.toFixed(2)}
                  onChange={(e) => onSubVolatilityChange('low', e.target.value)}
                  className="w-24 px-3 py-2 bg-surface-dark border border-border-dark rounded-lg text-white text-right font-mono"
                  placeholder="00.00"
                />
                <span className="text-muted-text">%</span>
              </div>
            </div>
            <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all" 
                style={{ width: `${subVolatilityData.low.rate}%` }}
              />
            </div>
          </div>

          {/* Medium Volatility */}
          <div className="bg-background-dark rounded-lg p-4 border border-border-dark">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-white mb-1">Medium Volatility</label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-text">Range:</span>
                  <input
                    type="number"
                    min={subVolatilityData.low.range.max + 1}
                    max={selectedCoin.volatility}
                    value={subVolatilityData.medium.range.min}
                    onChange={(e) => onRangeChange('medium', 'min', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">-</span>
                  <input
                    type="number"
                    min={subVolatilityData.medium.range.min + 1}
                    max={subVolatilityData.high.range.min - 1}
                    value={subVolatilityData.medium.range.max}
                    onChange={(e) => onRangeChange('medium', 'max', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">(Max: {selectedCoin.volatility})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={subVolatilityData.medium.rate.toFixed(2)}
                  onChange={(e) => onSubVolatilityChange('medium', e.target.value)}
                  className="w-24 px-3 py-2 bg-surface-dark border border-border-dark rounded-lg text-white text-right font-mono"
                  placeholder="00.00"
                />
                <span className="text-muted-text">%</span>
              </div>
            </div>
            <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-cyan rounded-full transition-all" 
                style={{ width: `${subVolatilityData.medium.rate}%` }}
              />
            </div>
          </div>

          {/* High Volatility */}
          <div className="bg-background-dark rounded-lg p-4 border border-border-dark">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-white mb-1">High Volatility</label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-text">Range:</span>
                  <input
                    type="number"
                    min={subVolatilityData.medium.range.max + 1}
                    max={selectedCoin.volatility}
                    value={subVolatilityData.high.range.min}
                    onChange={(e) => onRangeChange('high', 'min', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">-</span>
                  <input
                    type="number"
                    min={subVolatilityData.high.range.min + 1}
                    max={subVolatilityData.spike.range.min - 1}
                    value={subVolatilityData.high.range.max}
                    onChange={(e) => onRangeChange('high', 'max', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">(Max: {selectedCoin.volatility})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={subVolatilityData.high.rate.toFixed(2)}
                  onChange={(e) => onSubVolatilityChange('high', e.target.value)}
                  className="w-24 px-3 py-2 bg-surface-dark border border-border-dark rounded-lg text-white text-right font-mono"
                  placeholder="00.00"
                />
                <span className="text-muted-text">%</span>
              </div>
            </div>
            <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-400 rounded-full transition-all" 
                style={{ width: `${subVolatilityData.high.rate}%` }}
              />
            </div>
          </div>

          {/* Spike Volatility */}
          <div className="bg-background-dark rounded-lg p-4 border border-border-dark">
            <div className="flex items-center justify-between mb-3">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-white mb-1">Spike Volatility</label>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-muted-text">Range:</span>
                  <input
                    type="number"
                    min={subVolatilityData.high.range.max + 1}
                    max={selectedCoin.volatility}
                    value={subVolatilityData.spike.range.min}
                    onChange={(e) => onRangeChange('spike', 'min', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">-</span>
                  <input
                    type="number"
                    min={subVolatilityData.spike.range.min + 1}
                    max={selectedCoin.volatility}
                    value={subVolatilityData.spike.range.max}
                    onChange={(e) => onRangeChange('spike', 'max', e.target.value)}
                    className="w-16 px-2 py-1 bg-surface-dark border border-border-dark rounded text-white text-center font-mono text-xs"
                  />
                  <span className="text-xs text-muted-text">(Max: {selectedCoin.volatility})</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={subVolatilityData.spike.rate.toFixed(2)}
                  onChange={(e) => onSubVolatilityChange('spike', e.target.value)}
                  className="w-24 px-3 py-2 bg-surface-dark border border-border-dark rounded-lg text-white text-right font-mono"
                  placeholder="00.00"
                />
                <span className="text-muted-text">%</span>
              </div>
            </div>
            <div className="h-2 bg-surface-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-danger rounded-full transition-all" 
                style={{ width: `${subVolatilityData.spike.rate}%` }}
              />
            </div>
          </div>

          {/* Total Rate Display */}
          <div className="bg-background-dark rounded-lg p-4 border border-border-dark">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Total Rate</span>
              <div className="flex items-center gap-2">
                <span className={`text-lg font-bold font-mono ${
                  getTotalRate() > 100 ? 'text-danger' : getTotalRate() === 100 ? 'text-primary' : 'text-white'
                }`}>
                  {getTotalRate().toFixed(2)}%
                </span>
                {getTotalRate() > 100 && (
                  <span className="text-danger text-xs">Exceeds 100%</span>
                )}
                {getTotalRate() < 100 && (
                  <span className="text-muted-text text-xs">({(100 - getTotalRate()).toFixed(2)}% remaining)</span>
                )}
              </div>
            </div>
            <div className="h-2 bg-surface-muted rounded-full overflow-hidden mt-2">
              <div 
                className={`h-full rounded-full transition-all ${
                  getTotalRate() > 100 ? 'bg-danger' : getTotalRate() === 100 ? 'bg-primary' : 'bg-yellow-400'
                }`}
                style={{ width: `${Math.min(100, getTotalRate())}%` }}
              />
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
            disabled={getTotalRate() > 100}
            className="flex-1 px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update Sub-Volatility
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubVolatilityModal;

