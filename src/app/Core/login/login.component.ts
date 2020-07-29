import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { response } from '../../Interfaces/response';
import { DataSharingService } from '../../Services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: boolean = false;
  error_message: string = '';
  loginPressed: boolean = false;

  partner_id: any;

  model: any = {};
  @ViewChild('closeForgotPasswordForm') private closeForgotPasswordForm;

  constructor(private authService: AuthService, private router: Router,
    private activated_route: ActivatedRoute, private dataSharingSrvice: DataSharingService) {

  }

  ngOnInit() {
    this.activated_route.queryParams.subscribe(params => {
      this.partner_id = params['partner_id'];
    });

    if (localStorage.getItem('user') && localStorage.getItem('partner_id')== this.partner_id)
      this.router.navigate(['admin']);
  }

  onSubmit() {
    this.loginPressed = true;
    this.loginError = false;
    // this.authService.unsetUser();
    this.authService.login(this.model['username'], this.model['password'], this.partner_id).subscribe(
      data => {
        this.loginPressed = false;
        var response: response = data;
        if (!response.error) {
          localStorage.setItem('partner_id', this.partner_id);
          this.dataSharingSrvice.setOption('reload', true);
          this.router.navigate(['admin']);
        }
        else {
          this.loginError = true;
          this.error_message = response['message'];
        }
      },
      err => {
        this.loginPressed = false;
        this.error_message = 'Server Error.'
      }
    );
  }

}
