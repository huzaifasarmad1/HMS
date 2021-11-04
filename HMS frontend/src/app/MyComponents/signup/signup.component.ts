import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { }
  showToasterSuccess(){
    this.notifyService.showSuccess("Signed Up Successfully !!", "HMS")
}
 
showToasterError(){
    this.notifyService.showError("Key is duplicate or missing", "HMS")
}
  ngOnInit(): void {
  }
getval(first_name:any,second_name:any,email:any,number:any,password:any,role:any,e:any){
  e.preventDefault();
console.warn(first_name)
console.warn(second_name)
console.warn(email)
console.warn(password)
console.warn(role)
let payload = {
  first_name:first_name,
  second_name:second_name,
  email:email,
  number:number,
  password:password,
  role:role,
}
this.http.post<any>('https://gory-dungeon-96013.herokuapp.com/signup',payload).subscribe((data:any) => {
  console.log(data)
  if(data.message=="signup successful"){
    this.showToasterSuccess();
    this.router.navigateByUrl('/login');
  }
},
(err)=>{
 if(err.text=="signup successful"){
    this.showToasterSuccess();
    this.router.navigateByUrl('/login');
  }
  else{
    console.log(err)
    this.showToasterSuccess();
  this.router.navigateByUrl('/login');
}}
)   
}
navigate(){
  this.router.navigateByUrl('/login');
}
}
