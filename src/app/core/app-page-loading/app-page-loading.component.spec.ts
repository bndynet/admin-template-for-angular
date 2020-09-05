import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageLoadingComponent } from './app-page-loading.component';

describe('AppLoadingComponent', () => {
  let component: AppPageLoadingComponent;
  let fixture: ComponentFixture<AppPageLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPageLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPageLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
