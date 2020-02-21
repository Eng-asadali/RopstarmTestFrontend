import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { Category } from '../category';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';

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
  edit:boolean;
  category_id:number;

  constructor(private categoryService: CategoryService, private route: Router,
    private active_route: ActivatedRoute) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      this.edit=true;
      this.category_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      let category = this.categoryService.getCategoryById(this.category_id);
      category.subscribe(
        result => {
          console.log('category by id:', result);
          this.category = result['data'][0];
          if (!result['error']) {
            this.generateForm(this.category);
          }
          else {
            this.loaded = true;
            SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }

        },
        err => { console.log(err); },
        () => { console.log('call completed'); }
      );
      console.log(category);
    }
    else {
      this.edit=false;
      this.generateForm();
    }
  }

  test(){
    this.clear_form= true;
  }

  getCategoryData(data){
    if(this.edit){
      this.categoryService.editCategory(data,this.category_id).subscribe(
        result => {
          if (!result['error']) {

          }
          else{
            SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }
        }
      );
    }
    else{
      this.categoryService.addCategory(data).subscribe(
        result => {
          if (!result['error']) {
            this.clear_form= true;
            SwalAlert.sucessAlert('','Category Created Sucessfully!');
          }
          else{
            SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }
        }
      );
    }
    console.log(data);
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
          this.form['map'] = false;
          this.form['MapbootstrapGridClass'] = 'col-lg-4';
          this.form['image'] = true;
          this.form['ImagebootstrapGridClass'] = 'col-lg-3';
          this.form['img_height'] = "200px";
          this.form['img_width'] = "200px";
          this.form['submit'] = 'Save'
        }
        else {
            this.loaded=true;
            SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
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