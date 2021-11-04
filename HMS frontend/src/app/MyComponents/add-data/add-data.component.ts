import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../notification.service'
@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.css']
})
export class AddDataComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { }
  showToasterSuccess(){
    this.notifyService.showSuccess("Data Added Successfully !!", "HMS")
}
  ngOnInit(): void {
  }
  postval(doctor:any,time:any,e:any){
    e.preventDefault();
 console.warn(doctor)
  console.warn(time)
 let payload = {
  doctor:doctor,
  time:time,
  active:false
  }
  this.http.post<any>('https://gory-dungeon-96013.herokuapp.com/add-data',payload).subscribe((data:any) => {
    console.log(data)
  })   
  this.showToasterSuccess();
  this.router.navigateByUrl('admin-dashboard');
  }

}
