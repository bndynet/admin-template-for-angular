import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let meetElements: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ClickOutsideDirective, TestComponent],
      imports: [],
    }).createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initial binding

    // all elements with an attached Directive
    meetElements = fixture.debugElement.queryAll(
      By.directive(ClickOutsideDirective)
    );
  });

  it('should create an instance', () => {
    expect(meetElements.length).toBe(1);
  });

  it('should call clickOutside if click on document', () => {
    expect(component.count).toBe(0);
    document.dispatchEvent(new MouseEvent('click'));
    expect(component.count).toBe(1);
  });

  it('should call clickOutside if click on other elements', () => {
    expect(component.count).toBe(0);
    const includeElem = fixture.debugElement.query(By.css('.include'));
    (includeElem.nativeElement as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    expect(component.count).toBe(1);
  });

  it('should not call clickOutside if click inside', () => {
    expect(component.count).toBe(0);
    (fixture.debugElement.query(By.css('.main'))
      .nativeElement as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    expect(component.count).toBe(0);
  });

  it('should not call clickOutside if click in clickOutsideExcludeClassFor', () => {
    expect(component.count).toBe(0);
    const excludeElem = fixture.debugElement.query(By.css('.exclude'));
    (excludeElem.nativeElement as HTMLElement).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    expect(component.count).toBe(0);
  });

  @Component({
    template: `
      <div>
        <div
          class="main"
          (clickOutside)="outsideClickHandle()"
          [clickOutsideExcludeClassFor]="['exclude']"
        ></div>
        <div class="exclude"></div>
        <div class="include"></div>
      </div>
    `,
  })
  class TestComponent {
    count = 0;

    outsideClickHandle() {
      this.count += 1;
    }
  }
});
