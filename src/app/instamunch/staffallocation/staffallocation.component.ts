import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staffallocation',
  templateUrl: './staffallocation.component.html',
  styleUrls: ['./staffallocation.component.css']
})
export class StaffallocationComponent implements OnInit {
  displayedColumns: string[] = [ 'staff', 'table']; 
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


  constructor(private router: Router) { }

  ngOnInit() {

  }
  navigateToListing() {
    let url = this.router.url.split('/');
    this.router.navigate(['admin/staffallocation/add']);
  }

}
