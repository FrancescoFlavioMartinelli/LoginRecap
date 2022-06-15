import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home-component',
  template: `
  <h1>Login</h1>
    <form #f="ngForm" (ngSubmit)="login(f)">
      <input ngModel required type="email" name="email">
      <input ngModel required type="password" name="pass">
      <button type="submit">Login</button>
    </form>
    <hr>
    <h1>registrati<h1>
    <form #fo="ngForm" (ngSubmit)="signup(fo)">
      <input ngModel required type="email" name="email">
      <input ngModel required type="text" name="nome">
      <input ngModel required type="password" name="pass">
      <button type="submit">Login</button>
    </form>
  `,
  styles: [
  ]
})
export class HomeComponentComponent implements OnInit {

  constructor(private authSrv: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(f:NgForm) {
    this.authSrv.login(f.value).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/users']);
    })

  }

  signup(f:NgForm){
    this.authSrv.signup(f.value).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/users']);
    })
    
  }

}
