import { TestBed } from '@angular/core/testing';

import { GoogleAIService } from './google-ai.service';

describe('GoogleAIService', () => {
  let service: GoogleAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
