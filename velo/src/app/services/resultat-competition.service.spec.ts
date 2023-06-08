import { TestBed } from '@angular/core/testing';

import { ResultatCompetitionService } from './resultat-competition.service';

describe('ResultatCompetitionService', () => {
  let service: ResultatCompetitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultatCompetitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
