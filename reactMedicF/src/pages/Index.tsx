
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import PatientMonitoringForm from '@/components/PatientMonitoringForm';
import RecoveryTracking from '@/components/RecoveryTracking';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Activity, 
  Users, 
  BarChart3,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      icon: Activity,
      title: "Real-time Monitoring",
      description: "Continuous tracking of patient vital signs and recovery progress with instant alerts for critical changes."
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Advanced analytics and reporting to track recovery milestones and predict discharge readiness."
    },
    {
      icon: Shield,
      title: "Emergency Response",
      description: "Automated emergency protocols with direct integration to medical response teams."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock patient monitoring with AI-assisted decision support for medical staff."
    }
  ];

  if (activeTab === 'overview') {
    return (
      <Layout>
        {/* Hero Section */}
        <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-white rounded-2xl mb-12">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-medical-primary rounded-full">
                <Heart className="h-12 w-12 text-white animate-pulse-gentle" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-medical-dark mb-6">
              Patient Recovery System
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Advanced healthcare monitoring platform designed to optimize patient recovery,
              streamline medical care, and improve post-operative outcomes through intelligent
              monitoring and real-time analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="medical-gradient text-white px-8 py-3"
                onClick={() => setActiveTab('dashboard')}
              >
                <Activity className="h-5 w-5 mr-2" />
                View Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-3"
                onClick={() => setActiveTab('monitoring')}
              >
                <Users className="h-5 w-5 mr-2" />
                Start Monitoring
              </Button>
            </div>
          </div>
        </div>

        {/* System Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-medical-primary/10 rounded-full">
                    <feature.icon className="h-8 w-8 text-medical-primary" />
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-red-500" />
                <span>Patient Care Stages</span>
              </CardTitle>
              <CardDescription>
                Comprehensive monitoring throughout the recovery journey
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Post-Surgery Monitoring</h4>
                  <p className="text-sm text-gray-600">Immediate post-operative care in emergency room with continuous vital sign monitoring</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Recovery Room Care</h4>
                  <p className="text-sm text-gray-600">Structured recovery monitoring with progress tracking and milestone management</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Home Recovery</h4>
                  <p className="text-sm text-gray-600">Remote monitoring with patient self-reporting and telemedicine consultations</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h4 className="font-semibold">Rehabilitation</h4>
                  <p className="text-sm text-gray-600">Structured rehabilitation programs with progress tracking and adaptive protocols</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-blue-500" />
                <span>System Benefits</span>
              </CardTitle>
              <CardDescription>
                Measurable improvements in patient care and outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Reduced Hospital Stay</span>
                  <span className="font-semibold text-green-600">-25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Improved Recovery Rate</span>
                  <span className="font-semibold text-green-600">+30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Emergency Response Time</span>
                  <span className="font-semibold text-blue-600">-40%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Patient Satisfaction</span>
                  <span className="font-semibold text-green-600">+45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Medical Staff Efficiency</span>
                  <span className="font-semibold text-blue-600">+35%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="medical-gradient text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">
              Ready to Start Monitoring?
            </CardTitle>
            <CardDescription className="text-blue-100">
              Access the full Patient Recovery System dashboard and monitoring tools
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setActiveTab('dashboard')}
              >
                <BarChart3 className="h-5 w-5 mr-2" />
                View Dashboard
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setActiveTab('monitoring')}
              >
                <Activity className="h-5 w-5 mr-2" />
                Start Monitoring
              </Button>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => setActiveTab('tracking')}
              >
                <Users className="h-5 w-5 mr-2" />
                Track Recovery
              </Button>
            </div>
          </CardContent>
        </Card>
      </Layout>
    );
  }

  return (
    <Layout>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="tracking">Recovery Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* This will show the overview content above */}
        </TabsContent>

        <TabsContent value="dashboard">
          <Dashboard />
        </TabsContent>

        <TabsContent value="monitoring">
          <PatientMonitoringForm />
        </TabsContent>

        <TabsContent value="tracking">
          <RecoveryTracking />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Index;
