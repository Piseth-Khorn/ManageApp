import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultComponent } from './../../../layout/default/default.component';
import { ChatComponent } from './../../../chat/chat.component';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(ChatComponent) child: ChatComponent;
  constructor(
    private _modleService: NgbModal,
    private _ngModelConfig: NgbModalConfig,
    private _defaultComponent: ChatComponent,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    this._defaultComponent.ngOnInit();
  }
  ChildTest() {
    console.log('hi');
  }
  chatPopup() {
    this._defaultComponent.ngOnDestroy();
    //this.dialogRef.open(ChatComponent);
    this.snackBar.openFromComponent(ChatComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
  kk() {
    console.log('hi');
  }
}
