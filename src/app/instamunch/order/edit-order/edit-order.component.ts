import { OrderService } from './../../Services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';


import { order } from '../order';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { orderStatus } from '../../Options/order-status';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;
  constructor(private OrderService: OrderService, private active_route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    const order_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
    this.getOrderById(order_id);
  }

  getOrderById(id) {
    let order = this.OrderService.getOrderbyid(id);
    order.subscribe(
      result => {
        console.log('Order by id:', result);
        if (!result['error']) {
          this.generateForm(result['data'][0]);
          this.loaded = true;
        }
        else {
          this.loaded = true;
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }

      },
      err => { console.log(err); }
    );
  }

  generateForm(order?: order) {
    this.fields = [
      { label: 'Amount Recieved', type: 'number', bootstrapGridClass: "col-lg-6", name: "amount_received", validations: [Validators.required], required: true, value: order ? order.amount_received : '' },
      {
        label: 'Amount Returned', type: 'number', bootstrapGridClass: "col-lg-6", name: "amount_returned", validations: [Validators.required], required: true, value: order ? order.amount_returned : ''
      },
      {
        label: 'Order Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "order_status", validations: [Validators.required], required: true, value: order ? order.order_status : '', options: orderStatus
      },
      {
        label: 'Tip', type: 'number', bootstrapGridClass: "col-lg-6", name: "tip", validations: [Validators.required], required: true, value: order ? order.tip : ''
      }]
    this.form['form_fields'] = this.fields;
    this.form['FormbootstrapGridClass'] = 'col-lg-12';
    this.form['map'] = false;
    this.form['MapbootstrapGridClass'] = 'col-lg-4';
    this.form['image'] = false;
    this.form['ImagebootstrapGridClass'] = 'col-lg-3';
    this.form['img_height'] = "200px";
    this.form['img_width'] = "200px";
    this.form['submit'] = 'Save';


  }


  getOrderData(data) {
    console.log(data);
    this.submit_clicked = true;
    const order_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
    this.editOrder(data, order_id);


  }

  editOrder(data, id) {
    this.OrderService.uploadOrderById(data, id).subscribe(
      result => {
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Order Updated Sucessfully!');
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

        }
        console.log(result);

      },
      err => {
        console.error(err);
        SwalAlert.errorAlert('', 'Server Error');
      },
      () =>{
        this.submit_clicked = false;
      }
    );
  }

  navigateToOrderListing() {
    this.router.navigate(['instamunch/order']);
  }

  // updateOrderData(data){
  //   console.log(data);
  //   data['is_epos']=true;
  //   data['branch_id']=1;
  //   //data['username']=data.email;
  //   data['modified_by_id']=2;
  //   data['created_by_id']=2;


  //   //if (this.active_route.snapshot.paramMap.get('id') != null) {
  //     const staff_id = parseInt(this.active_route.snapshot.paramMap.get('id'));

  //     this.OrderService.UpdateOrderById(data,staff_id).subscribe(
  //       result=>{
  //         console.log("Inside Result");

  //         if(!result['error']){
  //           this.clear_form= true;
  //           console.log("Ok Result");
  //                   SwalAlert.sucessAlert('','Staff Updated Added!');
  //         }
  //         else{
  //           SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

  //         }
  //     console.log(result);

  //    }
  //       );
  //  // }

  // // else{

  // //   this.StaffService.addStaff(data).subscribe(
  // //     result=>{
  // //       console.log("Inside Result");

  // //       if(!result['error']){
  // //         this.clear_form= true;
  // //         console.log("Ok Result");
  // //                 SwalAlert.sucessAlert('','Staff Created Added!');
  // //       }
  // //       else{
  // //         SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

  // //       }
  // //   console.log(result);

  // //  }
  // //     );
  // // }



  //   }







}
