import { User } from './../interface/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, empty } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  headers = new HttpHeaders().set('access-token',localStorage.getItem('access-token'));
  NODE_API_SERVER = 'http://localhost:9000';
  constructor(private _httpClient: HttpClient) { }

  readUser(id?: any): Observable<any> {
    if (id == null)
      return this._httpClient.get<any>(`${this.NODE_API_SERVER}/user/`,{headers:this.headers});
    return this._httpClient.get<any>(`${this.NODE_API_SERVER}/user/${id}`,{headers:this.headers});
  }

  createUser(fd): Observable<any> {
    // console.log(fd)
    return this._httpClient.post<any>(`${this.NODE_API_SERVER}/user/create`, fd, {
      reportProgress: true,
      observe: 'body',
      headers:this.headers
    });
  }

  updateUser(fd, id) {
    return this._httpClient.put<any>(`${this.NODE_API_SERVER}/user/update/${id}`, fd, {
      reportProgress: true,
      observe: 'body',
      headers:this.headers
    });
  }

  deleteUser(id): Observable<any> {
    console.log(id)
    return this._httpClient.delete<any>(`${this.NODE_API_SERVER}/user/delete/${id}`,{headers:this.headers});
  }

}
