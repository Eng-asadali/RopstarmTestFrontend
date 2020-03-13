import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { of, forkJoin } from 'rxjs';

import { Product } from '../product';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { Status } from '../../Options/status';
import { validation_patterns } from 'src/app/Shared/validation_patterns';

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
  edit: boolean = false;

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    const product_id = this.active_route.snapshot.paramMap.get('id');
    if (product_id != null) {
      this.edit = true;
      this.getProductDataById(product_id);
      // console.log(category);
    }
    else {
      this.edit= false;
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
        // {
        //   label: 'Category', type: 'select', bootstrapGridClass: "col-lg-6", name: "category_id", validations: [Validators.required], required: true,
        //   value: product ? product.category_id : '', options: result[0]['data']
        // },

        { label: 'Category', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "category_id",validations: [Validators.required], required: true, value: product ? product.category_id : '', options: result[0]['data']
         }
    , {
          label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
          value: product ? product.status : 'active', options: Status
        },
        {
          label: 'Price', type: 'number', bootstrapGridClass: "col-lg-6", name: "price", validations: [Validators.required,Validators.pattern(validation_patterns.decimal_numbers)], required: true,
          value: product ? product.price : ''
        },
        {
          label: 'Estimated Prepare Time (Mins)', type: 'number', bootstrapGridClass: "col-lg-12", name: "estimated_prepare_time", validations: [Validators.pattern(validation_patterns.postive_numbers)], required: false, value: product ? product.estimated_prepare_time : ''
        },
        {
          label: 'Tax Included', type: 'checkbox', bootstrapGridClass: "col-lg-12", name: "is_tax_included", required: false, value: product ? product.is_tax_included : false
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
      this.form['image_url'] = product ? product.image : null;
      this.form['submit'] = 'Save';
      this.form['attribute'] = false;
      this.loaded = true;
    });
  }

  getProductDataById(id) {
    let product = this.productService.getProuctById(id);
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
      err => {
        console.log(err);
        this.loaded = true;
      }
    );
  }

  getProductData(data) {
    console.log(data);
    this.clear_form = false;
    this.submit_clicked = true;
    delete data['product_attributes'];
    data['is_tax_included'] == '' ? data['is_tax_included'] = false : data['is_tax_included'];

    console.log(data);

    const product_id = this.active_route.snapshot.paramMap.get('id');
    if (product_id != null) {
      this.editProduct(data, product_id);
    }
    else {
      this.addProduct(data);
    }

  }

  editProduct(data, id) {
    this.productService.editProduct(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Product Updated Sucesssfully!')
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

  addProduct(data) {
    this.productService.addProduct(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          this.clear_form = true;
          SwalAlert.sucessAlert('', 'Product Added Sucesssfully!')
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
