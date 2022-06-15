import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt'

export interface AuthData {
  accessToken: string;
  user: {
    email: string;
    id: string;
    name: string;
  }
}

// interface LoginData {
//   email:string;
//   password:string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "http://localhost:3000/"

  jwtHelper = new JwtHelperService()

  autoLogoutTimer:any


  private loggedUser = new BehaviorSubject<null | AuthData>(null);
  loggedObs = this.loggedUser.asObservable();

  constructor(private http:HttpClient) {
    this.restore()
  }

  restore() {
    let userJson = localStorage.getItem("user");
    if(!userJson)
      return
    const user:AuthData = JSON.parse(userJson)
    if(this.jwtHelper.isTokenExpired(user.accessToken)){
      this.logout()
      return
    }
    
    this.loggedUser.next(user)
    this.autoLogout(user.accessToken)
  }

  login(data:{email:string; password:string}) {
    return this.http.post<AuthData>(this.apiUrl+"login", data).pipe(
      tap((data)=>{
        localStorage.setItem("user", JSON.stringify(data))
        this.autoLogout(data.accessToken)
        this.loggedUser.next(data)
      }),
      // catchError(this.errors)
    )
  }

  signup(data:{email:string; password:string; name:string}) {
    return this.http.post<AuthData>(this.apiUrl+"register", data).pipe(
      tap((data)=>{
        console.log("Signup", data);
        localStorage.setItem("user", JSON.stringify(data));
        this.loggedUser.next(data);
      })
    )
  }

  logout() {
    localStorage.removeItem("user")
    this.loggedUser.next(null)
  }

  autoLogout(at:string) {
    const exDate = this.jwtHelper.getTokenExpirationDate(at) as Date;
    const exMs = exDate.getTime() - new Date().getTime()

    this.autoLogoutTimer = setTimeout(()=>{
      this.logout();
    }, exMs)
  }

}
