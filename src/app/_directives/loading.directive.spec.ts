import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadingDirective } from './loading.directive';

describe('LoadingDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let meetElements: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [LoadingDirective, TestComponent],
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding

    // all elements with an attached Directive
    meetElements = fixture.debugElement.queryAll(
      By.directive(LoadingDirective)
    );
  });

  it('should create an instance', () => {
    expect(meetElements.length).toBe(1);
  });

  @Component({
    template: `
      <div [uiLoading]="true" loadingText="Loading"></div>
      <div></div>
    `,
  })
  class TestComponent {}
});
