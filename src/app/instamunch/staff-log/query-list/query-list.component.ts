import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { LogsService } from '../../Services/logs.service';
import { SwalAlert } from 'src/app/Shared/swalAlerts';

@Component({
  selector: 'app-query-list',
  templateUrl: './query-list.component.html',
  styleUrls: ['./query-list.component.css']
})
export class QueryListComponent implements OnInit {
  constructor(private LogsService: LogsService, private router: Router, private currentActivatedRoute: ActivatedRoute) { }


  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  table_headers: any = [];
  data: any = [];
  staff: any;
  loaded: boolean = false;
  kitchen_log_id:string
  question_ids: any = [];

  ngOnInit() {
    this.table_headers = ['select', 'Query',  'actions'];
    this.getQueriesList(this.currentActivatedRoute.snapshot.paramMap.get('id'));
    this.kitchen_log_id=this.currentActivatedRoute.snapshot.paramMap.get('id')
  }

  getQueriesList(id) {
    const question = this.LogsService.getQuestions(id);
    question.subscribe(
      result => {
        console.log('Question list:', result);
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

  getQuestionId(staff_id, action) {
    console.log('question id', staff_id);
    if (action == 'edit')
      this.router.navigate(['instamunch/log/query/edit/', staff_id]);
    else {
      this.deleteQuestionById(staff_id);
    }
  }

  async deleteQuestionById(question_id) {
    const response = await SwalAlert.getDeleteSwal();
    if (response == true) {
      this.loaded = false;
      this.LogsService.deleteQuestionsById(question_id).subscribe(
        result => {
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Staff Deleted Successfully!');
            this.getQueriesList(this.currentActivatedRoute.snapshot.paramMap.get('id'));
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

  async deleteMultipleQuestions() {
    if (this.question_ids.length > 0) {
      const response = await SwalAlert.getDeleteSwal();
      if (response == true) {
        this.loaded = false;
        this.LogsService.deleteMultipeQuestions(this.question_ids).subscribe(
          result => {
            if (!result['error']) {
              SwalAlert.sucessAlert('', 'Question Deleted Successfully!');
              this.getQueriesList(this.currentActivatedRoute.snapshot.paramMap.get('id'));
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
      SwalAlert.errorAlert('', 'Please Select Question to Delete!');
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
    this.question_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
    // console.log(this.selection);
  }

  // $event ? selection.toggle(row) : null
  checkboxClicked(event, row) {
    if (event) {
      this.selection.toggle(row);
    }
    else
      null;

    this.question_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
    // console.log(this.selection);
  }


  navigateToLogAdd() {
    this.router.navigate(['/admin/log/query/add',this.currentActivatedRoute.snapshot.paramMap.get('id')])
  }

 

  getIdsFromSelectionArrayObject(array_of_objects) {
    let ids = array_of_objects.map(a => a.id);
    return ids;
  }

  navigateToLogListing() {
    this.router.navigate(['admin/logs'])
  }
}


