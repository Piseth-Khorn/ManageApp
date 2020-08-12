import { LoginComponent } from './../../login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlankComponent } from './blank.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';


@NgModule({
    declarations: [
        BlankComponent,
        LoginComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        CommonModule,
        AppRoutingModule,

    ],
    exports: [

    ]
})

export class BlankModule { }