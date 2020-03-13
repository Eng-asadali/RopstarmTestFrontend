import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';


import { Staff } from '../staff';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { StaffService } from '../../Services/staff.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { experience, SalaryDisbursement, StaffType, JobShift } from '../../Options/staff';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;

  constructor(private StaffService: StaffService,
    private active_route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    this.getStaffById(parseInt(this.active_route.snapshot.paramMap.get('id')));
  }

  getStaffById(id) {
    let staff = this.StaffService.getStaffById(id);
    staff.subscribe(
      result => {
        console.log('Staff by id:', result);
        if (!result['error']) {
          this.generateForm(result['data'][0]);
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        this.loaded = true;
      },
      err => {
        this.loaded = true;
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }

  generateForm(staff?: Staff) {
    
    this.fields = [
      { label: 'First Name', type: 'text', bootstrapGridClass: "col-lg-6", name: "first_name", validations: [Validators.required], required: true, value: staff ? staff.first_name : '' },
      {
        label: 'Last Name', type: 'text', bootstrapGridClass: "col-lg-6", name: "last_name", validations: [Validators.required], required: true, value: staff ? staff.last_name : ''
      }
      , { label: 'Date of Birth', type: 'date', bootstrapGridClass: "col-lg-6", name: "date_of_birth", validations: [Validators.required], value: staff ? staff.date_of_birth : '' }
      , { label: 'Salary', type: 'number', bootstrapGridClass: "col-lg-6", name: "salary", validations: [Validators.required], value: staff ? staff.salary : '' }
      , { label: 'Salary Disbursement', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "salary_disbursement", validations: [Validators.required], value: staff ? staff.salary_disbursement : '', options: SalaryDisbursement }
      , { label: 'Job Shift', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "job_shift", validations: [Validators.required], value: staff ? staff.job_shift : '', options: JobShift }
      , {
        label: 'Type', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "type", validations: [Validators.required], required: true,
        value: staff ? staff.type : '', options: StaffType
      },
      { label: 'Experience', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "experience", validations: [Validators.required], value: staff ? staff.experience : '', options: experience }
    ]
    this.form['form_fields'] = this.fields;
    this.form['FormbootstrapGridClass'] = 'col-lg-9';
    this.form['map'] = false;
    this.form['MapbootstrapGridClass'] = 'col-lg-4';
    this.form['image'] = true;
    this.form['ImagebootstrapGridClass'] = 'col-lg-3';
    this.form['img_height'] = "200px";
    this.form['img_width'] = "200px";
    this.form['image_url'] = staff ? staff.user_image : null;
    this.form['submit'] = 'Save';
  }

  getStaffData(data) {

    this.submit_clicked = true;

    data['is_epos'] = true;
   // data['branch_id'] = 1;

    if (data['image'] != undefined) {
      data['user_image'] = data['image'];
      delete data['image'];
    }

    //data['username']=data.email;
    // data['modified_by_id'] = 2;
    // data['created_by_id'] = 2;
    const staff_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
    this.editStaff(data, staff_id);



  }

  editStaff(data, id) {
    this.StaffService.uploadStaffById(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Staff Updated Sucessfully!');
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


  navigateToProductListing() {
    this.router.navigate(['instamunch/staff'])
  }

}
