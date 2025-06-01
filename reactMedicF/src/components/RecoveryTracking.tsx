
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  Target,
  CheckCircle,
  AlertCircle,
  Activity,
  BarChart3
} from 'lucide-react';

interface RecoveryMilestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completed: boolean;
  progress: number;
  category: 'mobility' | 'pain' | 'function' | 'medication';
}

interface PatientProgress {
  patientId: string;
  patientName: string;
  surgery: string;
  admissionDate: string;
  expectedDischarge: string;
  overallProgress: number;
  milestones: RecoveryMilestone[];
}

const RecoveryTracking = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>('P001');

  const patientData: PatientProgress = {
    patientId: 'P001',
    patientName: 'John Doe',
    surgery: 'Cardiac Surgery',
    admissionDate: '2025-01-20',
    expectedDischarge: '2025-01-30',
    overallProgress: 75,
    milestones: [
      {
        id: 'M001',
        title: 'Post-Operative Stabilization',
        description: 'Stable vital signs for 24 hours',
        targetDate: '2025-01-21',
        completed: true,
        progress: 100,
        category: 'function'
      },
      {
        id: 'M002',
        title: 'Pain Management',
        description: 'Pain level reduced to 3/10 or below',
        targetDate: '2025-01-23',
        completed: true,
        progress: 100,
        category: 'pain'
      },
      {
        id: 'M003',
        title: 'Early Mobilization',
        description: 'Able to sit up and take short walks',
        targetDate: '2025-01-25',
        completed: true,
        progress: 100,
        category: 'mobility'
      },
      {
        id: 'M004',
        title: 'Medication Transition',
        description: 'Transition from IV to oral medications',
        targetDate: '2025-01-26',
        completed: false,
        progress: 80,
        category: 'medication'
      },
      {
        id: 'M005',
        title: 'Independent Activities',
        description: 'Perform daily activities independently',
        targetDate: '2025-01-28',
        completed: false,
        progress: 60,
        category: 'function'
      },
      {
        id: 'M006',
        title: 'Discharge Readiness',
        description: 'All discharge criteria met',
        targetDate: '2025-01-30',
        completed: false,
        progress: 40,
        category: 'function'
      }
    ]
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'mobility': return 'bg-blue-500';
      case 'pain': return 'bg-red-500';
      case 'function': return 'bg-green-500';
      case 'medication': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'mobility': return Activity;
      case 'pain': return AlertCircle;
      case 'function': return Target;
      case 'medication': return Clock;
      default: return CheckCircle;
    }
  };

  const dailyProgress = [
    { date: '2025-01-20', mobility: 20, pain: 30, function: 25, medication: 10 },
    { date: '2025-01-21', mobility: 35, pain: 50, function: 40, medication: 30 },
    { date: '2025-01-22', mobility: 50, pain: 70, function: 55, medication: 50 },
    { date: '2025-01-23', mobility: 65, pain: 85, function: 70, medication: 65 },
    { date: '2025-01-24', mobility: 75, pain: 90, function: 80, medication: 75 },
    { date: '2025-01-25', mobility: 85, pain: 95, function: 85, medication: 80 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-medical-dark">
            Recovery Tracking
          </h2>
          <p className="text-gray-600 mt-1">
            Monitor patient recovery progress and milestones
          </p>
        </div>
        <Button className="medical-gradient text-white">
          <BarChart3 className="h-4 w-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Patient Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{patientData.patientName}</CardTitle>
              <CardDescription>
                Patient ID: {patientData.patientId} | Surgery: {patientData.surgery}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {patientData.overallProgress}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Admission Date</p>
              <p className="text-lg font-semibold">
                {new Date(patientData.admissionDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Expected Discharge</p>
              <p className="text-lg font-semibold">
                {new Date(patientData.expectedDischarge).toLocaleDateString()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Days Remaining</p>
              <p className="text-lg font-semibold">
                {Math.ceil((new Date(patientData.expectedDischarge).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Recovery Progress</span>
              <span>{patientData.overallProgress}%</span>
            </div>
            <Progress value={patientData.overallProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="milestones" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="milestones">Recovery Milestones</TabsTrigger>
          <TabsTrigger value="progress">Daily Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-4">
          {/* Milestones */}
          <div className="grid gap-4">
            {patientData.milestones.map((milestone) => {
              const CategoryIcon = getCategoryIcon(milestone.category);
              
              return (
                <Card key={milestone.id} className={`border-l-4 ${milestone.completed ? 'border-l-green-500 bg-green-50' : 'border-l-gray-300'}`}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-full ${getCategoryColor(milestone.category)} text-white`}>
                          <CategoryIcon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-medical-dark">
                              {milestone.title}
                            </h4>
                            {milestone.completed && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {milestone.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>Target: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                            </span>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getCategoryColor(milestone.category)} text-white border-0`}
                            >
                              {milestone.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div className="text-sm font-semibold mb-1">
                          {milestone.progress}%
                        </div>
                        <Progress value={milestone.progress} className="h-2 w-20" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-6">
          {/* Daily Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Daily Progress Trends</span>
              </CardTitle>
              <CardDescription>
                Track progress across different recovery categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dailyProgress.map((day, index) => (
                  <div key={day.date} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">
                        {new Date(day.date).toLocaleDateString()}
                      </span>
                      <span className="text-gray-500">
                        Day {index + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Mobility</span>
                          <span>{day.mobility}%</span>
                        </div>
                        <Progress value={day.mobility} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Pain Mgmt</span>
                          <span>{day.pain}%</span>
                        </div>
                        <Progress value={day.pain} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Function</span>
                          <span>{day.function}%</span>
                        </div>
                        <Progress value={day.function} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Medication</span>
                          <span>{day.medication}%</span>
                        </div>
                        <Progress value={day.medication} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecoveryTracking;
