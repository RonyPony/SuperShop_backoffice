/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountersService } from './counters.service';

describe('Service: Counters', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountersService]
    });
  });

  it('should ...', inject([CountersService], (service: CountersService) => {
    expect(service).toBeTruthy();
  }));
});
