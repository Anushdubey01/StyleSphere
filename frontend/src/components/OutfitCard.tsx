import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Share2, Bookmark, Star, Eye, MoreHorizontal, X } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import SkeletonLoader from './SkeletonLoader';

interface OutfitCardProps {
  outfit: {
    id: number;
    image: string;
    confidence: number;
    tags: string[];
    title: string;
    description: string;
    brand?: string;
    price?: string;
  };
  onShare?: (id: number) => void;
  className?: string;
  showActions?: boolean;
}

const OutfitCard: React.FC<OutfitCardProps> = ({ 
  outfit, 
  onShare, 
  className = '',
  showActions = true 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { toggleLike, toggleSave, isLiked, isSaved } = useUser();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLike(outfit.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSave(outfit.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.(outfit.id);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
    if (confidence >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/30';
    if (confidence >= 70) return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
    return 'text-red-600 bg-red-100 dark:bg-red-900/30';
  };

  const liked = isLiked(outfit.id);
  const saved = isSaved(outfit.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className={`card-interactive cursor-pointer transition-all duration-300 ${className}`}
        onClick={() => setShowDetails(true)}
      >
        <div className="relative overflow-hidden">
          {/* Image Container */}
          <div className="aspect-photo bg-surface-200 dark:bg-neutral-700 relative">
            {isLoading && (
              <div className="absolute inset-0">
                <SkeletonLoader variant="rectangular" className="w-full h-full rounded-none" />
              </div>
            )}
            <motion.img
              src={outfit.image}
              alt={outfit.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onLoad={() => setIsLoading(false)}
              initial={{ scale: 1.1 }}
              animate={{ scale: isLoading ? 1.1 : 1 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Confidence Badge */}
          <motion.div 
            className="absolute top-4 right-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ${getConfidenceColor(outfit.confidence)}`}>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 fill-current" />
                <span>{outfit.confidence}%</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <AnimatePresence>
            {showActions && isHovered && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-4 left-4 flex flex-col space-y-2"
              >
                <motion.button
                  onClick={handleLike}
                  className={`btn-icon ${
                    liked 
                      ? 'bg-red-500 text-white shadow-lg' 
                      : 'bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-red-500 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={liked ? 'Unlike outfit' : 'Like outfit'}
                >
                  <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                </motion.button>
                
                <motion.button
                  onClick={handleSave}
                  className={`btn-icon ${
                    saved 
                      ? 'bg-primary-500 text-white shadow-lg' 
                      : 'bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-primary-500 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={saved ? 'Unsave outfit' : 'Save outfit'}
                >
                  <Bookmark className={`h-4 w-4 ${saved ? 'fill-current' : ''}`} />
                </motion.button>
                
                <motion.button
                  onClick={handleShare}
                  className="btn-icon bg-white/90 dark:bg-neutral-800/90 text-neutral-700 dark:text-neutral-300 hover:bg-blue-500 hover:text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Share outfit"
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick View Button */}
          <AnimatePresence>
            {isHovered && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-xl text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-200 flex items-center space-x-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDetails(true);
                }}
              >
                <Eye className="h-4 w-4" />
                <span>Quick View</span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="heading-4 mb-1 truncate">
                {outfit.title}
              </h3>
              <p className="body-base line-clamp-2">
                {outfit.description}
              </p>
            </div>
            <button className="btn-icon ml-2">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          {/* Brand and Price */}
          {(outfit.brand || outfit.price) && (
            <div className="flex items-center justify-between mb-4 text-sm">
              {outfit.brand && (
                <span className="body-small">{outfit.brand}</span>
              )}
              {outfit.price && (
                <span className="font-semibold text-neutral-900 dark:text-white">{outfit.price}</span>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {outfit.tags.slice(0, 3).map((tag, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-2.5 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium"
              >
                #{tag}
              </motion.span>
            ))}
            {outfit.tags.length > 3 && (
              <span className="px-2.5 py-1 bg-surface-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full font-medium">
                +{outfit.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 safe-area"
            onClick={() => setShowDetails(false)}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative card-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="heading-3">
                    {outfit.title}
                  </h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="btn-icon"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="aspect-photo rounded-2xl overflow-hidden">
                    <img
                      src={outfit.image}
                      alt={outfit.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="heading-4 mb-3">
                        Description
                      </h3>
                      <p className="body-base">
                        {outfit.description}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="heading-4 mb-3">
                        AI Confidence
                      </h3>
                      <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-semibold ${getConfidenceColor(outfit.confidence)}`}>
                        <Star className="h-4 w-4 fill-current" />
                        <span>{outfit.confidence}% Match</span>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="heading-4 mb-3">
                        Style Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {outfit.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm rounded-full font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default OutfitCard;