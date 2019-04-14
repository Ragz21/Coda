import { TestBed } from '@angular/core/testing';

import { AudioDataService } from './audio-data.service';

describe('AudioDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AudioDataService = TestBed.get(AudioDataService);
    expect(service).toBeTruthy();
  });
});
