import { TestDatatableComponent } from './../../test-datatable/test-datatable.component';
import { NavbarComponent } from './../../navbar/navbar.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';

import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { Dashboardv1Component } from 'src/app/dashboardv1/dashboardv1.component';
import { Dashboradv2Component } from 'src/app/dashboradv2/dashboradv2.component';
import { Dashboradv3Component } from 'src/app/test/dashboradv3/dashboradv3.component';
import { UserCreateComponent } from 'src/app/user-create/user-create.component';
import { UserListComponent } from 'src/app/user-list/user-list.component';
import { UserUpdateComponent } from 'src/app/user-update/user-update.component';
import { CompanyCreateComponent } from 'src/app/company/company-create/company-create.component';
import { CompanyUpdateComponent } from 'src/app/company/company-update/company-update.component';
import { CompanyListComponent } from 'src/app/company/company-list/company-list.component';
import { PagenotfoundComponent } from 'src/app/pagenotfound/pagenotfound.component';
import {
  SnackbarComponent,
  testComponent,
} from 'src/app/snackbar/snackbar.component';
import { ToastrComponent } from 'src/app/toastr/toastr.component';
import { DeleteDialogComponent } from 'src/app/delete-dialog/delete-dialog.component';
import { RolecreateComponent } from 'src/app/role/rolecreate/rolecreate.component';
import { RoleUpdateComponent } from 'src/app/role/role-update/role-update.component';
import { RoleListComponent } from 'src/app/role/role-list/role-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    DefaultComponent,
    NavbarComponent,
    Dashboardv1Component,
    Dashboradv2Component,
    Dashboradv3Component,
    UserCreateComponent,
    UserListComponent,
    UserUpdateComponent,
    CompanyCreateComponent,
    CompanyUpdateComponent,
    CompanyListComponent,
    PagenotfoundComponent,
    SnackbarComponent,
    testComponent,
    ToastrComponent,
    DeleteDialogComponent,
    RolecreateComponent,
    RoleUpdateComponent,
    RoleListComponent,
    TestDatatableComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatMenuModule,
    SimpleNotificationsModule.forRoot(),
    ToastrModule.forRoot(),
    HttpClientModule,
    MatPaginatorModule,
    NgbModule,
    MatProgressSpinnerModule,
  ],
})
export class DefaultModule {}
