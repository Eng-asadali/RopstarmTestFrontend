import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpServices: HttpService) { }

  getProuctById(id) {
    return this.httpServices.get('catalog/product/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  addProduct(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'catalog/product/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }

  editProduct(data,id){
    return this.httpServices.patchFormDataWithoutActiveStatus(data,'catalog/product/details/'+ id + "/").pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }

  getProducts() {
    return this.httpServices.get('catalog/product/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  getKitchenList() {
    return this.httpServices.get('kitchen/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] }))
    );
  }
  
}
