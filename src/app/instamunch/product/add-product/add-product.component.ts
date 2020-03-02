import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { of, forkJoin } from 'rxjs';

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
    let categories = this.categoryService.getCategories();
    let kicthen = this.productService.getKitchenList();

    const result = forkJoin(categories, kicthen);

    result.subscribe((result) => {
      console.log(result);
      this.fields = [
        { label: 'Product Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required], required: true, value: product ? product.name : '' },
        {
          label: 'Kitchen', type: 'select', bootstrapGridClass: "col-lg-6", name: "kitchen_id", validations: [Validators.required], required: true,
          value: product ? product.kitchen_id : '', options: result[1]['data']
        },
        {
          label: 'Category', type: 'select', bootstrapGridClass: "col-lg-6", name: "category_id", validations: [Validators.required], required: true,
          value: product ? product.category_id : '', options: result[0]['data']
        },
        {
          label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
          value: product ? product.status : 'active', options: [{ id: 'active', name: 'Active' }, { id: 'inactive', name: 'Inactive' }]
        },
        {
          label: 'Price', type: 'text', bootstrapGridClass: "col-lg-6", name: "price", validations: [Validators.required], required: true,
          value: product? product.price : ''
        },
        {
          label: 'Tax Included', type: 'checkbox', bootstrapGridClass: "col-lg-12", name: "is_tax_included", required:false, value:product? product.is_tax_included : false
        },
        // {
        //   label: 'Attribute List', type: 'attribute', bootstrapGridClass: "col-lg-12", name: "attr", validations: [Validators.required], required: false
        // },
        { label: 'Description', type: 'textarea', bootstrapGridClass: "col-lg-12", name: "detail", value: product ? product.detail : '' }
      ]
      this.form['form_fields'] = this.fields;
      this.form['FormbootstrapGridClass'] = 'col-lg-9';
      this.form['map'] = false;
      this.form['MapbootstrapGridClass'] = 'col-lg-4';
      this.form['image'] = true;
      this.form['ImagebootstrapGridClass'] = 'col-lg-3';
      this.form['img_height'] = "200px";
      this.form['img_width'] = "200px";
      this.form['image_url'] = product? product.image: null;
      this.form['submit'] = 'Save';
      this.form['attribute'] = true;
      this.loaded = true;
    });
  }

  getProductData(data) {
    console.log(data);
    this.clear_form = false;
    this.submit_clicked = true;
    this.addProduct(data);
  }

  addProduct(data){
   //   data['product_attributes'] = { attributes_list: this.FormatAttributesList(data['product_attributes']) }
   delete data['product_attributes'];
   console.log(data);
    
    this.productService.addProduct(data).subscribe(
      result => {
        this.clear_form = true;
        this.submit_clicked = false;
        if(!result['error']){
          SwalAlert.sucessAlert('','Product Added Sucesssfully!')
        }
        else{
          SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        console.log(result);
      },
      err => {
        console.log(err);
        SwalAlert.errorAlert('','Server Error');
      }
    );
  }

  FormatAttributesList(data) {
    let attributes_list = {};
    console.log(data);
    data.forEach(element => {
      console.log(element, element.value);
      element.value = element.value.split(',');
      element['is_selected'] = this.formatSelected(element.value.length);
    });
    attributes_list = data;
    return attributes_list;
    console.log(data);
  }

  formatSelected(length) {
    let is_selected = [];
    for (var i = 0; i < length; i++) {
      is_selected.push(false);
    }
    return is_selected;
  }

  navigateToProductListing() {
    this.router.navigate(['instamunch/product'])
  }

}
