import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { DoctorService } from '../../services/doctor.service';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

import { Doctor } from '../../models/doctor';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-admin-dashboard',
  imports:[CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  appointments: Appointment[] = [];
  loading = true;
  error = '';
  Math = Math;

  constructor(
    private patientService: PatientService,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.error = '';
    this.patientService.getPatients().subscribe({
      next: (data) => { this.patients = data; },
      error: (err) => { this.error = 'Bemorlarni yuklashda xatolik'; this.loading = false; }
    });
    this.doctorService.getDoctors().subscribe({
      next: (data) => { this.doctors = data; },
      error: (err) => { this.error = 'Shifokorlarni yuklashda xatolik'; this.loading = false; }
    });
    this.appointmentService.getAppointments().subscribe({
      next: (data) => { this.appointments = data; this.loading = false; },
      error: (err) => { this.error = 'Uchrashuvlarni yuklashda xatolik'; this.loading = false; }
    });
  }

  // Statistika metodlari
  getCriticalCases(): number {
    // Kritik holatdagi bemorlar sonini hisoblash
    return this.appointments.filter(a => a.status === 'Critical').length;
  }

  getCriticalCasesChange(): number {
    // Kechadan buyon o'zgarish (haqiqiy ma'lumotlar uchun API kerak bo'ladi)
    return Math.floor(Math.random() * 3) + 1; // Namuna uchun tasodifiy son
  }

  getRecoveredToday(): number {
    // Bugun tuzalgan bemorlar soni
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.appointments.filter(a => {
      const appointmentDate = new Date(a.appointmentDateTime);
      return a.status === 'Recovered' && 
             appointmentDate >= today;
    }).length;
  }

  getRecoveredChange(): number {
    // Kechadan buyon o'zgarish (haqiqiy ma'lumotlar uchun API kerak bo'ladi)
    return Math.floor(Math.random() * 5) + 1; // Namuna uchun tasodifiy son
  }

  // Tayinlanmagan bemorlar
  getUnassignedPatients(): Patient[] {
    // Shifokor tayinlanmagan bemorlarni filtrlash
    const assignedPatientIds = this.appointments.map(a => a.patientId);
    return this.patients.filter(p => !assignedPatientIds.includes(p.id));
  }

  // Shifokor bilan bog'liq metodlar
  getDoctorPatientCount(doctorId: string): number {
    // Shifokorga tayinlangan bemorlar soni
    return this.appointments.filter(a => a.doctorId === doctorId).length;
  }

  getMaxPatients(): number {
    // Har bir shifokor uchun maksimal bemor soni
    return 10; // Namuna uchun statik qiymat
  }

  isDoctorAvailable(doctorId: string): boolean {
    // Shifokor yangi bemorlarni qabul qila oladimi
    return this.getDoctorPatientCount(doctorId) < this.getMaxPatients();
  }
}