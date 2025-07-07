import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Heart,
  Camera,
  ArrowRight,
  Sparkles,
  Star,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';
import OutfitCard from '../components/OutfitCard';
import UploadModal from '../components/UploadModal';
import FeedbackToast from '../components/FeedbackToast';
import { MOCK_RECOMMENDATIONS } from '../utils/constants';
import { useUser } from '../contexts/UserContext';

const Dashboard: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const { recommendations, setRecommendations } = useUser();

  const displayRecommendations = recommendations.length > 0 ? recommendations : MOCK_RECOMMENDATIONS;

  const handleUploadSuccess = (newRecommendations: any[]) => {
    setRecommendations(newRecommendations);
    showToast('Recommendations generated successfully!', 'success');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const handleOutfitAction = (action: string, outfitId: number) => {
    const actions = {
      like: 'Outfit liked!',
      save: 'Outfit saved to favorites!',
      share: 'Outfit shared successfully!'
    };
    showToast(actions[action as keyof typeof actions], 'success');
  };

  const stats = [
    { 
      label: 'Recommendations', 
      value: '234', 
      icon: Sparkles, 
      color: 'from-purple-600 to-pink-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Liked Outfits', 
      value: '89', 
      icon: Heart, 
      color: 'from-pink-600 to-rose-600',
      change: '+8%',
      trend: 'up'
    },
    { 
      label: 'Trends Followed', 
      value: '12', 
      icon: TrendingUp, 
      color: 'from-blue-600 to-teal-600',
      change: '+3%',
      trend: 'up'
    },
    { 
      label: 'Style Score', 
      value: '92%', 
      icon: Star, 
      color: 'from-yellow-500 to-orange-500',
      change: '+5%',
      trend: 'up'
    }
  ];

  const quickActions = [
    {
      title: 'Upload New Outfit',
      description: 'Get AI-powered style recommendations',
      icon: Camera,
      color: 'from-purple-600 to-pink-600',
      action: () => setIsUploadModalOpen(true)
    },
    {
      title: 'Explore Trends',
      description: 'Discover what\'s trending now',
      icon: TrendingUp,
      color: 'from-blue-600 to-teal-600',
      action: () => {}
    },
    {
      title: 'Style Analytics',
      description: 'View your fashion insights',
      icon: BarChart3,
      color: 'from-emerald-600 to-cyan-600',
      action: () => {}
    },
    {
      title: 'Personal Stylist',
      description: 'Get expert fashion advice',
      icon: Target,
      color: 'from-orange-600 to-red-600',
      action: () => {}
    }
  ];

  const trendingStyles = [
    { name: 'Minimalist Chic', growth: '+23%', color: 'bg-purple-500' },
    { name: 'Vintage Denim', growth: '+18%', color: 'bg-blue-500' },
    { name: 'Monochrome Magic', growth: '+15%', color: 'bg-neutral-500' },
    { name: 'Sustainable Fashion', growth: '+12%', color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-neutral-900">
      <div className="max-w-8xl mx-auto container-padding section-spacing">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="heading-2 mb-4">
            Your Style Dashboard
          </h1>
          <p className="body-large">
            Discover, create, and perfect your unique style
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card-interactive p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {stat.change}
                  </div>
                </div>
              </div>
              <div>
                <p className="body-small mb-1">
                  {stat.label}
                </p>
                <p className="heading-3">
                  {stat.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-8 mb-12"
        >
          <div className="flex items-center space-x-3 mb-8">
            <Zap className="h-6 w-6 text-primary-600" />
            <h2 className="heading-4">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.button
                key={index}
                onClick={action.action}
                className={`p-6 bg-gradient-to-r ${action.color} text-white rounded-2xl hover:scale-105 transition-all duration-300 text-left group`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <action.icon className="h-8 w-8 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold mb-2">{action.title}</h3>
                <p className="text-sm opacity-90">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Recommendations Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-4">
                {recommendations.length > 0 ? 'Your AI Recommendations' : 'Suggested Outfits'}
              </h2>
              <button className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                <span className="body-small font-medium">View All</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {displayRecommendations.slice(0, 4).map((outfit, index) => (
                <motion.div
                  key={outfit.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <OutfitCard
                    outfit={outfit}
                    onShare={(id) => handleOutfitAction('share', id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trending Styles Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-8"
          >
            {/* Trending This Week */}
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                <h3 className="heading-4">Trending This Week</h3>
              </div>
              <div className="space-y-4">
                {trendingStyles.map((trend, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-surface-100 dark:bg-neutral-700 rounded-xl hover:bg-surface-200 dark:hover:bg-neutral-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 ${trend.color} rounded-full`}></div>
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {trend.name}
                      </span>
                    </div>
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                      {trend.growth}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Style Insights */}
            <div className="card p-6">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="h-5 w-5 text-primary-600" />
                <h3 className="heading-4">Style Insights</h3>
              </div>
              <div className="space-y-4">
                <div className="text-center p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    92%
                  </div>
                  <div className="body-small">
                    Style Match Score
                  </div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                    +5% this week
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="body-small">Casual</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-surface-200 dark:bg-neutral-700 rounded-full">
                        <div className="w-3/4 h-2 bg-primary-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-neutral-500">75%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-small">Formal</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-surface-200 dark:bg-neutral-700 rounded-full">
                        <div className="w-1/2 h-2 bg-secondary-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-neutral-500">50%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="body-small">Trendy</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-surface-200 dark:bg-neutral-700 rounded-full">
                        <div className="w-5/6 h-2 bg-accent-500 rounded-full"></div>
                      </div>
                      <span className="text-xs text-neutral-500">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onRecommendations={handleUploadSuccess}
      />

      {/* Toast Notifications */}
      <FeedbackToast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default Dashboard;