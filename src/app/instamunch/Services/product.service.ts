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
      catchError(err => of({data:[]})));
  }

  getProducts(){
   return this.httpServices.get('catalog/product/').pipe(
      catchError(err => of({data:[]})));
  }

//   getParentCategories(){
//     return this.httpServices.get('catalog/parent_category/').pipe(
//       catchError(err => of({data:[]})));
//   }

  
}
