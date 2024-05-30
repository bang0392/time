import { TestBed } from '@angular/core/testing';

import { SetEventService } from './set-event.service';

describe('SetEventService', () => {
  let service: SetEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
