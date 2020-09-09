import { RoleService } from './role.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Role } from '../interface/role';
import { catchError, finalize } from 'rxjs/operators';
export class RoleDataSource implements DataSource<Role> {
  public rowCount: any;
  private rolesSubject = new BehaviorSubject<Role[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(private roleServicec: RoleService) {}
  loadRoles(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);
    this.roleServicec
      .findRole(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((roles) => {
        this.rolesSubject.next(roles);
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
