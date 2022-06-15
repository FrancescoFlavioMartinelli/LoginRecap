import { Component, OnInit } from '@angular/core';
import { AuthData, AuthService } from '../auth/auth.service';

interface User {
  name: string;
  email: string;
  id: number;
}

@Component({
  selector: 'app-user-component',
  template: `
    <h1>{{user.id}}<h1>
    <h2>{{user.name}}</h2>
    <h3>{{user.email}}</h3>
    <button (click)="logout()"> Logout</button>
  `,
  styles: [
  ]
})
export class UserComponentComponent implements OnInit {

  user!:User;

  constructor(private authSrv:AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authSrv.logout()
  }

}
