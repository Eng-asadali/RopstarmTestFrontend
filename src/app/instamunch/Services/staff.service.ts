import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private httpServices: HttpService) { }

  getStaff() {
    return this.httpServices.get('user/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  addStaff(data) {
    return this.httpServices.postFormData(data, 'user/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));

  }

  getStaffById(id) {
    return this.httpServices.get('user/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }


  uploadStaffById(data, id) {
    return this.httpServices.patchFormData(data, 'user/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteById(id) {
    return this.httpServices.delete('user/details/' + id + "/").pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [] })));
  }

  deleteMultipeStaff(ids: []){
    return this.httpServices.postWithoutStatus({user_ids:ids},'user/delete/').pipe(
      catchError(err => of({ error: true, message: 'Server error', data: [],httpError: err })));
  }
}
