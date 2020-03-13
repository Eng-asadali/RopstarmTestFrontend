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

  constructor(private ExpenseService: ExpenseService, private router: Router,
    private currentActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.table_headers = ['select',  'expense', 'amount', 'type','date', 'transaction', 'actions'];
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
      },
      err => {
        this.loaded = true;
        console.log('HTTP Error', err);
      }
    );
  }

  navigateToProductAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

  getExpenseId(id, action) {
    console.log('expense id', id);
    if (action == 'edit')
      this.router.navigate(['instamunch/expense/edit/', id]);
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
  
  deleteById(id) {
    console.log(' id to delete', id);
    this.ExpenseService.deleteById(id).subscribe(
      result => {
        if (!result['error']) {
         this.getExpensesList();
          SwalAlert.sucessAlert('', 'Deleted Successfully!');
          //this.router.navigate(['/instamunch/staff/', id]);

        }
        else
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

      }
    );

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
    this.checkedId = []
    console.log(this.selection.selected);
    for (let i = 0; i < this.selection.selected.length; i++) {
      console.log("origibal id" + this.selection.selected[i].id);
      this.checkedId.push(this.selection.selected[i].id)

    }
    console.log("array :" + this.checkedId)
  }

}
