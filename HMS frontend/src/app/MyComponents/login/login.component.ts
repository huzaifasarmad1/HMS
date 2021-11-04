import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service'
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { }
 showToasterSuccess(){
      this.notifyService.showSuccess("Logged In successfully !!", "HMS")
  }
   
  showToasterError(){
      this.notifyService.showError("Incorrect Email Or Password", "HMS")
  }
  Deactivated(){
    this.notifyService.showError("Account Deactivated", "HMS")
}
  ngOnInit(): void {
  }
  postval(email:any,password:any,e:any){
    e.preventDefault();
 console.warn(email)
  console.warn(password)
 let payload = {
  email:email,
    password:password,
  }
  this.http.post<any>('https://gory-dungeon-96013.herokuapp.com/login',payload).subscribe((data:any) => {
  
  console.log(data)
    if(data.message=="Login successful"){
      localStorage.setItem('token', data.token);
      // localStorage.setItem('user_id', data.user_id);
     // var decoded = jwt.verify(data.token, 'superSecret');
     var decoded:any={}
     decoded = jwt_decode(data.token);
 console.log(decoded.role)
    this.showToasterSuccess();
    // console.log(de)
    if(decoded.role=="Admin"){
      this.router.navigateByUrl('admin-dashboard');
    }
    else{
      if(decoded.role=="Patient"){
        this.router.navigateByUrl('dashboard');
      }
      else{
        if(decoded.role=="Doctor"){
          console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          this.router.navigateByUrl('doctors-dashboard');
        }
      }
    }
    }
    else{
      if(data.message=="Account Deactivated"){
        console.log(data)
        this.Deactivated();
      }
      console.log('Login unsuccessful')
      this.showToasterError();
    }
  },
  (err)=>{
if(err.error=="INCORRECT PASSWORD"||err.error=="INCORRECT EMAIL"){
  this.showToasterError();
}
else{
  
  if(err.error=="Account Deactivated"){
    this.Deactivated();
  }
}
  },
  // ()=>{
  //   this.showError();
  // }
  )

  }
}
