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
  getCategories(){
    return this.httpServices.get('catalog/category/').pipe(
       catchError(err => of({error:true,message:'Server error',data:[]}))
       );
   }
   getAddOn(){
    return this.httpServices.get('catalog/addon/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]}))
      );
   }
   addGalleryPhoto(data) {
    return this.httpServices.postFormData(data, 'catalog/gallery/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getGalleryPhoto(){
    return this.httpServices.get('catalog/gallery/').pipe(
       catchError(err => of({error:true,message:'Server error',data:[]}))
       );
   }
   addEventDate(data) {
    return this.httpServices.postFormData(data, 'catalog/addEvent/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getEvents(){
    return this.httpServices.get('catalog/addEvent/').pipe(
       catchError(err => of({error:true,message:'Server error',data:[]}))
       );
   }

  addStoriesPhoto(data) {
    return this.httpServices.postFormData(data, 'catalog/stories/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getStoriesPhoto(){
    return this.httpServices.get('catalog/stories/').pipe(
       catchError(err => of({error:true,message:'Server error',data:[]}))
       );
   }

  addTodayPins(data) {
    return this.httpServices.postFormData(data, 'catalog/todaypins/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }
  getTodayPins(){
    return this.httpServices.get('catalog/todaypins/').pipe(
       catchError(err => of({error:true,message:'Server error',data:[]}))
       );
   }
}
