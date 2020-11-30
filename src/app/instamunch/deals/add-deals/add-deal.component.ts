import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { Category } from '../deals';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { Status } from '../../Options/status';
import { LogsService } from './../../Services/logs.service';
import { element } from 'protractor';

@Component({
  selector: 'app-add-deal',
  templateUrl: './add-deal.component.html',
  styleUrls: ['./add-deal.component.css']
})
export class AddDealsComponent implements OnInit {
  option = [];
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;
  fieldsdd = [];
  fieldsddd = [];
  addON=[];
  addon;
  loaded = false;
  edit: boolean = false;
  producVarients;
  producVarientsindex;
  selectedProductVarients;
  // @ViewChild('productSelect') productSelect: ElementRef;

  category: Category;
  category_id: number;
  addForm: FormGroup;
  queryData: any;
  deal: any;
  deal_log_id: any;
  varientArray = [];
  constructor(private categoryService: CategoryService, private route: Router, private LogsService: LogsService,
    private fb: FormBuilder,
    private active_route: ActivatedRoute) { }

  ngOnInit() {
    this.getAddOn();
    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      this.edit = true;
      const deal_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      this.getDealDataById(deal_id);
    } else {
      const varient = [{
        price: 0,
        is_selected: false,
        value: 0
      }]
      this.varientArray.push(varient)
    }
    // else {
    //   this.edit = false;
    //   this.generateForm();
    // }
    this.addForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      is_recurrence: new FormControl(true),
      price: new FormControl(100),
      addon: new FormControl()
    });
    this.addForm.addControl('deal_categories', this.fb.array([
      this.fb.group({
        name: '',
        is_category: false,
        item: null,
        deal_items: this.fb.array([
          this.fb.group({
            productItems: '',
            productId: ''
          })
        ])
      })
    ]));
    // this.addForm.addControl('product_items', this.fb.array([
    //   this.fb.group({
    //     item: ''
    //   })
    // ]));
    this.itemCatalog();
    this.categoryCatalog();
  }

  setDealCategories(data) {
    return this.fb.group({
      name: [data.name],
      is_category: [data.is_category],
      deal_items: this.fb.array([
        this.fb.group({
          productItems: '',
          productId: ''
        })
      ])
    });
  }

  getDealDataById(id) {
    let question = this.LogsService.getDealsById(id);
    question.subscribe(
      result => {
        this.queryData = result['data'];
        this.queryData[0].deal_categories = this.queryData[0].deal_category;
        
        if (this.queryData[0].deal_categories) {          
          const control = this.addForm.get('deal_categories') as FormArray;
          this.queryData[0].deal_categories.forEach((mainElement, i) => {
            let abc = this.setDealCategories(mainElement)
            control.push(abc); 
            mainElement.deal_items = mainElement.products;

            if (mainElement.is_category) {
              //TODO: here set category item when checkbox is selected
            }

            
            if (mainElement.deal_items && !mainElement.is_category) {
              this.varientArray.push([]);
              mainElement.deal_items.forEach((element, j) => {
                this.addAttributeCategory(i, element, j, mainElement.id, control)
              });

              let last_index = (control as FormArray).length;
              if ((this.queryData[0].deal_categories.length + 1) === last_index) {
                (control as FormArray).removeAt(last_index - 1);
              }
            }
          });
        }

        this.addForm.patchValue(this.queryData[0]);

        this.deal = result['data'];
        this.deal_log_id = result['data']['id']
        if (!result['error']) {
          this.loaded = true;
        }
        else {
          this.loaded = true;
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }

      },
      err => {
        console.log('Error while getting log by id.', err);
        this.loaded = true;
        SwalAlert.errorAlert('', 'Server Error!');
      }
    );

  }

  onSubmit(form) {
    if (form.valid ) {
      let get_id = parseInt(this.active_route.snapshot.paramMap.get('id'));;
      if (get_id) {
        this.editDeal(form.value, get_id);
      } else {
        this.addDeal(form.value);
      }
    }
  }


  // getCategoryData(data) {
  //   this.clear_form = false;
  //   this.submit_clicked = true;
  //   if (this.edit) {
  //     const category_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
  //     this.editCategory(data, category_id);
  //   }
  //   else {
  //     this.addCategory(data);
  //   }
  // }

  editDeal(data, get_id) {
    if (data.deal_categories && data.deal_categories.length) {
      data.deal_categories.forEach((element) => {
        if (!element.is_category) {
          let deal_items = [];
          let productId = 0;
          if (element.deal_items && element.deal_items.length > 0) {
            element.deal_items.forEach(deal => {
              deal_items.push((Number(deal.productItems)));
              if (deal.productId) {
                productId = deal.productId; 
              }
            });
          }
          if (productId) {
            element.id = productId;
          }
          element.deal_items = deal_items;
        } else {
          let deal_items = [];
          deal_items.push(Number(element.item));
          element.deal_items = deal_items;
          delete element.item;
        }
      });
    } 

    this.LogsService.editDeall(data, get_id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Deal Edited Sucessfully!');
          this.clear_form = true;
          this.navigateToDealListing();
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

        }
      },
      err => {
        this.submit_clicked = false;
        console.error(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }
  addDeal(data) {
    if (data.deal_categories && data.deal_categories.length) {
      data.deal_categories.forEach((element) => {
        if (!element.is_category) {
          let deal_items = [];
          if (element.deal_items && element.deal_items.length > 0) {
            element.deal_items.forEach((deal, i) => {
              deal_items.push({id:Number (deal.productItems), variant: this.varientArray[i]});
            });
          }
          
          element.deal_items = deal_items;
        } else {
          let deal_items = [];
          deal_items.push(Number(element.item));
          element.deal_items = deal_items;
          delete element.item;
        }
      });
    }
    this.LogsService.addDeall(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Deal Added Sucessfully!');
          this.clear_form = true;
          this.navigateToDealListing();
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

        }
      },
      err => {
        this.submit_clicked = false;
        console.error(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }

  getFormControl(name) {
    return this.addForm.get(name);
  }

  addAttribute(name?, value?) {
    var arr = <FormArray>this.addForm.get('deal_categories');
    const attribute = this.fb.group({
      name: name ? name : '',
      is_category: false,
      item: null,
      deal_items: this.fb.array([
        this.fb.group({
          productItems: '',
          productId: ''
        })
      ])
    });
    arr.push(attribute);
    const varient = [{
      price: 0,
      is_selected: false,
      value: 0
    }]
    let last_index = (arr as FormArray).length;
    this.varientArray.splice(last_index - 1, 0, varient);
  }

  addAttributeCategory(i, data?, j?, id?, control?) {
    var arr;
    if (!control) {
      control = this.addForm.get('deal_categories') as FormArray;
    }
    if (<FormArray>control.at(i)) {
      arr = <FormArray>control.at(i).get('deal_items');
      if (data && j === 0) {
        (arr as FormArray).removeAt(0);
      }
      const attribute = this.fb.group({
        productItems: data ? data.id : '',
        productId: id ? id : ''
      });
      arr.push(attribute);
      const varient = [{
        price: 0,
        is_selected: false,
        value: 0
      }]
      data.variants.display = true;
      this.varientArray[i].push(data.variants);
    }
  }

  minusAttribute() {
    var arr = this.addForm.get('deal_categories');
    let last_index = (arr as FormArray).length - 1;
    (arr as FormArray).removeAt(last_index);
    this.varientArray.splice(last_index, 1);
  }

  minusAttributeCategory(i) {
    const control = this.addForm.get('deal_categories') as FormArray;
    var arr = <FormArray>control.at(i).get('deal_items');
    let last_index = null;
    if(arr.length > 1){
     last_index = arr.length - 1;
     (arr as FormArray).removeAt(last_index);
    }
    
  }

  itemCatalog() {
    this.LogsService.itemType().subscribe(result => {
      if (result && result['data'].length) {
        result['data'].forEach(element => {
          this.fieldsdd.push(element);
        });
      }
    }
    );

  }

  categoryCatalog() {
    this.LogsService.getCategories().subscribe(result => {
      if (result && result['data'].length) {
        result['data'].forEach(element => {
          this.fieldsddd.push(element);
        });
      }
    }
    );

  }


  getAddOn(){
    this.LogsService.getAddOn().subscribe(
      result => {
      // this.addOnID =result['data'];
      this.addON = [];
      for (let i = 0; i < result['data'].length; i++) {
        this.addON.push({ id: result['data'][i]['id'], name: result['data'][i]['name'] });
      }
      },
      
    );

  }

  // editCategory(data, id) {
  //   this.categoryService.editCategory(data, id).subscribe(
  //     result => {
  //       this.submit_clicked = false;
  //       if (!result['error']) {
  //         SwalAlert.sucessAlert('', 'Category Updated Sucessfully!');
  //       }
  //       else {
  //         SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
  //       }
  //     },
  //     err => {
  //       this.submit_clicked = false;
  //       console.log(err);
  //       SwalAlert.errorAlert('', 'Server Error');
  //     }
  //   );
  // }

  // generateForm(category?: Category) {
  //   this.categoryService.getParentCategories().subscribe(
  //     result => {
  //       if (!result['error']) {
  //         this.option = result['data']
  //         this.fields = [
  //           { label: 'Category Name', type: 'text', bootstrapGridClass: "col-lg-12", name: "name", validations: [Validators.required, Validators.maxLength(50)], required: true, value: category ? category.name : null },
  //           // {
  //           //   label: 'Parent Category', type: 'select', bootstrapGridClass: "col-lg-6", name: "parent_category_id", validations: [Validators.required], required: true,
  //           //   value: category ? category.parent_category_id : null, options: result['data']
  //           // },
  //           { label: 'Parent Category', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "parent_category_id", validations: [Validators.required], required: true, value: category ? category.parent_category_id : null, options: result['data'] }

  //           , {
  //             label: 'Status', type: 'select', bootstrapGridClass: "col-lg-6", name: "status", validations: [Validators.required], required: true,
  //             value: category ? category.status : 'active', options: Status
  //           },
  //           { label: 'Description', type: 'textarea', bootstrapGridClass: "col-lg-12", name: "description", validations: [Validators.maxLength(250)], value: category ? category.description : null }

  //         ]
  //         this.form['form_fields'] = this.fields;
  //         this.form['FormbootstrapGridClass'] = 'col-lg-9';
  //         this.form['image'] = true;
  //         this.form['ImagebootstrapGridClass'] = 'col-lg-3';
  //         this.form['img_height'] = "200px";
  //         this.form['img_width'] = "200px";
  //         this.form['image_url'] = category ? category.image : null;
  //         this.form['submit'] = 'Save'
  //       }
  //       else {
  //         SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
  //       }
  //       this.loaded = true;
  //     },
  //     err => {
  //       console.log('error wile getting parent categories.', err);
  //       this.loaded = true;
  //     }
  //   );

  // }

  changeProduct(value, j, i) {
    var newArray = this.fieldsdd.filter(function (el) {
      return Number(value) === el.id;
    });
    this.producVarients = newArray && newArray.length > 0 ? newArray[0] : null;

    this.varientArray[i][j] = this.producVarients.variants;

    if (this.varientArray[i][j].values && this.varientArray[i][j].values.length > 0) {
      this.varientArray[i][j].display = true;
    }

    console.log(this.varientArray)

    // if(j==0) {
      this.producVarientsindex = i;
      // this.producVarientsindex = j;
    // }
  }

  varientCheckbox(event, k, j, i) {
    if (this.varientArray[i][j]['value'] && this.varientArray[i][j]['value'].length > 0) {
      this.varientArray[i][j]['value'].forEach((element, j) => {
        if (j === k) {
          element.is_selected = event.target.checked
        } else {
          element.is_selected = false
        }
      });
      // localStorage.setItem('varient', JSON.stringify(this.varientArray[k]));
      // this.varientArray[k] = JSON.parse(localStorage.getItem('varient'));
      // console.log(this.varientArray);
      // console.log(JSON.parse(localStorage.getItem('varient')));
    }
  }

  navigateToDealListing() {
    let url = this.route.url.split('/');
    this.route.navigate([url[0] + "/" + url[1] + "/" + url[2]]);
  }
}
