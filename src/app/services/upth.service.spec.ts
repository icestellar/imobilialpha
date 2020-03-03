import { TestBed } from '@angular/core/testing';

import { UpthService } from './upth.service';

describe('UpthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpthService = TestBed.get(UpthService);
    expect(service).toBeTruthy();
  });
});
