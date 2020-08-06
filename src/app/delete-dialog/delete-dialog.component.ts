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

  constructor(private _dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public _user: DialogData, private _userService: UserService) { }

  ngOnInit(): void {
  }
  onNoClick() {
    this._dialogRef.close();
  }
  onYesClick(id) {
    this._userService.deleteUser(id).subscribe((res) => {
      console.log('User was deleted', res);
    });
    this.onNoClick();
  }
}
