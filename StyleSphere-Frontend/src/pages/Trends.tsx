import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Filter, Calendar, Users, Sparkles, ArrowUp, ArrowDown } from 'lucide-react';
import TrendGraph from '../components/TrendGraph';
import { fetchTrendData } from '../utils/api';

const Trends: React.FC = () => {
  const [trendData, setTrendData] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendData = async () => {
      try {
        const data = await fetchTrendData();
        setTrendData(data);
      } catch (error) {
        console.error('Error loading trend data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendData();
  }, []);

  const filters = [
    { id: 'all', label: 'All Trends' },
    { id: 'seasonal', label: 'Seasonal' },
    { id: 'colors', label: 'Colors' },
    { id: 'categories', label: 'Categories' },
    { id: 'brands', label: 'Brands' }
  ];

  const trendingItems = [
    {
      title: 'Oversized Blazers',
      change: '+23%',
      trend: 'up',
      category: 'Formal',
      color: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Neutral Tones',
      change: '+18%',
      trend: 'up',
      category: 'Colors',
      color: 'from-blue-600 to-teal-600'
    },
    {
      title: 'Sustainable Fabrics',
      change: '+15%',
      trend: 'up',
      category: 'Materials',
      color: 'from-green-600 to-emerald-600'
    },
    {
      title: 'Bold Accessories',
      change: '+12%',
      trend: 'up',
      category: 'Accessories',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      title: 'Vintage Denim',
      change: '-5%',
      trend: 'down',
      category: 'Casual',
      color: 'from-gray-600 to-slate-600'
    },
    {
      title: 'Neon Colors',
      change: '-8%',
      trend: 'down',
      category: 'Colors',
      color: 'from-red-600 to-pink-600'
    }
  ];

  const colorTrends = [
    { name: 'Sage Green', hex: '#9CAF88', popularity: 94 },
    { name: 'Warm Beige', hex: '#F5E6D3', popularity: 89 },
    { name: 'Ocean Blue', hex: '#4A90E2', popularity: 85 },
    { name: 'Terracotta', hex: '#E27D4A', popularity: 78 },
    { name: 'Lavender', hex: '#B19CD9', popularity: 72 },
    { name: 'Charcoal', hex: '#36454F', popularity: 68 }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading trend data...</p>
        </div>
      </div>
    );
  }

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
              <TrendingUp className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Fashion Trends
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay ahead of the curve with real-time fashion insights and trend analysis
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-4 mb-8"
        >
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">Filter by:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 rounded-full transition-all ${
                selectedFilter === filter.id
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <TrendGraph title="Fashion Trend Analysis" />
        </motion.div>

        {/* Trending Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Hot Trends */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Hot Trends
              </h2>
            </div>
            <div className="space-y-4">
              {trendingItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`font-semibold ${
                      item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Color Trends */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full"></div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Color Trends
              </h2>
            </div>
            <div className="space-y-4">
              {colorTrends.map((color, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-8 h-8 rounded-full shadow-lg"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {color.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {color.hex}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full">
                      <div
                        className="h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                        style={{ width: `${color.popularity}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {color.popularity}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Seasonal Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="h-6 w-6" />
            <h2 className="text-2xl font-semibold">Seasonal Insights</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendData?.seasonalTrends?.map((trend: string, index: number) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm opacity-90">Popular</span>
                </div>
                <h3 className="font-semibold text-lg">{trend}</h3>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Trends;