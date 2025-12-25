import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const Notification = ({ message, type = 'info', onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => onClose(), 300); // Wait for fade out animation
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'bg-primary/20',
      border: 'border-primary',
      text: 'text-primary',
      icon: 'text-primary',
    },
    error: {
      bg: 'bg-danger/20',
      border: 'border-danger',
      text: 'text-danger',
      icon: 'text-danger',
    },
    warning: {
      bg: 'bg-yellow-400/20',
      border: 'border-yellow-400',
      text: 'text-yellow-400',
      icon: 'text-yellow-400',
    },
    info: {
      bg: 'bg-cyan/20',
      border: 'border-cyan',
      text: 'text-cyan',
      icon: 'text-cyan',
    },
  };

  const Icon = icons[type] || Info;
  const colorScheme = colors[type] || colors.info;

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        className={`${colorScheme.bg} ${colorScheme.border} border-2 rounded-lg p-4 shadow-2xl min-w-[300px] max-w-[500px] flex items-start gap-3 backdrop-blur-sm`}
      >
        <Icon className={`w-5 h-5 ${colorScheme.icon} flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          <p className={`${colorScheme.text} font-semibold text-sm`}>{message}</p>
        </div>
        <button
          onClick={handleClose}
          className={`${colorScheme.text} hover:opacity-70 transition-opacity flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Notification;

