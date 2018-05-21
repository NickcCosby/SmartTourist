import { TestBed, inject } from '@angular/core/testing';

import { PlacesService } from './places.service';

describe('PlacesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlacesService]
    });
  });

  it('should be created', inject([PlacesService], (service: PlacesService) => {
    expect(service).toBeTruthy();
  }));
});
