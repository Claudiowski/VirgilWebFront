import { TestBed, inject } from '@angular/core/testing';

import { AddStreamService } from './add-stream.service';

describe('AddStreamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddStreamService]
    });
  });

  it('should be created', inject([AddStreamService], (service: AddStreamService) => {
    expect(service).toBeTruthy();
  }));
});
