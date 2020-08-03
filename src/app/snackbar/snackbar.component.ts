import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Component({
  selector: 'app-snackbar',
  templateUrl: './test.component.html'
})
export class testComponent implements OnInit {
  constructor() {

  }
  ngOnInit(): void { }
}

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.sass']
})
export class SnackbarComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  constructor(private _snackbar: MatSnackBar) {

  }

  ngOnInit(): void {
  }
  openSnackBar() {
    this._snackbar.open('./test.component.html', '', {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,

    });
  }
}
