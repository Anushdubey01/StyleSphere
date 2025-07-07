import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Camera, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Check,
  Star,
  Heart,
  Zap,
  Shield,
  Palette,
  Brain
} from 'lucide-react';

const Landing: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  // SVG pattern for background
  const dotPatternSvg = "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced computer vision analyzes your style preferences and suggests perfect matches.',
      color: 'from-purple-600 to-pink-600'
    },
    {
      icon: Camera,
      title: 'Smart Style Matching',
      description: 'Upload any outfit and get instant recommendations tailored to your unique taste.',
      color: 'from-blue-600 to-teal-600'
    },
    {
      icon: TrendingUp,
      title: 'Trend Forecasting',
      description: 'Stay ahead with real-time fashion trends and personalized style forecasts.',
      color: 'from-emerald-600 to-cyan-600'
    },
    {
      icon: Users,
      title: 'Community Insights',
      description: 'Connect with fashion enthusiasts and discover styles loved by your peers.',
      color: 'from-orange-600 to-red-600'
    },
    {
      icon: Palette,
      title: 'Color Harmony',
      description: 'Discover perfect color combinations that complement your skin tone and style.',
      color: 'from-pink-600 to-rose-600'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your images are processed securely and never stored permanently.',
      color: 'from-indigo-600 to-purple-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Fashion Blogger',
      content: 'Style Sphere completely transformed how I curate outfits. The AI recommendations are incredibly accurate and always surprise me with new combinations I never would have thought of.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Marcus Johnson',
      role: 'Creative Director',
      content: 'Finally, a platform that truly understands personal style. The trend insights have been game-changing for my work, and the interface is absolutely beautiful.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Style Enthusiast',
      content: 'I love how Style Sphere learns from my preferences. Every recommendation feels personally curated, and I\'ve discovered so many new styles I absolutely adore.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Users' },
    { number: '1M+', label: 'Outfits Analyzed' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'AI Availability' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-purple-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 dark:opacity-10"
          animate={{
            x: mousePosition.x * -0.02,
            y: mousePosition.y * -0.02,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative section-spacing container-padding">
        <div className="max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              className="flex justify-center mb-12"
              style={{ y: y1 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-primary-600 to-secondary-600 p-8 rounded-4xl shadow-2xl"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(168, 85, 247, 0.4)"
                }}
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  rotate: { duration: 6, repeat: Infinity },
                  scale: { duration: 4, repeat: Infinity }
                }}
              >
                <Sparkles className="h-16 w-16 lg:h-20 lg:w-20 text-white" />
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="heading-1 mb-8 text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your AI Fashion
              <motion.span 
                className="block gradient-text"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Assistant
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className="body-large mb-12 max-w-4xl mx-auto text-balance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Discover your perfect style with AI-powered recommendations. Upload your outfits, 
              explore trends, and get personalized fashion insights that match your unique taste.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/upload"
                  className="btn-primary text-lg px-8 py-4 space-x-3"
                >
                  <Zap className="h-6 w-6" />
                  <span>Get Started</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/trends"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Explore Trends
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="heading-3 gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="body-small font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-spacing container-padding relative">
        <motion.div style={{ y: y2 }} className="max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="heading-2 mb-8 text-balance">
              Why Choose Style Sphere?
            </h2>
            <p className="body-large max-w-3xl mx-auto text-balance">
              Experience the future of fashion with cutting-edge AI technology and personalized insights
            </p>
          </motion.div>

          <div className="grid grid-auto-fit gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card-interactive p-8 group"
              >
                <motion.div 
                  className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <h3 className="heading-4 mb-4">
                  {feature.title}
                </h3>
                <p className="body-base text-pretty">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section className="section-spacing container-padding glass-effect">
        <div className="max-w-8xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="heading-2 mb-8 text-balance">
              Loved by Fashion Enthusiasts
            </h2>
            <p className="body-large max-w-3xl mx-auto text-balance">
              See what our users have to say about their Style Sphere experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card-interactive p-8"
              >
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="body-base mb-6 italic text-pretty">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-primary-600 dark:text-primary-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-spacing container-padding">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-4xl p-12 lg:p-16 shadow-2xl relative overflow-hidden"
          >
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className={`absolute inset-0 bg-[url('${dotPatternSvg}')]`} />
            </div>
            
            <motion.div
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="relative z-10"
            >
              <h2 className="heading-2 text-white mb-8 text-balance">
                Ready to Transform Your Style?
              </h2>
              <p className="body-large text-white/90 mb-12 max-w-2xl mx-auto text-balance">
                Join thousands of fashion enthusiasts already using Style Sphere to discover their perfect look
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-2xl font-semibold shadow-large hover:shadow-glow transform transition-all duration-300 space-x-3 text-lg"
                >
                  <Heart className="h-6 w-6" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;