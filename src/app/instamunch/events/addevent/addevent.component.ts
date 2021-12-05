import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { SwalAlert } from 'src/app/Shared/swalAlerts';
import * as moment from 'moment';
import { ProductService } from '../../Services/product.service';
import { MatDatepickerInputEvent } from '@angular/material';


@Component({
  selector: 'app-addevent',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddeventComponent implements OnInit {
  datePicker: any
  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    date: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router,private productService: ProductService) { }

  ngOnInit() {
  }
  onSubmit(value: MatDatepickerInputEvent<Date>){
    this.datePicker = moment(value.value).format('YYYY-MM-DD');
    value['date'] = this.datePicker
    console.log("submited", this.datePicker)

    this.productService.addEventDate(value).subscribe(
      result => {
        if (!result['error']) {
          SwalAlert.sucessAlert('', 'Event Added Sucesssfully!')
        }
        else {
          SwalAlert.errorAlert('', result['message'].charAt(0).toUpperCase() + result['message'].substring(1));
        }
        console.log(result);
      },
      err => {
        console.log(err);
        SwalAlert.errorAlert('', 'Server Error');
      }
    );
  }
  navigateToListing() {
    let url = this.router.url.split('/');
    this.router.navigate([url[0]+"/"+url[1]+"/"+url[2]]);
  }

}
