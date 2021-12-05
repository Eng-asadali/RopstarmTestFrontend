import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-addstaffallocation',
  templateUrl: './addstaffallocation.component.html',
  styleUrls: ['./addstaffallocation.component.css']
})
export class AddstaffallocationComponent implements OnInit {

  readyOnlyList = []
  typeList =[]
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private router: Router) { }

  ngOnInit() {
  }
  navigateToListing() {
    let url = this.router.url.split('/');
    this.router.navigate([url[0]+"/"+url[1]+"/"+url[2]]);
  }
  onSubmit(value){
    console.log("Submited")
  }
}
