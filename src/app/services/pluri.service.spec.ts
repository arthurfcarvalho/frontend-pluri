import { TestBed } from '@angular/core/testing';

import { PluriService } from './pluri.service';

describe('PluriService', () => {
  let service: PluriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
