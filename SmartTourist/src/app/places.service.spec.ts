import { TestBed, inject } from '@angular/core/testing';

import { PlacesServiceService } from './places-service.service';

describe('PlacesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacesServiceService]
    });
  });

  it('should be created', inject([PlacesServiceService], (service: PlacesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
