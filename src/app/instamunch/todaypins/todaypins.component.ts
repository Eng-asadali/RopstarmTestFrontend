import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-todaypins',
  templateUrl: './todaypins.component.html',
  styleUrls: ['./todaypins.component.css']
})
export class TodaypinsComponent implements OnInit {
  displayedColumns: string[] = [ 'event_name', 'photo']; 
  dataSource: MatTableDataSource<any>;
  @ViewChild('tableData') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  lengthDataSource: any;
  dataSourcePageSize: number = 10;
  pageInfo = { pageIndex: 0, pageSize: 10, offset: 0 };
  offset: any;
  limit: any;
  progressBar: boolean;
  displayNoRecords: boolean = false;
  constructor(private router: Router,private productService: ProductService) { }

  ngOnInit() {
    this.getGallery()
  }
  navigateToadd() {
    let url = this.router.url.split('/');
    this.router.navigate(['admin/today_pins/add']);
  }
  getGallery(){
    this.productService.getTodayPins().subscribe(
    result => {
      this.dataSource = result['data'];
    });
  }

}
