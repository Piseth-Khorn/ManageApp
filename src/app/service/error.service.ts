import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  requiredString = 'You must enter value';
  constructor() { }

  getErrorMessage(ms, userForm) {

    if (ms == 'email') {
      if (userForm.get('email').hasError('required')) return this.requiredString;
      if (userForm.get('email').hasError('email')) return 'Not a Valid email';
    }
    if (ms == 'firstName') {
      if (userForm.get('firstName').hasError('required')) return this.requiredString;
      if (userForm.get('firstName').hasError('minlength')) return 'Name must be at least 2 characters long.';
    }

    if (ms == 'lastName') {
      if (userForm.get('lastName').hasError('required')) return this.requiredString;
      if (userForm.get('lastName').hasError('minlength')) return 'Name must be at least 2 characters long.';

    }
    if (ms == 'password') {
      if (userForm.get('password').hasError('required')) return this.requiredString;
      if (userForm.get('password').hasError('minlength')) return 'Must be at least 8 characters long';
      if (userForm.get('password').hasError('pattern')) return 'Must have one letter, and one number';
      if (userForm.get('password').value != userForm.get('confirmPassword').value) return 'Password does not match confirmPassword!';
    }
    if (ms == 'confirmPassword') {
      if (userForm.get('confirmPassword').hasError('required')) return this.requiredString;
      if (userForm.get('confirmPassword').hasError('minlength')) return 'Must be at least 8 characters long';
      if (userForm.get('confirmPassword').hasError('pattern')) return 'Must have one letter, and one number';
      if (userForm.get('password').value != userForm.get('confirmPassword').value) return 'Password does not match confirmPassword!';
    }
    if (ms == 'gender') return userForm.get('gender').hasError('required') ? this.requiredString : '';
    if (ms == 'role') {
      if (userForm.get('role').hasError('required')) return this.requiredString;
      return userForm.get('role').hasError('maxlength') ? 'Must be less than 30 characters' : '';
    }

    if (ms == 'phoneNumber') {
      if (userForm.get('phoneNumber').hasError('required')) return this.requiredString;
      if (userForm.get('phoneNumber').hasError('minlength')) return 'must have be at least 10 digit to 14.';
      if (userForm.get('phoneNumber').hasError('maxlength')) return 'must have be at least 10 digit to 14.';
    }

    if (ms == 'address1') {
      if (userForm.get('address1').hasError('required')) return this.requiredString;
      return userForm.get('address1').hasError('maxlength') ? 'Address must be least than 200 characters' : '';
    }
    if (ms == 'address2') {
      if (userForm.get('address2').hasError('required')) return this.requiredString;
      return userForm.get('address2').hasError('maxlength') ? 'Address must be least than 200 characters' : '';
    }

    if (ms == 'state') {
      if (userForm.get('state').hasError('required')) return this.requiredString;
      return userForm.get('state').hasError('maxlength') ? 'State must be less than 50 characters.' : '';
    }
    if (ms == 'city') {
      if (userForm.get('city').hasError('required')) return this.requiredString;
      return userForm.get('city').hasError('maxlength') ? 'city must be less than 50 characters' : '';
    }
    if (ms == 'zipcode') return userForm.get('zipcode').hasError('required') ? this.requiredString : '';
    if (ms == 'dateOfBirth') return userForm.get('dateOfBirth').hasError('required') ? this.requiredString : '';

  }

  getValidatePassword(userForm): boolean {
    if (userForm.get('password').value != userForm.get('confirmPassword').value) return true;
  }

}
