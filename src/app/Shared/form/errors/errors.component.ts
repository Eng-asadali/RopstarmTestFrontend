import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { validation_patterns } from '../../validation_patterns';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {
  @Input() errors: any;
  @Input() field_name: any;
  errors_array: any;

  alphabets_only_error = false;
  email_error = false;
  contact_number_error = false;
  postive_number_error = false;
  branch_contact_number_error = false;

  constructor() { }

  ngOnInit() {
    this.errors_array = Object.keys(this.errors);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.errors_array = Object.keys(this.errors);

    if (this.errors_array[0] == 'pattern') {
      if (this.errors[this.errors_array[0]]['requiredPattern'] == validation_patterns.alphabets)
        this.alphabets_only_error = true;
      else if (this.errors[this.errors_array[0]]['requiredPattern'] == validation_patterns.email_regex)
        this.email_error = true;
      else if (this.errors[this.errors_array[0]]['requiredPattern'] == validation_patterns.contact_number)
        this.contact_number_error = true;
      else if (this.errors[this.errors_array[0]]['requiredPattern'] == validation_patterns.postive_numbers)
        this.postive_number_error = true;
      else if (this.errors[this.errors_array[0]]['requiredPattern'] == validation_patterns.branch_contact_number)
        this.branch_contact_number_error = true;
    }
    // console.log(this.errors[this.errors_array[0]]['requiredPattern'])
    // console.log(this.errors[this.errors_array[0]])
    console.log(this.errors);
    // console.log(this.errors_array)
  }

}
