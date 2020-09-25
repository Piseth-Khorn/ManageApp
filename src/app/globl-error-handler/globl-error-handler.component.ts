import { ErrorService } from './../service/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ErrorHandler,
  OnInit,
  Injector,
  Inject,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-globl-error-handler',
  templateUrl: './globl-error-handler.component.html',
  styleUrls: ['./globl-error-handler.component.sass'],
})
export class GloblErrorHandlerComponent implements ErrorHandler {
  constructor(
    private injectort: Injector,
    public snackBar: MatSnackBar,
    private _Router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}
  handleError(error: Error | HttpErrorResponse): void {
    const _authService = this.injectort.get(AuthService);
    const errorService = this.injectort.get(ErrorService);
    let message = '';
    let stackTrack = errorService.getClientStack(error);
    let noConnection = errorService.checkingOnline();
    //Server Error
    if (error instanceof HttpErrorResponse)
      message = errorService.getServerMessage(error);
    // Client Error
    else message = errorService.getClientMessage(error);

    this.snackBar.open(message, 'X', { panelClass: ['error'] });
    const rev = message.split('').reverse().join('');
    const res = rev.split(' ', 1);
    console.log(res);
    if (res[0] == 'dezirohtuanU' || res[0] == 'detrats') {
      if (_authService.logOut() == true) {
        this._Router
          .navigateByUrl('/login', { skipLocationChange: true })
          .then(async () => {
            await this.document.location.reload();
          });
      }
    }
    this.snackBar.open(noConnection, 'X', { panelClass: ['error'] });
  }

  ngOnInit(): void {}
}
