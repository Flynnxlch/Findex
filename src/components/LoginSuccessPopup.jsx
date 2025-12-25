import { CheckCircle } from 'lucide-react';
import React, { useEffect } from 'react';

const LoginSuccessPopup = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[80]"
        onClick={onClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
        <div 
          className="bg-surface-dark border border-border-dark rounded-xl p-8 w-full max-w-md shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Welcome Back!</h3>
            <p className="text-muted-text mb-6">You have successfully logged in to your account.</p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary hover:bg-primary-hover text-background-dark font-semibold rounded-lg transition-all"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSuccessPopup;

