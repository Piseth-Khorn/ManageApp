import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.sass']
})
export class ToastrComponent implements OnInit {

  constructor(private _toastService: ToastrService) { }

  ngOnInit(): void {
  }
  getInfoSMG(title?: string, content?: any) {
    this._toastService.info((title) ? title : 'Information', (content) ? content : 'Place you info message here!', {
      timeOut: 2000,
      progressAnimation: 'increasing',
      progressBar: true,
      closeButton: true,
      enableHtml: true
    })
  }

  getSuccessSMG(title?: string, content?: string) {
    this._toastService.success((title) ? title : 'Success', (content) ? content : 'All good!', {
      timeOut: 2000,
      progressBar: true,
      closeButton: true,
      progressAnimation: "increasing",
      enableHtml: true
    });

  }

  getErrorSMG(title?: string, content?: string) {
    this._toastService.error((title) ? title : 'Error', (content) ? content : 'Something went wrong!', {
      timeOut: 5000,
      progressAnimation: 'increasing',
      progressBar: true,
      closeButton: true,
      enableHtml: true
    });
  }
  getWarningSMG(title?: any, content?: any) {
    this._toastService.warning((title) ? title : 'Warning!', (content) ? content : 'Please make sure everything is correctly', {
      timeOut: 5000,
      progressAnimation: 'increasing',
      progressBar: true,
      enableHtml: true,
      closeButton: true
    });
  }
}
