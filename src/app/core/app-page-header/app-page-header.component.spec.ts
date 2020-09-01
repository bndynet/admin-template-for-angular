import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageHeaderComponent } from './app-page-header.component';

describe('AppPageHeaderComponent', () => {
  let component: AppPageHeaderComponent;
  let fixture: ComponentFixture<AppPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPageHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
