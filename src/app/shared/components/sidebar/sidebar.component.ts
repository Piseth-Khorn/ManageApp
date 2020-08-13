import { Location } from '@angular/common';
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
    public _authService: AuthService, public _Router: Router,public _location:Location) { }
  user: User;
  image;
  ngOnInit(): void {
    this._authService.getUserId().subscribe((res:any)=>{
    this.getProfile(res._id);
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
  getProfile(id){
    this._authService.getUserProfile(id).subscribe((res:any)=>{
    this.user = res; 
    if(this.user.file)this.image=this.user.file;
    });
  }
  logOut() {
    if (this._authService.logOut() == true) {
      this._Router.navigateByUrl("/login",{skipLocationChange:true}).then(()=>{
        console.log(decodeURI(this._location.path()));
        this._Router.navigate([decodeURI(this._location.path())])
      })
    }
  }

}
