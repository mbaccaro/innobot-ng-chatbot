import { TestBed, inject } from '@angular/core/testing';

import { InnobotService } from './innobot.service';

describe('InnobotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InnobotService]
    });
  });

  it('should be created', inject([InnobotService], (service: InnobotService) => {
    expect(service).toBeTruthy();
  }));
});
