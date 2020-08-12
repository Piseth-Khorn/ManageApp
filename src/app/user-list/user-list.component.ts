import { DatePipe } from '@angular/common';
import { UserUpdateComponent } from './../user-update/user-update.component';
import { NgbModal, NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { element } from 'protractor';
import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { time, timeStamp } from 'console';
import { isNgTemplate, identifierModuleUrl } from '@angular/compiler';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  id: string;
  content: string;
  displayedColumns: string[] = ['i', 'firstName', 'lastName', 'email', 'role', 'dateOfBirth', 'gender', 'action'];
  dataSource: MatTableDataSource<User>;
  users: User;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _userService: UserService, private _dialogBox: MatDialog,
    private _modalService: NgbModal, public _activeNgbModal: NgbActiveModal,
    private _modalConfig: NgbModalConfig, public _datePip: DatePipe) {
  }

  ngOnInit() {
    this.getUserData();
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
    this._userService.readUser().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  onUpdate(param: any) {
    this._modalConfig.backdrop = "static";
    this._modalConfig.size = 'xl';
    const modalRef = this._modalService.open(UserUpdateComponent);
    modalRef.componentInstance.id = param;

    modalRef.result.then((res) => {
      console.log('close modal ');
      this.ngOnInit();
    }, (res) => {
      console.log('Close icon clicked or press ESC ');
    });

  }

  onDelete(id: any) {

    //console.log(id)
    const _dialogRef = this._dialogBox.open(DeleteDialogComponent, {
      width: '250px',
      data: { id: id, content: 'user' }
    });
    _dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.id = null;
      this.content = null;
      this.getUserData();
    });
  }

}