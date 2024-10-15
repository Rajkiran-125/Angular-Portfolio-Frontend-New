import { TestBed } from '@angular/core/testing';

import { CrudDataServiceService } from './crud-data-service.service';

describe('CrudDataServiceService', () => {
  let service: CrudDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
