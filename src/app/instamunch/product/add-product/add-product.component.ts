import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { Product } from '../product';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      const product_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      let product = this.productService.getProuctById(product_id);
      product.subscribe(
        result => {
          console.log('product by id:', result);
          if (!result['error']) {
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
      // console.log(category);
    }
    else {
      this.generateForm();
    }
  }

  generateForm(product?: Product) {
    this.categoryService.getCategories().subscribe(
      result => {
        if (!result['error']) {
          this.fields = [
            { label: 'Product Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required], required: true, value: product ? product.name : '' },
            {
              label: 'Category', type: 'select', bootstrapGridClass: "col-lg-6", name: "parent_category_id", validations: [Validators.required], required: true,
              value: product ? product.category_id : '', options: result['data']
            },
            {
              label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
              value: product ? product.status : 'active', options: [{ id: 'active', name: 'Active' }, { id: 'inactive', name: 'Inactive' }]
            },
            {
              label: 'Attribute List', type: 'attribute', bootstrapGridClass: "col-lg-12", name: "status", validations: [Validators.required], required: false,
              
            },
            { label: 'Description', type: 'textarea', bootstrapGridClass: "col-lg-12", name: "description", value: product ? product.description : '' }
          ]
          this.form['form_fields'] = this.fields;
          this.form['FormbootstrapGridClass'] = 'col-lg-9';
          this.form['map'] = false;
          this.form['MapbootstrapGridClass'] = 'col-lg-4';
          this.form['image'] = true;
          this.form['ImagebootstrapGridClass'] = 'col-lg-3';
          this.form['img_height'] = "200px";
          this.form['img_width'] = "200px";
          this.form['submit'] = 'Save';
          this.form['attribute']= true;
        }
        else{
          this.loaded=true;
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

  getProductData(data){
    console.log(data);
  }

  navigateToProductListing() {
    this.router.navigate(['instamunch/product'])
  }

}
