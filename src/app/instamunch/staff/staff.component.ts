import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { StaffService } from '../Services/staff.service';
import { SwalAlert } from 'src/app/Shared/swalAlerts';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private staffService: StaffService,private router: Router,private currentActivatedRoute: ActivatedRoute) { }


  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  table_headers: any = [];
  data: any = [];
  staff: any;
  loaded: boolean = false;

  ngOnInit() {
    this.table_headers = ['user image' ,'name', 'Type', 'Email', 'Salary' ,'Salary Disbursement', 'Job Shift','actions'];
    const staff = this.staffService.getStaff();
    staff.subscribe(
      result => {
        console.log('staff list:', result);
        if (!result['error']) {
          this.staff = result['data'];
          this.dataSource.data = this.staff;
          this.dataSource.connect().next(this.staff);
          this.dataSource.paginator = this.paginator;
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
      },
      err => { console.log(err); },
      () => {
        this.loaded = true;
        // console.log('call completed');
      }
    );
  }
  getStaffId(id) {
    console.log('staff id', id);
    this.router.navigate(['/instamunch/staff/edit', id]);
  }



  deleteStaffId(id) {
    console.log('staff id to delete', id);
    this.staffService.deleteStaffById(id).subscribe(
      result=>{
        if(!result['error']){
          this.getStaffListing() ;
          SwalAlert.sucessAlert('','Staff Deleted Successfully!');
          //this.router.navigate(['/instamunch/staff/', id]);

        }
        else 
        SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

      }
    );
   
  }

  navigateToStaffAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

  navigateToStaffListing() {
    this.router.navigate(['instamunch/staff'])
  }
 getStaffListing(){
   this.loaded=false;
  const staff = this.staffService.getStaff();
  staff.subscribe(
    result => {
      console.log('staff list:', result);
      if (!result['error']) {
        this.loaded=true;

        this.staff = result['data'];
        this.dataSource.data = this.staff;
        this.dataSource.connect().next(this.staff);
        this.dataSource.paginator = this.paginator;
      }
      else {
        SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
      }
    },
    err => { console.log(err); },
    () => {
      this.loaded = true;
      // console.log('call completed');
    }
  );
 }

}
