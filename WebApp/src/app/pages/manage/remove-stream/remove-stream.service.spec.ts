import { TestBed, inject } from '@angular/core/testing';

import { RemoveStreamService } from './remove-stream.service';

describe('RemoveStreamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveStreamService]
    });
  });

  it('should be created', inject([RemoveStreamService], (service: RemoveStreamService) => {
    expect(service).toBeTruthy();
  }));
});
