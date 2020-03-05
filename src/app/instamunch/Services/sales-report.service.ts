import { Injectable } from '@angular/core';
import { HttpService } from '../../Services/http.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SalesReportService {

  constructor(private httpServices: HttpService) { }

  getSalesReport() {
    return this.httpServices.filter({},'order/reporting/').pipe(
      catchError(err => of({error:true,message:'Server error',data:[],httpError:err})));
  }

  
}
