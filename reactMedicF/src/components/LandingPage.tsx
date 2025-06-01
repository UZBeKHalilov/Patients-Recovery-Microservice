
import React from 'react';
import EnhancedLayout from './EnhancedLayout';
import HeroSection from './HeroSection';
import FeaturesSection from './FeaturesSection';
import { Button } from './ui/button';
import { LogIn } from 'lucide-react';

interface LandingPageProps {
  onShowLogin?: () => void;
}

const LandingPage = ({ onShowLogin }: LandingPageProps) => {
  return (
    <EnhancedLayout>
      <div className="flex justify-end mb-4">
        <Button 
          onClick={onShowLogin}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <LogIn className="h-4 w-4" />
          <span>Tizimga kirish</span>
        </Button>
      </div>
      <HeroSection />
      <FeaturesSection />
    </EnhancedLayout>
  );
};

export default LandingPage;
