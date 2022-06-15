import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  template: `
  <nav>
  <h1 *ngIf="user">Benvenuto {{user.user.name}}</h1>
    <a [routerLink]="['/']">Home</a>
    <a [routerLink]="['/user']">Utente</a>
  </nav>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {


  user!:AuthData|null

  constructor(private authSrv: AuthService) { }

  ngOnInit(): void {
    this.authSrv.loggedObs.subscribe((res)=>{
      this.user = res;
    })
  }

}
