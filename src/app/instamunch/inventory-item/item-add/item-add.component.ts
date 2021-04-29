import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldConfig } from 'src/app/Interfaces/feildConfig';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { Validators } from '@angular/forms';
import { Status2 } from '../../Options/status';
import { Item } from '../inventoryItem';
import { InventoryItemService } from '../../Services/inventory-item.service';
import { InventoryCategoryService } from '../../Services/inventory-category.service';
import { InventoryVendorService } from '../../Services/inventory-vendor.service';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
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

  constructor(private inventoryService: InventoryItemService,
    private vendorService: InventoryVendorService,
    private inventoryCategoryService: InventoryCategoryService,
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
    let paretnCategory = this.inventoryService.getItemById(id);
    paretnCategory.subscribe(
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
  generateForm(item?: Item) {
    let category = this.inventoryCategoryService.getInventoryData();
    let vendor = this.vendorService.getInventoryData();

    const result = forkJoin(category,vendor);
    result.subscribe(
      result => {
        if (!result['error']) {
          console.log('generateForm',result);
    this.fields = [
      { label: 'Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required, Validators.maxLength(50)], required: true, value: item ? item.name : null },
      { label: 'Description', type: 'textarea', bootstrapGridClass: "col-lg-12", name: "description", validations: [Validators.required, Validators.maxLength(250)], required: true, value: item ? item.description : null },
      { label: 'Price per unit', type: 'number', bootstrapGridClass: "col-lg-6", name: "price_per_unit", validations: [Validators.required], required: true, value: item ? item.price_per_unit : null },
      { label: 'Quantity', type: 'number', bootstrapGridClass: "col-lg-6", name: "quantity", validations: [Validators.required], required: true, value: item ? item.quantity : null },
      { label: 'Cost', type: 'number', bootstrapGridClass: "col-lg-6", name: "cost", validations: [Validators.required], required: true, value: item ? item.cost : null },
      { label: 'Category', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "category", validations: [Validators.required], required: true, value: item ? item.category_id : null, options:result[0]['data'] },
      { label: 'Vendor', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "vendor", validations: [Validators.required], required: true, value: item ? item.vendor_id : null, options: result[1]['data'] },
      {
        label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
        value: item ? item.status : 'Active', options: Status2
      },
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
    this.inventoryService.editItem(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Category Updated Sucesssfully!')
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
    this.inventoryService.addItem(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          this.clear_form = true;
          SwalAlert.sucessAlert('', 'Category Added Sucesssfully!')
          
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
