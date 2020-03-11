import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';

import { KitchenService } from '../Services/kitchen.service';
import { kitchen } from './kitchen';
import { SwalAlert } from '../../Shared/swalAlerts';
import { StatusEnum } from '../Enums/status-enum';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  statusEnum = StatusEnum;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);

  loaded = false;

  table_headers: any = [];
  data: any = [];
  checkedId :any = [];
  kitchens: kitchen[];

  constructor(private KitchenService: KitchenService, private router: Router,
    private currentActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.table_headers = [ 'image', 'name', 'status', 'actions'];
    this.getKitchenList();
  }

  getKitchenList() {
    const kitchens = this.KitchenService.getKitchens();
    kitchens.subscribe(
      result => {
        console.log('Kitchen list', result);
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

  navigateToKitchenAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

  getKitchenId(id) {
    console.log('Kitchen id', id);
    this.router.navigate(['/instamunch/Kitchen/edit', id]);
  }

  async delete() {
    const response = await SwalAlert.getDeleteSwal();
    console.log(response);
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
    this.checkedId=[]
    console.log(this.selection.selected);
    for(let i=0;i<this.selection.selected.length;i++){
     console.log("origibal id"+this.selection.selected[i].id) ;
     this.checkedId.push(this.selection.selected[i].id)
     
    }
    console.log("array :"+ this.checkedId)
  }

}
