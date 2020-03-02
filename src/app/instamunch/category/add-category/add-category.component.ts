import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { Category } from '../category';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';

import { DateUtils } from '../../../Shared/DateUtils';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;

  category: Category;
  edit: boolean;
  category_id: number;

  constructor(private categoryService: CategoryService, private route: Router,
    private active_route: ActivatedRoute) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      this.edit = true;
      this.getCategoryDateToEdit(parseInt(this.active_route.snapshot.paramMap.get('id')));
    }
    else {
      this.edit = false;
      this.generateForm();
    }
  }


  getCategoryDateToEdit(id) {
    // this.category_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
    let category = this.categoryService.getCategoryById(id);
    category.subscribe(
      result => {
    
        console.log('category by id:', result);
        this.category = result['data'][0];
        if (!result['error']) {
          this.generateForm(this.category);
          
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        this.loaded = true;
      },
      err => { 
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error!'); }
    );
    console.log(category);
  }



  getCategoryData(data) {
    this.clear_form = false;
    this.submit_clicked = true;
    if (this.edit) {
      this.editCategory(data);
    }
    else {
      this.addCategory(data);
    }

    //  console.log(data);
  }

  addCategory(data) {
    this.categoryService.addCategory(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          this.clear_form = true;
          console.log('asddasd');
          SwalAlert.sucessAlert('', 'Category Added Sucessfully!');

        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
      },
      err => {
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }

  editCategory(data) {
    this.categoryService.editCategory(data, this.category_id).subscribe(
      result => {
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Category Updated Sucessfully!');
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
      },
      err => {
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }

  generateForm(category?: Category) {
    this.categoryService.getParentCategories().subscribe(
      result => {
        if (!result['error']) {
          this.fields = [
            { label: 'Category Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required], required: true, value: category ? category.name : '' },
            {
              label: 'Parent Category', type: 'select', bootstrapGridClass: "col-lg-6", name: "parent_category_id", validations: [Validators.required], required: true,
              value: category ? category.parent_category_id : '', options: result['data']
            },
            {
              label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
              value: category ? category.status : 'active', options: [{ id: 'active', name: 'Active' }, { id: 'inactive', name: 'Inactive' }]
            },
            { label: 'Description', type: 'textarea', bootstrapGridClass: "col-lg-12", name: "description", value: category ? category.description : '' }
          ]
          this.form['form_fields'] = this.fields;
          this.form['FormbootstrapGridClass'] = 'col-lg-9';
          this.form['image'] = true;
          this.form['ImagebootstrapGridClass'] = 'col-lg-3';
          this.form['img_height'] = "200px";
          this.form['img_width'] = "200px";
          this.form['submit'] = 'Save'
        }
        else {
          this.loaded = true;
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
      },
      err => { console.log(err); },
      () => {
        this.loaded = true;
        console.log('completed');
      }
    );

  }


  navigateToCategoryListing() {
    this.route.navigate(['instamunch/category']);
  }
}