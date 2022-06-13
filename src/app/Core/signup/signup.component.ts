import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { response } from '../../Interfaces/response';
import { DataSharingService } from '../../Services/data-sharing.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

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
      this.partner_id = 1;
    });

    if (localStorage.getItem('user') && localStorage.getItem('partner_id')== this.partner_id)
      this.router.navigate(['admin']);
  }

  onSubmit() {
    this.loginPressed = true;
    this.loginError = false;
    // this.authService.unsetUser();
    let data = {
      "first_name": this.model['first_name'],
      "last_name": this.model['last_name'],
      "email": this.model['email'],
    }
    this.authService.signup(data).subscribe(
      data => {
        this.loginPressed = false;
        var response: response = data;
        if (!response.error) {
          localStorage.setItem('partner_id', this.partner_id);
          this.dataSharingSrvice.setOption('reload', true);
          this.router.navigate(['login']);
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
