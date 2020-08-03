import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboradv3Component } from './dashboradv3.component';

describe('Dashboradv3Component', () => {
  let component: Dashboradv3Component;
  let fixture: ComponentFixture<Dashboradv3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dashboradv3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dashboradv3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
