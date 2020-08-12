import { ToastrComponent } from './../../toastr/toastr.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Role } from './../../interface/role';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoleService } from './../../service/role.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css']
})
export class RoleUpdateComponent implements OnInit {
  @Input() id;
  constructor(private _roleService: RoleService, private fb: FormBuilder, private _ActiveModal: NgbActiveModal, private _getDialogSMG: ToastrComponent) { }
  roleForm: FormGroup;
  role: Role;
  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.maxLength(50)
      ]],
      createDate: ''

    });
    this.getRole();
  }
  get name() {
    return this.roleForm.get('name');
  }
  getError() {
    if (this.roleForm.get('name').hasError('required')) return 'You must enter value';
    return this.roleForm.get('name').hasError('mixlength') ? 'Role must be less than 50 characters' : '';
  }

  getRole() {
    console.log('update id' + this.id)
    this._roleService.readRole(this.id).subscribe((result) => {
      this.role = result;
      console.log(this.role)
      this.roleForm.setValue({
        name: this.role.name,
        createDate: this.role.createDate
      });
    });
  }
  onClosModal() {
    this._ActiveModal.close();
  }

  onSubmit() {
    this._roleService.updateRole(this.roleForm.value, this.id).subscribe((res) => {
      console.log('update successfully ' + res);
      this._getDialogSMG.getSuccessSMG('Update', 'Update Successfully');
    }, (err) => {
      console.log(err);
      this._getDialogSMG.getErrorSMG('Error', err.error.text);
    });
  }

}
