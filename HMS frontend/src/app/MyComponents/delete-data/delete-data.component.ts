import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from "@angular/router";
import { NotificationService } from '../../notification.service'
@Component({
  selector: 'app-delete-data',
  templateUrl: './delete-data.component.html',
  styleUrls: ['./delete-data.component.css']
})
export class DeleteDataComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private notifyService : NotificationService) { }
  showToasterSuccess(){
    this.notifyService.showSuccess("Deleted Data successfully !!", "HMS")
}
showToasterError(){
  this.notifyService.showError("No Data to Delete !!", "HMS")
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
  }
  this.http.post<any>('https://gory-dungeon-96013.herokuapp.com/delete-data',payload).subscribe((data:any) => {
    console.log(data)
    if(data.message=="Already no appointment at this time"){
      this.showToasterError();
    }
    else{
      this.showToasterSuccess();
      this.router.navigateByUrl('admin-dashboard');
    }
  })   
  
  }


}
