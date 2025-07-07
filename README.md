# StyleSphere 🌟

**StyleSphere** is an AI-powered fashion recommendation platform that revolutionizes personal styling through intelligent outfit analysis and personalized recommendations. Built with modern web technologies, it combines computer vision, trend analysis, and user preferences to deliver a seamless fashion discovery experience.

![StyleSphere Banner](https://img.shields.io/badge/StyleSphere-AI%20Fashion%20Assistant-purple?style=for-the-badge&logo=sparkles)

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Style Analysis**: Upload outfit photos and receive intelligent recommendations
- **Personalized Recommendations**: Tailored suggestions based on user preferences and style history
- **Trend Forecasting**: Real-time fashion trend analysis and insights
- **Smart Style Matching**: Advanced algorithms for outfit pairing and coordination
- **Color Harmony Analysis**: Discover perfect color combinations for your style
- **Community Insights**: Connect with fashion enthusiasts and discover trending styles

### 🎨 User Experience
- **Modern UI/UX**: Beautiful, responsive design with dark/light theme support
- **Drag & Drop Upload**: Seamless image upload with real-time preview
- **Interactive Dashboard**: Comprehensive overview of style analytics and recommendations
- **Real-time Feedback**: Instant notifications and progress indicators
- **Mobile Responsive**: Optimized for all device sizes

### 🔧 Technical Features
- **TypeScript**: Full type safety and better development experience
- **React 18**: Latest React features with hooks and context
- **Framer Motion**: Smooth animations and micro-interactions
- **Tailwind CSS**: Utility-first styling with custom design system
- **Local Storage**: Persistent user preferences and data
- **Mock API**: Simulated backend for demonstration purposes

## 🏗️ Architecture

### Frontend Structure
```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── FeedbackToast.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Navbar.tsx
│   │   ├── OutfitCard.tsx
│   │   ├── SkeletonLoader.tsx
│   │   ├── TrendGraph.tsx
│   │   └── UploadModal.tsx
│   ├── contexts/            # React Context providers
│   │   ├── ThemeContext.tsx
│   │   └── UserContext.tsx
│   ├── pages/               # Main application pages
│   │   ├── Dashboard.tsx
│   │   ├── Landing.tsx
│   │   ├── Settings.tsx
│   │   ├── Trends.tsx
│   │   └── Upload.tsx
│   ├── utils/               # Utility functions and constants
│   │   ├── api.ts
│   │   └── constants.ts
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
```

### Backend Structure
```
backend/
├── analysis.ipynb          # Data exploration and preprocessing
├── code.ipynb              # Core recommendation algorithms
├── notebook.ipynb          # Additional analysis notebooks
├── text model.ipynb        # NLP model for text analysis
└── README.md               # Backend documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Python 3.8+** (for backend analysis)
- **Jupyter Notebook** (for backend development)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/StyleSphere.git
   cd StyleSphere
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install Python dependencies**
   ```bash
   pip install pandas numpy scikit-learn matplotlib jupyter
   ```

3. **Launch Jupyter Notebook**
   ```bash
   jupyter notebook
   ```

4. **Open analysis notebooks**
   - `analysis.ipynb` - Data exploration and preprocessing
   - `code.ipynb` - Core recommendation algorithms
   - `text model.ipynb` - NLP model for text analysis

## 📱 Usage

### For Users
1. **Landing Page**: Explore features and get started
2. **Upload Outfits**: Use drag & drop or camera to upload photos
3. **Get Recommendations**: Receive AI-powered style suggestions
4. **Explore Trends**: Discover current fashion trends
5. **Customize Settings**: Personalize your experience

### For Developers
1. **Frontend Development**: React + TypeScript + Vite
2. **Styling**: Tailwind CSS with custom design system
3. **State Management**: React Context for global state
4. **Animations**: Framer Motion for smooth interactions
5. **Backend Analysis**: Jupyter notebooks for ML models

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **React Dropzone** - File upload handling
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Python** - Data analysis and ML
- **Pandas** - Data manipulation
- **NumPy** - Numerical computing
- **Scikit-learn** - Machine learning
- **Matplotlib** - Data visualization
- **Jupyter Notebook** - Interactive development

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🎨 Design System

### Color Palette
- **Primary**: Purple (`#8B5CF6`) to Pink (`#EC4899`)
- **Secondary**: Blue (`#3B82F6`) to Teal (`#14B8A6`)
- **Success**: Green (`#10B981`)
- **Warning**: Yellow (`#F59E0B`)
- **Error**: Red (`#EF4444`)

### Typography
- **Headings**: Inter font family
- **Body**: System font stack
- **Responsive**: Fluid typography scaling

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Modals**: Backdrop blur with smooth animations
- **Forms**: Clean inputs with focus states

## 🔮 Future Enhancements

### Planned Features
- [ ] **Real AI Integration**: Connect to actual computer vision APIs
- [ ] **User Authentication**: Secure user accounts and profiles
- [ ] **Social Features**: Share outfits and follow other users
- [ ] **Mobile App**: Native iOS and Android applications
- [ ] **AR Try-On**: Virtual outfit fitting using AR technology
- [ ] **E-commerce Integration**: Direct links to purchase recommended items
- [ ] **Voice Commands**: Voice-activated style recommendations
- [ ] **Seasonal Planning**: Wardrobe planning for different seasons

### Technical Improvements
- [ ] **Backend API**: RESTful API with Node.js/Express
- [ ] **Database**: PostgreSQL for user data and recommendations
- [ ] **Image Processing**: Advanced image analysis and enhancement
- [ ] **Machine Learning**: Improved recommendation algorithms
- [ ] **Performance**: Code splitting and lazy loading
- [ ] **Testing**: Unit and integration tests
- [ ] **CI/CD**: Automated deployment pipeline

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful commit messages
- Add comments for complex logic
- Maintain consistent code formatting
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anush Dubey**
- GitHub: [@Anushdubey01](https://github.com/Anushdubey01)
- LinkedIn: [Anush Dubey](https://linkedin.com/in/anushdubey)

## 🙏 Acknowledgments

- **Myntra.com** for fashion data inspiration
- **React Community** for excellent documentation
- **Tailwind CSS** for the amazing utility-first framework
- **Framer Motion** for smooth animations
- **Lucide** for beautiful icons


---

<div align="center">
  <p>Made with ❤️ by Anush Dubey</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div> 