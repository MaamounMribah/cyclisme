import { TestBed } from '@angular/core/testing';

import { ResponsableEquipeService } from './responsable-equipe.service';

describe('ResponsableEquipeService', () => {
  let service: ResponsableEquipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsableEquipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
