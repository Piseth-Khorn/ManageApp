import { ToastrComponent } from './../toastr/toastr.component';
import { ToastrService } from 'ngx-toastr';
import { Dashboardv1Component } from './../dashboardv1/dashboardv1.component';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import {Location,DOCUMENT} from '@angular/common';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public _authService: AuthService,
     public _router: Router,public _loaction:Location,@Inject(DOCUMENT) private document:Document,public _getDialogSMG:ToastrComponent) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
  }
  get f() {
    return this.loginForm.controls;
  }
 loginUser():Promise<boolean> {

    if (this.loginForm.invalid) {
      alert('Please Enter Values');
      return;
    }
    this._authService.login(this.loginForm.value)
    .subscribe(async(res) => {
     await localStorage.setItem('access-token', res);
     await this._router.navigate(['/']);
      await this.document.location.reload();

      // this._router.navigateByUrl('/',{skipLocationChange:false}).then(async()=>{
      //  await this.document.location.reload();
      // });
    }, (error) => {
      this._getDialogSMG.getErrorSMG(error.status, error.error);
    }
    );
  }
}
