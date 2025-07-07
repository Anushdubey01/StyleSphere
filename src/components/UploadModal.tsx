import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Loader2, Check, AlertCircle, Camera, FileImage } from 'lucide-react';
import { generateRecommendations } from '../utils/api';
import LoadingSpinner from './LoadingSpinner';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecommendations: (recommendations: any[]) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onRecommendations }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError(null);
    
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File size must be less than 10MB');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Please upload a valid image file (JPG, PNG, WebP)');
      } else {
        setError('Invalid file. Please try again.');
      }
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 100);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const handleGenerateRecommendations = async () => {
    if (!uploadedFile) return;

    setIsGenerating(true);
    setError(null);
    
    try {
      const recommendations = await generateRecommendations(uploadedFile);
      onRecommendations(recommendations);
      setIsComplete(true);
      
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      setError('Failed to generate recommendations. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
    setIsGenerating(false);
    setIsComplete(false);
    setError(null);
    setUploadProgress(0);
    onClose();
  };

  const removeFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
    setUploadProgress(0);
    setError(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  Upload Your Style
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mt-1">
                  Get AI-powered outfit recommendations
                </p>
              </div>
              <motion.button
                onClick={handleClose}
                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={isGenerating}
              >
                <X className="h-6 w-6 text-neutral-500" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {!uploadedFile ? (
                /* Upload Area */
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive && !isDragReject
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 scale-105'
                      : isDragReject
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                      : 'border-neutral-300 dark:border-neutral-600 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/10'
                  }`}
                >
                  <input {...getInputProps()} />
                  <motion.div 
                    className="flex flex-col items-center space-y-4"
                    animate={{ 
                      scale: isDragActive ? 1.05 : 1,
                      rotate: isDragActive ? 2 : 0 
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`p-4 rounded-full transition-colors ${
                      isDragActive && !isDragReject
                        ? 'bg-primary-200 dark:bg-primary-800'
                        : isDragReject
                        ? 'bg-red-200 dark:bg-red-800'
                        : 'bg-primary-100 dark:bg-primary-900/30'
                    }`}>
                      {isDragReject ? (
                        <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                      ) : (
                        <Upload className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                        {isDragActive 
                          ? isDragReject 
                            ? 'Invalid file type' 
                            : 'Drop your image here'
                          : 'Upload an outfit image'
                        }
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {isDragReject 
                          ? 'Please upload a valid image file'
                          : 'Drag and drop or click to select an image'
                        }
                      </p>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-neutral-500">
                      <div className="flex items-center space-x-2">
                        <ImageIcon className="h-4 w-4" />
                        <span>JPG, PNG, WebP</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileImage className="h-4 w-4" />
                        <span>Max 10MB</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : (
                /* Preview Area */
                <div className="space-y-4">
                  <div className="relative">
                    <motion.img
                      src={previewUrl!}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-2xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.button
                      onClick={removeFile}
                      className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={isGenerating}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  </div>
                  
                  {/* Upload Progress */}
                  {uploadProgress < 100 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-neutral-600 dark:text-neutral-400">Uploading...</span>
                        <span className="text-neutral-600 dark:text-neutral-400">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                        <motion.div
                          className="bg-primary-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* File Details */}
                  <motion.div 
                    className="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-3 flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <span>File Details</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Name</p>
                        <p className="text-neutral-900 dark:text-white font-medium truncate">
                          {uploadedFile.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Size</p>
                        <p className="text-neutral-900 dark:text-white font-medium">
                          {formatFileSize(uploadedFile.size)}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Type</p>
                        <p className="text-neutral-900 dark:text-white font-medium">
                          {uploadedFile.type}
                        </p>
                      </div>
                      <div>
                        <p className="text-neutral-500 dark:text-neutral-400">Status</p>
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                          Ready to analyze
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={handleClose}
                  className="flex-1 px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors font-medium"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isGenerating}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleGenerateRecommendations}
                  disabled={!uploadedFile || isGenerating || uploadProgress < 100}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-glow"
                  whileHover={{ scale: !uploadedFile || isGenerating ? 1 : 1.02 }}
                  whileTap={{ scale: !uploadedFile || isGenerating ? 1 : 0.98 }}
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" color="text-white" />
                      <span>Analyzing Style...</span>
                    </>
                  ) : isComplete ? (
                    <>
                      <Check className="h-5 w-5" />
                      <span>Complete!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Generate Recommendations</span>
                    </>
                  )}
                </motion.button>
              </div>

              {/* Tips */}
              {!uploadedFile && (
                <motion.div 
                  className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl p-4 border border-primary-200 dark:border-primary-800"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2 flex items-center space-x-2">
                    <Camera className="h-4 w-4" />
                    <span>Tips for Best Results</span>
                  </h3>
                  <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                    <li>• Use good lighting and clear image quality</li>
                    <li>• Include the full outfit in the frame</li>
                    <li>• Avoid cluttered backgrounds</li>
                    <li>• Make sure the outfit is clearly visible</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UploadModal;