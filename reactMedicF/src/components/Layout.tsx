
import React from 'react';
import { Heart, Activity, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-2 border-medical-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-medical-primary rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-medical-dark">
                  Patient Recovery System
                </h1>
                <p className="text-sm text-gray-600">Advanced Healthcare Monitoring</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Monitor</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Patients</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Schedule</span>
              </Button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button className="medical-gradient text-white">
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-medical-dark text-white py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Patient Recovery System</h3>
              <p className="text-gray-300">
                Advanced healthcare monitoring and recovery management platform
                designed to improve patient outcomes and streamline medical care.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Real-time patient monitoring</li>
                <li>Recovery tracking</li>
                <li>Medical history management</li>
                <li>Rehabilitation planning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-300">
                Emergency: +1 (555) 123-4567<br />
                Support: support@prs.com<br />
                24/7 Medical Assistance
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Patient Recovery System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
