import { element } from 'protractor';
import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { time } from 'console';
import { isNgTemplate } from '@angular/compiler';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['i', 'firstName', 'lastName', 'email', 'role', 'dateOfBirth', 'gender'];
  dataSource: MatTableDataSource<User>;
  users: User;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private _userService: UserService) {
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
    this._userService.getUser().subscribe(res => {

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      for (let i = 0; i < res.length; i++)
        item.push({ index: i })
      //console.log(item);
      const data = Object.assign(item, res);
      console.log(data);
    });

  }
}