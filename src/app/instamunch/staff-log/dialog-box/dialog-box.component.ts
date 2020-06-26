import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { QueryListComponent } from './../query-list/query-list.component';
import { LogsService } from './../../Services/logs.service';
import {  ViewChild,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

import { question } from '../question';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { option } from '../../Options/logs';
import { validation_patterns } from '../../../Shared/validation_patterns';
import{validateDate}from '../../../Shared/Custom Validators/dateValidator'
export interface DialogData {
  queryID: string;

}
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  queryId;

  constructor(  public dialogRef: MatDialogRef<DialogBoxComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private LogsService: LogsService,
    private active_route: ActivatedRoute, private router: Router) { 
      this.queryId = data;
    }
    @ViewChild(QueryListComponent) child;
    kitchen_log_id:string;
    form = {};
    fields: FieldConfig[] = [] as FieldConfig[];
    submit_clicked: boolean;
    clear_form: boolean;
    edit: boolean = false;
    loaded = false;
    question:question
    queryForm: FormGroup;
    queryData;

        
      
    ngOnInit() {
  
      this.form['form_fields'] = this.fields;
      if (this.data.queryID != null) {
        const log_id = this.data.queryID;
        this.getQuestionById(log_id);
        //this.kitchen_log_id = this.child.kitchen_log_id;
       // console.log("kitchen id from query list components:"+this.kitchen_log_id);
      }

      this.queryForm = new FormGroup({
        question: new FormControl(null, [Validators.required]),
        // reply_type: new FormControl(null, [Validators.required])
      });

      this.queryForm.addControl('answer_options', this.fb.array([
        this.fb.group({
          name: ''
        })
      ]));
      
    }
  
    getFormControl(name) {
      return this.queryForm.get(name);
    }

    getQuestionById(id) {
      let question = this.LogsService.getQuestionById(id);
      question.subscribe(
        result => {

          this.queryData = result['data'];

          this.queryForm.patchValue({
            question: result['data']['question']
          })

          let ans= result['data']['answer_options'];
          if (ans && ans.length) {
            var arr = this.queryForm.get('answer_options');
            (arr as FormArray).removeAt(0);
            let ans_arr = this.queryForm.get('answer_options') as FormArray;
            ans.forEach(element => {
               let con=   this.fb.group({
                    name: element
                  });
               ans_arr.push(con);
            });
          }

          // this.queryForm.addControl('answer_options', this.fb.array([
          //   this.fb.group({
          //     name: ''
          //   })
          // ]));

          console.log("INSIDE  EDIT ")
          console.log('question by id:', result);
          this.question = result['data'];
          this.kitchen_log_id=result['data']['kitchen_log_id']
          console.log("kitchen log"+this.kitchen_log_id)
          console.log('RESULT:', result);
          if (!result['error']) {
            this.loaded = true;
            console.log("question data above generate form"+this.question)
            this.generateForm(this.question);
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
  
    addAttribute(name?, value?) {
      var arr = <FormArray>this.queryForm.get('answer_options');
      const attribute = this.fb.group({
        name: name ? name : ''
      });
      arr.push(attribute);
    }
  
    minusAttribute() {
      var arr = this.queryForm.get('answer_options');
      let last_index = (arr as FormArray).length - 1;
      (arr as FormArray).removeAt(last_index);
    }
  
  
    onSubmit(form) {
      if(form.valid){
        this.editQuery(form.value);
      }
    }

    editQuery(data) {
      let answerOptions = [];
      if (data.answer_options && data.answer_options.length > 0) {
        data.answer_options.forEach(element => {
          answerOptions.push(element.name);
        });
      }
      data.answer_options = answerOptions;
      // data.kitchen_log_id = Number(this.currentActivatedRoute.snapshot.paramMap.get('id'));

      this.LogsService.editQuestion(data, this.queryId.queryID).subscribe(
        result => {
          this.submit_clicked = false;
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Query Updated Sucessfully!');
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
  
    editQuestion(data, id) {
      this.LogsService.editQuestion(data, id).subscribe(
        result => {
          this.submit_clicked = false;
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Question Updated Sucessfully!');
          }
          else {
            SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }
        },
        err => {
          this.submit_clicked = false;
          console.log(err);
          SwalAlert.errorAlert('', 'Server Error');
        }
      );
    }
  
    generateForm(question?: question) {
      //console.log("question"+questions.question)
      this.fields = [
        { label: 'Question', type: 'text', bootstrapGridClass: "col-lg-12", name: "question", validations: [Validators.required,Validators.maxLength(50)], required: true, value: question ? question.question : '' }
         
      ]
      this.form['form_fields'] = this.fields;
      this.form['FormbootstrapGridClass'] = 'col-lg-12';
      this.form['map'] = false;
      this.form['MapbootstrapGridClass'] = 'col-lg-4';
      this.form['image'] = false;
      this.form['ImagebootstrapGridClass'] = 'col-lg-3';
      this.form['img_height'] = "200px";
      this.form['img_width'] = "200px";
      this.form['submit'] = 'Edit';
    }
  
  
    getQueryData(data) {
      console.log(data);
    //  data['kitchen_log_id'] = this.active_route.snapshot.paramMap.get('id');
      console.log(data);
      this.clear_form = false;
      this.submit_clicked = true;
      
        const log_id =this.data.queryID;
        this.editQuestion(data, log_id);
    }
   
  
    addQuery(data) {
      this.LogsService.addQuestion(data).subscribe(
        result => {
          this.submit_clicked = false;
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Question Added Sucessfully!');
            this.clear_form = true;
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
  
  
  
   
  
  }
  