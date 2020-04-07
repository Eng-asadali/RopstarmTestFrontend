import { QueryListComponent } from './../query-list/query-list.component';
import { LogsService } from './../../Services/logs.service';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { question } from '../question';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { option } from '../../Options/logs';
import { validation_patterns } from '../../../Shared/validation_patterns';
import{validateDate}from '../../../Shared/Custom Validators/dateValidator'

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit  {
  @ViewChild(QueryListComponent) child;
  kitchen_log_id:string;
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;
  edit: boolean = false;
  loaded = false;
  question:question
 
  constructor(private LogsService: LogsService,
    private active_route: ActivatedRoute, private router: Router) { }
   
      
    
  ngOnInit() {

    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      const log_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
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
    this.form['submit'] = 'Save';
  }


  getQueryData(data) {
    console.log(data);
  //  data['kitchen_log_id'] = this.active_route.snapshot.paramMap.get('id');
    console.log(data);
    this.clear_form = false;
    this.submit_clicked = true;
    
      const log_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      this.editQuestion(data, log_id);
    
    // else {
    //   this.addQuery(data)
    // }
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



  navigateToQueryListing() {
    this.router.navigate(['admin/log/queries/',this.kitchen_log_id])
  }

}
