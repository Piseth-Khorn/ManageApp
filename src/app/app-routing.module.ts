import { ChatComponent } from './chat/chat.component';
import { TestDatatableComponent } from './test-datatable/test-datatable.component';
import { BlankComponent } from './layout/blank/blank.component';
import { DefaultComponent } from './layout/default/default.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { RoleUpdateComponent } from './role/role-update/role-update.component';
import { RolecreateComponent } from './role/rolecreate/rolecreate.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyUpdateComponent } from './company/company-update/company-update.component';
import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { Dashboardv1Component } from './dashboardv1/dashboardv1.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: Dashboardv1Component, canActivate: [AuthGuard] },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-create',
        component: UserCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-update',
        component: UserUpdateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-list',
        component: UserListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'company-create',
        component: CompanyCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'company-update',
        component: CompanyUpdateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'company-list',
        component: CompanyListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'role-list',
        component: RoleListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'role-create',
        component: RolecreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'role-update',
        component: RoleUpdateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'test-datatable',
        component: TestDatatableComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'chat',
        component: ChatComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  {
    path: '',
    component: DefaultComponent,
    children: [{ path: '**', component: PagenotfoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
