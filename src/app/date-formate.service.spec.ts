import { TestBed } from '@angular/core/testing';

import { DateFormateService } from './date-formate.service';

describe('DateFormateService', () => {
  let service: DateFormateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
