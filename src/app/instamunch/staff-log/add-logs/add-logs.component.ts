import { LogsService } from './../../Services/logs.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { log } from '../log';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { StaffService } from '../../Services/staff.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { option ,categories,priority} from '../../Options/logs';
import { validation_patterns } from '../../../Shared/validation_patterns';
import{validateDate}from '../../../Shared/Custom Validators/dateValidator'

@Component({
  selector: 'app-add-logs',
  templateUrl: './add-logs.component.html',
  styleUrls: ['./add-logs.component.css']
})
export class AddLogsComponent implements OnInit {

  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;
  edit: boolean = false;
  loaded = false;
  log:log
  constructor(private StaffService: StaffService,private LogsService:LogsService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      this.edit = true;
      const log_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      this.getLogById(log_id);
    }
    else {

      this.edit = false;
      this.loaded = true;
      this.generateForm();
    }


    // this.form['form_fields'] = this.fields;
    // this.loaded = true;
    // this.generateForm();
  }
 
 
  generateForm(log?: log) {
    //console.log("log"+log.title)

    let users=this.StaffService.getStaff();
    users.subscribe((result)=>{
      console.log("users"+result)
   
    this.fields = [
      {
        label: 'Title', type: 'text', bootstrapGridClass: "col-lg-6", name: "title", validations: [Validators.required,Validators.maxLength(25)], required: true, value: log ? log.title : ''
      },
      { label: 'category', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "category", validations: [Validators.required], required: true, value: log ? log.category : '', options: categories },

      {
        label: 'Days Interval', type: 'number', bootstrapGridClass: "col-lg-6", name: "days_interval", validations: [Validators.required,Validators.pattern(validation_patterns.decimal_numbers)], required: true, value: log ? log.days_interval : ''
      },
      { label: 'priority', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "priority", validations: [Validators.required], required: true, value: log ? log.priority : '' , options: priority},
      { label: 'Assigned to', type: 'ngselectname', bootstrapGridClass: "col-lg-12", name: "assigned_to_id", validations: [Validators.required],required: true,value: log ? log.assigned_to_id : '' , options: result['data']}
    
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
  });
  }


  getLogData(data) {
    console.log(data);
    this.clear_form = false;
    this.submit_clicked = true;
    if (this.edit) {
      const log_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      this.editLog(data, log_id);
    }
    else {
      this.addLog(data);
    }

  }


  editLog(data, id) {
    this.LogsService.editLog(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'log Updated Sucessfully!');
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



  getLogById(id) {
    let job = this.LogsService.getLogById(id);
    job.subscribe(
      result => {
        console.log("INSIDE  EDIT ")
        console.log('log by id:', result);
        this.log = result['data'][0];
        console.log('RESULT:', result);
        if (!result['error']) {
          this.loaded = true;
          console.log("log data above generate form"+this.log)
          this.generateForm(this.log);
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

  addLog(data) {
    this.LogsService.addlog(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'log Added Sucessfully!');
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
    this.router.navigate(['admin/logs'])
  }

}
