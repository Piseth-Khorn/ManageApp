import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
export class UserDataSource implements DataSource<User> {
  public rowCount: any;
  private userSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.userSubject.asObservable();
  constructor(private userService: UserService) {}
  connect(
    collectionViewer: CollectionViewer
  ): Observable<User[] | readonly User[]> {
    console.log('Connecting data source');
    return this.userSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
  }

  loadUser(
    filter: string,
    sortDirection: string,
    pageIndex: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);
    this.userService
      .findUser(filter, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((user) => {
        this.userSubject.next(user);
        console.log(user[0]);
        localStorage.setItem('userCount', user[0].rowcount);
      });
  }
}
