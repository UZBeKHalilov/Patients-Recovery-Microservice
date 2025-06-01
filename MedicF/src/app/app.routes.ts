import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { DoctorListComponent } from './components/doctor-list/doctor-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { MonitoringListComponent } from './components/monitoring-list/monitoring-list.component';
import { RehabilitationPlansComponent } from './components/rehabilitation/rehabilitation-plans/rehabilitation-plans.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'patients', component: PatientListComponent, canActivate: [authGuard] },
  { path: 'doctors', component: DoctorListComponent, canActivate: [authGuard] },
  { path: 'appointments', component: AppointmentListComponent, canActivate: [authGuard] },
  { path: 'monitorings', component: MonitoringListComponent, canActivate: [authGuard] },
  { path: 'rehabilitation-plans', component: RehabilitationPlansComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];