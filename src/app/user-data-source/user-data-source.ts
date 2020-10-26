import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
export class UserDataSource implements DataSource<User> {
  public rowCount: any;
  private userSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  constructor(private userService: UserService) { }
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
    pageSize: number,
    sortbyField?: string
  ) {
    console.log(pageIndex + "   " + pageSize)
    this.loadingSubject.next(true);
    this.userService
      .getUserFromJavaApplication(filter, sortDirection, pageIndex, pageSize, sortbyField)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(
        (user) => {
          this.userSubject.next(user.Content);
          console.log(user.RowCount)
          localStorage.setItem('userCount', user.RowCount);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
