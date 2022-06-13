import { HttpService } from '../../Services/http.service';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryParentService {

  constructor( private httpServices: HttpService) { }
  getInventoryData() {
    return this.httpServices.get('vehicleCategory/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  addparentCategory(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'vehicleCategory/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  editparentCategory(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'vehicleCategory/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  deleteById(id) {
    return this.httpServices.delete('vehicleCategory/delete/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }
   getParentCategoryById(id) {
    return this.httpServices.get('vehicleCategory/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
}
