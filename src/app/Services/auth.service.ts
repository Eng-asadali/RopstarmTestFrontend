import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {


  private dataSource = new BehaviorSubject({});
  data = this.dataSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  login(contact_number: string, password: string, partner_id: any) {
    return this.http.post<any>('user/login/',
      {
        username: contact_number,
        password: password,
        partner_id: parseInt(partner_id)
      }).pipe(map(user => {

        console.log(user);
        if (!user['error']) {
          localStorage.setItem('user', JSON.stringify(user['data'][0]));
          this.dataSource.next(JSON.stringify(user['data'][0]));
        }
        return user;
      },
        err => {

        }
      ));
  }
  signup(data) {
    return this.http.post<any>('register',
      
        data
      ).pipe(map(user => {

        console.log(user);
        if (!user['error']) {
          localStorage.setItem('user', JSON.stringify(user['data'][0]));
          this.dataSource.next(JSON.stringify(user['data'][0]));
        }
        return user;
      },
        err => {

        }
      ));
  }

  getToken() {
    var token = null;
    var user = JSON.parse(localStorage.getItem('user'));

    if (user != null)
      token = user['token'];

    //  console.log(localStorage.getItem('user'));
    // if (localStorage.getItem('user') != 'undefined' && localStorage.getItem('user') != null) {
    //   token = JSON.parse(localStorage.getItem('user'))['token'];
    // }

    return token;
  }


  getBranchKey() {
    var branch_key = null;
    var user = JSON.parse(localStorage.getItem('user'));

    if (user != null)
      branch_key = user['branch_key'];

    return branch_key;
  }

  unsetUser() {
    localStorage.removeItem('user');
    localStorage.removeItem('partner_id');
  }

  navigateUser() {
    localStorage.removeItem('user');
    let partner_id = localStorage.getItem('partner_id');
    this.router.navigateByUrl('/?partner_id='+partner_id);
    // this.router.navigate(['/login?', { partner_id: partner_id }]);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated() {
    if (localStorage.getItem('user')) {
      return true;
    }
  }

  updatedDataSelection(data) {
    this.dataSource.next(data);
  }

}
