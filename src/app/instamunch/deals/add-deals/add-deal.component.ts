import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { Category } from '../deals';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { Status } from '../../Options/status';
import { LogsService } from './../../Services/logs.service';

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

  loaded = false;
  edit: boolean = false;

  category: Category;
  category_id: number;
  addForm: FormGroup;
  queryData: any;
  deal: any;
  deal_log_id: any;
  constructor(private categoryService: CategoryService, private route: Router, private LogsService: LogsService,
    private fb: FormBuilder,
    private active_route: ActivatedRoute) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      this.edit = true;
      const deal_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      this.getDealDataById(deal_id);
    }
    // else {
    //   this.edit = false;
    //   this.generateForm();
    // }
    this.addForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      duration: new FormControl(null, [Validators.required]),
      is_recurrence: new FormControl(true),
      price: new FormControl(100)
    });
    this.addForm.addControl('deal_categories', this.fb.array([
      this.fb.group({
        item: '',
        categoryChkBox: false,
        deal_items: this.fb.array([
          this.fb.group({
            productItems: ''
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


  getDealDataById(id) {
    let question = this.LogsService.getDealsById(id);
    question.subscribe(
      result => {
        this.queryData = result['data'];
        this.addForm.patchValue(this.queryData[0]);

        let ans = this.queryData[0]['products'];
        if (ans && ans.length) {
          var arr = this.addForm.get('deal_categories');
          (arr as FormArray).removeAt(0);
          let ans_arr = this.addForm.get('deal_categories') as FormArray;
          ans.forEach(element => {
            let con = this.fb.group({
              item: element.id
            });
            ans_arr.push(con);
          });
        }

        this.deal = result['data'];
        this.deal_log_id = result['data']['id']
        if (!result['error']) {
          this.loaded = true;
          //console.log("question data above generate form"+this.question)
          //this.generateForm(this.question);
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
    if (form.valid) {
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
    let dealItems = [];
    let formData: FormData = new FormData();
    if (data.deal_categories && data.deal_categories.length > 0) {
      data.deal_categories.forEach(element => {
        if (element.item) {

          dealItems.push((element.item));
        }
        // formData.append('deal_items', element.item);  
        // data.deal_items = element.item;
      });
    }

    data.deal_categories = dealItems;
    this.LogsService.editDeall(data, get_id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Question Edited Sucessfully!');
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
    let deal_categories = [];
    let formData: FormData = new FormData();
    if (data.deal_categories && data.deal_categories.length > 0) {
      data.deal_categories.forEach(element => {
        deal_categories.push((element.item));
        // formData.append('deal_items', element.item);  
        // data.deal_items = element.item;
      });
    }


    data.deal_categories = deal_categories;
    this.LogsService.addDeall(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Question Added Sucessfully!');
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

  addAttribute(item?, value?) {
    var arr = <FormArray>this.addForm.get('deal_categories');
    const attribute = this.fb.group({
      item: item ? item : '',
      categoryChkBox:false,
      deal_items: this.fb.array([
        this.fb.group({
          productItems: ''
        })
      ])
    });
    arr.push(attribute);
  }

  addAttributeCategory(i, j) {
    const control = this.addForm.get('deal_categories') as FormArray;
    var arr = <FormArray>control.at(i).get('deal_items');
    const attribute = this.fb.group({
      productItems: ''
    });
    arr.push(attribute);
  }

  minusAttribute() {
    var arr = this.addForm.get('deal_categories');
    let last_index = (arr as FormArray).length - 1;
    (arr as FormArray).removeAt(last_index);
  }
  minusAttributeCategory(i) {
    const control = this.addForm.get('deal_categories') as FormArray;
    var arr = <FormArray>control.at(i).get('deal_items');
    let last_index = arr .length - 1;
    (arr as FormArray).removeAt(last_index);
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


  navigateToDealListing() {
    let url = this.route.url.split('/');
    this.route.navigate([url[0] + "/" + url[1] + "/" + url[2]]);
  }
}
