import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-doctors-dashboard',
  templateUrl: './doctors-dashboard.component.html',
  styleUrls: ['./doctors-dashboard.component.css']
})
export class DoctorsDashboardComponent implements OnInit {
  data:any;
  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { 
    var decoded:any={}
          var retrievedtoken = localStorage.getItem('token') || ""
          decoded = jwt_decode(retrievedtoken);
          let payload = {
           user_id:decoded.user_id,
          }
    console.log('inside the consttructor')
    this.http.post<any>('https://gory-dungeon-96013.herokuapp.com/doctors-data',payload).subscribe((data:any) => {
      console.log(data)
      this.data = data;
    })
  }
  ngOnInit(): void {
  }
  // this.router.navigateByUrl('add-data');
}
