import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from "@angular/router";
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
  HttpResponse, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { tap } from "rxjs/operators";
import { environment } from '../../environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth header from the service.
    
    const authHeader = this.auth.getToken();
    const branch_Key = this.auth.getBranchKey();
    const url = environment.baseUrl;
    // const url = 'http://168.63.140.202:8001/instamunch/';

    // Clone the request to add the new header.

    let cloneReq;
    if (authHeader != null && branch_Key !=null) {
      let headers = req.headers
        .set("Authorization", "Token " + authHeader)
        .set("branch-Auth-Key", branch_Key);

      cloneReq = req.clone({ headers: headers, url: url + req.url });
    }
   
    else {
      cloneReq = req.clone({ url: url + req.url });
    }
    // Pass on the cloned request instead of the original request.
    return next.handle(cloneReq).pipe(
      tap((event => {
        if (event instanceof HttpResponse) {
        }
      }), err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          // this.auth.unsetUser();
          // this.router.navigateByUrl('');
          this.auth.navigateUser();
        }
      }));
  }

}
