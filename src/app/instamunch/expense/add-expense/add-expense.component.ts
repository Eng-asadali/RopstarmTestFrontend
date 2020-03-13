import { ExpenseService } from './../../Services/expense.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';

import { expense } from '../expense';
import { FieldConfig } from '../../../Interfaces/feildConfig';
import { CategoryService } from '../../Services/category.service';
import { SwalAlert } from '../../../Shared/swalAlerts';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { validation_patterns } from 'src/app/Shared/validation_patterns';
import { expenseTypes,transactionTypes } from '../../Options/expense';
import{validateDate}from '../../../Shared/Custom Validators/dateValidator'

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  option=[];
  form = {};
  fields: FieldConfig[] = [] as FieldConfig[];
  submit_clicked: boolean;
  clear_form: boolean;

  loaded = false;
  edit: boolean = false;

  expense: expense;
  category_id: number;

  constructor(private ExpenseService: ExpenseService, private route: Router,
    private active_route: ActivatedRoute) { }

  ngOnInit() {
    this.form['form_fields'] = this.fields;
    if (this.active_route.snapshot.paramMap.get('id') != null) {
      this.edit = true;
      const expense_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      this.getExpenseDataById(expense_id);
    }
    else {
      this.edit = false;
      this.generateForm();
    }
  }


  getExpenseDataById(id) {
    let expense = this.ExpenseService.getExpenseById(id);
    expense.subscribe(
      result => {

        console.log('expense by id:', result);
        this.expense = result['data'][0];
        if (!result['error']) {
          this.loaded = true;
          this.generateForm(this.expense);
        }
        else {
          this.loaded = true;
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
       }

      },
      err => {
        console.log('Error while getting category by id.',err);
        this.loaded = true;
        SwalAlert.errorAlert('', 'Server Error!');
      }
    );
    
  }



  getExpensesData(data) {
    this.clear_form = false;
    this.submit_clicked = true;
    if (this.edit) {
      const Expense_id = parseInt(this.active_route.snapshot.paramMap.get('id'));
      this.editExpense(data, Expense_id);
    }
    else {
      this.addExpense(data);
    }
  }

  addExpense(data) {
  
    this.ExpenseService.addExpense(data).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          this.clear_form = true;
          SwalAlert.sucessAlert('', 'Expense Added Sucessfully!');

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

  editExpense(data, id) {
    this.ExpenseService.editExpense(data, id).subscribe(
      result => {
        this.submit_clicked = false;
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Expense Updated Sucessfully!');
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

  generateForm(expense?: expense) {
    // this.ExpenseService.getParentCategories().subscribe(
    //   result => {
    //     if (!result['error']) {
    //       this.option=result['data']
          this.fields = [
            { label: 'Expense', type: 'text', bootstrapGridClass: "col-lg-6", name: "title", validations: [Validators.required], required: true, value: expense ? expense.title : '' },
            { label: 'Amount', type: 'number', bootstrapGridClass: "col-lg-6", name: "amount", validations:  [Validators.required,Validators.pattern(validation_patterns.decimal_numbers)], required: true, value: expense ? expense.amount : '' },

            // {
            //   label: 'Parent Category', type: 'select', bootstrapGridClass: "col-lg-6", name: "parent_category_id", validations: [Validators.required], required: true,
            //   value: category ? category.parent_category_id : '', options: result['data']
            // },

            {
              label: 'Date', type: 'date', bootstrapGridClass: "col-lg-6", name: "expense_date", validations: [Validators.required,validateDate], required: true,
              value: expense ? expense.expense_date : ''
            },
            {
              label: 'Type', type: 'ngselect', bootstrapGridClass: "col-lg-6", name: "expense_type", validations: [Validators.required], required: true,
              value: expense ? expense.expense_type : '', options: expenseTypes
            },
            {
              label: 'Transaction', type: 'ngselect', bootstrapGridClass: "col-lg-12", name: "transaction_type", validations: [Validators.required], required: true,
              value: expense ? expense.transaction_type : '', options: transactionTypes
            },
          ]
          this.form['form_fields'] = this.fields;
          this.form['FormbootstrapGridClass'] = 'col-lg-12';
          this.form['image'] = false;
          this.form['ImagebootstrapGridClass'] = 'col-lg-3';
         this.form['img_height'] = "200px";
          this.form['img_width'] = "200px";
        // this.form['image_url'] = expense ? expense.image : null;
          this.form['submit'] = 'Save'
    //     }
    //     else {
    //       SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
    //     }
        this.loaded = true;
    //   },
    //   err => {
    //     console.log('error wile getting parent categories.',err);
    //     this.loaded = true;
    //   }
    // );

  }


  navigateToCategoryListing() {
    this.route.navigate(['instamunch/expense']);
  }
}