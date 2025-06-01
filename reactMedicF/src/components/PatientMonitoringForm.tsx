
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Heart, 
  Thermometer, 
  Activity, 
  Calendar,
  Clock,
  User,
  Save,
  AlertTriangle
} from 'lucide-react';

const PatientMonitoringForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    temperature: '',
    respiratoryRate: '',
    oxygenSaturation: '',
    painLevel: '',
    symptoms: '',
    medications: '',
    notes: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.patientId || !formData.heartRate || !formData.temperature) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Submit logic would go here
    toast({
      title: "Patient Data Saved",
      description: "Monitoring data has been successfully recorded",
    });

    console.log('Patient monitoring data:', formData);
  };

  const getVitalStatus = (field: string, value: string) => {
    const numValue = parseFloat(value);
    
    switch (field) {
      case 'heartRate':
        if (numValue < 60) return { status: 'low', color: 'bg-blue-500' };
        if (numValue > 100) return { status: 'high', color: 'bg-red-500' };
        return { status: 'normal', color: 'bg-green-500' };
      
      case 'temperature':
        if (numValue < 97) return { status: 'low', color: 'bg-blue-500' };
        if (numValue > 99.5) return { status: 'high', color: 'bg-red-500' };
        return { status: 'normal', color: 'bg-green-500' };
      
      case 'oxygenSaturation':
        if (numValue < 95) return { status: 'low', color: 'bg-red-500' };
        return { status: 'normal', color: 'bg-green-500' };
      
      default:
        return { status: 'normal', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-medical-dark">
            Patient Monitoring
          </h2>
          <p className="text-gray-600 mt-1">
            Record and track patient vital signs and recovery progress
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Patient Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="patientId">Patient ID *</Label>
                <Input
                  id="patientId"
                  value={formData.patientId}
                  onChange={(e) => handleInputChange('patientId', e.target.value)}
                  placeholder="Enter patient ID"
                  required
                />
              </div>
              <div>
                <Label htmlFor="timestamp">Timestamp</Label>
                <Input
                  id="timestamp"
                  value={new Date().toISOString().slice(0, 16)}
                  disabled
                  type="datetime-local"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span>Vital Signs</span>
            </CardTitle>
            <CardDescription>
              Record current vital measurements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="heartRate" className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>Heart Rate (BPM) *</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="heartRate"
                    type="number"
                    value={formData.heartRate}
                    onChange={(e) => handleInputChange('heartRate', e.target.value)}
                    placeholder="72"
                    required
                  />
                  {formData.heartRate && (
                    <div className={`w-3 h-3 rounded-full ${getVitalStatus('heartRate', formData.heartRate).color}`} />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="temperature" className="flex items-center space-x-2">
                  <Thermometer className="h-4 w-4 text-blue-500" />
                  <span>Temperature (°F) *</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={formData.temperature}
                    onChange={(e) => handleInputChange('temperature', e.target.value)}
                    placeholder="98.6"
                    required
                  />
                  {formData.temperature && (
                    <div className={`w-3 h-3 rounded-full ${getVitalStatus('temperature', formData.temperature).color}`} />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="oxygenSaturation" className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-green-500" />
                  <span>Oxygen Saturation (%)</span>
                </Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="oxygenSaturation"
                    type="number"
                    value={formData.oxygenSaturation}
                    onChange={(e) => handleInputChange('oxygenSaturation', e.target.value)}
                    placeholder="98"
                  />
                  {formData.oxygenSaturation && (
                    <div className={`w-3 h-3 rounded-full ${getVitalStatus('oxygenSaturation', formData.oxygenSaturation).color}`} />
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="bloodPressureSystolic">Blood Pressure (Systolic)</Label>
                <Input
                  id="bloodPressureSystolic"
                  type="number"
                  value={formData.bloodPressureSystolic}
                  onChange={(e) => handleInputChange('bloodPressureSystolic', e.target.value)}
                  placeholder="120"
                />
              </div>

              <div>
                <Label htmlFor="bloodPressureDiastolic">Blood Pressure (Diastolic)</Label>
                <Input
                  id="bloodPressureDiastolic"
                  type="number"
                  value={formData.bloodPressureDiastolic}
                  onChange={(e) => handleInputChange('bloodPressureDiastolic', e.target.value)}
                  placeholder="80"
                />
              </div>

              <div>
                <Label htmlFor="respiratoryRate">Respiratory Rate (per min)</Label>
                <Input
                  id="respiratoryRate"
                  type="number"
                  value={formData.respiratoryRate}
                  onChange={(e) => handleInputChange('respiratoryRate', e.target.value)}
                  placeholder="16"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Patient Assessment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Patient Assessment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="painLevel">Pain Level (0-10)</Label>
              <Select value={formData.painLevel} onValueChange={(value) => handleInputChange('painLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pain level" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(11)].map((_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i} - {i === 0 ? 'No Pain' : i <= 3 ? 'Mild' : i <= 6 ? 'Moderate' : 'Severe'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="symptoms">Current Symptoms</Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                placeholder="Describe any symptoms the patient is experiencing..."
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange('medications', e.target.value)}
                placeholder="List current medications and dosages..."
                className="min-h-[80px]"
              />
            </div>

            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any additional observations or notes..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" className="medical-gradient text-white">
            <Save className="h-4 w-4 mr-2" />
            Save Monitoring Data
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientMonitoringForm;
