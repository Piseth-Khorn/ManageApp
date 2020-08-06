import { ToastrComponent } from './../../toastr/toastr.component';
import { RoleService } from './../../service/role.service';
import { ErrorService } from './../../service/error.service';
import { Role } from './../../interface/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rolecreate',
  templateUrl: './rolecreate.component.html',
  styleUrls: ['./rolecreate.component.css']
})
export class RolecreateComponent implements OnInit {
  roleForm: FormGroup;
  role: Role;
  constructor(public _ngbActive: NgbActiveModal, private fb: FormBuilder, private _roleService: RoleService, private _dialogSMG: ToastrComponent) { }

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]]
    });
  }

  get name() {
    return this.roleForm.get('name');
  }
  getError() {
    if (this.roleForm.get('name').hasError('required')) return 'You must enter value';
    return this.roleForm.get('name').hasError('maxlength') ? 'Role must be less than 50 characters' : '';
  }
  onSubmit() {
    this.role = this.roleForm.value;
    if (this.roleForm.invalid) return;
    this._roleService.createRole(this.role).subscribe((res) => {
      //console.log('Role created ', res);
      this._dialogSMG.getSuccessSMG(null, 'Data transaction successfully');
      this.roleForm.reset();
    }, (err) => {
      console.log(err);
      this._dialogSMG.getErrorSMG('Error', err.error.text);
    });
  }
  onClosModal() {
    this._ngbActive.close();
  }
}
