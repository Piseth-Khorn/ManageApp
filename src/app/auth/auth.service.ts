import { AppComponent } from './../app.component';
import { ToastrComponent } from './../toastr/toastr.component';
import { Observable, throwError } from 'rxjs';
import { User } from './../interface/user';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { optionsFactory } from 'angular2-notifications';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _appRoot;
  API_URL: string =
    'https://tn7rwktyjd.execute-api.ap-southeast-1.amazonaws.com/production';
  headers = new HttpHeaders().set(
    'access-token',
    localStorage.getItem('access-token')
  );
  currentUser = {};
  constructor(
    private _httpClient: HttpClient,
    public _router: Router,
    private _getDialogSMG: ToastrComponent
  ) {}

  getUserId(): Observable<any> {
    return this._httpClient
      .get<any>(`${this.API_URL}/auth`, {
        headers: this.headers,
        responseType: 'json',
      })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  login(user: User) {
    const requestOptions: Object = {
      /* other options here */
      responseType: 'json',
    };
    return this._httpClient.post(`${this.API_URL}/auth`, user, {
      responseType: 'text',
    });
  }

  getUserProfile(id): Observable<any> {
    return this._httpClient
      .get<any>(`${this.API_URL}/user/${id}`, {
        headers: this.headers,
        responseType: 'json',
      })
      .pipe(
        map((res: Response) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`;
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
    return authToken !== null ? true : false;
  }
}
