import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, public _authService: AuthService, public _router: Router) {
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
    return this.loginForm.contains
  }
  loginUser() {

    if (this.loginForm.invalid) {
      alert('Please Enter Values');
      return;
    }
    const result = this._authService.login(this.loginForm.value);
    result.add(() => {
      this._router.navigate(['/']);
    });
  }
}
