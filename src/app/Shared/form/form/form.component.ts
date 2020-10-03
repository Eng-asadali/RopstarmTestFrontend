import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FieldConfig } from "../../../Interfaces/feildConfig";
import { FormBuilder, FormGroup, FormArray, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { NgSelectModule, NgOption } from '@ng-select/ng-select';

declare var $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  @Input() form: any;
  @Output() formValues = new EventEmitter();
  @Output() sendform: FormGroup;
  fields: FieldConfig[] = [] as FieldConfig[];

  @Input() submit_clicked: boolean;
  @Input() edit_clicked: boolean;
  @Input() clear_form: boolean;
  @Input() option: []
  Form: FormGroup;
  displayValidationsErrors = false;
  map_values: any = {};
  form_values: any = {};
  image_value: any = {};
  cover_image_value: any = {};
  timeout;

  row: any = [];

  @ViewChild('f') FormGroupDirective: FormGroupDirective;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.fields = this.form['form_fields'];
    this.Form = this.fb.group({});
    this.addControls();
  }

  ngOnDestroy() {
    clearTimeout(this.timeout);
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['form']) {
      this.timeout = setInterval(() => {
        if (this.form['form_fields'].length > 0) {
          var form = this.form;
          this.form = form;
          this.fields = this.form['form_fields'];
          this.addControls();
          clearTimeout(this.timeout);
        }
      }, 100);
    }

    if (changes['clear_form']) {
      if (changes['clear_form'].currentValue == true) {
        this.FormGroupDirective.resetForm();
        this.displayValidationsErrors = false;
        if ((<HTMLImageElement>document.getElementById("img")) != null) {
          (<HTMLImageElement>document.getElementById("img")).src = '../../../../assets/images/no_image.png';
          delete this.form_values['image'];
          this.image_value = {};
          this.cover_image_value = {};
        }
      }

      // setTimeout(function () {
      //   $('.selectpicker').selectpicker('refresh');
      // }, 200);
    }

  }

  addControls() {
    this.row = [];
    var count = 0;
    var array = [];
    for (var i = 0; i < this.fields.length; i++) {
      if (this.fields[i].name != undefined) {
        var bootstrapGridClass = parseInt(this.fields[i].bootstrapGridClass.split('-')[2]);
        count = count + bootstrapGridClass;
        if (count % 12 == 0) {
          array.push(i);
          this.row.push(array);
          array = [];
        }
        else {
          array.push(i);
        }
        if (this.fields[i].value != undefined) {


          if (this.fields[i].type == 'attribute' && this.fields[i].value != null) {
            this.Form.addControl('product_attributes', this.fb.array([]));
            const product_attributes = this.parseProductAttributes(this.fields[i].value);
            for (let i = 0; i < product_attributes.length; i++) {
              this.addAttribute(product_attributes[i].name, product_attributes[i].value);
            }
          }



          else
            this.Form.addControl(this.fields[i].name, new FormControl(this.fields[i].value, this.fields[i].validations));

        }
        else {
          if (this.fields[i].type == 'attribute' && this.fields[i].value == null) {
            this.Form.addControl('product_attributes', this.fb.array([
              this.fb.group({
                name: '',
                value: ''
              })
            ]));
          }
          else
            this.Form.addControl(this.fields[i].name, new FormControl(null, this.fields[i].validations));


        }

      }
      if (this.fields[i].type == 'submit') {
        array.push(i);
        this.row.push(array);
      }

    }

    // if (this.form['attribute']) {

    // }

    // console.log(this.Form);
    // setTimeout(function () {
    //   $('ng-select > div:first-child').addClass('form-control');
    // }, 10);
  }

  parseProductAttributes(product_attributes: string) {
    console.log(product_attributes);
    const object = product_attributes;
    let array = [];
    var attributes_list = object['attributes_list'];
    for (let i = 0; i < attributes_list.length; i++) {
      let formatted_obj = {
        name: attributes_list[i]['name'],
        value: attributes_list[i]['value'].toString()
      }
      array.push(formatted_obj);
    }

    console.log(array);
    return array;


  }

  addAttribute(name?, value?) {
    var arr = <FormArray>this.Form.get('product_attributes');
    console.log(arr);
    const attribute = this.fb.group({
      name: name ? name : '',
      value: value ? value : ''
    });
    arr.push(attribute);
  }

  minusAttribute() {
    var arr = this.Form.get('product_attributes');
    let last_index = (arr as FormArray).length - 1;
    (arr as FormArray).removeAt(last_index);
  }

  submit() {

    this.form_values = { ...this.Form.value, ...this.map_values, ...this.image_value, ...this.cover_image_value };
    console.log(this.form_values);
    if (this.Form.valid) {
      Object.keys(this.form_values).forEach(function (key) {
        if (this.form_values[key] == null)
          this.form_values[key] = "";
        if (key == "space") {
          delete this.form_values[key];
        }
      }.bind(this));
      this.formValues.emit(this.form_values);
    }
    else {
      console.log('form is not valid');
    }
  }

  onImageChanged(event) {
    var selectedFile: File;
    selectedFile = event.target.files[0];
    this.image_value['image'] = selectedFile;
    this.readImageURL(event.target);
  }

  readImageURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#img').attr('src', e.target['result']);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  onImageChanged2(event) {
    var selectedFile: File;
    selectedFile = event.target.files[0];
    this.cover_image_value['cover_image'] = selectedFile;
    this.readImageURL2(event.target);
  }

  readImageURL2(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
        $('#cover_img').attr('src', e.target['result']);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }


  displayValidations() {
    if (this.Form.valid == false) {
      this.displayValidationsErrors = true;
    }
  }

  chooseImage() {
    document.getElementById("fileInput").click();
  }
  chooseImage2() {
    document.getElementById("fileInput2").click();
  }

}
