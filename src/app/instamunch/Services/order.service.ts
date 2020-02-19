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

  getOrders(){
   return this.httpServices.get('order/').pipe(
      catchError(err => of({data:[]})));
  }


  
}
