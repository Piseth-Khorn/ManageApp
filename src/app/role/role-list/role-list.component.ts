import { async, inject } from '@angular/core/testing';
import { RoleDataSource } from './../../service/role-data-source';

import { RoleUpdateComponent } from './../role-update/role-update.component';
import { RolecreateComponent } from './../rolecreate/rolecreate.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { DeleteDialogComponent } from './../../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { RoleService } from './../../service/role.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Role } from './../../interface/role';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  debounce,
  debounceTime,
  distinctUntilChanged,
  tap,
} from 'rxjs/operators';
import { merge, fromEvent } from 'rxjs';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css'],
})
export class RoleListComponent implements OnInit {
  dd;
  rowCount: { count: null };
  roleDataSource: RoleDataSource;
  displayedColumns: string[] = ['id', 'name', 'createDate', 'action'];
  dataSource: MatTableDataSource<Role>;
  role: Role;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('input', { static: true }) input: ElementRef;

  constructor(
    private _roleService: RoleService,
    public _dataPip: DatePipe,
    private _MatDialog: MatDialog,
    private _ngbModal: NgbModal,
    private _ModalConfig: NgbModalConfig,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.roleDataSource = new RoleDataSource(this._roleService);
    this.roleDataSource.loadRoles('', 'asc', 0, 5);
    //this.getRole();
    this._roleService.rowCount().subscribe((res) => {
      console.log(res);
      this.rowCount = { count: res.rowCount };
    });
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = this.paginator.pageIndex;
    });

    this.dd = fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadRolePage();
        })
      )
      .subscribe((res) => {
        this._roleService
          .rowCountSearch(this.input.nativeElement.value)
          .subscribe((res) => {
            setTimeout(() => {
              this.rowCount.count = res.rowCount;
            }, 200);
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
  refresh() {
    setTimeout(() => {
      console.log('hello waiting 2');
      // this.rowCount = { count: localStorage.getItem('rowCount') };
    }, 10000);
  }
  loadRolePage() {
    this.roleDataSource.loadRoles(
      this.input.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    //console.log('third');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRole() {
    this._roleService.readRole().subscribe((result) => {
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onOpenModal() {
    this._ModalConfig.size = 'lg';
    this._ModalConfig.backdrop = 'static';
    const modalRef = this._ngbModal.open(RolecreateComponent);

    modalRef.result.then(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        console.log('Close icon clicked or press ESC');
      }
    );
  }

  onUpdate(id: any) {
    this._ModalConfig.size = 'lg';
    this._ModalConfig.backdrop = 'static';
    const modalRef = this._ngbModal.open(RoleUpdateComponent);
    modalRef.componentInstance.id = id;

    modalRef.result.then(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log('Click icon close or press ESC');
      }
    );
  }

  onDelete(id: any) {
    const dialoRef = this._MatDialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        id: id,
        content: 'role',
      },
    });

    dialoRef.afterClosed().subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onRowCliked(row) {
    console.log('Row Clicked: ', row);
  }
}
