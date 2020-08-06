import { ErrorService } from './../service/error.service';
import { UserListComponent } from './../user-list/user-list.component';
import { ToastrComponent } from './../toastr/toastr.component';
import { DatePipe } from '@angular/common';
import { DateFormateService } from './../date-formate.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { User } from './../interface/user';
import { UserService } from './../service/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  @Input() name;
  user: User;
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
  constructor(private _listUser: UserListComponent, private _msDialog: ToastrComponent, private _activeNgbModal: NgbActiveModal,
    private _userService: UserService, private fb: FormBuilder, private _dateFormate: DateFormateService, public _datePip: DatePipe, public _errorService: ErrorService) { }

  ngOnInit(): void {
    this.getUser();
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
        Validators.minLength(8)
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern(this.pass),
        Validators.minLength(8)
      ]],
      role: ['', [
        Validators.required,
        Validators.maxLength(30)
      ]],
      phoneNumber: [null, [
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
      zipcode: '',
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
  getUser() {
    this._userService.readUser(this.name).subscribe(result => {
      this.user = result;
      this.userForm.setValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        confirmPassword: this.user.confirmPassword,
        role: this.user.role,
        phoneNumber: this.user.phoneNumber,
        gender: this.user.gender,
        dateOfBirth: this._datePip.transform(this.user.dateOfBirth, 'yyyy-MM-dd'),
        address1: this.user.address1,
        address2: this.user.address2,
        city: this.user.city,
        state: this.user.state,
        zipcode: (this.user.zipcode) ? this.user.zipcode : '',
        file: ''
      });
    });
  }
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }
  close() {
    this._activeNgbModal.close();
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
    fd.append('phoneNumber', this.userForm.get('phoneNumber').value);
    fd.append('gender', this.userForm.get('gender').value);
    fd.append('dateOfBirth', this.userForm.get('dateOfBirth').value);
    fd.append('address1', this.userForm.get('address1').value);
    fd.append('address2', this.userForm.get('address2').value);
    fd.append('city', this.userForm.get('city').value);
    fd.append('state', this.userForm.get('state').value);
    fd.append('zipcode', this.userForm.get('zipcode').value);
    if (this.userForm.invalid) return;
    if (this._errorService.getValidatePassword(this.userForm) == true) { this._msDialog.getWarningSMG('Note', 'Password and ConfirmPassword does not match!!'); return; }
    this._userService.updateUser(fd, this.name).subscribe((res) => {
      console.log('User Updated', res);
      this._msDialog.getSuccessSMG(null, 'User Update successfully');
    }, (err) => {
      console.log(err);
      this._msDialog.getErrorSMG('Error', err.error.text);
    });

  }

}
