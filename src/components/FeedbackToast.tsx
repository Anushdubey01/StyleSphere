import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, AlertCircle, Info, CheckCircle, XCircle } from 'lucide-react';

interface FeedbackToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center';
}

const FeedbackToast: React.FC<FeedbackToastProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 4000,
  position = 'top-right'
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, duration]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  const getColorClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500 text-white border-emerald-600';
      case 'error':
        return 'bg-red-500 text-white border-red-600';
      case 'warning':
        return 'bg-amber-500 text-white border-amber-600';
      case 'info':
        return 'bg-blue-500 text-white border-blue-600';
      default:
        return 'bg-neutral-500 text-white border-neutral-600';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'top-4 right-4';
    }
  };

  const getAnimationProps = () => {
    const isTop = position.includes('top');
    const isRight = position.includes('right');
    const isLeft = position.includes('left');
    const isCenter = position.includes('center');

    let x = 0;
    let y = isTop ? -100 : 100;

    if (isRight) x = 100;
    if (isLeft) x = -100;
    if (isCenter) x = 0;

    return {
      initial: { opacity: 0, x, y, scale: 0.9 },
      animate: { opacity: 1, x: 0, y: 0, scale: 1 },
      exit: { opacity: 0, x, y: y / 2, scale: 0.9 }
    };
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...getAnimationProps()}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4 
          }}
          className={`fixed ${getPositionClasses()} z-50 max-w-sm w-full`}
        >
          <div className={`${getColorClasses()} px-4 py-3 rounded-xl shadow-large border backdrop-blur-sm flex items-center space-x-3`}>
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <p className="text-sm font-medium flex-1 pr-2">{message}</p>
            <motion.button
              onClick={onClose}
              className="flex-shrink-0 hover:opacity-70 transition-opacity p-1 rounded-md hover:bg-white/10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>
          
          {/* Progress bar */}
          {duration > 0 && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-xl"
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackToast;