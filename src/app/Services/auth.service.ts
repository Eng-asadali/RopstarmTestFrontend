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

  login(contact_number: string, password: string) {

    return this.http.post<any>('user/login/',
      {
        username: contact_number,
        password: password,
        type: 'admin'
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
    // console.log();
    // if (branch_key != 'undefined' && branch_key != null) {
    //   branch_key = JSON.parse(localStorage.getItem('user'))['branch_key'];
    // }

    return branch_key;
  }

  unsetUser() {
    localStorage.removeItem('user');
    this.router.navigate(['/'])
  }

  isAuthenticated() {
    if (localStorage.getItem('user') != 'undefined' && localStorage.getItem('user') != null) {
      return true;
    }
  }

  updatedDataSelection(data) {
    this.dataSource.next(data);
  }

}
