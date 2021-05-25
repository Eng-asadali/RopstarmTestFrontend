import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/Services/http.service';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryItemService {
  constructor(private httpServices: HttpService) { }
  getItemData() {
    return this.httpServices.get('inventory/item/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  addItem(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'inventory/item/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  editItem(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'inventory/item/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  deleteById(id) {
    return this.httpServices.delete('inventory/item/delete/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }
   getItemById(id) {
    return this.httpServices.get('inventory/item/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getOptionsById(id){
    if(id == null){
      return this.httpServices.get('inventory/itemoptions/').pipe(
        catchError(err => of({ error: true, message: 'Server error', data: [] })));     
    }else{
        return this.httpServices.get('inventory/itemget/' + id + "/").pipe(
          catchError(err => of({ error: true, message: 'Server error', data: [] })));
        }
  }
}
