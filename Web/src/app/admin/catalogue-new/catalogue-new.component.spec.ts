import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogueNewComponent } from './catalogue-new.component';

describe('CatalogueNewComponent', () => {
  let component: CatalogueNewComponent;
  let fixture: ComponentFixture<CatalogueNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogueNewComponent]
    });
    fixture = TestBed.createComponent(CatalogueNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
