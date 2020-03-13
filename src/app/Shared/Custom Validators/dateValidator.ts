import { FormControl } from '@angular/forms';
import { validation_patterns } from '../validation_patterns';


function validateDate(control: FormControl) {
 let currentDate = new Date();
 currentDate.getTime();
 let validDate  = control.value; 
 console.log("cuurent date :"+currentDate.getTime()+ "entered date "+validDate)
 
  if (validDate.getTime()>currentDate.getTime()) { 
      return {
        invalid_date: 'Invalid Date'
      }
    
  }
  return null;
}