import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { OrderService } from '../Services/order.service';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { CurrencyService } from '../Services/currency.service';

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

  order_ids: any

  constructor(private OrderService: OrderService, private router: Router,public currency_service:CurrencyService) { }

  ngOnInit() {
    this.table_headers = ['select', 'name', 'floor', 'order status', 'order datetime', 'price', 'actions'];
    this.orderListing();
  }

  orderListing() {
    this.loaded = false;
    this.postData['action'] = 'action';

    const orders = this.OrderService.getOrders(this.postData);
    orders.subscribe(
      result => {
        debugger;
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
        this.loaded = true;
        this.selection.clear();
      },
      err => {
        this.loaded = true;
        console.log(err);
      }
    );
  }


  refresh(){
    this.loaded = false;
    this.dataSource.data = [];
    this.orderListing();
  }

  getOrderId(id, action) {
    console.log("order id" + id)
    if (action == 'edit')
      this.router.navigate([this.router.url + '/edit', id]);
    else
      this.deleteOrderById(id);

  }

  async deleteOrderById(order_id) {
    const response = await SwalAlert.getDeleteSwal();
    if (response == true) {
      this.loaded = false;
      this.OrderService.deleteOrder(order_id).subscribe(
        result => {
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Order Deleted Successfully!');
            this.orderListing();
          }
          else {
            this.loaded = true;
            SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }
        },
        err => {
          this.loaded = true;
          console.error(err);
        }
      );
    }
  }

  async deleteMultipleOrders() {
    if (this.order_ids.length > 0) {
      const response = await SwalAlert.getDeleteSwal();
      if (response == true) {
        this.loaded = false;
        this.OrderService.deleteMultipleOrders(this.order_ids).subscribe(
          result => {
            if (!result['error']) {
              SwalAlert.sucessAlert('', 'Orders Deleted Successfully!');
              this.orderListing();
            }
            else {
              this.loaded = true;
              SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
            }
          },
          err => {
            this.loaded = true;
            console.error(err);
          }
        )
      }
    }
    else {
      SwalAlert.errorAlert('', 'Please Select Order to Delete!');
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.order_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
  }

  // $event ? selection.toggle(row) : null
  checkboxClicked(event, row) {
    if (event) {
      this.selection.toggle(row);
    }
    else
      null;

    this.order_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getIdsFromSelectionArrayObject(array_of_objects) {
    let ids = array_of_objects.map(a => a.id);
    return ids;
  }
}
