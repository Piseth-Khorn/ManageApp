import { AppComponent } from './../app.component';
import { ToastrComponent } from './../toastr/toastr.component';
import { Observable, throwError } from 'rxjs';
import { User } from './../interface/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { optionsFactory } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _appRoot;
  API_URL: string = 'http://localhost:9000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(
    private _httpClient: HttpClient,
    public _router: Router,
    private _getDialogSMG: ToastrComponent) {

  }

  login(user: User) {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'json'
    }
    return this._httpClient.post(`${this.API_URL}/auth`, user, { responseType: "text" })
      .subscribe((res) => {
        localStorage.setItem('access-token', res);
      }, (error) => {
        this._getDialogSMG.getErrorSMG(error.status, error.error);
      }
      );


    // return this._httpClient.post(`${this.API_URL}/auth`, user)
    //   .subscribe((res: any) => {
    //     localStorage.setItem('access-token', res);
    //   }, (err) => {
    //     this._getDialogSMG.getErrorSMG(err.status, err.error);
    //   });
  }

  getUserProfile(id): Observable<any> {
    return this._httpClient.get(`${this.API_URL}/users/${id}`, { headers: this.headers }).pipe(
      map((res: Response) => {
        return res || {}
      }), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(msg);

  }

  logOut() {
    localStorage.removeItem('access-token');
    return true;
  }

  getAccessToken() {
    return localStorage.getItem('access-token');
  }
  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access-token');
    return (authToken !== null) ? true : false;
  }

}
