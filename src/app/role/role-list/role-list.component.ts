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
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {
  displayedColumns: string[] = ['_id', 'name', 'createDate', 'action'];
  dataSource: MatTableDataSource<Role>;
  role: Role;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _roleService: RoleService, public _dataPip: DatePipe, private _MatDialog: MatDialog, private _ngbModal: NgbModal, private _ModalConfig: NgbModalConfig) { }

  ngOnInit(): void {
    this.getRole();
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
    this._ModalConfig.size = "lg";
    this._ModalConfig.backdrop = 'static';
    const modalRef = this._ngbModal.open(RolecreateComponent);

    modalRef.result.then((res) => {
      this.ngOnInit();
    }, (err) => {
      console.log(err);
      console.log('Close icon clicked or press ESC');
    });
  }

  onUpdate(id: any) {
    this._ModalConfig.size = 'lg';
    this._ModalConfig.backdrop = 'static';
    const modalRef = this._ngbModal.open(RoleUpdateComponent);
    modalRef.componentInstance.id = id;

    modalRef.result.then(res => {
      this.ngOnInit();
    }, (err) => {
      console.log('Click icon close or press ESC');
    });
  }

  onDelete(id: any) {
    const dialoRef = this._MatDialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {
        id: id,
        content: 'role'
      }
    });

    dialoRef.afterClosed().subscribe((res) => {
      this.ngOnInit();
    }, (err) => {
      console.log(err);
    });

  }
}
