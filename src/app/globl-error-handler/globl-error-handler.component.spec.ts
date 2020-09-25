import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GloblErrorHandlerComponent } from './globl-error-handler.component';

describe('GloblErrorHandlerComponent', () => {
  let component: GloblErrorHandlerComponent;
  let fixture: ComponentFixture<GloblErrorHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GloblErrorHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GloblErrorHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
