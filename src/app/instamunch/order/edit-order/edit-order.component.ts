import { OrderService } from './../../Services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { order } from '../order';
import { FieldConfig } from '../../../Interfaces/feildConfig';

import { SwalAlert } from '../../../Shared/swalAlerts'; 

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
  constructor(private OrderService:OrderService, private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.form['form_fields'] = this.fields;
    //   if (this.active_route.snapshot.paramMap.get('id') != null) {
         const order_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
         let order = this.OrderService.getOrderbyid(order_id);
         order.subscribe(
           result => {
             console.log('Order by id:', result);
             if (!result['error']) {
               this.loaded = true;
              this.generateForm(result['data'][0]);
              
             }
             else {
               this.loaded = true;
               SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
             }
   
           },
           err => { console.log(err); },
           () => { console.log('call completed'); }
         );
  }
  generateForm(order?: order) {
    //    this.categoryService.getCategories().subscribe(
         // result => {
          //  if (!result['error']) {
              this.fields = [
                { label: 'Amount Recieved', type: 'number', bootstrapGridClass: "col-lg-6", name: "amount_received", validations: [Validators.required], required: true, value: order ? order.amount_received : '' },
                {
                  label: 'Amount Returned', type: 'number', bootstrapGridClass: "col-lg-6", name: "amount_returned", validations: [Validators.required], required: true, value: order ? order.amount_returned : ''
                },
                {
                  label: 'Order Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "order_status", validations: [Validators.required], required: true, value: order ? order.order_status : '', options: [{ id: 'pending', name: 'pending' }, { id: 'active', name: 'active' },{ id: 'deactivate', name: 'deactivate' },{ id: 'deleted', name: 'deleted' }] 
                },
                {
                  label: 'Tip', type: 'number', bootstrapGridClass: "col-lg-6", name: "tip", validations: [Validators.required], required: true, value: order ? order.tip : ''
                },
               
              
                // {
                //   label: 'Email', type: 'text', bootstrapGridClass: "col-lg-6", name: "email", validations: [Validators.required], required: true, value: staff ? staff.email : ''
                // },
                // { label: 'Password', type: 'text', bootstrapGridClass: "col-lg-6", name: "password",validations: [Validators.required], value: staff ? staff.password : '' }
    
            //  ,{ label: 'Date of Birth', type: 'date', bootstrapGridClass: "col-lg-6", name: "date_of_birth",validations: [Validators.required], value: order ? order.date_of_birth : '' }
            //  ,{ label: 'Salary', type:'number', bootstrapGridClass: "col-lg-6", name: "salary",validations: [Validators.required], value: order ? order.salary : '' }
            //  ,{ label: 'Salary Disbursement', type: 'select', bootstrapGridClass: "col-lg-6", name: "salary_disbursement",validations: [Validators.required], value: order ? order.salary_disbursement: '', options: [{ id: 'Monthly', name: 'Monthly' }, { id: 'weakly', name: 'Weakly' }] }
            //  ,{ label: 'Job Shift', type: 'select', bootstrapGridClass: "col-lg-6", name: "job_shift",validations: [Validators.required], value: order ? order.job_shift : '' , options: [{ id: 'Morning', name: 'Morning' }, { id: 'Night', name: 'Night' }]}
            // ,{
            //   label: 'Type', type: 'select', bootstrapGridClass: "col-lg-6", name: "type", validations: [Validators.required], required: true,
            //   value: order ? order.type : '', options: [{ id: 'manager', name: 'Manager' }, { id: 'CEO', name: 'CEO' }]
            // },
            // { label: 'Experience', type: 'select', bootstrapGridClass: "col-lg-6", name: "experience",validations: [Validators.required], value: order ? order.date_of_birth : '',options: [{ id: 'Professional', name: 'Professional' }, { id: 'Beginner', name: 'Beginner' }] }
            ]
              this.form['form_fields'] = this.fields;
              this.form['FormbootstrapGridClass'] = 'col-lg-12';
              this.form['map'] = false;
              this.form['MapbootstrapGridClass'] = 'col-lg-4';
              this.form['image'] = false;
              this.form['ImagebootstrapGridClass'] = 'col-lg-3';
              this.form['img_height'] = "200px";
              this.form['img_width'] = "200px";
              this.form['submit'] = 'Save';
             // this.form['is_epos']=true;
             
          //  }
            // else{
            //   this.loaded=true;
            //   SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
            // }
         // },
        //  err => { console.log(err); },
         
     //   );
        //  }
         
    
         
      }
    

      getOrderData(data){
        console.log(data);
        data['is_epos']=true;
        data['branch_id']=1;
        //data['username']=data.email;
        data['modified_by_id']=2;
        data['created_by_id']=2;
      
        
        //if (this.active_route.snapshot.paramMap.get('id') != null) {
          const order_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
   
      
          this.OrderService.uploadOrderById(data,order_id).subscribe(
            result=>{
              console.log("Inside Result");
        
              if(!result['error']){
                this.clear_form= true;
                console.log("Ok Result");
                        SwalAlert.sucessAlert('','Order Updated Added!');
              }
              else{
                SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        
              }
          console.log(result);
        
         }
            );
       // }
      
      // else{
      
      //   this.StaffService.addStaff(data).subscribe(
      //     result=>{
      //       console.log("Inside Result");
      
      //       if(!result['error']){
      //         this.clear_form= true;
      //         console.log("Ok Result");
      //                 SwalAlert.sucessAlert('','Staff Created Added!');
      //       }
      //       else{
      //         SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
      
      //       }
      //   console.log(result);
      
      //  }
      //     );
      // }
        
      
         
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
