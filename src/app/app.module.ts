import { UploadService } from './service/upload.service';
import { UserService } from './service/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Dashboardv1Component } from './dashboardv1/dashboardv1.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Dashboradv2Component } from './dashboradv2/dashboradv2.component';
import { Dashboradv3Component } from './dashboradv3/dashboradv3.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatCardModule, } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

import { CompanyCreateComponent } from './company/company-create/company-create.component';
import { CompanyUpdateComponent } from './company/company-update/company-update.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent, testComponent } from './snackbar/snackbar.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ToastrModule } from 'ngx-toastr';
import { ToastrComponent } from './toastr/toastr.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgbModule, NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import "@angular/compiler";
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    Dashboardv1Component,
    SidebarComponent,
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
    DeleteDialogComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
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
    NgbModule

  ],
  providers: [
    SnackbarComponent,
    ToastrComponent,
    UserService,
    UploadService,
    NgbModalConfig,
    NgbModal,
    DatePipe,
    UserListComponent,
    NgbActiveModal,
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
