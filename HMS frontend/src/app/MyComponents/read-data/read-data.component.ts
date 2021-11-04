import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service'
@Component({
  selector: 'app-read-data',
  templateUrl: './read-data.component.html',
  styleUrls: ['./read-data.component.css']
})
export class ReadDataComponent implements OnInit {
  data:any;
  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { 
    console.log('inside the consttructor')
    this.http.get<any>('https://gory-dungeon-96013.herokuapp.com/read-data').subscribe((data:any) => {
      console.log(data)
      this.data = data;
    })

  }
//   showToasterSuccess(){
//     this.notifyService.showSuccess("Logged In successfully !!", "HMS")
// }

  ngOnInit(): void {
  }
  postval(doctor:any,e:any){
    e.preventDefault();
 console.warn(doctor)
//   // console.warn(time)
//  let payload = {
//   doctor:doctor,
//   // time:time,
//   }
    
  // this.showToasterSuccess();
  this.router.navigateByUrl('admin-dashboard');
  }


}
