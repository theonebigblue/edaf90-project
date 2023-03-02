import { TestBed } from '@angular/core/testing';

import { GpxGetterService } from './gpx-getter.service';

describe('GpxGetterService', () => {
  let service: GpxGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpxGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
