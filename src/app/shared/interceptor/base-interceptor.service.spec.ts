import { TestBed } from '@angular/core/testing';

import { BaseInterceptorService } from './base-interceptor.service';

describe('BaseInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseInterceptorService = TestBed.get(BaseInterceptorService);
    expect(service).toBeTruthy();
  });
});
