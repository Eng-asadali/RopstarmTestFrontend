import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryCategoryService {

  constructor( private httpServices: HttpService) { }
  getInventoryData() {
    return this.httpServices.get('vehicle/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  addcategory(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'vehicle/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  editcategory(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'vehicle/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  deleteById(id) {
    return this.httpServices.delete('vehicle/delete/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }
   getcategoryById(id) {
    return this.httpServices.get('vehicle/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getParentCategories(){
    return this.httpServices.get('vehicleCategory/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
}
