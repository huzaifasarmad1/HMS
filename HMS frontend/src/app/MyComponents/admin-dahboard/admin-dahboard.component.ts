import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service'
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-admin-dahboard',
  templateUrl: './admin-dahboard.component.html',
  styleUrls: ['./admin-dahboard.component.css']
})
export class AdminDahboardComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { }
  showToasterSuccessActivate(){
    this.notifyService.showSuccess("Activated successfully !!", "HMS")
}
showToasterError(){
  this.notifyService.showError("Already Activated Account !!", "HMS")
}

  ngOnInit(): void {
  }
  create(){
  this.router.navigateByUrl('add-data');
  }
  read(){
    this.router.navigateByUrl('read-data');
    }
    update(){
      this.router.navigateByUrl('update-data');
      }
      delete(){
        this.router.navigateByUrl('delete-data');
        }
        activate(){
          var decoded:any={}
          var retrievedtoken = localStorage.getItem('token') || ""
          decoded = jwt_decode(retrievedtoken);
          let payload = {
           user_id:decoded.user_id,
           activeaccount:true
          }
          this.http.put<any>('https://gory-dungeon-96013.herokuapp.com/activate',payload).subscribe((data:any) => {
    console.log(data)
    if(data.message=="Already Activated Account"){
      this.showToasterError();
    }
    else{
      this.showToasterSuccessActivate();
      this.router.navigateByUrl('admin-dashboard');
    }
  })   
          this.router.navigateByUrl('admin-dashboard');
          }
          deactivate(){
            var decoded:any={}
            var retrievedtoken = localStorage.getItem('token') || ""
            decoded = jwt_decode(retrievedtoken);
            let payload = {
             user_id:decoded.user_id,
             activeaccount:false
            }
            this.http.put<any>('https://gory-dungeon-96013.herokuapp.com/deactivate',payload).subscribe((data:any) => {
      console.log(data)
      if(data.message=="Already Dectivated Account"){
        this.showToasterError();
      }
      else{
        this.showToasterSuccessActivate();
        this.router.navigateByUrl('admin-dashboard');
      }
    })   
            this.router.navigateByUrl('admin-dashboard');
            }



}
