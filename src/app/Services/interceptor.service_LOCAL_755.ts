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
    // const authHeader = this.auth.getToken();

    const authHeader = 'fe8a459e4cc9c7fea059dda5e228501e8b30ea22';
    const url = environment.baseUrl;

    // Clone the request to add the new header.

    let cloneReq;
    if (authHeader != null) {
      let headers = req.headers
            .set("Authorization", "Token " + authHeader)
            .set("branch-Auth-Key" , "oquwyekjnasbdkasd");

        cloneReq = req.clone({ headers:headers ,url: url+req.url});
    }
    // Pass on the cloned request instead of the original request.
    return next.handle(cloneReq).pipe(
      tap((event => {
        if (event instanceof HttpResponse) {
        }
      }), err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.auth.unsetUser();
          this.router.navigateByUrl('');
        }
      }));
  }

}
