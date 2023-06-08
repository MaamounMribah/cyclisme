import { TestBed } from '@angular/core/testing';

import { CategorieveloService } from './categorievelo.service';

describe('CategorieveloService', () => {
  let service: CategorieveloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieveloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
