import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonitoringService } from '../../services/monitoring.service';
import { Monitoring } from '../../models/monitoring';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-monitoring-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './monitoring-list.component.html',
  styleUrl: './monitoring-list.component.css'
})
export class MonitoringListComponent implements OnInit {
  monitorings$: Observable<Monitoring[]> | undefined;
  errorMessage: string = '';

  constructor(private monitoringService: MonitoringService) { }

  ngOnInit(): void {
    this.loadMonitorings();
  }

  loadMonitorings(): void {
    this.monitorings$ = this.monitoringService.getMonitorings().pipe(
      catchError(error => {
        console.error('Error fetching monitorings:', error);
        this.errorMessage = 'Monitoring ma\'lumotlarini yuklashda xato yuz berdi. Iltimos, keyinroq urinib koʻring.';
        return of([]); // Return an empty array on error
      })
    );
  }
}
