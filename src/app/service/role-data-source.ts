import { Pipe } from '@angular/core';
import { RoleJaveService } from './role-jave.service';
import { RoleService } from './role.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Role } from '../interface/role';
import { catchError, finalize } from 'rxjs/operators';
export class RoleDataSource implements DataSource<Role> {
  public rowCount: any;
  private previousPage: string;
  private nextPage: string;
  private condi: boolean = true;
  private currentIndex: number = 0;
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(private _roleService: RoleJaveService) {}
  loadRoles(
    filter: string,
    sortDirection: any,
    pageSize?: any,
    pageIndex?: any
  ) {
    // if (sortDirection >= this.currentIndex) {
    //   this.currentIndex = sortDirection;
    //   // localStorage.setItem('tokenId', this.nextPage);
    //   console.log(this.currentIndex);
    // } else {
    //   this.currentIndex = sortDirection;
    //   console.log(this.currentIndex + 'false');
    //   // localStorage.setItem('tokenId', this.previousPage);
    // }
    this.currentIndex = sortDirection;
    this.loadingSubject.next(true);
    this._roleService
      .findRole(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((roles) => {
        if (this.currentIndex < sortDirection) {
          localStorage.setItem('token', this.previousPage);
          console.log('hi');
        }
        this.rolesSubject.next(roles);
        this.previousPage = roles[0].id;
        this.nextPage = roles[roles.length - 1].id;
        if (this.currentIndex >= sortDirection) {
          localStorage.setItem('tokenId', this.nextPage);
          console.log('hi2');
        }
      });
  }
  connect(
    collectionViewer: CollectionViewer
  ): Observable<Role[] | readonly Role[]> {
    console.log('Connecting data source');
    return this.rolesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.rolesSubject.complete();
    this.loadingSubject.complete();
  }
}
