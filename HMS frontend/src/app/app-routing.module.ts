import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDataComponent } from './MyComponents/add-data/add-data.component';
import { AdminDahboardComponent } from './MyComponents/admin-dahboard/admin-dahboard.component';
import { AppointmentComponent } from './MyComponents/appointment/appointment.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { DoctorsDashboardComponent } from './MyComponents/doctors-dashboard/doctors-dashboard.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { SignupComponent } from './MyComponents/signup/signup.component';
import { ReadDataComponent } from './MyComponents/read-data/read-data.component';
import { UpdateDataComponent } from './MyComponents/update-data/update-data.component';
import { DeleteDataComponent } from './MyComponents/delete-data/delete-data.component';
import { UpdatedComponent } from './MyComponents/updated/updated.component';
const routes: Routes = [
 
  { path: 'signup', component: SignupComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'add-data', component: AddDataComponent },
  { path: 'admin-dashboard',      component: AdminDahboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'appointment',      component: AppointmentComponent },
  { path: 'doctors-dashboard',      component: DoctorsDashboardComponent },
  { path: 'read-data', component: ReadDataComponent },
  { path: 'update-data', component: UpdateDataComponent },
  { path: 'delete-data', component: DeleteDataComponent },
  { path: 'updated', component: UpdatedComponent },
  {path: '', redirectTo: '/signup', pathMatch: 'full'},
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
