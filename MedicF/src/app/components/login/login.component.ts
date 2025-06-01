import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentityService } from '../../services/identity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // AuthService ni import qilish
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router,
    private authService: AuthService // AuthService ni inject qilish
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.identityService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          // Login muvaffaqiyatli bo'lsa, boshqaruv paneliga yo'naltirish
          this.router.navigate(['/dashboard']); // 'dashboard' marshrutiga yo'naltiramiz
        },
        error: (error) => {
          console.error('Login failed', error);
          // Xatolikni foydalanuvchiga ko'rsatish
          alert('Login muvaffaqiyatsiz tugadi. Iltimos, foydalanuvchi nomi va parolni tekshiring.');
        }
      });
    } else {
      // Form invalid bo'lsa, xatoliklarni ko'rsatish
      alert('Iltimos, foydalanuvchi nomi va parolni to\'ldiring.');
    }
  }
}
