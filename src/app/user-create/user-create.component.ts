import { UploadService } from './../service/upload.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ToastrComponent } from './../toastr/toastr.component';
import { SnackbarComponent } from './../snackbar/snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../service/user.service';
import { User } from './../interface/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { NotificationsService } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  isValidFormSubmitted = false;
  selectedFile: File = null;
  userForm: FormGroup;
  hide1 = true;
  hide = true;
  genders = ['Male', 'Female', 'Other']
  roles = ['admin', 'user', 'visitor']
  states = ['PP', 'KK', 'Other']
  pass = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$';
  requiredString = 'You must enter value';
  constructor(private fb: FormBuilder, private userService: UserService, public dialog: MatDialog,
    private _snackBar: SnackbarComponent, private _notificationService: NotificationsService,
    private _toastService: ToastrService, private _getDialogSMG: ToastrComponent, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2)

      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern(this.pass),
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(this.pass)
      ]],
      role: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      telephone: [null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(14),

      ]],
      gender: ['', [
        Validators.required,
      ]],
      dateOfBirth: ['', [
        Validators.required,
      ]],
      address1: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]],
      address2: ['', [
        Validators.required,
        Validators.maxLength(200)
      ]],
      city: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      state: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      zip: '',
      file: ''

    });
  }
  get firstName() {
    return this.userForm.get('firstName');

  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
  get role() {
    return this.userForm.get('role');
  }
  get telephone() {
    return this.userForm.get('telephone');
  }
  get dateOfBirth() {
    return this.userForm.get('dateOfBirth');
  }
  get address1() {
    return this.userForm.get('address1');
  }
  get address2() {
    return this.userForm.get('address2');
  }
  get city() {
    return this.userForm.get('city');
  }
  get state() {
    return this.userForm.get('state');
  }
  get zip() {
    return this.userForm.get('zip');
  }
  get gender() {
    return this.userForm.get('gender');
  }

  getErrorMessage(ms) {
    if (ms == 'email') {
      if (this.userForm.get('email').hasError('required')) return this.requiredString;
      if (this.userForm.get('email').hasError('email')) return 'Not a Valid email';
    }
    if (ms == 'firstName') {
      if (this.userForm.get('firstName').hasError('required')) return this.requiredString;
      if (this.userForm.get('firstName').hasError('minlength')) return 'Name must be at least 2 characters long.';
    }

    if (ms == 'lastName') {
      if (this.userForm.get('lastName').hasError('required')) return this.requiredString;
      if (this.userForm.get('lastName').hasError('minlength')) return 'Name must be at least 2 characters long.';

    }
    if (ms == 'password') {
      if (this.userForm.get('password').hasError('required')) return this.requiredString;
      if (this.userForm.get('password').hasError('pattern')) return 'Must have one letter, and one number';
      if (this.userForm.get('password').value != this.userForm.get('confirmPassword').value) return 'Password does not much confirmPassword!';
    }
    if (ms == 'confirmPassword') {
      if (this.userForm.get('confirmPassword').hasError('required')) return this.requiredString;
      return this.userForm.get('confirmPassword').hasError('pattern') ? 'Must have one letter, and one number' : '';
    }
    if (ms == 'gender') return this.userForm.get('gender').hasError('required') ? this.requiredString : '';
    if (ms == 'role') {
      if (this.userForm.get('role').hasError('required')) return this.requiredString;
      return this.userForm.get('role').hasError('maxlength') ? 'Must be less than 30 characters' : '';
    }

    if (ms == 'telephone') {
      if (this.userForm.get('telephone').hasError('required')) return this.requiredString;
      if (this.userForm.get('telephone').hasError('minlength')) return 'must have be at least 10 digit to 14.';
      if (this.userForm.get('telephone').hasError('maxlength')) return 'must have be at least 10 digit to 14.';
    }

    if (ms == 'address1') {
      if (this.userForm.get('address1').hasError('required')) return this.requiredString;
      return this.userForm.get('address1').hasError('maxlength') ? 'Address must be least than 200 characters' : '';
    }
    if (ms == 'address2') {
      if (this.userForm.get('address2').hasError('required')) return this.requiredString;
      return this.userForm.get('address2').hasError('maxlength') ? 'Address must be least than 200 characters' : '';
    }

    if (ms == 'state') {
      if (this.userForm.get('state').hasError('required')) return this.requiredString;
      return this.userForm.get('state').hasError('maxlength') ? 'State must be less than 50 characters.' : '';
    }
    if (ms == 'city') {
      if (this.userForm.get('city').hasError('required')) return this.requiredString;
      return this.userForm.get('city').hasError('maxlength') ? 'city must be less than 50 characters' : '';
    }
    if (ms == 'zip') return this.userForm.get('zip').hasError('required') ? this.requiredString : '';
    if (ms == 'dateOfBirth') return this.userForm.get('dateOfBirth').hasError('required') ? this.requiredString : '';

  }
  getValidatePassword(): boolean {
    if (this.userForm.get('password').value != this.userForm.get('confirmPassword').value) return true;
  }
  onSubmit() {
    const fd = new FormData();
    if (this.selectedFile != null)
      fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('firstName', this.userForm.get('firstName').value);
    fd.append('lastName', this.userForm.get('lastName').value);
    fd.append('email', this.userForm.get('email').value);
    fd.append('password', this.userForm.get('password').value);
    fd.append('confirmPassword', this.userForm.get('confirmPassword').value);
    fd.append('role', this.userForm.get('role').value);
    fd.append('telephone', this.userForm.get('telephone').value);
    fd.append('gender', this.userForm.get('gender').value);
    fd.append('dateOfBirth', this.userForm.get('dateOfBirth').value);
    fd.append('address1', this.userForm.get('address1').value);
    fd.append('address2', this.userForm.get('address2').value);
    fd.append('city', this.userForm.get('city').value);
    fd.append('state', this.userForm.get('state').value);
    fd.append('zip', this.userForm.get('zip').value);
    if (this.userForm.invalid) return;
    this.isValidFormSubmitted = true;
    if (this.getValidatePassword() == true) {
      this._getDialogSMG.getWarningSMG('Note', 'Password and confirmPassword does not much together!');
      return;
    }
    this.userService.createUser(fd).subscribe((res) => {
      console.log('User Created', res);
      this._getDialogSMG.getSuccessSMG(null, 'Data transaction successfully');
      this.userForm.reset();
    }, (err) => {
      console.log(err);
      this._getDialogSMG.getErrorSMG('Error', err.error.text);
    });

  }


  onFileSelected(event) {
    //console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    console.log((this.selectedFile.name) ? this.selectedFile.name : '');
    this.uploadService.fileUpload(fd);

  }
}
