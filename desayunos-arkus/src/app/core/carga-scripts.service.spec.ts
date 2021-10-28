import { TestBed } from '@angular/core/testing';

import { CargaScriptsService } from './carga-scripts.service';

describe('CargaScriptsService', () => {
  let service: CargaScriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
