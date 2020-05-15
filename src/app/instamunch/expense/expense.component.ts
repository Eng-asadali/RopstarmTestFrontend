import { KitchenComponent } from './../kitchen/kitchen.component';
import { ExpenseService } from './../Services/expense.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../Services/product.service';
import { expense } from './expense';
import { SwalAlert } from '../../Shared/swalAlerts';
import { StatusEnum } from '../Enums/status-enum';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  statusEnum = StatusEnum;
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  loaded = false;

  table_headers: any = [];
  data: any = [];
  checkedId: any = [];
  expenses: expense[];

  expense_ids: any = [];

  constructor(private ExpenseService: ExpenseService, private router: Router,
    private currentActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.table_headers = ['select', 'expense', 'amount', 'type', 'date', 'transaction', 'actions'];
    this.getExpensesList();
  }

  getExpensesList() {
    const expenses = this.ExpenseService.getExpenses();
    expenses.subscribe(
      result => {
        console.log('expense list', result);
        if (!result['error']) {
          this.data = result['data'];
          this.dataSource.data = this.data;
          this.dataSource.connect().next(this.data);
          this.dataSource.paginator = this.paginator;
        }
        else {
          if (result['httpError']['status'] != 401)
            SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        this.loaded = true;
        this.selection.clear();
      },
      err => {
        this.loaded = true;
        console.log('HTTP Error', err);
      }
    );
  }


  refresh(){
    this.loaded = false;
    this.dataSource.data = [];
    this.getExpensesList();
  }


  navigateToProductAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

  getExpenseId(id, action) {
    console.log('expense id', id);
    if (action == 'edit')
      this.router.navigate([this.router.url + '/edit', id]);
    else {
      this.deleteExpenseById(id);
    }
  }

  async deleteExpenseById(expense_id) {
    const response = await SwalAlert.getDeleteSwal();
    if (response == true) {
      this.loaded = false;
      this.ExpenseService.deleteById(expense_id).subscribe(
        result => {
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Expense Deleted Successfully!');
            this.getExpensesList();
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

  async deleteMultipleExpense() {
    if (this.expense_ids.length > 0) {
      const response = await SwalAlert.getDeleteSwal();
      if (response == true) {
        this.loaded = false;
        this.ExpenseService.deleteMultipeExpense(this.expense_ids).subscribe(
          result => {
            if (!result['error']) {
              SwalAlert.sucessAlert('', 'Expenses Deleted Successfully!');
              this.getExpensesList();
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
      SwalAlert.errorAlert('', 'Please Select Expense to Delete!');
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
    this.expense_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
  }

  // $event ? selection.toggle(row) : null
  checkboxClicked(event, row) {
    if (event) {
      this.selection.toggle(row);
    }
    else
      null;
    this.expense_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
  }

  getIdsFromSelectionArrayObject(array_of_objects) {
    let ids = array_of_objects.map(a => a.id);
    return ids;
  }

}
