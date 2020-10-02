import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }
  partner_id = (localStorage.getItem('partner_id')).toString();
  getCurrencySymbol() {

    switch (this.partner_id) {
      case '1':
        return "£"
        break;
      case '2':
        return "Rs"
        break;
      case '3':
        return "Rs"
        break;
      case '4':
      return "Rs"
      break;
    }
  }
}
