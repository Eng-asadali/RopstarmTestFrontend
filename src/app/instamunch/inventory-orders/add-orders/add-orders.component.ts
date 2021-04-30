import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldConfig } from 'src/app/Interfaces/feildConfig';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { Validators } from '@angular/forms';
import { Status3 } from '../../Options/status';
import { InventoryItemService } from '../../Services/inventory-item.service';
import { InventoryVendorService } from '../../Services/inventory-vendor.service';
import { forkJoin } from 'rxjs';
import { Orders } from '../inventory-order';
import { validateDeliveryDate } from 'src/app/Shared/Custom Validators/dateValidator';
import { InventoryOrdersService } from '../../Services/inventory-orders.service';
import { validation_patterns } from 'src/app/Shared/validation_patterns';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.css']
})
export class AddOrdersComponent implements OnInit {
  option = [];
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;
  edit: boolean = false;
  category_id
  optionCategory: any;
  optionVendor: any;

  constructor(private inventoryService: InventoryOrdersService,
    private vendorService: InventoryVendorService,
    private inventoryItemService: InventoryItemService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    this.category_id = this.active_route.snapshot.paramMap.get('id');
    if (this.category_id != null) {
      this.edit = true;
      this.getcategoryById(this.category_id);
      // console.log(category);
    }
    else {
      this.edit = false;
      this.generateForm();
    }
  }
  getcategoryById(id) {
    let parentCateogory = this.inventoryService.getordersById(id);
    parentCateogory.subscribe(
      result => {
        console.log('paretnCategory by id:', result);
        if (!result['error']) {
          this.generateForm(result['data'][0]);
        }
        else {
          this.loaded = true;
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }

      },
      err => {
        console.log(err);
        this.loaded = true;
      }
    );
  }
  generateForm(order?: Orders) {
    let item = this.inventoryItemService.getItemData();
    let vendor = this.vendorService.getInventoryData();

    const result = forkJoin(item,vendor);
    result.subscribe(
      result => {
        if (!result['error']) {
          console.log('generateForm',result);
    this.fields = [
      { label: 'Quantity', type: 'number', bootstrapGridClass: "col-lg-6", name: "quantity", validations: [Validators.required,Validators.pattern(validation_patterns.only_int),Validators.max(999999999999999999)], required: true, value: order ? order.quantity : null },
      { label: 'Item', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "item", validations: [Validators.required], required: true, value: order ? order.item_id : null, options:result[0]['data'] },
      { label: 'Vendor', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "vendor", validations: [Validators.required], required: true, value: order ? order.vendor_id : null, options: result[1]['data'] },
      { label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true, value: order ? order.status : 'Active', options: Status3},
      { label: 'Delivery By', type: 'date', bootstrapGridClass: "col-lg-12", name: "delivery_by", validations: [Validators.required,validateDeliveryDate], value: order ? order.delivery_by : null, required: true},
    ]
    this.form['form_fields'] = this.fields;
    this.form['FormbootstrapGridClass'] = 'col-lg-9';
    this.form['map'] = false;
    this.form['MapbootstrapGridClass'] = 'col-lg-4';
    this.form['submit'] = 'Save';
    this.form['attribute'] = true;
    this.loaded = true;
  }
    
  });
}
  getcategoryData(data) {
    console.log(data);
    this.clear_form = false;
    this.submit_clicked = true;
    //delete data['product_attributes'];
    // data['is_tax_included'] == '' ? data['is_tax_included'] = false : data['is_tax_included'];

    console.log(data);

    const category_id = this.active_route.snapshot.paramMap.get('id');
    if (category_id != null) {
      this.editcategory(data, category_id);
    }
    else {
      this.addcategory(data);
    }

  }
  editcategory(data, id) {
    this.inventoryService.editorders(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Order Updated Sucesssfully!')
          this.navigateToProductListing();
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        console.log(result);
      },
      err => {
        this.submit_clicked = false;
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }

  addcategory(data) {
    this.inventoryService.addorders(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          this.clear_form = true;
          SwalAlert.sucessAlert('', 'Order Added Sucesssfully!')
          
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        console.log(result);
      },
      err => {
        this.submit_clicked = false;
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }
  navigateToProductListing() {
    let url = this.router.url.split('/');
    this.router.navigate([url[0]+"/"+url[1]+"/"+url[2]]);
  }
}
