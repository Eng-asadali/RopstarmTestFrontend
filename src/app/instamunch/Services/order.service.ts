import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpServices: HttpService) { }

//   getProuctById(id) {
//     return this.httpServices.get('catalog/product/details/' + id + "/").pipe(
//       catchError(err => of({data:[]})));
//   }

  // getOrders(){
  //  return this.httpServices.get('order/').pipe(
  //     catchError(err => of({data:[]})));
  // }

  getOrders(data){
    return this.httpServices.filter(data,'order/filter/').pipe(
       catchError(err => of({error:true,message:'Server error',data:[]})));
   }

  getOrderbyid(id){
    return this.httpServices.get('order/details/'+id+'/').pipe(
       catchError(err => of({error:true,message:'Server error',data:[]})));
   }
  
   deleteOrder(id){
    return this.httpServices.delete('order/details/' + id + '/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }


   uploadOrderById(data,id) {
    console.log("data"+ data)
   return this.httpServices.patch(data,'order/details/'+id+ "/").pipe(
     catchError(err => of({error:true,message:'Server error',data:[]})));
  }
  
}
