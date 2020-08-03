import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  NODE_API_SERVER = 'http://localhost:9000';
  constructor(private _httpClient: HttpClient) { }

  getUser(): Observable<any> {
    return this._httpClient.get<any>(`${this.NODE_API_SERVER}/user/`);

  }

  createUser(fd): Observable<any> {
    // console.log(fd)
    return this._httpClient.post<any>(`${this.NODE_API_SERVER}/user/create`, fd, {
      reportProgress: true,
      observe: 'body'
    });
  }
}
