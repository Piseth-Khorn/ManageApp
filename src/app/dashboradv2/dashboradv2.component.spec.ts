import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboradv2Component } from './dashboradv2.component';

describe('Dashboradv2Component', () => {
  let component: Dashboradv2Component;
  let fixture: ComponentFixture<Dashboradv2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboradv2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboradv2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
