import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { CommonModule } from '@angular/common';

// Patient interfeysini PatientService dan import qiling
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  // ... boshqa kerakli maydonlar
}

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule], // *ngFor, *ngIf kabi direktivalar uchun
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  loading = true;
  error: any = null;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.loading = true;
    this.error = null;
    this.patientService.getPatients().subscribe({
      next: (data) => {
        this.patients = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching patients:', err);
        this.error = 'Bemorlar ro\'yxatini yuklashda xato yuz berdi.';
        this.loading = false;
      }
    });
  }
}
