import { Role } from './../interface/role';
import { Observable, empty } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  NODE_API_SERVER = 'http://localhost:9000/role';
  JAVA_SPRING_API_SERVER = 'http://localhost:8080/api/role';
  constructor(private _httpClient: HttpClient) {}

  readRole(id?: any): Observable<any> {
    //console.log(id)
    if (id == null)
      return this._httpClient.get<any>(`${this.JAVA_SPRING_API_SERVER}`);
    return this._httpClient.get<any>(`${this.JAVA_SPRING_API_SERVER}/${id}`);
  }

  createRole(role: Role): Observable<Role> {
    return this._httpClient.post<Role>(`${this.JAVA_SPRING_API_SERVER}`, role);
  }

  updateRole(role: Role, id: any): Observable<Role> {
    return this._httpClient.put<Role>(
      `${this.JAVA_SPRING_API_SERVER}/${id}`,
      role
    );
  }

  deleteRole(id: any): Observable<Role> {
    return this._httpClient.delete<Role>(
      `${this.JAVA_SPRING_API_SERVER}/${id}`
    );
  }

  findRole(
    id: number,
    filter = '',
    sortOrder = 'asc',
    pageNumber = 0,
    pageSize = 3
  ): Observable<Role[]> {
    return this._httpClient
      .get(`${this.JAVA_SPRING_API_SERVER}`, {
        params: new HttpParams()
          .set('id', id.toString())
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res) => res['payload']));
  }
  findRoleById(id: number): Observable<Role> {
    return this._httpClient.get<Role>(`${this.JAVA_SPRING_API_SERVER}/${id}`);
  }
}
