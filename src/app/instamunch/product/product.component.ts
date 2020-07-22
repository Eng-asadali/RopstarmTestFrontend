import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductService } from '../Services/product.service';
import { Product } from './product';
import { SwalAlert } from '../../Shared/swalAlerts';
import { StatusEnum } from '../Enums/status-enum';
import Swal from 'sweetalert2';
import { CurrencyService } from '../Services/currency.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

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
  products: Product[];
  product_ids: any = [];
  kitchenDropDown;
  postData = {};

  constructor(private productService: ProductService, private router: Router,public currency_service:CurrencyService,
    private currentActivatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getKitchen();
    this.table_headers = ['select', 'image', 'name','kitchen_name', 'status',  'price','estimated_prepare_time', 'category_id','actions'];
    this.getProductsList();
  }


  getKitchen(){
    this.loaded = false;
    this.productService.getKitchenList().subscribe(
    result => {
      this.kitchenDropDown = result['data'];
    });
  }

  changeKitchen(value) {
    this.getProductsList(value);
  }


  getProductsList(value=null) {
    this.loaded = false;
    let products = null;
    if(value){
      this.postData['kitchen_id'] = value;
       products = this.productService.getFilterTable(this.postData);
    }else{
    products = this.productService.getProducts();
    }
    products.subscribe(
      result => {
        console.log('products list', result);
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

  navigateToProductAdd() {
    this.router.navigate(['add'], { relativeTo: this.currentActivatedRoute });
  }

  getProductId(id, action) {
    console.log('product id', id);
    if (action == 'edit')
      this.router.navigate([this.router.url + '/edit', id]);
    else
      this.deleteProductById(id);
  }

  async deleteProductById(product_id) {
    const response = await SwalAlert.getDeleteSwal();
    if (response == true) {
      this.loaded = false;
      this.productService.deleteProductById(product_id).subscribe(
        result => {
          if (!result['error']) {
            SwalAlert.sucessAlert('', 'Product Deleted Successfully!');
            this.getProductsList();
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

  async deleteMultipleProducts() {
    if (this.product_ids.length > 0) {
      const response = await SwalAlert.getDeleteSwal();
      if (response == true) {
        this.loaded = false;
        this.productService.deleteMultipleProducts(this.product_ids).subscribe(
          result => {
            if (!result['error']) {
              SwalAlert.sucessAlert('', 'Products Deleted Successfully!');
              this.getProductsList();
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
      SwalAlert.errorAlert('', 'Please Select Products to Delete!');
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

  test() {
    console.log('test');
    this.selection.clear();
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
    this.product_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
    console.log('products to delete', this.getIdsFromSelectionArrayObject(this.selection.selected));
  }

  // $event ? selection.toggle(row) : null
  checkboxClicked(event, row) {
    if (event) {
      this.selection.toggle(row);
    }
    else
      null;

    this.product_ids = this.getIdsFromSelectionArrayObject(this.selection.selected);
    console.log('products to delete', this.getIdsFromSelectionArrayObject(this.selection.selected));
  }

  getIdsFromSelectionArrayObject(array_of_objects) {
    let product_ids = array_of_objects.map(a => a.id);
    return product_ids;
  }
  refresh(){
    this.loaded = false;
    this.dataSource.data = [];
    this.getProductsList() ;

  }
}
