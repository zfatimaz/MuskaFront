import { TestBed } from '@angular/core/testing';

import { AdherantService } from './adherant.service';

describe('AdherantService', () => {
  let service: AdherantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdherantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
