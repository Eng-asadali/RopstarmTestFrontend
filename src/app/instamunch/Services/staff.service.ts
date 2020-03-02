import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpServices: HttpService) { }

//   getProuctById(id) {
//     return this.httpServices.get('catalog/product/details/' + id + "/").pipe(
//       catchError(err => of({data:[]})));
//   }

  getStaff(){
   return this.httpServices.get('user/').pipe(
      catchError(err => of({data:[]})));
  }
  addStaff(data){
    console.log("Inside staff service")
   return this.httpServices.post(data,'user/').pipe(
    catchError(err => of({data:[]})));
   
 }

 getStaffById(id) {
   console.log("id"+ id)
  return this.httpServices.get('user/details/' + id + "/").pipe(
    catchError(err => of({data:[]})));
}


uploadStaffById(data,id) {
  console.log("data"+ data)
 return this.httpServices.patch(data,'user/details/'+id+ "/").pipe(
   catchError(err => of({data:[]})));
}



deleteStaffById(id) {
  console.log("id"+ id)
 return this.httpServices.delete('user/details/' + id + "/").pipe(
   catchError(err => of({data:[]})));
}
  
}
