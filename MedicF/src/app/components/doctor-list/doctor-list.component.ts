import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor';
import { Observable, catchError, of, startWith } from 'rxjs';

@Component({
  selector: 'app-doctor-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent implements OnInit {
  doctors$: Observable<Doctor[]> = of([]); // Boshlang'ich qiymat berish
  loading = true;
  error: any = null;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.doctors$ = this.doctorService.getDoctors().pipe(
      startWith([]), // Optional: show empty list initially
      catchError(err => {
        this.error = err;
        this.loading = false;
        console.error('Error fetching doctors:', err);
        return of([]); // Return empty array on error
      })
    );

    // Subscribe to handle loading state and potential errors not caught by catchError
    this.doctors$.subscribe({
      next: () => this.loading = false,
      error: (err) => {
        this.error = err;
        this.loading = false;
        console.error('Error in doctors$ subscription:', err);
      }
    });
  }
}