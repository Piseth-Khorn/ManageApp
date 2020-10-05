import { TestBed } from '@angular/core/testing';

import { RoleJaveService } from './role-jave.service';

describe('RoleJaveService', () => {
  let service: RoleJaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleJaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
