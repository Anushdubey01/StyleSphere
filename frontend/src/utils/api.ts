export const generateRecommendations = async (imageFile: File): Promise<any[]> => {
  // Simulate API call with delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock recommendations based on uploaded image
  return [
    {
      id: Date.now(),
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300',
      confidence: Math.floor(Math.random() * 20) + 80,
      tags: ['ai-generated', 'personalized', 'trendy'],
      title: 'AI Curated Look',
      description: 'Based on your uploaded style'
    },
    {
      id: Date.now() + 1,
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
      confidence: Math.floor(Math.random() * 20) + 75,
      tags: ['similar-style', 'recommended', 'popular'],
      title: 'Similar Style Match',
      description: 'Users with similar taste loved this'
    }
  ];
};

export const fetchTrendData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    topColors: ['#8B5CF6', '#14B8A6', '#F59E0B', '#EF4444'],
    topCategories: ['Minimalist', 'Streetwear', 'Formal', 'Vintage'],
    seasonalTrends: ['Oversized blazers', 'Neutral tones', 'Sustainable fabrics', 'Bold accessories']
  };
};