import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { of, forkJoin, empty } from 'rxjs';

import { Product } from '../product';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { Status } from '../../Options/status';
import { validation_patterns } from 'src/app/Shared/validation_patterns';
import { ProductService } from '../../Services/product.service';

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
   addON=[];
  loaded = false;
  edit: boolean = false;

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getAddOn();
    this.form['form_fields'] = this.fields;
    const product_id = this.active_route.snapshot.paramMap.get('id');
    if (product_id != null) {
      this.edit = true;
      this.getProductDataById(product_id);
      // console.log(category);
    }
    else {
      this.edit = false;
      this.generateForm();
    }
  }
  getAddOn(){
    this.productService.getAddOn().subscribe(
      result => {
        console.log("aya",result);
      // this.addOnID =result['data'];
      this.addON = [];
    for (let i = 0; i < result['data'].length; i++) {
      this.addON.push({ id: result['data'][i]['id'], name: result['data'][i]['name'] });
    }
      console.log("gya",this.addON);
      },
      
    );

  }

  generateForm(product?: Product) {
    let categories = this.categoryService.getCategories();
    let kicthen = this.productService.getKitchenList();

    const result = forkJoin(categories, kicthen);

    result.subscribe((result) => {
      console.log(result);
      this.fields = [
        { label: 'Product Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required, Validators.maxLength(150)], required: true, value: product ? product.name : null },
        {
          label: 'Kitchen', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "kitchen_id", validations: [Validators.required], required: true,
          value: product ? product.kitchen_id : null, options: result[1]['data']
        },
        // {
        //   label: 'Category', type: 'select', bootstrapGridClass: "col-lg-6", name: "category_id", validations: [Validators.required], required: true,
        //   value: product ? product.category_id : null, options: result[0]['data']
        // },
        {
          label: 'Category', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "category_id", validations: [Validators.required], required: true, value: product ? product.category_id : null, options: result[0]['data']
        }
        , {
          label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
          value: product ? product.status : 'active', options: Status
        },
        {
          label: 'Price', type: 'number', bootstrapGridClass: "col-lg-6", name: "price", validations: [Validators.required, Validators.pattern(validation_patterns.decimal_numbers), Validators.max(999999999999999999)], required: true,
          value: product ? product.price : null
        },
        {
          label: 'Estimated Prepare Time (Mins)', type: 'number', bootstrapGridClass: "col-lg-6", name: "estimated_prepare_time", validations: [Validators.pattern(validation_patterns.postive_numbers), Validators.max(999999999999999999)], required: false, value: product ? product.estimated_prepare_time : 30
        },
        {label: 'Ordering', type: 'number', bootstrapGridClass: "col-lg-6" , name: "ordering",  info_check : "Number use to sort the items in a menu listing e.g item with 0 ordering will appear before an item with ordering 1. ", value: product ? product.ordering : 1, validations: [Validators.required], required: true}, 
        
        {
          label: 'Nutrition', type: 'text', bootstrapGridClass: "col-lg-6", name: "nutrition", required: false, value: product ? product.nutrition : null
        },

        {
          label: 'Allergens', type: 'text', bootstrapGridClass: "col-lg-6", name: "allergens", required: false,value: product ? product.allergens : null
        },
        
        {
          label: 'Tax Included', type: 'checkbox', bootstrapGridClass: "col-lg-6", name: "is_tax_included", required: false, value: product ? product.is_tax_included : false
        },
        {
          label: 'Is Add On', type: 'checkbox', bootstrapGridClass: "col-lg-6", name: "is_add_on", required: false, value: product ? product.is_add_on : false
        },
        { label: 'Attribute List', type: 'attribute', bootstrapGridClass: "col-lg-12", name: "product_attributes", required: false, value: product ? product.product_attributes : null },
        { label: 'Varients', type: 'varients', bootstrapGridClass: "col-lg-12", name: "varients", required: false, value: product ? product.varients : null },
        { label: 'Add On', type: 'multiselect', bootstrapGridClass: "col-lg-12", name: "addon", options:this.addON , required: false },
        { label: 'Description', type: 'textarea', bootstrapGridClass: "col-lg-12", name: "detail", validations: [Validators.maxLength(500)], value: product ? product.detail : null },
        {  type: 'hidden', bootstrapGridClass: "col-lg-12", name: "isavailable", value: product ? product.isavailable : true},
        {  type: 'hidden', bootstrapGridClass: "col-lg-12", name: "kitchen_status", value: product ? product.kitchen_status : true}
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
          SwalAlert.errorAlert(null, result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }

      },
      err => {
        console.log(err);
        this.loaded = true;
      }
    );
  }

  getProductData(data) {
    this.clear_form = false;
    this.submit_clicked = true;
    delete data['attr'];

    data['is_tax_included'] == null ? data['is_tax_included'] = false : data['is_tax_included'];

    // console.log(data);

    const product_id = this.active_route.snapshot.paramMap.get('id');
    let formatted_attributes = this.FormatAttributesList(data['product_attributes']);
    // let formatted_varients = this.FormatVarientList(data['varients']);
    // console.log(formatted_attributes.length, formatted_attributes);
    // if (formatted_attributes != null)
    let varientsArray = {
      name: data.name,
      values: data.variants
    };
    data['product_attributes'] = JSON.stringify({ attributes_list: formatted_attributes });
    data['variants'] = JSON.stringify(varientsArray);
    // delete data['varients'];
    // else
    //   delete data['product_attributes'];

    if (product_id != null) {
      this.editProduct(data, product_id);
    }
    else {
      console.log(data);
      console.log(varientsArray);
      
      this.addProduct(data);
    }
  }

  editProduct(data, id) {
    this.productService.editProduct(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Product Updated Sucesssfully!')
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
    // let attributes_list = {};
    // console.log(data);
    let is_empty = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].value != '' && data[i].name != '' && data[i].value != "" && data[i].name != "") {
        data[i].value = data[i].value.split(',');
        data[i]['is_selected'] = this.formatSelected(data[i].value.length);
        is_empty = false;
      }
      else {
        delete data[i];
      }

    }

    if (data) {
      var filtered = data.filter(function (el) {
        return el != null;
      });
      return filtered;
    } else {
      return null
    }

    // if (!is_empty) {
    //   var filtered = data.filter(function (el) {
    //     return el != null;
    //   });
    //   return filtered;
    // }
    // else {
    //   return null;
    // }



    // data.forEach(element => {
    //   element.value = element.value.split(',');
    //   element['is_selected'] = this.formatSelected(element.value.length);
    // });

    // attributes_list = data;
    // return data;
  }

  formatSelected(length) {
    let is_selected = [];
    for (var i = 0; i < length; i++) {
      is_selected.push(false);
    }
    return is_selected;
  }

  FormatVarientList(data) {
    // let attributes_list = {};
    // console.log(data);
    let is_empty = true;
    for (let i = 0; i < data.length; i++) {
      if (data[i].value != '' && data[i].name != '' && data[i].value != "" && data[i].name != "") {
        data[i].value = data[i].value.split(',');
        data[i]['is_selected'] = this.formatSelectedvarients(data[i].value.length);
        is_empty = false;
      }
      else {
        delete data[i];
      }

    }
    if (data) {
      var filtered = data.filter(function (el) {
        return el != null;
      });
      return filtered;
    } else {
      return null;
    }

    // if (!is_empty) {
    //   var filtered = data.filter(function (el) {
    //     return el != null;
    //   });
    //   return filtered;
    // }
    // else {
    //   return null;
    // }



    // data.forEach(element => {
    //   element.value = element.value.split(',');
    //   element['is_selected'] = this.formatSelected(element.value.length);
    // });

    // attributes_list = data;
    // return data;
  }

  formatSelectedvarients(length) {
    let is_selected = [];
    for (var i = 0; i < length; i++) {
      is_selected.push(false);
    }
    return is_selected;
  }

  navigateToProductListing() {
    let url = this.router.url.split('/');
    this.router.navigate([url[0]+"/"+url[1]+"/"+url[2]]);
  }

}
