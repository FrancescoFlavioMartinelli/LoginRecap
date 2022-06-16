import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { take } from 'rxjs/operators'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log(request);
    

    // const newReq = request.clone();
    // return next.handle(newReq);

    return this.authSrv.loggedObs.pipe(
      take(1),
      switchMap(data=>{
        if(!data)
          return next.handle(request)
        const newRequest = request.clone({
          headers: request.headers.set('Authorization', `Bearer ${data.accessToken}`)
        });
        console.log("new request", newRequest);
        return next.handle(newRequest);
      })
    );
  }
}
