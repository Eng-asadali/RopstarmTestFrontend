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
  table_headers:any = [];

  constructor(private OrderService: OrderService, private router:Router) { }

  ngOnInit() {
    this.table_headers = ['name','order status','order datetime','price','actions'];
    this.postData['action']=1;
    this
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

  getOrderId(id){
  console.log("order id"+ id)
  this.router.navigate(['/instamunch/order/edit', id])
  }


  
  deleteOrderId(id){
    console.log("delete order id"+ id)
  this.OrderService.deleteOrder(id).subscribe(
    result=>{
      if(!result['error']){
     this.orderListing();
        SwalAlert.sucessAlert('','Order Deleted Successfully!');
      }
      else {
      SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

    }
    }
  );
    }

    orderListing(){
      this.loaded=false;
      this.postData['action']='action';

      const orders = this.OrderService.getOrders(this.postData);
    orders.subscribe(
      result => {
        console.log('orders list:', result);
        if (!result['error']) {
          this.loaded=true;

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
