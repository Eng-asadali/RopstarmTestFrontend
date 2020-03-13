import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { Staff } from '../staff';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { StaffService } from '../../Services/staff.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { experience, SalaryDisbursement, StaffType, JobShift } from '../../Options/staff';
import { validation_patterns } from '../../../Shared/validation_patterns';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.css']
})
export class AddStaffComponent implements OnInit {
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;

  constructor(private StaffService: StaffService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    this.loaded = true;
    this.generateForm();
  }

  generateForm(staff?: Staff) {
    this.fields = [
      { label: 'First Name', type: 'text', bootstrapGridClass: "col-lg-6", name: "first_name", validations: [Validators.required], required: true, value: staff ? staff.first_name : '' },
      {
        label: 'Last Name', type: 'text', bootstrapGridClass: "col-lg-6", name: "last_name", validations: [Validators.required], required: true, value: staff ? staff.last_name : ''
      },
      {
        label: 'Email', type: 'text', bootstrapGridClass: "col-lg-6", name: "email", validations: [Validators.required, Validators.pattern(validation_patterns.email_regex)], required: true, value: staff ? staff.email : ''
      },
      { label: 'Password', type: 'text', bootstrapGridClass: "col-lg-6", name: "password", validations: [Validators.required], value: staff ? staff.password : '', required: true }

      , { label: 'Date of Birth', type: 'date', bootstrapGridClass: "col-lg-6", name: "date_of_birth", validations: [Validators.required], value: staff ? staff.date_of_birth : '', required: true }
      , { label: 'Salary', type: 'number', bootstrapGridClass: "col-lg-6", name: "salary", validations:  [Validators.required,Validators.pattern(validation_patterns.decimal_numbers)], value: staff ? staff.salary : '', required: true }
      , { label: 'Salary Disbursement', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "salary_disbursement", validations: [Validators.required], value: staff ? staff.salary_disbursement : '', options: SalaryDisbursement, required: true }
      , { label: 'Job Shift', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "job_shift", validations: [Validators.required], value: staff ? staff.job_shift : '', options: JobShift, required: true }
      , {
        label: 'Type', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "type", validations: [Validators.required], required: true,
        value: staff ? staff.type : '', options: StaffType
      },
      { label: 'Experience', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "experience", validations: [Validators.required], value: staff ? staff.experience : '', options: experience, required: true }
   
    ]
    this.form['form_fields'] = this.fields;
    this.form['FormbootstrapGridClass'] = 'col-lg-9';
    this.form['map'] = false;
    this.form['MapbootstrapGridClass'] = 'col-lg-4';
    this.form['image'] = true;
    this.form['ImagebootstrapGridClass'] = 'col-lg-3';
    this.form['img_height'] = "200px";
    this.form['img_width'] = "200px";
    this.form['submit'] = 'Save';
  }


  getStaffData(data) {
    console.log(data);
    data['is_epos'] = true;
    // data['branch_id'] = 1;
    data['username'] = data.email;

    if (data['image'] != undefined) {
      data['user_image'] = data['image'];
      delete data['image'];
    }

    this.clear_form = false;
    this.submit_clicked = true;
    this.addStaff(data);

  }

  addStaff(data) {
    this.StaffService.addStaff(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Staff Added Sucessfully!');
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



  navigateToProductListing() {
    this.router.navigate(['instamunch/staff'])
  }

}
