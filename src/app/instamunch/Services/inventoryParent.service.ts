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
    return this.httpServices.get('inventory/parent/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  addparentCategory(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'inventory/parent/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  editparentCategory(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'inventory/parent/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  deleteById(id) {
    return this.httpServices.delete('inventory/parent/delete/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }
   getParentCategoryById(id) {
    return this.httpServices.get('inventory/parent/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
}
