import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSideBarComponent } from './app-sidebar.component';

describe('SideBarComponent', () => {
  let component: AppSideBarComponent;
  let fixture: ComponentFixture<AppSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
