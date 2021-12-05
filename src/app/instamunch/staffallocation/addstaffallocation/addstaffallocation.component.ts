import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstaffallocation',
  templateUrl: './addstaffallocation.component.html',
  styleUrls: ['./addstaffallocation.component.css']
})
export class AddstaffallocationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateToListing() {
    let url = this.router.url.split('/');
    this.router.navigate([url[0]+"/"+url[1]+"/"+url[2]]);
  }
}
