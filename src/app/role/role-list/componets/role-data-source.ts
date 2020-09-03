import { catchError, finalize } from 'rxjs/operators';
import { RoleService } from './../../../service/role.service';
import { Role } from './../../../interface/role';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';

export class RoleDataSource implements DataSource<Role> {
  private roleSubject = new BehaviorSubject<Role[]>([]);

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();
  constructor(private _roleService: RoleService) {}

  connect(collectionViewer: CollectionViewer): Observable<Role[]> {
    return this.roleSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.roleSubject.complete();
    this.loadingSubject.complete();
  }
  // loadLessons(courseId: number,
  //     filter: string,
  //     sortDirection: string,
  //     pageIndex: number,
  //     pageSize: number) {

  //     this.loadingSubject.next(true);

  //     this._roleService.findRole(courseId, filter, sortDirection,
  //         pageIndex, pageSize).pipe(
  //             catchError(() => of([])),
  //             finalize(() => this.loadingSubject.next(false))
  //         )
  //         .subscribe(lessons => this.roleSubject.next(lessons);

  // }
}
