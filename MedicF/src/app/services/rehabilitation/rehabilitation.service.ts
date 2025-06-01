import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RehabilitationService {
  private apiUrl = `${environment.apiUrl}/rehabilitation`;

  constructor(private http: HttpClient) { }

  getRehabilitationPlans(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRehabilitationPlanById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createRehabilitationPlan(plan: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, plan);
  }

  updateRehabilitationPlan(id: string, plan: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, plan);
  }

  deleteRehabilitationPlan(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getRehabilitationProgresses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/progresses`);
  }

  getRehabilitationProgressById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/progresses/${id}`);
  }

  createRehabilitationProgress(progress: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/progresses`, progress);
  }

  updateRehabilitationProgress(id: string, progress: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/progresses/${id}`, progress);
  }

  deleteRehabilitationProgress(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/progresses/${id}`);
  }
}