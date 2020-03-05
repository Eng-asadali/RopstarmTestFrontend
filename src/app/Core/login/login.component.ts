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

  model: any = {};
  @ViewChild('closeForgotPasswordForm') private closeForgotPasswordForm;

  constructor(private authService: AuthService, private router: Router,
    private activated_route: ActivatedRoute, private dataSharingSrvice: DataSharingService) { }

  ngOnInit() {
    //console.log(this.activated_route.snapshot.queryParams['key']);
  }

  onSubmit() {
    this.loginPressed = true;
    this.loginError = false;

    this.authService.unsetUser();
    this.authService.login(this.model['username'], this.model['password']).subscribe(
      data => {
        this.loginPressed = false;
        var response: response = data;
        if (!response.error) {
          this.dataSharingSrvice.setOption('reload', true);
          this.router.navigate(['instamunch']);
        }
        else {
          this.loginError = true;
          this.error_message = response['message'];

        }
        //  console.log(data);
      },
      err => {
        this.loginPressed = false;
        this.error_message = 'Server Error.'
      }
    );
  }

}
