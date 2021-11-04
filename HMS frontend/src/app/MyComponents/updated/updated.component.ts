import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service'
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-updated',
  templateUrl: './updated.component.html',
  styleUrls: ['./updated.component.css']
})
export class UpdatedComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { }

  ngOnInit(): void {
  }
  postval(doctor:any,time:any,e:any){
  var retrievedtoken = localStorage.getItem('token') || ""
  var decoded = jwt_decode(retrievedtoken);
console.log(decoded)
 e.preventDefault();
console.warn(doctor)
console.warn(time)
let payload = {
doctor:doctor,
time:time,
// user_id:retrievedid
}
this.http.post<any>('https://gory-dungeon-96013.herokuapp.com/update-data',payload).subscribe((dataarray:any) => {
  console.log(dataarray)
})
}
}