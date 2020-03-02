import { Component, OnInit , ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { response } from '../../Interfaces/response';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  @ViewChild('closeForgotPasswordForm') private closeForgotPasswordForm;

  constructor(private authService: AuthService, private router: Router, private activated_route:ActivatedRoute) {  }

  ngOnInit() {
    //console.log(this.activated_route.snapshot.queryParams['key']);
  }

  onSubmit(){
    this.authService.unsetUser();
    console.log(this.model);
    this.authService.login(this.model['username'],this.model['password']).subscribe(data=>{
      var response : response = data;
      alert(JSON.stringify(data));
       if(!response.error){
         this.router.navigate(['instamunch']);
       }
      //  console.log(data);
    });
  }

}
