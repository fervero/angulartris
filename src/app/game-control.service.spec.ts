import { TestBed, inject } from '@angular/core/testing';

import { GameControlService } from './game-control.service';

describe('GameControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameControlService]
    });
  });

  it('should be created', inject([GameControlService], (service: GameControlService) => {
    expect(service).toBeTruthy();
  }));
});
