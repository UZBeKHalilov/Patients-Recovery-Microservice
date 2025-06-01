export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentDateTime: Date;
  status: string;
  notes: string;
}