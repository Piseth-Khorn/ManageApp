import { ToastrComponent } from 'src/app/toastr/toastr.component';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpEventType,
  HttpParams,
} from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { Role } from '../interface/role';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  headers = new HttpHeaders().set(
    'access-token',
    localStorage.getItem('access-token')
  );
  DD = 'http://localhost:9000/user';
  NODE_API_SERVER = 'http://localhost:9000';
  JAVA_SPRING_API_SERVER = 'http://localhost:8080/api';
  constructor(
    private _httpClient: HttpClient,
    private _getDialogSMG: ToastrComponent
  ) {}

  readUser(id?: any): Observable<any> {
    if (id == null)
      return this._httpClient.get<any>(`${this.NODE_API_SERVER}/user`, {
        headers: this.headers,
      });
    return this._httpClient.get<any>(`${this.NODE_API_SERVER}/user/${id}`, {
      headers: this.headers,
    });
  }

  createUser(fd) {
    // console.log(fd)
    return this._httpClient
      .post(`${this.NODE_API_SERVER}/user`, fd, {
        headers: this.headers,
        reportProgress: true,
        observe: 'events',
      })
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            console.log(
              'Upload Progress: ' +
                Math.round((event.loaded / event.total) * 100) +
                '%'
            );
          } else if (event.type === HttpEventType.Response) {
            console.log(event);
            this._getDialogSMG.getSuccessSMG(
              null,
              'Data transaction successfully'
            );
          }
          // console.log('User Created', event);
        },
        (err) => {
          console.log('MY Error' + err);
          if (err == 'Email already exists') {
            this._getDialogSMG.getErrorSMG(err.statusText, err.error);
            return;
          }
          this._getDialogSMG.getErrorSMG(err.statusText, err.error);
          console.log(err);
        }
      );
  }

  updateUser(fd, id) {
    return this._httpClient.put<any>(`${this.NODE_API_SERVER}/${id}`, fd, {
      reportProgress: true,
      observe: 'body',
      headers: this.headers,
    });
  }

  deleteUser(id): Observable<any> {
    console.log(id);
    return this._httpClient.delete<any>(`${this.NODE_API_SERVER}/${id}`, {
      headers: this.headers,
    });
  }

  findUser(filter, sortOrder, pageNumber, pageSize): Observable<User[]> {
    return this._httpClient
      .get(`${this.DD}/ffff`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res) => res['payload']));
  }
}
