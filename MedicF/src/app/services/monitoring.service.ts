import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Monitoring } from '../models/monitoring';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonitoringService {
  private apiUrl = `${environment.apiUrl}/monitoringservice/api/monitorings`;

  constructor(private http: HttpClient) { }

  getMonitorings(): Observable<Monitoring[]> {
    return this.http.get<Monitoring[]>(this.apiUrl);
  }

  getMonitoringById(id: string): Observable<Monitoring> {
    return this.http.get<Monitoring>(`${this.apiUrl}/${id}`);
  }

  createMonitoring(monitoring: Monitoring): Observable<Monitoring> {
    return this.http.post<Monitoring>(this.apiUrl, monitoring);
  }

  updateMonitoring(id: string, monitoring: Monitoring): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, monitoring);
  }

  deleteMonitoring(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
