import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
data:any
pastdata:any
  constructor(private http: HttpClient,private router: Router) {
    
  this.http.get<any>('https://gory-dungeon-96013.herokuapp.com/getbookedappointments').subscribe((data:any) => {
    console.log(data)
    this.data = data;
  })  
  this.http.get<any>('https://gory-dungeon-96013.herokuapp.com/pastappointments').subscribe((data:any) => {
    // console.log(this.pastdata)
    // this.pastdata = pastdata;
  })
   }

  ngOnInit(): void {
  }
  bookappointment(){
    this.router.navigateByUrl('appointment');
  }
}
