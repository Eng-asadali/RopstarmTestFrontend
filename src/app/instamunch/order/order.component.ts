import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  //postData:any [];
  // postData:any;
  postData = {};
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;

  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);


  orders: any;
  loaded: boolean = false;
  table_headers: any = [];

  constructor(private OrderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.table_headers = ['select', 'name','floor', 'order status', 'order datetime', 'price', 'actions'];
    this.orderListing();
  }

  getOrderId(id) {
    console.log("order id" + id)
    this.router.navigate(['/instamunch/order/edit', id])
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
    console.log(this.selection);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    console.log(this.selection);
  }

  // $event ? selection.toggle(row) : null
  checkboxClicked(event, row) {
    if (event) {
      this.selection.toggle(row);
    }
    else
      null;

    console.log(this.selection);
  }


  deleteOrderId(id) {
    console.log("delete order id" + id)
    this.OrderService.deleteOrder(id).subscribe(
      result => {
        if (!result['error']) {
          this.orderListing();
          SwalAlert.sucessAlert('', 'Order Deleted Successfully!');
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

        }
      }
    );
  }

  orderListing() {
    this.loaded = false;
    this.postData['action'] = 'action';

    const orders = this.OrderService.getOrders(this.postData);
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
