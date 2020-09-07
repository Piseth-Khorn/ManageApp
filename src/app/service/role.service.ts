import { Role } from './../interface/role';
import { Observable, empty } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, min } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  data = [];
  DD = 'http://localhost:9000/role';
  NODE_API_SERVER = 'http://localhost:9000/role';
  JAVA_SPRING_API_SERVER = 'http://localhost:8080/api/role';
  constructor(private _httpClient: HttpClient) {}

  readRole(id?: any): Observable<any> {
    //console.log(id)
    if (id == null) return this._httpClient.get<any>(`${this.DD}`);
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

  findRole(filter, sortOrder, pageNumber, pageSize): Observable<Role[]> {
    return this._httpClient
      .get(`${this.DD}`, {
        params: new HttpParams()
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
  rowCount() {
    return this._httpClient.get(`${this.DD}/count`);
  }
}
