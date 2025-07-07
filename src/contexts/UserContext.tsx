import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserPreferences {
  stylePreference: string;
  gender: string;
  favoriteColors: string[];
  preferredBrands: string[];
  notifications: {
    recommendations: boolean;
    trends: boolean;
    insights: boolean;
    community: boolean;
  };
}

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
}

interface UserContextType {
  preferences: UserPreferences;
  profile: UserProfile;
  recommendations: any[];
  likedOutfits: number[];
  savedOutfits: number[];
  updatePreferences: (newPreferences: Partial<UserPreferences>) => void;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  setRecommendations: (recommendations: any[]) => void;
  toggleLike: (outfitId: number) => void;
  toggleSave: (outfitId: number) => void;
  isLiked: (outfitId: number) => boolean;
  isSaved: (outfitId: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    stylePreference: 'modern',
    gender: 'unisex',
    favoriteColors: ['#8B5CF6', '#14B8A6', '#F97316'],
    preferredBrands: [],
    notifications: {
      recommendations: true,
      trends: true,
      insights: false,
      community: false,
    },
  });

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Fashion Enthusiast',
    email: 'user@stylesphere.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2024-01-15',
  });

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [likedOutfits, setLikedOutfits] = useState<number[]>([]);
  const [savedOutfits, setSavedOutfits] = useState<number[]>([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('style-sphere-preferences');
    const savedProfile = localStorage.getItem('style-sphere-profile');
    const savedLiked = localStorage.getItem('style-sphere-liked');
    const savedSaved = localStorage.getItem('style-sphere-saved');

    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedLiked) {
      setLikedOutfits(JSON.parse(savedLiked));
    }
    if (savedSaved) {
      setSavedOutfits(JSON.parse(savedSaved));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('style-sphere-preferences', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    localStorage.setItem('style-sphere-profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('style-sphere-liked', JSON.stringify(likedOutfits));
  }, [likedOutfits]);

  useEffect(() => {
    localStorage.setItem('style-sphere-saved', JSON.stringify(savedOutfits));
  }, [savedOutfits]);

  const updatePreferences = (newPreferences: Partial<UserPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...newProfile }));
  };

  const toggleLike = (outfitId: number) => {
    setLikedOutfits(prev => 
      prev.includes(outfitId) 
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  const toggleSave = (outfitId: number) => {
    setSavedOutfits(prev => 
      prev.includes(outfitId) 
        ? prev.filter(id => id !== outfitId)
        : [...prev, outfitId]
    );
  };

  const isLiked = (outfitId: number) => likedOutfits.includes(outfitId);
  const isSaved = (outfitId: number) => savedOutfits.includes(outfitId);

  return (
    <UserContext.Provider value={{ 
      preferences, 
      profile,
      recommendations,
      likedOutfits,
      savedOutfits,
      updatePreferences,
      updateProfile,
      setRecommendations,
      toggleLike,
      toggleSave,
      isLiked,
      isSaved,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};