import { TestBed } from '@angular/core/testing';

import { ResponsableFederationService } from './responsable-federation.service';

describe('ResponsableFederationService', () => {
  let service: ResponsableFederationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableFederationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
