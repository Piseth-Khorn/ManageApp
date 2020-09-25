import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { UserDataSource } from './../user-data-source/user-data-source';
import { Location, DatePipe, DOCUMENT } from '@angular/common';
import { UserUpdateComponent } from './../user-update/user-update.component';
import {
  NgbModal,
  NgbModalConfig,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { fromEvent, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Inject } from '@angular/core';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  id: string;
  content: string;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dateOfBirth',
    'gender',
    'action',
  ];
  rowCount = { rowCount: null };
  dataSource: MatTableDataSource<User>;
  userDataSource: UserDataSource;
  users: User;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private _userService: UserService,
    private _dialogBox: MatDialog,
    private _modalService: NgbModal,
    public _activeNgbModal: NgbActiveModal,
    private _modalConfig: NgbModalConfig,
    public _datePip: DatePipe,
    private _authService: AuthService,
    private _Router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit() {
    this.userDataSource = new UserDataSource(this._userService);
    this.userDataSource.loadUser('', 'asc', 0, 5);
    this._userService.rowCountSearch().subscribe(
      (res) => {
        this.rowCount = res;
      },
      (e) => {
        // if (e.error.message == 'jwt expired') {
        //   if (this._authService.logOut() == true) {
        //     this._Router
        //       .navigateByUrl('/login', { skipLocationChange: true })
        //       .then(async () => {
        //         await this.document.location.reload();
        //       });
        //   }
        // }
        console.log(e.error.message);
      }
    );
    //this.getUserData();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = this.paginator.pageIndex;
    });

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadRolePage();
        })
      )
      .subscribe((res) => {
        this._userService
          .rowCountSearch(this.input.nativeElement.value)
          .subscribe((res) => {
            setTimeout(() => {
              this.rowCount = res;
            }, 100);
          });
      });

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadRolePage();
        })
      )
      .subscribe()
      .add(() => console.log('hello waiting 2'));
  }
  loadRolePage() {
    this.userDataSource.loadUser(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    //console.log('third');
  }
  dd() {
    console.log('hi sort');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getUserData() {
    const item = [];
    this._userService.readUser().subscribe((res) => {
      //console.log(res);
      this.users = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  onUpdate(param: any) {
    this._modalConfig.backdrop = 'static';
    this._modalConfig.size = 'xl';
    const modalRef = this._modalService.open(UserUpdateComponent);
    modalRef.componentInstance.id = param;

    modalRef.result.then(
      (res) => {
        console.log('close modal ');
        this.ngOnInit();
      },
      (res) => {
        console.log('Close icon clicked or press ESC ');
      }
    );
  }

  onDelete(id: any) {
    //console.log(id)
    const _dialogRef = this._dialogBox.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id, content: 'user' },
    });
    _dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.id = null;
      this.content = null;
      this.getUserData();
    });
  }
}
