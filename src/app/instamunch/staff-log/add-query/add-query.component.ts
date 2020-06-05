import { LogsService } from './../../Services/logs.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormGroupDirective } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { question } from '../question';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { SwalAlert } from '../../../Shared/swalAlerts';
import { option } from '../../Options/logs';
import { validation_patterns } from '../../../Shared/validation_patterns';
import { validateDate } from '../../../Shared/Custom Validators/dateValidator';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-query',
  templateUrl: './add-query.component.html',
  styleUrls: ['./add-query.component.css']
})
export class AddQueryComponent implements OnInit {
  queryForm: FormGroup;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  table_headers: any = [];
  data: any = [];
  staff: any;
  loaded: boolean = false;
  kitchen_log_id: string
  question_ids: any = [];

  form = {};

  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;
  edit: boolean = false;

  question: question;
  @ViewChild('formDir') FormGroupDirective: FormGroupDirective;

  constructor(private LogsService: LogsService,
    private active_route: ActivatedRoute, private router: Router, private currentActivatedRoute: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    this.table_headers = ['select', 'Query', 'actions'];
    this.getQueriesList(this.currentActivatedRoute.snapshot.paramMap.get('id'));
    this.kitchen_log_id = this.currentActivatedRoute.snapshot.paramMap.get('id')

    this.form['form_fields'] = this.fields;

    this.edit = false;
    this.loaded = true;
    this.generateForm();
    this.queryForm = new FormGroup({
      question: new FormControl(null, [Validators.required])
    });

  }

  getQuestionById(id) {
    let question = this.LogsService.getQuestionById(id);
    question.subscribe(
      result => {
        console.log("INSIDE  EDIT ")
        console.log('question by id:', result);
        this.question = result['data'];

        console.log('RESULT:', result);
        if (!result['error']) {
          this.loaded = true;
          console.log("question data above generate form" + this.question)
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
      { label: 'Question', type: 'text', bootstrapGridClass: "col-lg-12", name: "question", validations: [Validators.required, Validators.maxLength(50)], required: true, value: question ? question.question : '' }
      // ,{ label: 'Type', type: 'select', bootstrapGridClass: "col-lg-12", name: "type" }

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
    data['kitchen_log_id'] = this.active_route.snapshot.paramMap.get('id');
    console.log(data);
    this.clear_form = false;
    this.submit_clicked = true;

    this.addQuery(data)
  }


  addQuery(data) {
    this.LogsService.addQuestion(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Query Added Sucessfully!');
          this.reset();
          this.getQueriesList(this.currentActivatedRoute.snapshot.paramMap.get('id'));
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

  onSubmit(form) {
    if(form.valid){
      this.addQuery(form.value);
    }
  }

  reset() {
    this.FormGroupDirective.resetForm();
  }

  getFormControl(name) {
    return this.queryForm.get(name);
  }


  navigateToQueryListing() {
    this.router.navigate(['admin/logs'])
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
      this.router.navigate(['admin/log/query/edit/', staff_id]);
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
            SwalAlert.sucessAlert('', 'Query Deleted Successfully!');
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
    this.router.navigate(['/admin/log/query/add', this.currentActivatedRoute.snapshot.paramMap.get('id')])
  }



  getIdsFromSelectionArrayObject(array_of_objects) {
    let ids = array_of_objects.map(a => a.id);
    return ids;
  }

  navigateToLogListing() {
    this.router.navigate(['admin/logs'])
  }

  openDialog(queryID): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '800px',
      height: '300px',

      data: { queryID: queryID }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      this.table_headers = ['select', 'Query', 'actions'];
      this.getQueriesList(this.currentActivatedRoute.snapshot.paramMap.get('id'));
      this.kitchen_log_id = this.currentActivatedRoute.snapshot.paramMap.get('id')

      this.form['form_fields'] = this.fields;

      this.edit = false;
      this.loaded = true;
      this.generateForm();
    });
  }

  refresh() {
    this.loaded = false;
    this.dataSource.data = [];
    this.getQueriesList(this.currentActivatedRoute.snapshot.paramMap.get('id'));
  }

}
