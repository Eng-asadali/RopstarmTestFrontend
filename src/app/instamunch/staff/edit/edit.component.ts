import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { Staff } from '../staff';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { StaffService } from '../../Services/staff.service';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';


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
 //   if (this.active_route.snapshot.paramMap.get('id') != null) {
      const staff_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      let staff = this.StaffService.getStaffById(staff_id);
      staff.subscribe(
        result => {
          console.log('Staff by id:', result);
          if (!result['error']) {
            this.loaded = true;
           this.generateForm(result['data'][0]);
           
          }
          else {
            this.loaded = true;
            SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }

        },
        err => { console.log(err); },
        () => { console.log('call completed'); }
      );
   //   console.log(category);
//    }


  //  else {
  //   this.loaded = true;
  //     this.generateForm();
  //  }
  }

  generateForm(staff?: Staff) {
//    this.categoryService.getCategories().subscribe(
     // result => {
      //  if (!result['error']) {
          this.fields = [
            { label: 'First Name', type: 'text', bootstrapGridClass: "col-lg-6", name: "first_name", validations: [Validators.required], required: true, value: staff ? staff.first_name : '' },
            {
              label: 'Last Name', type: 'text', bootstrapGridClass: "col-lg-6", name: "last_name", validations: [Validators.required], required: true, value: staff ? staff.last_name : ''
            }
            // {
            //   label: 'Email', type: 'text', bootstrapGridClass: "col-lg-6", name: "email", validations: [Validators.required], required: true, value: staff ? staff.email : ''
            // },
            // { label: 'Password', type: 'text', bootstrapGridClass: "col-lg-6", name: "password",validations: [Validators.required], value: staff ? staff.password : '' }

         ,{ label: 'Date of Birth', type: 'date', bootstrapGridClass: "col-lg-6", name: "date_of_birth",validations: [Validators.required], value: staff ? staff.date_of_birth : '' }
         ,{ label: 'Salary', type:'number', bootstrapGridClass: "col-lg-6", name: "salary",validations: [Validators.required], value: staff ? staff.salary : '' }
         ,{ label: 'Salary Disbursement', type: 'select', bootstrapGridClass: "col-lg-6", name: "salary_disbursement",validations: [Validators.required], value: staff ? staff.salary_disbursement: '', options: [{ id: 'Monthly', name: 'Monthly' }, { id: 'weakly', name: 'Weakly' }] }
         ,{ label: 'Job Shift', type: 'select', bootstrapGridClass: "col-lg-6", name: "job_shift",validations: [Validators.required], value: staff ? staff.job_shift : '' , options: [{ id: 'Morning', name: 'Morning' }, { id: 'Night', name: 'Night' }]}
        ,{
          label: 'Type', type: 'select', bootstrapGridClass: "col-lg-6", name: "type", validations: [Validators.required], required: true,
          value: staff ? staff.type : '', options: [{ id: 'admin', name: 'admin' }, { id: 'user', name: 'user' }, { id: 'guest', name: 'guest' }, { id: 'manager', name: 'manager' },{ id: 'waiter', name: 'waiter' },{ id: 'staff', name: 'staff' },{ id: 'kitchen_manager', name: 'kitchen manager' }]
        },
        { label: 'Experience', type: 'select', bootstrapGridClass: "col-lg-6", name: "experience",validations: [Validators.required], value: staff ? staff.experience : '',options: [{ id: 'Professional', name: 'Professional' }, { id: 'Beginner', name: 'Beginner' }] }
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
         // this.form['is_epos']=true;
         
      //  }
        // else{
        //   this.loaded=true;
        //   SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        // }
     // },
    //  err => { console.log(err); },
     
 //   );
    //  }
     

     
  }
  getStaffData(data){
  console.log(data);
  data['is_epos']=true;
  data['branch_id']=1;
  //data['username']=data.email;
  data['modified_by_id']=2;
  data['created_by_id']=2;

  
  //if (this.active_route.snapshot.paramMap.get('id') != null) {
    const staff_id = parseInt(this.active_route.snapshot.paramMap.get('id'));

    this.StaffService.uploadStaffById(data,staff_id).subscribe(
      result=>{
        console.log("Inside Result");
  
        if(!result['error']){
          this.clear_form= true;
          console.log("Ok Result");
                  SwalAlert.sucessAlert('','Staff Updated Added!');
        }
        else{
          SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
  
        }
    console.log(result);
  
   }
      );
 // }

// else{

//   this.StaffService.addStaff(data).subscribe(
//     result=>{
//       console.log("Inside Result");

//       if(!result['error']){
//         this.clear_form= true;
//         console.log("Ok Result");
//                 SwalAlert.sucessAlert('','Staff Created Added!');
//       }
//       else{
//         SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

//       }
//   console.log(result);

//  }
//     );
// }
  

   
  }


  

  navigateToProductListing() {
    this.router.navigate(['instamunch/staff'])
  }

}
