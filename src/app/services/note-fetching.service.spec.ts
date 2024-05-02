import { TestBed } from '@angular/core/testing';

import { NoteFetchingService } from './note-fetching.service';

describe('NoteFetchingService', () => {
  let service: NoteFetchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteFetchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
