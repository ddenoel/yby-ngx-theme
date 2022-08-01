import { TestBed } from '@angular/core/testing';

import { NgxThemeService } from './ngx-theme.service';

describe('NgxThemeService', () => {
  let service: NgxThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
