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

  staff_ids: any = [];

  ngOnInit() {
    this.table_headers = ['select', 'user image', 'name', 'Type', 'Email', 'Salary', 'Salary Disbursement', 'Job Shift', 'actions'];
    this.getStaffList();
  }

  getStaffList() {
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
        this.loaded = true;
        this.selection.clear();
      },
      err => {
        this.loaded = true;
        console.error(err);
      }
    );
  }

  getStaffId(staff_id, action) {
    console.log('staff id', staff_id);
    if (action == 'edit')
      this.router.navigate(['/instamunch/staff/edit', staff_id]);
    else {
      this.deleteStaffById(staff_id);
    }
  }

  async deleteStaffById(staff_id) {
    const response = await SwalAlert.getDeleteSwal();
    if (response == true) {
      this.loaded = false;
      this.staffService.deleteById(staff_id).subscribe(
        result => {
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Staff Deleted Successfully!');
            this.getStaffList();
          }
          else {
            this.loaded = true;
            SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
          }
        },
        err => {
          this.loaded = true;
          console.error(err);
        }
      );
    }
  }

  async deleteMultipleStaff() {
    if (this.staff_ids.length > 0) {
      const response = await SwalAlert.getDeleteSwal();
      if (response == true) {
        this.loaded = false;
        this.staffService.deleteMultipeStaff(this.staff_ids).subscribe(
          result => {
            if (!result['error']) {
              SwalAlert.sucessAlert('', 'Staff Deleted Successfully!');
              this.getStaffList();
            }
            else {
              this.loaded = true;
              SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
            }
          },
          err => {
            this.loaded = true;
            console.error(err);
          }
        )
      }
    }
    else {
      SwalAlert.errorAlert('', 'Please Select Staff to Delete!');
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.staff_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
    // console.log(this.selection);
  }

  // $event ? selection.toggle(row) : null
  checkboxClicked(event, row) {
    if (event) {
      this.selection.toggle(row);
    }
    else
      null;

    this.staff_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
    // console.log(this.selection);
  }


  navigateToStaffAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

  navigateToStaffListing() {
    this.router.navigate(['instamunch/staff'])
  }

  getIdsFromSelectionArrayObject(array_of_objects) {
    let ids = array_of_objects.map(a => a.id);
    return ids;
  }

}
