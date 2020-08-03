import { Component, OnInit } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.sass']
})
export class CompanyCreateComponent implements OnInit {
  name: any;
  license_no;
  constructor() { }

  ngOnInit(): void {
    console.log(this.license_no);
  }

  action() {

  }
}