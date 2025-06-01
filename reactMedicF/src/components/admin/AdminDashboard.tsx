
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  UserPlus, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Total Patients",
      value: "156",
      change: "+12 this week",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Doctors",
      value: "24",
      change: "+2 this month",
      icon: UserPlus,
      color: "text-green-600"
    },
    {
      title: "Critical Cases",
      value: "8",
      change: "-3 from yesterday",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "Recovered Today",
      value: "15",
      change: "+5 from yesterday",
      icon: CheckCircle,
      color: "text-green-600"
    }
  ];

  const unassignedPatients = [
    {
      id: "P001",
      name: "John Doe",
      surgery: "Cardiac Surgery",
      date: "2024-01-15",
      status: "Waiting Assignment"
    },
    {
      id: "P002",
      name: "Jane Smith", 
      surgery: "Orthopedic Surgery",
      date: "2024-01-14",
      status: "Waiting Assignment"
    },
    {
      id: "P003",
      name: "Robert Johnson",
      surgery: "Neurosurgery",
      date: "2024-01-13",
      status: "Waiting Assignment"
    }
  ];

  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiology",
      patients: 12,
      capacity: 15
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      specialization: "Orthopedics", 
      patients: 8,
      capacity: 12
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialization: "Neurology",
      patients: 10,
      capacity: 14
    }
  ];

  const assignPatientToDoctor = (patientId: string, doctorId: number) => {
    console.log(`Assigning patient ${patientId} to doctor ${doctorId}`);
    // Implementation for patient assignment
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-medical-dark">
            Admin Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Manage doctors, patients, and system operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </Button>
          <Button className="medical-gradient text-white">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Unassigned Patients */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Unassigned Patients</span>
            </CardTitle>
            <CardDescription>
              Patients waiting for doctor assignment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {unassignedPatients.map((patient) => (
              <div key={patient.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-medical-dark">
                      {patient.name}
                    </h4>
                    <p className="text-sm text-gray-600">{patient.surgery}</p>
                    <p className="text-xs text-gray-500">
                      Surgery Date: {patient.date}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {patient.status}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setActiveTab('assign-' + patient.id)}
                  >
                    Assign Doctor
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Available Doctors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Available Doctors</span>
            </CardTitle>
            <CardDescription>
              Doctor capacity and current assignments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableDoctors.map((doctor) => (
              <div key={doctor.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-medical-dark">
                      {doctor.name}
                    </h4>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    <p className="text-xs text-gray-500">
                      Patients: {doctor.patients}/{doctor.capacity}
                    </p>
                  </div>
                  <Badge 
                    variant={doctor.patients < doctor.capacity ? "default" : "destructive"}
                  >
                    {doctor.patients < doctor.capacity ? "Available" : "Full"}
                  </Badge>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div 
                    className="bg-medical-primary h-2 rounded-full" 
                    style={{ width: `${(doctor.patients / doctor.capacity) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    disabled={doctor.patients >= doctor.capacity}
                  >
                    Assign Patient
                  </Button>
                  <Button size="sm" variant="outline">
                    View Patients
                  </Button>
                </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <UserPlus className="h-4 w-4 mr-2" />
              Register New Doctor
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Register New Patient
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Activity className="h-4 w-4 mr-2" />
              System Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
