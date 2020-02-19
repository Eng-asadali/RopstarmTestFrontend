import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { OrderService } from '../Services/order.service';
import { SwalAlert } from 'src/app/Shared/swalAlerts';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);


  orders: any;
  loaded: boolean = false;
  table_headers:any = [];

  constructor(private OrderService: OrderService) { }

  ngOnInit() {
    this.table_headers = ['image','name','order status','order datetime','price'];
    const orders = this.OrderService.getOrders();
    orders.subscribe(
      result => {
        console.log('orders list:', result);
        if (!result['error']) {
          this.orders = result['data'];
          this.dataSource.data = this.orders;
          this.dataSource.connect().next(this.orders);
          this.dataSource.paginator = this.paginator;
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
      },
      err => { console.log(err); },
      () => {
        this.loaded = true;
        // console.log('call completed');
      }
    );
  }

}
