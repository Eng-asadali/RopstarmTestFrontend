import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryVendorService {

  constructor(private httpServices: HttpService) { }
  getInventoryData() {
    return this.httpServices.get('inventory/vendor/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  addparentCategory(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'inventory/vendor/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  editparentCategory(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'inventory/vendor/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  deleteById(id) {
    return this.httpServices.delete('inventory/vendor/delete/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }
   getParentCategoryById(id) {
    return this.httpServices.get('inventory/vendor/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
}
