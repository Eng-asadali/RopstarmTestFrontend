import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

import { CategoryService } from '../Services/category.service';
import { Category } from './category';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { StatusEnum } from '../Enums/status-enum';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  statusEnum= StatusEnum;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  loaded = false;

  table_headers: any = [];
  data: any = [];
  categories: Category[];

  constructor(private categoryService: CategoryService, private router: Router,
    private currentActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.table_headers = ['select', 'image', 'name', 'parent_category_id', 'status', 'actions'];
    this.getCategoriesList();
    
  }

  getCategoriesList(){
    const categories = this.categoryService.getCategories();
    categories.subscribe(
      result => {
        console.log('categories list:', result);
        if (!result['error']) {
          this.categories = result['data'];
          this.dataSource.data = this.categories;
          this.dataSource.connect().next(this.categories);
          this.dataSource.paginator = this.paginator;
        }
        else {
          SwalAlert.errorAlert('',result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
      },
      err => {
        console.log(err); },
      () => {
        this.loaded = true;
      }
    );
  }

 

  getCategoryId(category_id,action) {
    this.router.navigate(['/instamunch/category/edit', category_id]);
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

  navigateToCategoryAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }
}
