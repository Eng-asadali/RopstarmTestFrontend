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

  addProduct(data) {
    return this.httpServices.postFormDataWithoutActiveStatus(data, 'catalog/product/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  editProduct(data, id) {
    return this.httpServices.patchFormDataWithoutActiveStatus(data, 'catalog/product/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteProductById(id: number) {
    return this.httpServices.delete('catalog/product/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteMultipleProducts(products_ids: []) {
    return this.httpServices.postWithoutStatus({product_ids:products_ids},'catalog/product/delete/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [],httpError: err })));
  }

  getProducts() {
    return this.httpServices.get('catalog/product/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [], httpError: err })));
  }

  getFilterTable(data) {
    return this.httpServices.filterProduct(data, 'catalog/product/filter/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));

    // return this.httpServices.post(data,'catalog/product/filter/').pipe(
    //   catchError(err => of({ error: true, message: 'Server error', data: [], httpError: err })));
  }

  getKitchenList() {
    return this.httpServices.get('kitchen/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] }))
    );
  }
}
