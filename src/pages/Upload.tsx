import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, Upload as UploadIcon, Image, ArrowRight } from 'lucide-react';
import UploadModal from '../components/UploadModal';
import OutfitCard from '../components/OutfitCard';
import { useUser } from '../contexts/UserContext';

const Upload: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { recommendations, setRecommendations } = useUser();
  const navigate = useNavigate();

  const handleUploadSuccess = (newRecommendations: any[]) => {
    setRecommendations(newRecommendations);
  };

  const demoImages = [
    {
      title: 'Casual Streetwear',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Modern urban style'
    },
    {
      title: 'Business Formal',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Professional office look'
    },
    {
      title: 'Vintage Classic',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Timeless retro appeal'
    }
  ];

  const handleDemoUpload = (demoImage: any) => {
    const mockRecommendations = [
      {
        id: Date.now(),
        image: demoImage.image,
        confidence: 94,
        tags: ['demo', 'similar-style', 'recommended'],
        title: `Style Match for ${demoImage.title}`,
        description: 'AI-generated recommendation based on demo image'
      },
      {
        id: Date.now() + 1,
        image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
        confidence: 87,
        tags: ['complementary', 'trendy', 'popular'],
        title: 'Complementary Style',
        description: 'Perfect match for your aesthetic'
      }
    ];
    setRecommendations(mockRecommendations);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-3xl shadow-2xl">
              <Camera className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Your Style
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share your outfit and get personalized AI recommendations. 
            Our style algorithm will analyze your look and suggest similar styles.
          </p>
        </motion.div>

        {/* Upload Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Upload Your Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-6 rounded-2xl mb-6 inline-block">
                <UploadIcon className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Upload Your Photo
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Take a photo of your outfit or upload from your gallery to get personalized recommendations.
              </p>
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Camera className="h-5 w-5" />
                <span>Choose Photo</span>
              </button>
            </div>
          </motion.div>

          {/* Try Demo Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <div className="text-center mb-6">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-2xl mb-6 inline-block">
                <Image className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Try Demo Images
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Not ready to upload? Try our demo images to see how Style Sphere works.
              </p>
            </div>
            
            <div className="space-y-3">
              {demoImages.map((demo, index) => (
                <button
                  key={index}
                  onClick={() => handleDemoUpload(demo)}
                  className="w-full flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors group"
                >
                  <img
                    src={demo.image}
                    alt={demo.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {demo.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {demo.description}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" />
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Recommendations */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Your Latest Recommendations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendations.map((outfit, index) => (
                <motion.div
                  key={outfit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <OutfitCard outfit={outfit} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 border border-purple-200 dark:border-purple-800"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Tips for Better Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Good Lighting</h3>
                  <p className="text-gray-600 dark:text-gray-300">Take photos in natural light for best results</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Full Outfit</h3>
                  <p className="text-gray-600 dark:text-gray-300">Include the complete outfit for comprehensive analysis</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Clear Background</h3>
                  <p className="text-gray-600 dark:text-gray-300">Simple backgrounds help our AI focus on your style</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">High Quality</h3>
                  <p className="text-gray-600 dark:text-gray-300">Upload high-resolution images for detailed analysis</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onRecommendations={handleUploadSuccess}
      />
    </div>
  );
};

export default Upload;