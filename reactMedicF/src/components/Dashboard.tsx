import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Activity, 
  Thermometer, 
  Calendar, 
  Clock,
  TrendingUp,
  Users,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

const Dashboard = () => {
  const patientStats = [
    {
      title: "Active Patients",
      value: "124",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Recovery Rate",
      value: "94.2%",
      change: "+2.1%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Critical Cases",
      value: "3",
      change: "-1",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Discharged Today",
      value: "8",
      change: "+3",
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  const recentPatients = [
    {
      id: "P001",
      name: "John Doe",
      surgery: "Cardiac Surgery",
      status: "Stable",
      progress: 75,
      vitals: { heartRate: 72, temp: 98.6, bp: "120/80" }
    },
    {
      id: "P002", 
      name: "Jane Smith",
      surgery: "Orthopedic Surgery",
      status: "Improving",
      progress: 60,
      vitals: { heartRate: 68, temp: 99.1, bp: "118/75" }
    },
    {
      id: "P003",
      name: "Robert Johnson",
      surgery: "Neurosurgery", 
      status: "Critical",
      progress: 30,
      vitals: { heartRate: 85, temp: 100.2, bp: "140/90" }
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-medical-dark">
            Medical Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Monitor patient recovery and system overview
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button className="medical-gradient text-white">
            New Patient
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {patientStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-medical-dark">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {stat.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Patients */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Patients</span>
            </CardTitle>
            <CardDescription>
              Latest patient status and recovery progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-medical-dark">
                      {patient.name}
                    </h4>
                    <p className="text-sm text-gray-600">{patient.surgery}</p>
                    <p className="text-xs text-gray-500">ID: {patient.id}</p>
                  </div>
                  <Badge 
                    variant={
                      patient.status === 'Critical' ? 'destructive' :
                      patient.status === 'Stable' ? 'default' : 'secondary'
                    }
                  >
                    {patient.status}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Recovery Progress</span>
                    <span>{patient.progress}%</span>
                  </div>
                  <Progress value={patient.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{patient.vitals.heartRate} BPM</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Thermometer className="h-4 w-4 text-blue-500" />
                    <span>{patient.vitals.temp}°F</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Activity className="h-4 w-4 text-green-500" />
                    <span>{patient.vitals.bp}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                Start Patient Monitoring
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Heart className="h-4 w-4 mr-2" />
                Emergency Protocol
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span>System Alerts</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">
                    Critical Patient Alert
                  </p>
                  <p className="text-xs text-red-600">
                    Patient P003 requires immediate attention
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg">
                <Clock className="h-4 w-4 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Medication Reminder
                  </p>
                  <p className="text-xs text-amber-600">
                    5 patients due for medication in 30 minutes
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    System Status
                  </p>
                  <p className="text-xs text-green-600">
                    All monitoring systems operational
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
