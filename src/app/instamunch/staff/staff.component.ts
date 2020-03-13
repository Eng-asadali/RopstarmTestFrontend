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

  constructor(private staffService: StaffService, private router: Router, private currentActivatedRoute: ActivatedRoute) { }


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
    this.table_headers = ['select','user image', 'name', 'Type', 'Email', 'Salary', 'Salary Disbursement', 'Job Shift', 'actions'];
    this.getStaffList();
  }

 getStaffList(){
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

  getStaffId(id,action) {
    console.log('staff id', id);
    if (action == 'edit')
    this.router.navigate(['/instamunch/staff/edit', id]);
    else {
      this.delete(id);
    }
  }

  async delete(id) {
    const response = await SwalAlert.getDeleteSwal();
    console.log(response);
    if(response==true){
      this.deleteById(id);
    }
   
   
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
    console.log(this.selection);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    console.log(this.selection);
  }

  // $event ? selection.toggle(row) : null
  checkboxClicked(event, row) {
    if (event) {
      this.selection.toggle(row);
    }
    else
      null;

    console.log(this.selection);
  }
  
  deleteById(id) {
    console.log(' id to delete', id);
    this.staffService.deleteById(id).subscribe(
      result => {
        if (!result['error']) {
         this.getStaffList();
          SwalAlert.sucessAlert('', ' Deleted Successfully!');
          //this.router.navigate(['/instamunch/staff/', id]);

        }
        else
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

      }
    );

  }

  navigateToStaffAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

  navigateToStaffListing() {
    this.router.navigate(['instamunch/staff'])
  }

  // getStaffListing() {
  //   this.loaded = false;
  //   const staff = this.staffService.getStaff();
  //   staff.subscribe(
  //     result => {
  //       console.log('staff list:', result);
  //       if (!result['error']) {
  //         this.loaded = true;

  //         this.staff = result['data'];
  //         this.dataSource.data = this.staff;
  //         this.dataSource.connect().next(this.staff);
  //         this.dataSource.paginator = this.paginator;
  //       }
  //       else {
  //         SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
  //       }
  //     },
  //     err => { console.log(err); },
  //     () => {
  //       this.loaded = true;
  //       // console.log('call completed');
  //     }
  //   );
  // }

}
