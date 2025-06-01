
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Heart, ArrowLeft } from 'lucide-react';

interface LoginFormProps {
  onLogin: (token: string, user: any) => void;
  onBackToLanding?: () => void;
}

const LoginForm = ({ onLogin, onBackToLanding }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    console.log('Login attempt with email:', formData.email);

    try {
      // Demo uchun turli foydalanuvchi turlarini simulyatsiya qilish
      let userData = null;
      
      if (formData.email === 'admin@hospital.com') {
        userData = { 
          id: 1, 
          firstName: 'Admin', 
          lastName: 'User', 
          email: formData.email, 
          role: 'Admin' 
        };
      } else if (formData.email === 'doctor@hospital.com') {
        userData = { 
          id: 2, 
          firstName: 'Dr. Sarvar', 
          lastName: 'Aliyev', 
          email: formData.email, 
          role: 'Doctor' 
        };
      } else if (formData.email === 'patient@hospital.com') {
        userData = { 
          id: 3, 
          firstName: 'Johongir', 
          lastName: 'Karimov', 
          email: formData.email, 
          role: 'Patient' 
        };
      }

      if (userData) {
        console.log('Login successful for user:', userData);
        onLogin('demo-token', userData);
        toast({
          title: "Muvaffaqiyatli kirish",
          description: `${userData.role} panelga xush kelibsiz`
        });
      } else {
        console.log('Login failed - invalid credentials');
        toast({
          title: "Kirish xatosi",
          description: "Noto'g'ri ma'lumotlar. Demo uchun: admin@hospital.com, doctor@hospital.com yoki patient@hospital.com ishlatib ko'ring",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Xatolik yuz berdi",
        description: "Iltimos qaytadan urinib ko'ring",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="w-full max-w-md">
        {onBackToLanding && (
          <div className="mb-4">
            <Button 
              variant="ghost" 
              onClick={onBackToLanding}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Orqaga</span>
            </Button>
          </div>
        )}

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Heart className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bemor Tiklanish Tizimi</h1>
          <p className="text-gray-600">Ilg'or Tibbiy Monitoring</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Tizimga kirish</CardTitle>
            <CardDescription>
              Tizimga kirish uchun ma'lumotlaringizni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email manzilingizni kiriting"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Parol</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Parolingizni kiriting"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Kirilmoqda...' : 'Kirish'}
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-600">
              <p className="font-semibold mb-2">Demo ma'lumotlari:</p>
              <div className="space-y-1">
                <p><strong>Admin:</strong> admin@hospital.com</p>
                <p><strong>Shifokor:</strong> doctor@hospital.com</p>
                <p><strong>Bemor:</strong> patient@hospital.com</p>
                <p className="text-xs text-gray-500">Parol: istalgan</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
