import { Role } from './../interface/role';
import { Observable, empty } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  NODE_API_SERVER = 'http://localhost:9000/role';
  constructor(private _httpClient: HttpClient) { }

  readRole(id?: any): Observable<any> {
    //console.log(id)
    if (id == null)
      return this._httpClient.get<any>(`${this.NODE_API_SERVER}`);
    return this._httpClient.get<any>(`${this.NODE_API_SERVER}/${id}`);
  }

  createRole(role: Role): Observable<Role> {
    return this._httpClient.post<Role>(`${this.NODE_API_SERVER}/create`, role);
  }

  updateRole(role: Role, id: any): Observable<Role> {
    return this._httpClient.put<Role>(`${this.NODE_API_SERVER}/update/${id}`, role);
  }

  deleteRole(id: any): Observable<Role> {
    return this._httpClient.delete<Role>(`${this.NODE_API_SERVER}/delete/${id}`);
  }

}
