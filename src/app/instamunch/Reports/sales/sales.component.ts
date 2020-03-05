import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

import { SalesReportService } from '../../Services/sales-report.service';
import { DateUtils } from 'src/app/Shared/DateUtils';
import { SwalAlert } from '../../../Shared/swalAlerts';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  table_headers = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;



  sales_report = {
    overall_summary: { total_orders: '-', total_revenue: '-', total_tips: '-' }, category_sales_breakdown: [], waiter_sales_breakdown: [],
    product_sales_breakdown: [], monthly_sales_breakdown: []
  };

  salesChartData = [{ name: 'Orders', data: [] }];
  salesChartLabels = [];
  doughnutChartLabels = [];
  doughnutChartData = [];

  chartReady: boolean = false;
  chartReadyD: boolean = false;

  constructor(private salesReportService: SalesReportService, private activated_route: ActivatedRoute) { }

  ngOnInit() {
    this.activated_route.data.pipe(map(data => data.cres)).subscribe(result => {
      // console.log(result);
      let response = result;
      response.subscribe(
        result => {
          if (!result['error']) {
            console.log('sales report', result);
            this.sales_report = result['data'];
            this.table_headers = ['image', 'name', 'amount', 'tip'];
            this.dataSource.data = result['data']['waiter_sales_breakdown'];
            this.getSalesReport(result['data']['monthly_sales_breakdown']);
            this.getMostRunningProductsReport(result['data']['product_sales_breakdown']);
            this.dataSource.connect().next(result['data']);
            this.dataSource.paginator = this.paginator;
          }
          else {
            if (result['httpError']['status'] != 401)
              SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }
        },
        err => {

        },
        () => {

        }
      )
    });
    // this.salesReportService.getSalesReport().subscribe(
    //   result => {
    //     if (!result['error']) {
    //       console.log('sales report', result);
    //       this.sales_report = result['data'];
    //       this.table_headers = ['image', 'name', 'amount', 'tip'];
    //       this.dataSource.data = result['data']['waiter_sales_breakdown'];
    //       this.getSalesReport(result['data']['monthly_sales_breakdown']);
    //       this.getMostRunningProductsReport(result['data']['product_sales_breakdown']);
    //       this.dataSource.connect().next(result['data']);
    //       this.dataSource.paginator = this.paginator;
    //     }
    //     else {

    //     }
    //   },
    //   err => {

    //   },
    //   () => {

    //   }
    // )
  }

  getSalesReport(sales_data) {
    sales_data.forEach((record) => {
      this.salesChartData[0].data.push(record.orders);
      this.salesChartLabels.push(DateUtils.getMMM(record.month));
    });
    this.chartReady = true;
  }

  getMostRunningProductsReport(most_running_product) {
    most_running_product.forEach((record) => {
      this.doughnutChartData.push(record.overall);
      this.doughnutChartLabels.push(record.product__name);
    });
    this.chartReadyD = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
