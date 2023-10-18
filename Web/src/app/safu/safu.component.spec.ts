import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafuComponent } from './safu.component';

describe('SafuComponent', () => {
  let component: SafuComponent;
  let fixture: ComponentFixture<SafuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SafuComponent]
    });
    fixture = TestBed.createComponent(SafuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
