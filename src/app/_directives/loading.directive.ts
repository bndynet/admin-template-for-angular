import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[vLoading]',
})
export class LoadingDirective implements OnChanges {
  @Input('vLoading') loading: boolean;
  @Input('vLoadingText') loadingText: string;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loading) {
      if (changes.loading.currentValue) {
        this.enable();
      } else {
        this.disable();
      }
    }
  }

  private enable(): void {
    this.el.nativeElement.classList.add('overlay-parent');
    this.renderer.appendChild(this.el.nativeElement, this.getElement());
  }

  private disable(): void {
    this.el.nativeElement.classList.remove('overlay-parent');
    if (this.el.nativeElement.querySelector('.overlay-loading')) {
      this.renderer.removeChild(
        this.el.nativeElement,
        this.el.nativeElement.querySelector('.overlay-loading')
      );
    }
  }

  private getElement(): HTMLElement {
    const rootElem = this.document.createElement('div');
    rootElem.className = 'overlay overlay-loading';

    const loadingElem = this.document.createElement('div');
    loadingElem.className = 'loading-body';
    loadingElem.innerHTML = `<svg class="loading-spinner" viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>`;
    rootElem.appendChild(loadingElem);

    if (this.loadingText) {
      const textElem = this.document.createElement('div');
      textElem.classList.add('loading-text');
      textElem.innerHTML = this.loadingText;
      loadingElem.appendChild(textElem);
    }

    return rootElem;
  }
}
