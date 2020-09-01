import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContentSidebarComponent } from './app-content-sidebar.component';

describe('AppContentSidebarComponent', () => {
  let component: AppContentSidebarComponent;
  let fixture: ComponentFixture<AppContentSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppContentSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContentSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
