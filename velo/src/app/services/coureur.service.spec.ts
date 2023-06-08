import { TestBed } from '@angular/core/testing';

import { CoureurService } from './coureur.service';

describe('CoureurService', () => {
  let service: CoureurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoureurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
