import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IdentityService } from '../../services/identity.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // AuthService ni import qilish

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router,
    private authService: AuthService // AuthService ni inject qilish
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.identityService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          // Registratsiya muvaffaqiyatli bo'lsa, login sahifasiga yo'naltirish
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          // Xatolikni foydalanuvchiga ko'rsatish
          alert('Registratsiya muvaffaqiyatsiz tugadi. Iltimos, qayta urinib ko\'ring.');
        }
      });
    } else {
      // Form invalid bo'lsa, xatoliklarni ko'rsatish
      alert('Iltimos, barcha maydonlarni to\'g\'ri to\'ldiring.');
    }
  }
}
