import { Component, OnInit , ViewChild} from '@angular/core';
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
  model: any = {};
  @ViewChild('closeForgotPasswordForm') private closeForgotPasswordForm;

  constructor(private authService: AuthService, private router: Router, 
    private activated_route:ActivatedRoute, private dataSharingSrvice: DataSharingService) {  }

  ngOnInit() {
    //console.log(this.activated_route.snapshot.queryParams['key']);
  }

  onSubmit(){
    this.authService.unsetUser();
    this.authService.login(this.model['username'],this.model['password']).subscribe(data=>{
      var response : response = data;
       if(!response.error){
        this.dataSharingSrvice.setOption('reload', true);
         this.router.navigate(['instamunch']);
        
       }
      //  console.log(data);
    });
  }

}
