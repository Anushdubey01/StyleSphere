import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Palette, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Save,
  Heart,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import { STYLE_PREFERENCES } from '../utils/constants';
import FeedbackToast from '../components/FeedbackToast';

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { preferences, updatePreferences } = useUser();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type, isVisible: true });
  };

  const handleSave = () => {
    updatePreferences(localPreferences);
    showToast('Settings saved successfully!', 'success');
  };

  const handleStyleChange = (styleId: string) => {
    setLocalPreferences(prev => ({
      ...prev,
      stylePreference: styleId
    }));
  };

  const handleColorToggle = (color: string) => {
    setLocalPreferences(prev => ({
      ...prev,
      favoriteColors: prev.favoriteColors.includes(color)
        ? prev.favoriteColors.filter(c => c !== color)
        : [...prev.favoriteColors, color]
    }));
  };

  const sections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender Preference
            </label>
            <select
              value={localPreferences.gender}
              onChange={(e) => setLocalPreferences(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="unisex">Unisex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Style Preference
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {STYLE_PREFERENCES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleChange(style.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    localPreferences.stylePreference === style.id
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: style.color }}
                    ></div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {style.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'appearance',
      title: 'Appearance',
      icon: Palette,
      content: (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Theme Preference
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Choose between light and dark mode
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isDarkMode ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg transform transition-transform ${
                  isDarkMode ? 'translate-x-8' : 'translate-x-0'
                }`}
              >
                {isDarkMode ? (
                  <Moon className="h-4 w-4 text-purple-600 absolute top-1 left-1" />
                ) : (
                  <Sun className="h-4 w-4 text-yellow-500 absolute top-1 left-1" />
                )}
              </div>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Favorite Colors
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {[
                '#000000', '#FFFFFF', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B',
                '#3B82F6', '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorToggle(color)}
                  className={`w-12 h-12 rounded-xl shadow-lg border-4 transition-all ${
                    localPreferences.favoriteColors.includes(color)
                      ? 'border-purple-500 scale-110'
                      : 'border-gray-200 dark:border-gray-600 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {localPreferences.favoriteColors.includes(color) && (
                    <Heart className="h-6 w-6 text-white mx-auto fill-current" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-6">
          {[
            {
              title: 'New Recommendations',
              description: 'Get notified when new outfit recommendations are available',
              enabled: true
            },
            {
              title: 'Trend Updates',
              description: 'Stay updated with the latest fashion trends',
              enabled: true
            },
            {
              title: 'Style Insights',
              description: 'Receive personalized style insights and tips',
              enabled: false
            },
            {
              title: 'Community Updates',
              description: 'Get notified about new features and community highlights',
              enabled: false
            }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {notification.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {notification.description}
                </p>
              </div>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notification.enabled ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-lg transform transition-transform ${
                    notification.enabled ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Data Protection
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Your privacy is important to us. All uploaded images are processed securely and are not stored permanently.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  End-to-end encryption
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Automatic data deletion after 30 days
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  No third-party data sharing
                </span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

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
              <SettingsIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Settings
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Customize your Style Sphere experience
          </p>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <section.icon className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                </div>
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <button
            onClick={handleSave}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto"
          >
            <Save className="h-5 w-5" />
            <span>Save Settings</span>
          </button>
        </motion.div>
      </div>

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

export default Settings;