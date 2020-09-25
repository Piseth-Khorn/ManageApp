import { Role } from './../interface/role';
import { RoleService } from './../service/role.service';
import { ErrorService } from './../service/error.service';
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
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  public isValidFormSubmitted = false;
  public selectedFile: File = null;
  public userForm: FormGroup;
  public user: User;
  public hide1 = true;
  public hide = true;
  public genders = ['Male', 'Female', 'Other'];
  public roles: Role;
  public states = ['PP', 'KK', 'Other'];
  public pass = '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$';
  public requiredString = 'You must enter value';
  public starValue: string;
  public selected: string;
  public exampleGender: Array<Select2OptionData>;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: SnackbarComponent,
    private _notificationService: NotificationsService,
    private _toastService: ToastrService,
    private _getDialogSMG: ToastrComponent,
    private uploadService: UploadService,
    public _errorService: ErrorService,
    private _roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.exampleGender = this._roleService.getRoleList();
    this.starValue = '1';
    this.selected = '';
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(this.pass),
          Validators.minLength(8),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(this.pass),
          Validators.minLength(8),
        ],
      ],
      role: ['', [Validators.required]],
      phoneNumber: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(14),
        ],
      ],
      gender: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      address1: ['', [Validators.required, Validators.maxLength(200)]],
      address2: ['', [Validators.required, Validators.maxLength(200)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      state: ['', [Validators.required, Validators.maxLength(50)]],
      zipcode: '',
      file: '',
    });
    this._roleService.readRole().subscribe((result) => {
      this.roles = result;
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
  get phoneNumber() {
    return this.userForm.get('phoneNumber');
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
  get zipcode() {
    return this.userForm.get('zipcode');
  }
  get gender() {
    return this.userForm.get('gender');
  }
  getErrorMessage(ms) {
    return this._errorService.getErrorMessage(ms, this.userForm);
  }
  onSubmit() {
    this.user = this.userForm.value;
    const fd = new FormData();
    if (this.selectedFile != null)
      fd.append('file', this.selectedFile, this.selectedFile.name);
    fd.append('firstName', this.userForm.get('firstName').value);
    fd.append('lastName', this.userForm.get('lastName').value);
    fd.append('email', this.userForm.get('email').value);
    fd.append('password', this.userForm.get('password').value);
    fd.append('confirmPassword', this.userForm.get('confirmPassword').value);
    fd.append('role', this.userForm.get('role').value);
    fd.append('phoneNumber', this.userForm.get('phoneNumber').value);
    fd.append('gender', this.userForm.get('gender').value);
    fd.append('dateOfBirth', this.userForm.get('dateOfBirth').value);
    fd.append('address1', this.userForm.get('address1').value);
    fd.append('address2', this.userForm.get('address2').value);
    fd.append('city', this.userForm.get('city').value);
    fd.append('state', this.userForm.get('state').value);
    fd.append('zipcode', this.userForm.get('zipcode').value);
    if (this.userForm.invalid) return;
    this.isValidFormSubmitted = true;
    if (this._errorService.getValidatePassword(this.userForm) == true) {
      this._getDialogSMG.getWarningSMG(
        'Note',
        'Password and confirmPassword does not match!!'
      );
      return;
    }
    this.userService.createUser(fd).add(() => this.userForm.reset());
  }

  onFileSelected(event) {
    //console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  onUpload() {
    const fd = new FormData();
    fd.append('file', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile.name ? this.selectedFile.name : '');
    this.uploadService.fileUpload(fd);
  }
  public changed(e: any): void {
    this.selected = e.value;
  }
}
