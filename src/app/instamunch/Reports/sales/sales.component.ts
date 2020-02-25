import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { SalesReportService } from '../../Services/sales-report.service';
import { DateUtils } from 'src/app/Shared/DateUtils';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  table_headers = [];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;



  sales_report = {};

  salesChartData = [{ name: 'Orders', data: [] }];
  salesChartLabels = [];
  doughnutChartLabels = [];
  doughnutChartData = [];

  chartReady: boolean = false;

  constructor(private salesReportService: SalesReportService) { }

  ngOnInit() {
    this.salesReportService.getSalesReport().subscribe(
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

        }
      },
      err => {

      },
      () => {

      }
    )
  }

  getSalesReport(sales_data) {
    sales_data.forEach((record) => {
      this.salesChartData[0].data.push(record.orders);
      this.salesChartLabels.push(DateUtils.getMMM(record.month));
    });
    this.chartReady = true;
  }

  getMostRunningProductsReport(most_running_product){
    most_running_product.forEach((record) => {
      this.doughnutChartData.push(record.overall);
      this.doughnutChartLabels.push(record.product__name);
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
