import { RolecreateComponent } from './../role/rolecreate/rolecreate.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../interface/user';
import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private _userService: UserService, public _ngbModel: NgbModal, public _ngbConfig: NgbModalConfig) { }
  user: User;
  ngOnInit(): void {
    this._userService.readUser('5f2a65ee0083b44f9822c4da').subscribe((result) => {
      this.user = result;
      console.log(this.user.file);
    });
  }

  onOpen() {
    this._ngbConfig.backdrop = 'static';
    this._ngbModel.open(RolecreateComponent);
  }


}
