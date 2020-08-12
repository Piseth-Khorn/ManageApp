import { ToastrComponent } from './../toastr/toastr.component';
import { RoleService } from './../service/role.service';
import { UserService } from './../service/user.service';
import { DialogData } from './../interface/dialog-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public _user: DialogData
    , private _userService: UserService, private _roleService: RoleService, private _getDialogSMG: ToastrComponent) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this._dialogRef.close();
  }
  onYesClick(id: any, content: any) {
    if (content == 'user')
      this._userService.deleteUser(id).subscribe((res) => {
        console.log('User was deleted', res);
        this._getDialogSMG.getWarningSMG("Delete!", 'Delete successfully');
      });
    if (content == 'role')
      this._roleService.deleteRole(id).subscribe((res) => {
        console.log(res);
        this._getDialogSMG.getWarningSMG("Delete!", 'Delete successfully');
      });

    this.onNoClick();
  }
}
