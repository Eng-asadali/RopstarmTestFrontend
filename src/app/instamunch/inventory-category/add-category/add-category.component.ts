import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FieldConfig } from 'src/app/Interfaces/feildConfig';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { Validators } from '@angular/forms';
import { Status2 } from '../../Options/status';
import {category} from '../inventoryCategory'
import { InventoryCategoryService } from '../../Services/inventory-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddInventoryCategoryComponent implements OnInit {
  option = [];
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;
  edit: boolean = false;

  constructor(private inventoryService: InventoryCategoryService,private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    const category_id = this.active_route.snapshot.paramMap.get('id');
    if (category_id != null) {
      this.edit = true;
      this.getcategoryById(category_id);
      // console.log(category);
    }
    else {
      this.edit = false;
      this.generateForm();
    }
  }
  getcategoryById(id) {
    let paretnCategory = this.inventoryService.getcategoryById(id);
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
  generateForm(category?: category) {
    this.inventoryService.getParentCategories().subscribe(
      result => {
        if (!result['error']) {
          console.log('generateForm',result);
          
          this.option = result['data']
    this.fields = [
      { label: 'Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required, Validators.maxLength(50)], required: true, value: category ? category.name : null },
      { label: 'Description', type: 'textarea', bootstrapGridClass: "col-lg-12", name: "description", validations: [Validators.required, Validators.maxLength(250)], required: true, value: category ? category.description : null },
      { label: 'Parent Category', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "parent_category", validations: [Validators.required], required: true, value: category ? category.parent_category_id : null, options: result['data'] },
      {
        label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
        value: category ? category.status : 'Active', options: Status2
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
    this.inventoryService.editcategory(data, id).subscribe(
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
    this.inventoryService.addcategory(data).subscribe(
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
