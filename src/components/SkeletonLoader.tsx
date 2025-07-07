import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'card';
  lines?: number;
  height?: string;
  width?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  className = '',
  variant = 'rectangular',
  lines = 1,
  height,
  width,
}) => {
  const baseClasses = 'bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-700 dark:via-neutral-600 dark:to-neutral-700 animate-shimmer bg-[length:200%_100%]';

  if (variant === 'card') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className={`${baseClasses} h-48 rounded-2xl`} />
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 rounded w-3/4`} />
          <div className={`${baseClasses} h-4 rounded w-1/2`} />
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} h-4 rounded ${
              index === lines - 1 ? 'w-3/4' : 'w-full'
            }`}
            style={{ width: width }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'circular') {
    return (
      <div
        className={`${baseClasses} rounded-full ${className}`}
        style={{ 
          height: height || '3rem', 
          width: width || '3rem' 
        }}
      />
    );
  }

  return (
    <div
      className={`${baseClasses} rounded ${className}`}
      style={{ 
        height: height || '1rem', 
        width: width || '100%' 
      }}
    />
  );
};

export default SkeletonLoader;