import { TestBed } from '@angular/core/testing';

import { MemberstackService } from './memberstack.service';

describe('MemberstackService', () => {
  let service: MemberstackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberstackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
