
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import LandingPage from '@/components/LandingPage';
import EnhancedLayout from '@/components/EnhancedLayout';
import AdminDashboard from '@/components/admin/AdminDashboard';
import DoctorDashboard from '@/components/doctor/DoctorDashboard';
import PatientDashboard from '@/components/patient/PatientDashboard';
import ChatSystem from '@/components/chat/ChatSystem';
import Dashboard from '@/components/Dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

const MainApp = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showLogin, setShowLogin] = useState(false);

  console.log('MainApp render - isAuthenticated:', isAuthenticated, 'user:', user, 'showLogin:', showLogin);

  // Agar foydalanuvchi tizimga kirmagan bo'lsa va login sahifasi ko'rsatilmagan bo'lsa
  if (!isAuthenticated && !showLogin) {
    return <LandingPage onShowLogin={() => setShowLogin(true)} />;
  }

  // Agar foydalanuvchi tizimga kirmagan bo'lsa va login sahifasi ko'rsatilgan bo'lsa
  if (!isAuthenticated && showLogin) {
    return (
      <LoginForm 
        onLogin={(token, userData) => {
          console.log('LoginForm onLogin called with:', token, userData);
          login(token, userData);
          setShowLogin(false);
        }}
        onBackToLanding={() => setShowLogin(false)}
      />
    );
  }

  const renderDashboard = () => {
    console.log('Rendering dashboard for role:', user?.role);
    switch (user?.role) {
      case 'Admin':
        return <AdminDashboard />;
      case 'Doctor':
        return <DoctorDashboard />;
      case 'Patient':
        return <PatientDashboard />;
      default:
        return <Dashboard />;
    }
  };

  const getAvailableTabs = () => {
    const baseTabs = [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'chat', label: 'Xabarlar' }
    ];

    if (user?.role === 'Admin') {
      return [
        ...baseTabs,
        { id: 'users', label: 'Foydalanuvchilar' },
        { id: 'reports', label: 'Hisobotlar' }
      ];
    } else if (user?.role === 'Doctor') {
      return [
        ...baseTabs,
        { id: 'patients', label: 'Mening Bemorlarim' },
        { id: 'schedule', label: 'Jadval' }
      ];
    } else if (user?.role === 'Patient') {
      return [
        ...baseTabs,
        { id: 'recovery', label: 'Tiklanish Rejasi' },
        { id: 'history', label: 'Tibbiy Tarix' }
      ];
    }

    return baseTabs;
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    logout();
    setShowLogin(false);
    setActiveTab('dashboard');
  };

  return (
    <EnhancedLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Xush kelibsiz, {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-600 mt-1">
            Rol: <span className="font-medium">{user?.role}</span> | Email: <span className="font-medium">{user?.email}</span>
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Chiqish</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-blue-50 p-1 rounded-xl">
          {getAvailableTabs().map((tab) => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm font-medium"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="dashboard" className="mt-6">
          {renderDashboard()}
        </TabsContent>

        <TabsContent value="chat" className="mt-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Xabarlar va Aloqa
              </h2>
              <p className="text-blue-700">
                {user?.role === 'Patient' ? 'Shifokor va tibbiy jamoa bilan' : 
                user?.role === 'Doctor' ? 'Bemorlar va hamkasblar bilan' : 'Xodimlar va foydalanuvchilar bilan'} 
                bog'lanib turing
              </p>
            </div>
            <ChatSystem currentUser={user} />
          </div>
        </TabsContent>

        <TabsContent value="patients">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Mening Bemorlarim</h3>
            <p className="text-gray-600">Bemorlar boshqaruvi tez orada qo'shiladi</p>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Foydalanuvchilar Boshqaruvi</h3>
            <p className="text-gray-600">Foydalanuvchilar boshqaruvi tez orada qo'shiladi</p>
          </div>
        </TabsContent>

        <TabsContent value="recovery">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Tiklanish Rejasi</h3>
            <p className="text-gray-600">Batafsil tiklanish rejasi tez orada qo'shiladi</p>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Jadval</h3>
            <p className="text-gray-600">Jadval boshqaruvi tez orada qo'shiladi</p>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Hisobotlar</h3>
            <p className="text-gray-600">Hisobot funksiyalari tez orada qo'shiladi</p>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Tibbiy Tarix</h3>
            <p className="text-gray-600">Tibbiy tarix funksiyalari tez orada qo'shiladi</p>
          </div>
        </TabsContent>
      </Tabs>
    </EnhancedLayout>
  );
};

export default MainApp;
