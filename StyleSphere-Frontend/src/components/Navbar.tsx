import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Upload, 
  TrendingUp, 
  Settings, 
  Menu, 
  X, 
  Sun, 
  Moon,
  Sparkles,
  User,
  LogOut,
  Bell,
  Search,
  ChevronDown
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { profile } = useUser();
  const location = useLocation();
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/trends', label: 'Trends', icon: TrendingUp },
    { path: '/settings', label: 'Settings', icon: Settings }
  ];

  const notifications = [
    { id: 1, title: 'New recommendations available', time: '2 min ago', unread: true },
    { id: 2, title: 'Trending: Oversized blazers', time: '1 hour ago', unread: true },
    { id: 3, title: 'Your style analysis is ready', time: '3 hours ago', unread: false },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="glass-effect sticky top-0 z-50 transition-all duration-300 safe-area">
      <div className="max-w-8xl mx-auto container-padding">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div 
              className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2.5 lg:p-3 rounded-2xl shadow-medium group-hover:shadow-glow transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
            </motion.div>
            <span className="text-xl lg:text-2xl font-bold gradient-text">
              Style Sphere
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search styles, trends, colors..."
                className="input-field pl-12 pr-4 py-3 text-sm"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-soft'
                      : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="btn-icon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5 text-neutral-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <motion.button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="btn-icon relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {notifications.some(n => n.unread) && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                )}
              </motion.button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-3 w-80 card-elevated max-h-96 overflow-hidden"
                  >
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                      <h3 className="font-semibold text-neutral-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto scrollbar-hide">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors cursor-pointer ${
                            notification.unread ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                                {notification.title}
                              </p>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 bg-neutral-50 dark:bg-neutral-700/50">
                      <button className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <motion.button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-8 w-8 lg:h-9 lg:w-9 rounded-xl object-cover"
                />
                <ChevronDown className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${
                  isProfileOpen ? 'rotate-180' : ''
                }`} />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    className="absolute right-0 mt-3 w-64 card-elevated overflow-hidden"
                  >
                    <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
                      <div className="flex items-center space-x-3">
                        <img
                          src={profile.avatar}
                          alt={profile.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">
                            {profile.name}
                          </p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">
                            {profile.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/settings"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">Profile Settings</span>
                      </Link>
                      <button className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors w-full text-left">
                        <LogOut className="h-4 w-4 text-neutral-500" />
                        <span className="text-sm text-neutral-700 dark:text-neutral-300">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden btn-icon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-effect border-t border-neutral-200 dark:border-neutral-700 overflow-hidden"
          >
            <div className="container-padding py-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search styles, trends, colors..."
                  className="input-field pl-12 pr-4 py-3 text-sm"
                />
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;