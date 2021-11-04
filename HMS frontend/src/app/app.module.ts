import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './MyComponents/signup/signup.component';
import { LoginComponent } from './MyComponents/login/login.component';
import { DashboardComponent } from './MyComponents/dashboard/dashboard.component';
import { AppointmentComponent } from './MyComponents/appointment/appointment.component';
import { AddDataComponent } from './MyComponents/add-data/add-data.component';
import { DoctorsDashboardComponent } from './MyComponents/doctors-dashboard/doctors-dashboard.component';
import { AdminDahboardComponent } from './MyComponents/admin-dahboard/admin-dahboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ReadDataComponent } from './MyComponents/read-data/read-data.component';
import { UpdateDataComponent } from './MyComponents/update-data/update-data.component';
import { DeleteDataComponent } from './MyComponents/delete-data/delete-data.component';
import { ActivateComponent } from './MyComponents/activate/activate.component';
import { DeactivateComponent } from './MyComponents/deactivate/deactivate.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { UpdatedComponent } from './MyComponents/updated/updated.component';




@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    AppointmentComponent,
    AddDataComponent,
    DoctorsDashboardComponent,
    AdminDahboardComponent,
    ReadDataComponent,
    UpdateDataComponent,
    DeleteDataComponent,
    ActivateComponent,
    DeactivateComponent,
    UpdatedComponent
  ],
  imports: [
    BrowserModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
