import { Role } from './../interface/role';
import { Observable, empty } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, min } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  headers = new HttpHeaders().set(
    'access-token',
    localStorage.getItem('access-token')
  );
  DD = 'http://localhost:9000/role';
  NODE_API_SERVER = 'http://localhost:9000/role';
  JAVA_SPRING_API_SERVER = 'http://localhost:8080/api/role';
  constructor(private _httpClient: HttpClient) {}

  readRole(id?: any): Observable<any> {
    //console.log(id)
    if (id == null)
      return this._httpClient.get<any>(`${this.NODE_API_SERVER}`, {
        headers: this.headers,
      });
    return this._httpClient.get<any>(`${this.NODE_API_SERVER}/${id}`, {
      headers: this.headers,
    });
  }

  createRole(role: Role): Observable<Role> {
    return this._httpClient.post<Role>(`${this.NODE_API_SERVER}`, role, {
      headers: this.headers,
    });
  }

  updateRole(role: Role, id: any): Observable<Role> {
    return this._httpClient.put<Role>(`${this.NODE_API_SERVER}/${id}`, role, {
      headers: this.headers,
    });
  }

  deleteRole(id: any): Observable<Role> {
    console.log(id);
    return this._httpClient.delete<Role>(`${this.NODE_API_SERVER}/${id}`, {
      headers: this.headers,
    });
  }

  findRole(filter, sortOrder, pageNumber, pageSize): Observable<Role[]> {
    return this._httpClient
      .get(`${this.NODE_API_SERVER}/dataSouce`, {
        headers: this.headers,
        params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res) => res['payload']));
  }
  findRoleById(id: number): Observable<Role> {
    return this._httpClient.get<Role>(`${this.NODE_API_SERVER}/${id}`, {
      headers: this.headers,
    });
  }
  rowCount() {
    return this._httpClient.get(`${this.NODE_API_SERVER}/rowcount`, {
      headers: this.headers,
    });
  }
  rowCountSearch(str) {
    if (!str)
      return this._httpClient.get(`${this.NODE_API_SERVER}/rowcount`, {
        headers: this.headers,
      });
    return this._httpClient.get(
      `${this.NODE_API_SERVER}/rowCountSearch/${str}`,
      {
        headers: this.headers,
      }
    );
  }
}
