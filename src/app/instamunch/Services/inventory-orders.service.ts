import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryOrdersService {
  constructor( private httpServices: HttpService) { }
  getInventoryData() {
    return this.httpServices.get('inventory/orders/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  addorders(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'inventory/orders/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  editorders(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'inventory/orders/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  deleteById(id) {
    return this.httpServices.delete('inventory/orders/delete/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }
   getordersById(id) {
    return this.httpServices.get('inventory/orders/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getParentCategories(){
    return this.httpServices.get('vehicleCategory/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
}
