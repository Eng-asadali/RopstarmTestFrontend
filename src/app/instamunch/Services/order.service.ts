import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpServices: HttpService) { }

  getOrders(data) {
    return this.httpServices.filter(data, 'order/filter/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  getOrderbyid(id) {
    return this.httpServices.get('order/details/' + id + '/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteOrder(id) {
    return this.httpServices.delete('order/details/' + id + '/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteMultipleOrders(ids: []) {
    return this.httpServices.postWithoutStatus({ order_ids: ids }, 'order/delete/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [], httpError: err })));
  }


  uploadOrderById(data, id) {
    console.log("data" + data)
    return this.httpServices.patch(data, 'order/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

}
