import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  constructor(private httpServices: HttpService) { }

getKitchens() {
  return this.httpServices.get('kitchen/').pipe(
    catchError(err => of({ error: true, message: 'Server error', data: [], httpError:err })));
}
addKitchen(data){
  return this.httpServices.postFormDataWithoutActiveStatus(data,'kitchen/').pipe(
    catchError(err => of({error:true,message:'Server error',data:[]})));
}
editKitchen(data,id){
  return this.httpServices.patchFormDataWithoutActiveStatus(data,'kitchen/details/'+ id + "/").pipe(
    catchError(err => of({error:true,message:'Server error',data:[]})));
}
getKitchenById(id) {
  return this.httpServices.get('kitchen/details/' + id + "/").pipe(
    catchError(err => of({ error: true, message: 'Server error', data: [] })));
}
getManagers(){
  return this.httpServices.filter({"type" : "manager"},'user/filter/').pipe(
    catchError(err => of({error:true,message:'Server error',data:[]})));
}
deleteById(id) {
  return this.httpServices.delete('user/details/' + id + "/").pipe(
    catchError(err => of({error:true,message:'Server error',data:[]})));
 }
}