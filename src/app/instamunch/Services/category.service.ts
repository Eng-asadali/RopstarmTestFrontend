import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpServices: HttpService) { }

  getCategoryById(id) {
    return this.httpServices.get('catalog/category/details/' + id + "/").pipe(
      catchError(err => of({data:[]})));
  }

  editCategory(data,id){
    return this.httpServices.patch(data,'catalog/category/' + id + "/").pipe(
      catchError(err => of({data:[]})));
  }

  addCategory(data){
    return this.httpServices.postFormDataWithoutActiveStatus(data,'catalog/category/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[]})));
  }

  getCategories(){
   return this.httpServices.get('catalog/category/').pipe(
      catchError(err => of({data:[]})));
  }

  getParentCategories(){
    return this.httpServices.get('catalog/parent_category/').pipe(
      catchError(err => of({data:[]})));
  }

  
}
