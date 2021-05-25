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
    return this.httpServices.get('inventory/category/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  addcategory(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'inventory/category/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  editcategory(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'inventory/category/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  deleteById(id) {
    return this.httpServices.delete('inventory/category/delete/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }
   getcategoryById(id) {
    return this.httpServices.get('inventory/category/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getParentCategories(){
    return this.httpServices.get('inventory/parent/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
}
