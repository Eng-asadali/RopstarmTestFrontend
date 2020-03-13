import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/Services/auth-guard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any;
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.user= this.authService.getUser();
    // console.log(this.user);
  }

  logout() {
    this.authService.unsetUser();
    this.router.navigate(['']);
  }

}
