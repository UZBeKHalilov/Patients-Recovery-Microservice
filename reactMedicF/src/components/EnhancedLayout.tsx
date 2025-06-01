
import React from 'react';
import { Heart, Activity, Users, Calendar, MessageSquare, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface EnhancedLayoutProps {
  children: React.ReactNode;
}

const EnhancedLayout = ({ children }: EnhancedLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-xl border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Patient Recovery System
                </h1>
                <p className="text-sm text-gray-600 font-medium">Advanced Healthcare Monitoring Platform</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center space-x-2">
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 rounded-xl">
                <Activity className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Monitor</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 rounded-xl">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Patients</span>
                <Badge variant="secondary" className="ml-1">24</Badge>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 rounded-xl">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Schedule</span>
              </Button>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 rounded-xl">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Messages</span>
                <Badge variant="destructive" className="ml-1">3</Badge>
              </Button>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative hover:bg-blue-50 rounded-xl">
                <Bell className="h-5 w-5 text-blue-600" />
                <Badge variant="destructive" className="absolute -top-1 -right-1 w-5 h-5 text-xs">2</Badge>
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-blue-50 rounded-xl">
                <Settings className="h-5 w-5 text-blue-600" />
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg rounded-xl px-6">
                Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with better spacing */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-12 mt-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">PRS</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Advanced healthcare monitoring and recovery management platform
                designed to improve patient outcomes and streamline medical care.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-300">Platform Features</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-blue-400" />
                  <span>Real-time patient monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-blue-400" />
                  <span>Recovery tracking system</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>Medical team collaboration</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-blue-400" />
                  <span>Rehabilitation planning</span>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-300">Services</h3>
              <ul className="space-y-2 text-gray-300">
                <li>Post-operative care monitoring</li>
                <li>Vital signs tracking</li>
                <li>Recovery progress analysis</li>
                <li>Medical consultation platform</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-300">Contact & Support</h3>
              <div className="space-y-3 text-gray-300">
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span>24/7 Emergency Support</span>
                </p>
                <p>Emergency: +998 (71) 123-4567</p>
                <p>Support: support@prs.uz</p>
                <p>Medical Consultation: consult@prs.uz</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 Patient Recovery System. Barcha huquqlar himoyalangan.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Medical Guidelines</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnhancedLayout;
