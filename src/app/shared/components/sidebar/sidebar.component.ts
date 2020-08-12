import { Router } from '@angular/router';
import { AuthService } from './../../../auth/auth.service';
import { RolecreateComponent } from './../../../role/rolecreate/rolecreate.component';
import { RoleListComponent } from './../../../role/role-list/role-list.component';
import { User } from './../../../interface/user';

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private _userService: UserService, public _ngbModel: NgbModal,
    public _ngbConfig: NgbModalConfig, public _RoleList: RoleListComponent,
    public _authService: AuthService, public _Router: Router) { }
  user: User;
  image;
  ngOnInit(): void {
    this._userService.readUser('5f30ad8ed05ebf31244e922a').subscribe((result) => {
      this.user = result;
      this.image = this.user.file;
    });
  }

  onOpen() {
    this._ngbConfig.backdrop = 'static';
    this._ngbConfig.size = 'lg';
    const modalRef = this._ngbModel.open(RolecreateComponent);

    modalRef.result.then((res) => {
      this._RoleList.ngOnInit();
    }, (err) => {
      console.log('Close icon clicked or press ESC');
    });

  }
  logOut() {
    if (this._authService.logOut() == true) this._Router.navigate(['/']);
  }

}
