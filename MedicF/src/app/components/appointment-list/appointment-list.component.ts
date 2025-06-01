import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {
  appointments$: Observable<Appointment[]> | undefined;
  errorMessage: string = '';

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointments$ = this.appointmentService.getAppointments().pipe(
      catchError(error => {
        console.error('Error fetching appointments:', error);
        this.errorMessage = 'Navbatlarni yuklashda xato yuz berdi. Iltimos, keyinroq urinib koʻring.';
        return of([]); // Return an empty array on error
      })
    );
  }
}
