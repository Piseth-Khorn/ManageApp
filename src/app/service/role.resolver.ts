import { RoleService } from './role.service';
import { Role } from './../interface/role';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable()
export class RoleResolver implements Resolve<Role> {
  constructor(private roleservice: RoleService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Role | import('rxjs').Observable<Role> | Promise<Role> {
    return this.roleservice.findRoleById(route.params['id']);
  }
}
