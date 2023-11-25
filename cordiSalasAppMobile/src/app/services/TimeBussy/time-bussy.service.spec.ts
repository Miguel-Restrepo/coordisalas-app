import { TestBed } from '@angular/core/testing';

import { TimeBussyService } from './time-bussy.service';

describe('TimeBussyService', () => {
  let service: TimeBussyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeBussyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
