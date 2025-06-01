
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Activity, 
  Heart,
  Thermometer,
  MessageCircle,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const doctorStats = [
    {
      title: "Assigned Patients",
      value: "12",
      change: "+2 this week",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Critical Cases",
      value: "2",
      change: "-1 today",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Recovering Well",
      value: "8",
      change: "+3 this week",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Pending Reviews",
      value: "5",
      change: "2 urgent",
      icon: Clock,
      color: "text-orange-600"
    }
  ];

  const assignedPatients = [
    {
      id: "P001",
      name: "John Doe",
      age: 45,
      surgery: "Cardiac Surgery",
      surgeryDate: "2024-01-10",
      status: "Critical",
      progress: 30,
      vitals: { 
        heartRate: 85, 
        temp: 100.2, 
        bp: "140/90",
        saturation: 95
      },
      lastUpdate: "2 hours ago",
      location: "ICU Room 302"
    },
    {
      id: "P002",
      name: "Jane Smith",
      age: 52,
      surgery: "Orthopedic Surgery",
      surgeryDate: "2024-01-12",
      status: "Stable",
      progress: 65,
      vitals: { 
        heartRate: 72, 
        temp: 98.6, 
        bp: "120/80",
        saturation: 98
      },
      lastUpdate: "30 minutes ago",
      location: "Room 205"
    },
    {
      id: "P003",
      name: "Michael Johnson",
      age: 38,
      surgery: "Neurosurgery",
      surgeryDate: "2024-01-08",
      status: "Improving",
      progress: 80,
      vitals: { 
        heartRate: 68, 
        temp: 97.8, 
        bp: "115/75",
        saturation: 99
      },
      lastUpdate: "1 hour ago",
      location: "Room 112"
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      patientId: "P001",
      patientName: "John Doe",
      message: "Heart rate elevated above 90 BPM",
      severity: "high",
      time: "15 minutes ago"
    },
    {
      id: 2,
      patientId: "P002", 
      patientName: "Jane Smith",
      message: "Medication reminder due",
      severity: "medium",
      time: "1 hour ago"
    },
    {
      id: 3,
      patientId: "P003",
      patientName: "Michael Johnson",
      message: "Physical therapy session completed",
      severity: "low",
      time: "2 hours ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical': return 'destructive';
      case 'Stable': return 'default';
      case 'Improving': return 'secondary';
      default: return 'default';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-medical-dark">
            Doctor Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Monitor your assigned patients and their recovery progress
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Schedule</span>
          </Button>
          <Button className="medical-gradient text-white">
            <MessageCircle className="h-4 w-4 mr-2" />
            Messages
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctorStats.map((stat, index) => (
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
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Assigned Patients */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Assigned Patients</span>
              </CardTitle>
              <CardDescription>
                Monitor recovery progress and vital signs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {assignedPatients.map((patient) => (
                <div key={patient.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-medical-dark">
                        {patient.name}, {patient.age}
                      </h4>
                      <p className="text-sm text-gray-600">{patient.surgery}</p>
                      <p className="text-xs text-gray-500">
                        Surgery: {patient.surgeryDate} | {patient.location}
                      </p>
                    </div>
                    <Badge variant={getStatusColor(patient.status)}>
                      {patient.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Recovery Progress</span>
                      <span>{patient.progress}%</span>
                    </div>
                    <Progress value={patient.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-3 text-sm">
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4 text-red-500" />
                      <span>{patient.vitals.heartRate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Thermometer className="h-4 w-4 text-blue-500" />
                      <span>{patient.vitals.temp}°F</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span>{patient.vitals.bp}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="h-4 w-4 text-purple-500" />
                      <span>{patient.vitals.saturation}%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Last update: {patient.lastUpdate}
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Recent Alerts</span>
            </CardTitle>
            <CardDescription>
              Patient notifications and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start justify-between mb-1">
                  <h5 className="font-medium text-sm">{alert.patientName}</h5>
                  <span className="text-xs">{alert.time}</span>
                </div>
                <p className="text-xs">{alert.message}</p>
                <Button size="sm" variant="outline" className="mt-2 h-6 text-xs">
                  View Patient
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              Update Vitals
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Visit
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Update Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
