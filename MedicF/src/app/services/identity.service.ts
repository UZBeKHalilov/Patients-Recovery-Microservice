import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service'; // AuthService ni import qilish

interface AuthResponse { // Backenddan keladigan javob strukturasi
  token: string;
  // ... boshqa maydonlar bo'lishi mumkin
}

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private apiUrl = `${environment.apiUrl}/gateway/auth`;

  constructor(
    private http: HttpClient,
    private authService: AuthService // AuthService ni inject qilish
  ) { }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          this.authService.setToken(response.token); // Tokenni saqlash
        }
      })
    );
  }

  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        if (response && response.token) {
          this.authService.setToken(response.token); // Tokenni saqlash
        }
      })
    );
  }
}
