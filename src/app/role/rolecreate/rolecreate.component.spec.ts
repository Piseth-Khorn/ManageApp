import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolecreateComponent } from './rolecreate.component';

describe('RolecreateComponent', () => {
  let component: RolecreateComponent;
  let fixture: ComponentFixture<RolecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
