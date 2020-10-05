import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../interface/role';
import { kMaxLength } from 'buffer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleJaveService {
  private JAVA_SPRING_API_SERVER = 'http://localhost:8080/api/role';
  constructor(private _httpClient: HttpClient) {}
  findRole(
    filter,
    sortOrder,
    pageNumber?: any,
    pageSize?: any
  ): Observable<Role[]> {
    return this._httpClient
      .get(`${this.JAVA_SPRING_API_SERVER}/page`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber ? pageNumber.toString() : '')
          .set('pageSize', pageSize.toString()),
      })
      .pipe(map((res) => res['payload']));
  }

  roleCount() {
    return this._httpClient.get(`${this.JAVA_SPRING_API_SERVER}/count`);
  }
}
