import { Pipe } from '@angular/core';
import { RoleJaveService } from './role-jave.service';
import { RoleService } from './role.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Role } from '../interface/role';
import { catchError, finalize } from 'rxjs/operators';
import { ifStmt } from '@angular/compiler/src/output/output_ast';
export class RoleDataSource implements DataSource<Role> {
  public rowCount: any;
  private previousPage: string;
  private nextPage: string;
  private condi: string;
  private tokenId: string;
  private currentIndex: number = 0;
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(private _roleService: RoleJaveService) {}
  loadRoles(
    filter: string,
    sortDirection: any,
    pageSize?: any,
    pageIndex?: any,
    _tokenId?: any
  ) {
    // console.log('index  ' + pageIndex);
    // console.log(this.currentIndex);
    console.log(
      sortDirection +
        '  ' +
        pageSize +
        '  ' +
        pageIndex 
      
    );

    // if (pageIndex > 0 && this.currentIndex == pageIndex) {
    //   this.condi = '-1';
    //   this.currentIndex == pageIndex;
    // }
    if (this.currentIndex < pageIndex) {
      this.condi = '1';
      this.currentIndex = pageIndex;
      this.tokenId = localStorage.getItem('tokenIdNext');
      console.log('condi2');
    }
    if (this.currentIndex > pageIndex) {
      this.condi = '0';
      this.currentIndex = pageIndex;
      this.tokenId = localStorage.getItem('tokenIdNext');
      console.log('condi3');
    }
    if (pageIndex == 0) {
      this.tokenId = '';
      this.condi = '0';
      console.log('condi1');
    }

    //console.log(pageIndex);
    // console.log(
    //   sortDirection +
    //     '  ' +
    //     pageSize +
    //     '  ' +
    //     this.currentIndex +
    //     ' ' +
    //     this.tokenId +
    //     '  ' +
    //     this.condi
    // );

    // console.log(this.currentIndex);
    // console.log(this.condi);
    this.loadingSubject.next(true);
    this._roleService
      .findRole(filter, sortDirection, pageSize, this.condi, this.tokenId,pageIndex)
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
        this.nextPage = roles ? roles[roles.length - 1].id : '';
        localStorage.setItem('tokenIdPrevious', this.previousPage);
        localStorage.setItem('tokenIdNext', this.nextPage);
        // if (sortDirection == 'desc')
        //   roles.sort((a, b) =>
        //     a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        //   );
        // if (sortDirection == 'asc')
        //   roles.sort((a, b) =>
        //     a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        //   );
        // this.rolesSubject.next(roles);
      });
  }
  connect(
    _collectionViewer: CollectionViewer
  ): Observable<Role[] | readonly Role[]> {
    console.log('Connecting data source');
    return this.rolesSubject.asObservable();
  }
  disconnect(_collectionViewer: CollectionViewer): void {
    this.rolesSubject.complete();
    this.loadingSubject.complete();
  }
}
