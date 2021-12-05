import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  displayedColumns: string[] = [ 'event_name', 'event_date'];
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
    this.getEvents()
  }
  navigateToadd() {
    let url = this.router.url.split('/');
    this.router.navigate(['admin/events/add']);
  }
  getEvents(){
    this.productService.getEvents().subscribe(
    result => {
      this.dataSource = result['data'];
    });
  }

}
