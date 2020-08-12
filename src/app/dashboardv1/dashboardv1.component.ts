import { AppComponent } from './../app.component';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboardv1',
  templateUrl: './dashboardv1.component.html',
  styleUrls: ['./dashboardv1.component.sass']
})
export class Dashboardv1Component implements OnInit {

  constructor(public _authService: AuthService, public _appRoot: AppComponent) { }

  ngOnInit(): void {
  }

  logout() {
    if (this._authService.logOut() == true) {
      this._appRoot.ngOnInit();
    }

  }
}
