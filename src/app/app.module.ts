import { RoleDataSource } from './role/role-list/componets/role-data-source';
import { DefaultComponent } from './layout/default/default.component';
import { Dashboardv1Component } from './dashboardv1/dashboardv1.component';
import { LoginComponent } from './login/login.component';
import { BlankModule } from './layout/blank/blank.module';
import { RouterModule } from '@angular/router';
import { DefaultModule } from './layout/default/default.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UploadService } from './service/upload.service';
import { UserService } from './service/user.service';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import {
  SnackbarComponent,
  testComponent,
} from './snackbar/snackbar.component';
import { ToastrComponent } from './toastr/toastr.component';
import {
  NgbModule,
  NgbModalConfig,
  NgbModal,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import '@angular/compiler';
import { DatePipe } from '@angular/common';
import { RoleListComponent } from './role/role-list/role-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoleDirective } from './service/role.directive';
import { GloblErrorHandlerComponent } from './globl-error-handler/globl-error-handler.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [AppComponent, RoleDirective, GloblErrorHandlerComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    DefaultModule,
    RouterModule,
    BlankModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    ChatComponent,
    DefaultComponent,
    LoginComponent,
    Dashboardv1Component,
    AppComponent,
    SnackbarComponent,
    ToastrComponent,
    UserService,
    UploadService,
    NgbModalConfig,
    NgbModal,
    DatePipe,
    UserListComponent,
    NgbActiveModal,
    RoleListComponent,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: ErrorHandler,
      useClass: GloblErrorHandlerComponent,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
