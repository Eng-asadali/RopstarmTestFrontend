import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  constructor() { }
  partner_id = (localStorage.getItem('partner_id')).toString();
  getLogoSymbol() {

    switch (this.partner_id) {
      case '1':
        return "Zenlounge "
        break;
      case '2':
        return "Instamunch"
        break;
      case '3':
        return "Lokal"
        break;
      case '4':
      return "Cakeaway"
      break;
      case '5':
      return "Uppercrust"
      break;
      case '6':
      return "Tiffany"
      break;
      case '7':
      return "Apeslounge"
      break;
  }
  }
}
