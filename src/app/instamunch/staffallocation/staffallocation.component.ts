import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staffallocation',
  templateUrl: './staffallocation.component.html',
  styleUrls: ['./staffallocation.component.css']
})
export class StaffallocationComponent implements OnInit {
  displayedColumns: string[] = [ 'staff', 'table']; 


  constructor() { }

  ngOnInit() {
  }

}
