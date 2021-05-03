import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldConfig } from 'src/app/Interfaces/feildConfig';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { Validators } from '@angular/forms';
import { inventoryVendor } from '../inventory-vendot';
import { InventoryVendorService } from '../../Services/inventory-vendor.service';

@Component({
  selector: 'app-inventory-vendor-add',
  templateUrl: './inventory-vendor-add.component.html',
  styleUrls: ['./inventory-vendor-add.component.css']
})
export class InventoryVendorAddComponent implements OnInit {
    option = [];
    form = {};
    fields: FieldConfig[] = [] as FieldConfig[];
    submit_clicked: boolean;
    clear_form: boolean;
  
    loaded = false;
    edit: boolean = false;
  
    constructor(private inventoryVendorService: InventoryVendorService,private active_route: ActivatedRoute, private router: Router) { }
  
    ngOnInit() {
      this.form['form_fields'] = this.fields;
      const parentCategory_id = this.active_route.snapshot.paramMap.get('id');
      if (parentCategory_id != null) {
        this.edit = true;
        this.getparentcategoryById(parentCategory_id);
        // console.log(category);
      }
      else {
        this.edit = false;
        this.generateForm();
      }
    }
    getparentcategoryById(id) {
      let paretnCategory = this.inventoryVendorService.getParentCategoryById(id);
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
    generateForm(inventoryVendor?: inventoryVendor) {
      console.log(inventoryVendor);
      this.fields = [
        { label: 'Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required, Validators.maxLength(50)], required: true, value: inventoryVendor ? inventoryVendor.name : null },
        { label: 'Address', type: 'text', bootstrapGridClass: "col-lg-12", name: "address", validations: [Validators.required, Validators.maxLength(50)], required: true, value: inventoryVendor ? inventoryVendor.address : null },
        { label: 'City', type: 'text', bootstrapGridClass: "col-lg-12", name: "city", validations: [Validators.required, Validators.maxLength(50)], required: true, value: inventoryVendor ? inventoryVendor.city : null },
        { label: 'Orders', type: 'number', bootstrapGridClass: "col-lg-6", name: "orders", validations: [Validators.required], required: true, value: inventoryVendor ? inventoryVendor.orders : null },
        { label: 'Phone Number', type: 'number', bootstrapGridClass: "col-lg-6", name: "phone_number",validations: [Validators.required], required: true, value: inventoryVendor ? inventoryVendor.phone_number : null},

      ]
      this.form['form_fields'] = this.fields;
            this.form['FormbootstrapGridClass'] = 'col-lg-9';
            this.form['map'] = false;
            this.form['MapbootstrapGridClass'] = 'col-lg-4';
            // this.form['image'] = true;
            // this.form['ImagebootstrapGridClass'] = 'col-lg-3';
            // this.form['img_height'] = "150px";
            // this.form['img_width'] = "200px";
            // this.form['image_url'] = parentCategory ? parentCategory.image : null;
            this.form['submit'] = 'Save';
            this.form['attribute'] = true;
            this.loaded = true;
      
    }
    getparentCategoryData(data) {
      console.log(data);
      this.clear_form = false;
      this.submit_clicked = true;
      //delete data['product_attributes'];
      // data['is_tax_included'] == '' ? data['is_tax_included'] = false : data['is_tax_included'];
  
      console.log(data);
  
      const parentCategory_id = this.active_route.snapshot.paramMap.get('id');
      if (parentCategory_id != null) {
        this.editparentCategory(data, parentCategory_id);
      }
      else {
        this.addparentCategory(data);
      }
  
    }
    editparentCategory(data, id) {
      this.inventoryVendorService.editparentCategory(data, id).subscribe(
        result => {
          this.submit_clicked = false;
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Vendor Updated Sucesssfully!')
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
  
    addparentCategory(data) {
      this.inventoryVendorService.addparentCategory(data).subscribe(
        result => {
          this.submit_clicked = false;
          if (!result['error']) {
            this.clear_form = true;
            SwalAlert.sucessAlert('', 'Vendor Added Sucesssfully!')
            
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