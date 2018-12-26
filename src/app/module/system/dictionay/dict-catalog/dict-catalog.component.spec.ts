import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DictCatalogComponent } from './dict-catalog.component';

describe('DictCatalogComponent', () => {
  let component: DictCatalogComponent;
  let fixture: ComponentFixture<DictCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
