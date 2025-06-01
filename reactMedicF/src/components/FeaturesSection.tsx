
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Activity, 
  MessageSquare, 
  Calendar, 
  FileText, 
  Shield, 
  Users, 
  Clock,
  BarChart3,
  Stethoscope,
  Tablet,
  Bell
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Vital Signs Monitoring",
      description: "Yurak urishi, qon bosimi, harorat va boshqa vital belgilar real vaqtda kuzatiladi",
      color: "from-red-500 to-pink-500",
      bgColor: "from-red-50 to-pink-50",
      badge: "Real-time"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Recovery Tracking",
      description: "Tuzalish jarayoni bosqichma-bosqich kuzatiladi va tahlil qilinadi",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      badge: "AI-powered"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Secure Chat System",
      description: "Shifkor va bemor o'rtasida xavfsiz real-time chat tizimi",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      badge: "Encrypted"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Appointment Scheduling",
      description: "Ko'riklar va davolanish seanslarini rejalashtirish va boshqarish",
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-50 to-violet-50",
      badge: "Smart"
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Medical Reports",
      description: "Batafsil tibbiy hisobotlar va tahlillar avtomatik yaratiladi",
      color: "from-indigo-500 to-blue-500",
      bgColor: "from-indigo-50 to-blue-50",
      badge: "Automated"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Data Security",
      description: "Tibbiy ma'lumotlar yuqori darajadagi xavfsizlik bilan himoyalangan",
      color: "from-gray-600 to-gray-800",
      bgColor: "from-gray-50 to-gray-100",
      badge: "HIPAA"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Collaboration",
      description: "Tibbiy jamoa a'zolari o'rtasida samarali hamkorlik va ma'lumot almashish",
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
      badge: "Team"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics Dashboard",
      description: "Tuzalish statistikasi va tendentsiyalarni kuzatish uchun tahliliy dashboard",
      color: "from-teal-500 to-green-500",
      bgColor: "from-teal-50 to-green-50",
      badge: "Insights"
    },
    {
      icon: <Stethoscope className="h-8 w-8" />,
      title: "Medical Examinations",
      description: "Tibbiy tekshiruvlar natijalari va tavsiyalarni boshqarish",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      badge: "Clinical"
    },
    {
      icon: <Tablet className="h-8 w-8" />,
      title: "Mobile Access",
      description: "Mobil qurilmalardan platformaga to'liq kirish imkoniyati",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-50 to-blue-50",
      badge: "Mobile"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Monitoring",
      description: "Tunu-kun bemor holatini kuzatish va favqulodda vaziyatlarda ogohlantirish",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      badge: "24/7"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Alerts",
      description: "Muhim hodisalar va o'zgarishlar haqida aqlli bildirishnomalar",
      color: "from-violet-500 to-purple-500",
      bgColor: "from-violet-50 to-purple-50",
      badge: "Smart"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="text-center mb-16">
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 mb-4">
          Platform Imkoniyatlari
        </Badge>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          Zamonaviy tibbiy <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">monitoring tizimi</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Bemorlar tuzalishi jarayonini nazorat qilish uchun keng qamrovli vositalar to'plami
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <Card 
            key={index}
            className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${feature.bgColor} border-0`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <Badge variant="secondary" className="text-xs">
                  {feature.badge}
                </Badge>
              </div>
              <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
