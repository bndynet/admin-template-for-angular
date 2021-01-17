import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  @Input() clickOutsideExcludeClassFor: string | string[];
  @Output() clickOutside = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: Event, target: HTMLElement): void {
    let clickedInExclude = (typeof this.clickOutsideExcludeClassFor === 'string'
      ? [this.clickOutsideExcludeClassFor]
      : this.clickOutsideExcludeClassFor || []
    ).some((c) => target.classList && target.classList.contains(c));

    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside && !clickedInExclude) {
      this.clickOutside.emit();
    }
  }
}
