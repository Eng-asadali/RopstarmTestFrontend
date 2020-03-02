import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { SalesReportService } from '../instamunch/Services/sales-report.service';

@Injectable()
export class SalesReportResolver implements Resolve<Observable<any>> {
  constructor(private salesReportService: SalesReportService) {}

  resolve() {
    return of(this.salesReportService.getSalesReport());
 //   return of({remainingPercentage:40});
  }
}