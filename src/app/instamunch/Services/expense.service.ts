import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private httpServices: HttpService) { }
  getExpenses() {
    return this.httpServices.get('expense/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [], httpError:err })));
  }



  getExpenseById(id) {
    return this.httpServices.get('expense/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  addExpense(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'expense/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }

  editExpense(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'expense/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }

  getProducts() {
    return this.httpServices.get('catalog/product/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [], httpError:err })));
  }

  getKitchenList() {
    return this.httpServices.get('kitchen/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] }))
    );
  }
  deleteById(id) {
    return this.httpServices.delete('expense/details/' + id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
   }

}
