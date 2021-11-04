import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service'
@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.css']
})
export class UpdateDataComponent implements OnInit {
  data:any;
  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { 
   
    console.log('inside the consttructor')
    this.http.get<any>('https://gory-dungeon-96013.herokuapp.com/read-data').subscribe((data:any) => {
      console.log(data)
      this.data = data;
  })
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Data Updated Successfully !!", "HMS")
}

  ngOnInit(): void {
  }
  postval(){
       this.router.navigateByUrl('/updated');
  }
 }
