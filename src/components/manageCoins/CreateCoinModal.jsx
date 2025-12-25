import { ArrowLeft, ArrowRight, Check, Upload, X } from 'lucide-react';
import React, { useState } from 'react';

const CreateCoinModal = ({ formData, onFormChange, onImageChange, onRemoveImage, onClose, onCreate }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Constants
  const BASE_SIGMA = 0.008;
  const FLOOR_PRICE = 0.0001;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    onCreate();
  };

  const canProceedStep1 = () => {
    return formData.name && formData.symbol && (formData.iconImage || formData.iconColor);
  };

  const canProceedStep2 = () => {
    return formData.initialPrice && formData.volatility;
  };

  // Step 1: Coin Name, Symbol, Icon
  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">Coin Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g., Bitcoin"
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
            className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g., BTC"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-muted-text mb-2">Coin Icon</label>
        <div className="flex items-start gap-4">
          {/* Preview */}
          <div className="flex-shrink-0">
            <p className="text-xs text-muted-text mb-2">Preview</p>
            {formData.iconImage ? (
              <div className="relative">
                <img 
                  src={formData.iconImage} 
                  alt="Coin icon preview"
                  className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-danger rounded-full flex items-center justify-center hover:bg-danger/80 transition-colors"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ) : (
              <div className={`${formData.iconColor || 'bg-primary'} w-20 h-20 rounded-full flex items-center justify-center border-2 border-border-dark`}>
                <span className="text-white font-bold text-2xl">
                  {formData.iconLetter || formData.symbol?.[0] || '?'}
                </span>
              </div>
            )}
          </div>

          {/* Upload/Select */}
          <div className="flex-1 space-y-3">
            <div>
              <label className="block text-xs text-muted-text mb-2">Upload Icon Image (Optional)</label>
              {formData.iconImage ? (
                <div className="px-4 py-3 bg-background-dark border border-border-dark rounded-lg">
                  <p className="text-sm text-muted-text">Image uploaded</p>
                </div>
              ) : (
                <label className="flex items-center gap-2 px-4 py-3 bg-background-dark border border-border-dark rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Upload className="w-5 h-5 text-muted-text" />
                  <span className="text-muted-text text-sm">Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                  />
                </label>
              )}
              <p className="text-xs text-muted-text mt-1">JPG, PNG or WEBP. Max size 2MB</p>
            </div>
            
            <div>
              <label className="block text-xs text-muted-text mb-2">Or Select Icon Color (if no image)</label>
              <select
                value={formData.iconColor}
                onChange={(e) => onFormChange({ ...formData, iconColor: e.target.value })}
                className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="bg-primary">Primary (Green)</option>
                <option value="bg-yellow-400">Yellow</option>
                <option value="bg-purple-500">Purple</option>
                <option value="bg-cyan">Cyan</option>
                <option value="bg-blue-500">Blue</option>
                <option value="bg-pink-500">Pink</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Initial Volatility, Initial Price, System Parameters
  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">Initial Price</label>
          <input
            type="number"
            value={formData.initialPrice}
            onChange={(e) => onFormChange({ ...formData, initialPrice: e.target.value })}
            className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="e.g., 45000"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-muted-text mb-2">Initial Volatility (1-100)</label>
          <input
            type="number"
            min="1"
            max="100"
            value={formData.volatility}
            onChange={(e) => onFormChange({ ...formData, volatility: e.target.value })}
            className="w-full px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
            placeholder="50"
          />
        </div>
      </div>

      {/* System Parameters (Read-only) */}
      <div className="bg-surface-muted/30 border border-border-dark rounded-lg p-4">
        <p className="text-xs font-semibold text-muted-text uppercase mb-3">System Parameters (Fixed)</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-muted-text mb-1">Base Sigma</label>
            <div className="px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white font-mono text-sm">
              {BASE_SIGMA}
            </div>
            <p className="text-xs text-muted-text mt-1">Base sigma constant for price movement algorithm</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-text mb-1">Floor Price</label>
            <div className="px-4 py-2 bg-background-dark border border-border-dark rounded-lg text-white font-mono text-sm">
              {FLOOR_PRICE}
            </div>
            <p className="text-xs text-muted-text mt-1">Minimum price to prevent zero or negative prices</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 3: Confirmation
  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="bg-surface-muted/30 border border-border-dark rounded-lg p-4">
        <p className="text-sm font-semibold text-white mb-4">Coin Information Summary</p>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {formData.iconImage ? (
                <img 
                  src={formData.iconImage} 
                  alt="Coin icon"
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className={`${formData.iconColor || 'bg-primary'} w-16 h-16 rounded-full flex items-center justify-center border-2 border-border-dark`}>
                  <span className="text-white font-bold text-xl">
                    {formData.iconLetter || formData.symbol?.[0] || '?'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">{formData.name}</p>
              <p className="text-muted-text font-mono">{formData.symbol}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border-dark">
            <div>
              <p className="text-xs text-muted-text mb-1">Initial Price</p>
              <p className="text-white font-mono font-semibold">
                ${parseFloat(formData.initialPrice || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-text mb-1">Initial Volatility</p>
              <p className="text-white font-semibold">{formData.volatility || 50}</p>
            </div>
            <div>
              <p className="text-xs text-muted-text mb-1">Base Sigma</p>
              <p className="text-white font-mono text-sm">{BASE_SIGMA}</p>
            </div>
            <div>
              <p className="text-xs text-muted-text mb-1">Floor Price</p>
              <p className="text-white font-mono text-sm">{FLOOR_PRICE}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-text">
        <Check className="w-4 h-4 text-primary" />
        <span>Please review the information above before uploading to market</span>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-surface-dark border border-border-dark rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-white mb-2">Create New Coin</h3>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((step) => (
              <React.Fragment key={step}>
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm transition-colors ${
                  currentStep === step
                    ? 'bg-primary text-background-dark'
                    : currentStep > step
                    ? 'bg-primary/50 text-white'
                    : 'bg-surface-muted text-muted-text'
                }`}>
                  {currentStep > step ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < totalSteps && (
                  <div className={`flex-1 h-1 rounded ${
                    currentStep > step ? 'bg-primary' : 'bg-surface-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-6 min-h-[300px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-3 items-center">
          {currentStep > 1 && (
            <button
              onClick={handlePrevious}
              className="flex items-center gap-2 px-4 py-2 bg-surface-muted text-white rounded-lg hover:bg-surface-muted/80 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-danger hover:bg-danger/80 text-white font-semibold rounded-lg transition-colors"
          >
            Cancel
          </button>
          {currentStep < totalSteps ? (
            <button
              onClick={handleNext}
              disabled={!((currentStep === 1 && canProceedStep1()) || (currentStep === 2 && canProceedStep2()))}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all ml-auto"
            >
              <Upload className="w-4 h-4" />
              Upload to Market
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCoinModal;
