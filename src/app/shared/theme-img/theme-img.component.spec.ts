import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeImgComponent } from './theme-img.component';

describe('ThemeImgComponent', () => {
  let component: ThemeImgComponent;
  let fixture: ComponentFixture<ThemeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeImgComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
