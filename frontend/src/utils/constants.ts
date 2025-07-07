export const STYLE_PREFERENCES = [
  { id: 'modern', label: 'Modern Minimalist', color: '#8B5CF6' },
  { id: 'vintage', label: 'Vintage Classic', color: '#F59E0B' },
  { id: 'streetwear', label: 'Urban Streetwear', color: '#EF4444' },
  { id: 'formal', label: 'Business Formal', color: '#1F2937' },
  { id: 'bohemian', label: 'Bohemian Chic', color: '#14B8A6' },
  { id: 'athletic', label: 'Athletic Wear', color: '#10B981' }
];

export const FASHION_TRENDS = [
  { month: 'Jan', minimalist: 65, vintage: 45, streetwear: 78, formal: 34 },
  { month: 'Feb', minimalist: 70, vintage: 50, streetwear: 82, formal: 38 },
  { month: 'Mar', minimalist: 75, vintage: 55, streetwear: 85, formal: 42 },
  { month: 'Apr', minimalist: 80, vintage: 60, streetwear: 88, formal: 46 },
  { month: 'May', minimalist: 85, vintage: 65, streetwear: 90, formal: 50 },
  { month: 'Jun', minimalist: 90, vintage: 70, streetwear: 92, formal: 54 }
];

export const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=300',
    confidence: 95,
    tags: ['minimalist', 'modern', 'casual'],
    title: 'Modern Casual Look',
    description: 'Perfect for weekend outings'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300',
    confidence: 88,
    tags: ['formal', 'business', 'professional'],
    title: 'Business Professional',
    description: 'Ideal for office meetings'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300',
    confidence: 92,
    tags: ['streetwear', 'urban', 'trendy'],
    title: 'Urban Streetwear',
    description: 'On-trend city style'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    confidence: 85,
    tags: ['vintage', 'retro', 'classic'],
    title: 'Vintage Classic',
    description: 'Timeless vintage appeal'
  }
];