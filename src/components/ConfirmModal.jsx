import { AlertTriangle, X } from 'lucide-react';
import React from 'react';

const ConfirmModal = ({ isOpen, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, type = 'warning' }) => {
  if (!isOpen) return null;

  const colors = {
    warning: {
      bg: 'bg-yellow-400/20',
      border: 'border-yellow-400',
      text: 'text-yellow-400',
      button: 'bg-yellow-400 hover:bg-yellow-400/80 text-background-dark',
    },
    danger: {
      bg: 'bg-danger/20',
      border: 'border-danger',
      text: 'text-danger',
      button: 'bg-danger hover:bg-danger/80 text-white',
    },
    info: {
      bg: 'bg-cyan/20',
      border: 'border-cyan',
      text: 'text-cyan',
      button: 'bg-cyan hover:bg-cyan/80 text-background-dark',
    },
  };

  const colorScheme = colors[type] || colors.warning;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div 
          className={`bg-surface-dark ${colorScheme.border} border-2 rounded-xl p-6 w-full max-w-md shadow-2xl`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start gap-4">
            <div className={`${colorScheme.bg} rounded-full p-3 flex-shrink-0`}>
              <AlertTriangle className={`w-6 h-6 ${colorScheme.text}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
              <p className="text-muted-text mb-6">{message}</p>
              <div className="flex gap-3">
                <button
                  onClick={onCancel}
                  className="flex-1 px-4 py-2 bg-surface-muted text-white rounded-lg hover:bg-surface-muted/80 transition-colors"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`flex-1 px-4 py-2 ${colorScheme.button} font-semibold rounded-lg transition-all`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-muted-text hover:text-white transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;

