import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import { InventoryCategoryService } from '../Services/inventory-category.service';


@Component({
  selector: 'app-inventory-category',
  templateUrl: './inventory-category.component.html',
  styleUrls: ['./inventory-category.component.css']
})
export class InventoryCategoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<any>([]);
  loaded = true;
  data;
  table_headers: any = [];
  constructor(private inventoryService: InventoryCategoryService,private router: Router,
    private currentActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.table_headers = ['name','parent_category', 'status', 'actions'];
    this.getInventory()
  }
  refresh(){
    this.loaded = false;
    this.dataSource.data = [];
    this.getInventory();
  }
  getInventory(){
    this.inventoryService.getInventoryData().subscribe(result =>{
      if (!result['error']) {
        console.log(result);
        
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
    });
  }
  getInventoryId(id, action){
    if (action == 'edit')
    this.router.navigate([ this.router.url + '/edit', id]);
    else {
      this.delete(id);
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    this.inventoryService.deleteById(id).subscribe(
      result => {
        if (!result['error']) {
         this.getInventory();
          SwalAlert.sucessAlert('', 'Deleted Successfully!');
          //this.router.navigate(['/instamunch/staff/', id]);

        }
        else
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));

      }
    );

  }
  navigateToParentCategoryAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

}

