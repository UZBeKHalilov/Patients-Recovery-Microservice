import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Doctor } from '../models/doctor'; // Doctor interfeysini to'g'ri joydan import qilish

// Shifokor ma'lumotlari uchun interfeys (backend DTO ga mos kelishi kerak)
// Bu yerda Doctor interfeysi qayta aniqlanmaydi, balki models/doctor.ts dan import qilinadi.

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = `${environment.apiUrl}/doctormanagement/api/doctors`; // API Gateway orqali DoctorManagementService endpointi

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    // HTTP Interceptor avtomatik ravishda JWT tokenini qo'shadi
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  // ... boshqa CRUD metodlari (qo'shish, tahrirlash, o'chirish) keyinroq qo'shilishi mumkin
}
