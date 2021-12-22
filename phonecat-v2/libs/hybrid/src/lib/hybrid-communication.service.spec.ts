import { TestBed } from '@angular/core/testing';

import { HybridCommunicationService } from './hybrid-communication.service';

describe('HybridCommunicationService', () => {
  let service: HybridCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HybridCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
