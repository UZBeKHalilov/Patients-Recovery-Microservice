
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Activity, 
  Thermometer,
  MessageCircle,
  Calendar,
  TrendingUp,
  Clock,
  User,
  FileText
} from 'lucide-react';

const PatientDashboard = () => {
  const patientInfo = {
    name: "John Doe",
    patientCode: "P20240115001",
    age: 45,
    surgery: "Cardiac Surgery",
    surgeryDate: "2024-01-10",
    assignedDoctor: "Dr. Sarah Johnson",
    status: "Recovering",
    progress: 65,
    expectedDischarge: "2024-01-25"
  };

  const currentVitals = {
    heartRate: 72,
    temperature: 98.6,
    bloodPressure: "120/80",
    oxygenSaturation: 98,
    lastUpdated: "30 minutes ago"
  };

  const recoveryMilestones = [
    {
      id: 1,
      title: "Surgery Completed",
      description: "Successfully completed cardiac surgery",
      date: "2024-01-10",
      status: "completed",
      progress: 100
    },
    {
      id: 2,
      title: "Post-Surgery Monitoring",
      description: "24-hour monitoring in ICU",
      date: "2024-01-11",
      status: "completed",
      progress: 100
    },
    {
      id: 3,
      title: "Stable Vital Signs",
      description: "Maintaining stable vital signs",
      date: "2024-01-12",
      status: "completed",
      progress: 100
    },
    {
      id: 4,
      title: "Physical Therapy",
      description: "Beginning rehabilitation exercises",
      date: "2024-01-15",
      status: "in-progress",
      progress: 60
    },
    {
      id: 5,
      title: "Medication Management",
      description: "Learning self-medication routine",
      date: "2024-01-18",
      status: "pending",
      progress: 0
    },
    {
      id: 6,
      title: "Home Recovery Ready",
      description: "Cleared for home recovery",
      date: "2024-01-25",
      status: "pending",
      progress: 0
    }
  ];

  const recentMessages = [
    {
      id: 1,
      from: "Dr. Sarah Johnson",
      message: "Your recovery is progressing well. Keep up with the prescribed exercises.",
      time: "2 hours ago",
      type: "doctor"
    },
    {
      id: 2,
      from: "Nurse Mary",
      message: "Time for your afternoon medication. Please ring the bell when ready.",
      time: "4 hours ago",
      type: "nurse"
    },
    {
      id: 3,
      from: "System",
      message: "Physical therapy session scheduled for tomorrow at 10 AM.",
      time: "Yesterday",
      type: "system"
    }
  ];

  const todaySchedule = [
    {
      time: "09:00 AM",
      activity: "Vital Signs Check",
      type: "checkup"
    },
    {
      time: "11:00 AM",
      activity: "Physical Therapy",
      type: "therapy"
    },
    {
      time: "02:00 PM",
      activity: "Medication Round",
      type: "medication"
    },
    {
      time: "04:00 PM",
      activity: "Doctor Consultation",
      type: "consultation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'in-progress': return 'secondary';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-medical-dark">
            Patient Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Track your recovery progress and stay connected with your care team
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button className="medical-gradient text-white">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Doctor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Info & Current Vitals */}
        <div className="lg:col-span-1 space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Patient Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-semibold">{patientInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Patient ID</p>
                <p className="font-semibold">{patientInfo.patientCode}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Surgery</p>
                <p className="font-semibold">{patientInfo.surgery}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assigned Doctor</p>
                <p className="font-semibold">{patientInfo.assignedDoctor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant="secondary">{patientInfo.status}</Badge>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Discharge</p>
                <p className="font-semibold">{patientInfo.expectedDischarge}</p>
              </div>
            </CardContent>
          </Card>

          {/* Current Vitals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Current Vitals</span>
              </CardTitle>
              <CardDescription>
                Last updated: {currentVitals.lastUpdated}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Heart Rate</p>
                    <p className="font-semibold">{currentVitals.heartRate} BPM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Thermometer className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="font-semibold">{currentVitals.temperature}°F</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Blood Pressure</p>
                    <p className="font-semibold">{currentVitals.bloodPressure}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Oxygen Sat.</p>
                    <p className="font-semibold">{currentVitals.oxygenSaturation}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Today's Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySchedule.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-sm">{item.activity}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recovery Progress & Messages */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overall Recovery Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Recovery Progress</span>
              </CardTitle>
              <CardDescription>
                Overall recovery: {patientInfo.progress}% complete
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={patientInfo.progress} className="h-3 mb-6" />
              
              <div className="space-y-4">
                {recoveryMilestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start space-x-4 p-3 rounded-lg border">
                    <div className="flex-shrink-0 mt-1">
                      <div className={`w-3 h-3 rounded-full ${
                        milestone.status === 'completed' ? 'bg-green-500' :
                        milestone.status === 'in-progress' ? 'bg-blue-500' : 
                        'bg-gray-300'
                      }`}></div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm">{milestone.title}</h4>
                        <Badge variant={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{milestone.date}</span>
                        {milestone.status === 'in-progress' && (
                          <div className="flex items-center space-x-2">
                            <Progress value={milestone.progress} className="h-1 w-20" />
                            <span className="text-xs">{milestone.progress}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Recent Messages</span>
              </CardTitle>
              <CardDescription>
                Communications from your care team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMessages.map((message) => (
                <div key={message.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{message.from}</span>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-sm text-gray-700">{message.message}</p>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {message.type}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                View All Messages
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Message Doctor
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Report Symptoms
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              View Schedule
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              View History
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;
