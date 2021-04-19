import { TestBed } from '@angular/core/testing';

import { UserVolatileService } from './user-volatile.service';

describe('UserVolatileService', () => {
  let service: UserVolatileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserVolatileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
