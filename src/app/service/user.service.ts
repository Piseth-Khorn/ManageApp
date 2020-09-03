import { ToastrComponent } from 'src/app/toastr/toastr.component';
import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  headers = new HttpHeaders().set(
    'access-token',
    localStorage.getItem('access-token')
  );
  NODE_API_SERVER = 'http://localhost:9000';
  JAVA_SPRING_API_SERVER = 'http://localhost:8080/api';
  constructor(
    private _httpClient: HttpClient,
    private _getDialogSMG: ToastrComponent
  ) {}

  readUser(id?: any): Observable<any> {
    if (id == null)
      return this._httpClient.get<any>(`${this.JAVA_SPRING_API_SERVER}/user`);
    return this._httpClient.get<any>(
      `${this.JAVA_SPRING_API_SERVER}/user/${id}`
    );
  }

  createUser(fd) {
    // console.log(fd)
    return this._httpClient
      .post(`${this.JAVA_SPRING_API_SERVER}/user`, fd, {
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
    return this._httpClient.put<any>(
      `${this.JAVA_SPRING_API_SERVER}/user/${id}`,
      fd,
      {
        reportProgress: true,
        observe: 'body',
        headers: this.headers,
      }
    );
  }

  deleteUser(id): Observable<any> {
    console.log(id);
    return this._httpClient.delete<any>(
      `${this.JAVA_SPRING_API_SERVER}/user/${id}`
    );
  }
}
