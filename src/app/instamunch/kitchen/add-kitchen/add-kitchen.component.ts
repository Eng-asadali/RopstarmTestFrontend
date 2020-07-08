import { kitchen } from './../kitchen';
import { KitchenService } from './../../Services/kitchen.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { of, forkJoin } from 'rxjs';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { ProductService } from '../../Services/product.service';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { Status } from '../../Options/status';
import { validation_patterns } from 'src/app/Shared/validation_patterns';
@Component({
  selector: 'app-add-kitchen',
  templateUrl: './add-kitchen.component.html',
  styleUrls: ['./add-kitchen.component.css']
})
export class AddKitchenComponent implements OnInit {
  option = [];
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;
  edit: boolean = false;

  constructor(private KitchenService: KitchenService, private categoryService: CategoryService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    const kitchen_id = this.active_route.snapshot.paramMap.get('id');
    if (kitchen_id != null) {
      this.edit = true;
      this.getKitchenDataById(kitchen_id);
      // console.log(category);
    }
    else {
      this.edit = false;
      this.generateForm();
    }
  }

  generateForm(kitchen?: kitchen) {
    this.KitchenService.getManagers().subscribe(
      result => {
        if (!result['error']) {
          this.option = result['data']

          // let categories = this.categoryService.getCategories();
          // let kicthen = this.productService.getKitchenList();

          // const result = forkJoin(categories, kicthen);

          // result.subscribe((result) => {
          //   console.log(result);
          this.fields = [
            { label: 'Kitchen Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required, Validators.maxLength(50)], required: true, value: kitchen ? kitchen.name : null },

            {
              label: 'Status', type: 'select', bootstrapGridClass: "col-lg-12", name: "status", validations: [Validators.required], required: true,
              value: kitchen ? kitchen.status : 'active', options: Status
            },
            //  { label: 'Managers', type: 'ngselectname', bootstrapGridClass: "col-lg-12", name: "manager_id",validations: [Validators.required], required: true, value: kitchen ? kitchen.manager_id : null, options: result['data']}

          ]
          this.form['form_fields'] = this.fields;
          this.form['FormbootstrapGridClass'] = 'col-lg-9';
          this.form['map'] = false;
          this.form['MapbootstrapGridClass'] = 'col-lg-4';
          this.form['image'] = true;
          this.form['ImagebootstrapGridClass'] = 'col-lg-3';
          this.form['img_height'] = "150px";
          this.form['img_width'] = "200px";
          this.form['image_url'] = kitchen ? kitchen.image : null;
          this.form['submit'] = 'Save';
          this.form['attribute'] = true;
          this.loaded = true;
        }
      });
  }

  getKitchenDataById(id) {
    let kitchen = this.KitchenService.getKitchenById(id);
    kitchen.subscribe(
      result => {
        console.log('Kitchen by id:', result);
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

  getKitchenData(data) {
    console.log(data);
    this.clear_form = false;
    this.submit_clicked = true;
    //delete data['product_attributes'];
    // data['is_tax_included'] == '' ? data['is_tax_included'] = false : data['is_tax_included'];

    console.log(data);

    const kitchen_id = this.active_route.snapshot.paramMap.get('id');
    if (kitchen_id != null) {
      this.editKitchen(data, kitchen_id);
    }
    else {
      this.addKitchen(data);
    }

  }

  editKitchen(data, id) {
    this.KitchenService.editKitchen(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Kitchen Updated Sucesssfully!')
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

  addKitchen(data) {
    this.KitchenService.addKitchen(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          this.clear_form = true;
          SwalAlert.sucessAlert('', 'Kitchen Added Sucesssfully!')
          
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
    let url = this.router.url.split('/');
    this.router.navigate([url[0]+"/"+url[1]+"/"+url[2]]);
  }

}
