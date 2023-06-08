import { TestBed } from '@angular/core/testing';

import { MembreFederationService } from './membre-federation.service';

describe('MembreFederationService', () => {
  let service: MembreFederationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembreFederationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
