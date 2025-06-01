import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Bemor ma'lumotlari uchun interfeys (backend DTO ga mos kelishi kerak)
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  // ... boshqa kerakli maydonlar
}

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = `${environment.apiUrl}/patientmanagement/api/patients`; // API Gateway orqali PatientManagementService endpointi

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Patient[]> {
    // HTTP Interceptor avtomatik ravishda JWT tokenini qo'shadi
    return this.http.get<Patient[]>(this.apiUrl);
  }

  // ... boshqa CRUD metodlari (qo'shish, tahrirlash, o'chirish) keyinroq qo'shilishi mumkin
}
