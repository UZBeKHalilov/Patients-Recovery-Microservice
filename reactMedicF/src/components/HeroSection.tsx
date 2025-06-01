
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Shield, Users, Activity, ArrowRight, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-3xl"></div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Heart className="h-3 w-3 mr-1" />
                Advanced Healthcare Platform
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Bemorlar tuzalishi
                </span>
                <br />
                <span className="text-gray-900">nazorat tizimi</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Operatsiyadan keyingi davrda bemorlarni kuzatish, tuzalish jarayonini nazorat qilish 
                va tibbiy xodimlar bilan aloqada bo'lish uchun zamonaviy platforma.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg rounded-xl px-8">
                Platformani sinab ko'ring
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-blue-200 hover:bg-blue-50 rounded-xl px-8">
                <Play className="mr-2 h-5 w-5" />
                Demo ko'rish
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">98%</div>
                <div className="text-sm text-gray-600">Tuzalish samaradorligi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-700">24/7</div>
                <div className="text-sm text-gray-600">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-700">1000+</div>
                <div className="text-sm text-gray-600">Muvaffaqiyatli holatlar</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Activity className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-900">Real-time Monitoring</h3>
                    </div>
                  </div>
                  <p className="text-sm text-blue-700">Vital belgilar va bemorning holati real vaqtda kuzatiladi</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 shadow-lg hover:shadow-xl transition-all duration-300 mt-8">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-indigo-600 rounded-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-indigo-900">Xavfsizlik</h3>
                    </div>
                  </div>
                  <p className="text-sm text-indigo-700">Tibbiy ma'lumotlar maksimal darajada himoyalangan</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-900">Hamkorlik</h3>
                    </div>
                  </div>
                  <p className="text-sm text-green-700">Shifokor, bemor va ma'murlar orasidagi samarali aloqa</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 mt-8">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-purple-900">Reabilitatsiya</h3>
                    </div>
                  </div>
                  <p className="text-sm text-purple-700">Shaxsiy tuzalish rejasi va nazorat</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-10 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
