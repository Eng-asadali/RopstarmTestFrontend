import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  key: 12;
  load_dashboard: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {  }

  logout(){
         this.authService.unsetUser();
         this.router.navigate(['/']);
  }
}
