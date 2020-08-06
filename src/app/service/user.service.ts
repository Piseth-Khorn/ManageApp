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

  readUser(id?: any): Observable<any> {
    if (id == null)
      return this._httpClient.get<any>(`${this.NODE_API_SERVER}/user/`);
    return this._httpClient.get<any>(`${this.NODE_API_SERVER}/user/${id}`);
  }

  createUser(fd): Observable<any> {
    // console.log(fd)
    return this._httpClient.post<any>(`${this.NODE_API_SERVER}/user/create`, fd, {
      reportProgress: true,
      observe: 'body'
    });
  }

  updateUser(fd, id) {
    return this._httpClient.put<any>(`${this.NODE_API_SERVER}/user/update/${id}`, fd, {
      reportProgress: true,
      observe: 'body'
    });
  }

  deleteUser(id): Observable<any> {
    console.log(id)
    return this._httpClient.delete<any>(`${this.NODE_API_SERVER}/user/delete/${id}`);
  }

}
