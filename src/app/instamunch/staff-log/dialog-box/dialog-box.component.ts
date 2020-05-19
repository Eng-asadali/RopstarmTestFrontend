import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { QueryListComponent } from './../query-list/query-list.component';
import { LogsService } from './../../Services/logs.service';
import {  ViewChild,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

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

  constructor(  public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private LogsService: LogsService,
    private active_route: ActivatedRoute, private router: Router) { }
    @ViewChild(QueryListComponent) child;
    kitchen_log_id:string;
    form = {};
    fields: FieldConfig[] = [] as FieldConfig[];
    submit_clicked: boolean;
    clear_form: boolean;
    edit: boolean = false;
    loaded = false;
    question:question
   

     
        
      
    ngOnInit() {
  
      this.form['form_fields'] = this.fields;
      if (this.data.queryID != null) {
        const log_id = this.data.queryID;
        this.getQuestionById(log_id);
        //this.kitchen_log_id = this.child.kitchen_log_id;
       // console.log("kitchen id from query list components:"+this.kitchen_log_id);
      }
      
    }
  
    getQuestionById(id) {
      let question = this.LogsService.getQuestionById(id);
      question.subscribe(
        result => {
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
  