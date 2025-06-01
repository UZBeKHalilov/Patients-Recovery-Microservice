export interface Monitoring {
  id: string;
  patientId: string;
  timestamp: Date;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  notes: string;
}