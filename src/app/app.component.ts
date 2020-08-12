import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  hashSession: boolean;
  constructor(public _authService: AuthService) {
    this.hashLogin();
  }
  ngOnInit(): void {
    this.hashLogin();
  }
  hashLogin() {
    if (localStorage.getItem('access_token')) {
      this.hashSession = true;
    } else {
      this.hashSession = false;
    }
  }

  hashLogOut() {
    this._authService.logOut();
    this.hashLogin();
  }

}
