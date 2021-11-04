import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import { NotificationService } from '../../notification.service'
import { DatePickerComponent } from 'ng2-date-picker';
@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { }
  date = new Date();


  ngOnInit(): void {
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Appointment Booked Successfully !!", "HMS")
}
showToasterError(){
  this.notifyService.showError("Please Select Another Time", "Already Booked")
}
showDBError(){
  this.notifyService.showError("Please Select Another Time", "Not Available")
}
  postval(doctor:any,time:any,e:any){
   var decoded:any={}
    var retrievedtoken = localStorage.getItem('token') || ""
    decoded = jwt_decode(retrievedtoken);
//  console.log(decoded.user_id)
    e.preventDefault();
 console.warn(doctor)
  console.warn(this.date)
 let payload = {
  doctor:doctor,
  time:time,
  active:true,
  user_id:decoded.user_id,

}
  this.http.put<any>('https://gory-dungeon-96013.herokuapp.com/bookappointment',payload).subscribe((data:any) => {
    console.log(data)
    if(data.message=="Already Booked"){
      this.showToasterError();  
    }
    else{
      if(data.message=="updated item Successfull")
      this.showToasterSuccess();  
      this.router.navigateByUrl('dashboard');
    }
  },
  (err)=>{
    this.showDBError()
  }
  ) }
}
