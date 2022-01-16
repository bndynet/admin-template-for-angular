import { Injectable } from '@angular/core';
import Driver from 'driver.js';
import { forkJoin, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { I18nService } from './i18n.service';

const BORDERED_CLASS_NAME_FOR_BODY = 'highlight-service-bordered';

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  private drivers: Driver[] = [];

  constructor(private i18n: I18nService) {}

  public destory(): void {
    this.clearTemporarySettings();
    this.drivers.forEach((d) => {
      d.reset();
    });
  }

  public reinit(): void {
    this.destory();
  }

  public light(option: IHighlightOption): void {
    this.clearTemporarySettings();
    this.getDriver({
      showButtons: false,
    })
      .pipe(delay(100))
      .subscribe((driver) => {
        const driverOptions: Driver.Step = this.convertToDriverOption(option);
        driver.highlight(driverOptions);
        if (option.bordered) {
          document.body.classList.add(BORDERED_CLASS_NAME_FOR_BODY);
        }
      });
  }

  public steps(options: IHighlightOption[]): void {
    this.clearTemporarySettings();
    if (options.length === 1) {
      return this.light(options[0]);
    }

    this.getDriver().subscribe((driver) => {
      const finalOptions: Driver.Step[] = options.map(
        this.convertToDriverOption
      );
      driver.defineSteps(finalOptions);
      driver.start();
    });
  }

  private clearTemporarySettings(): void {
    document.body.classList.remove(BORDERED_CLASS_NAME_FOR_BODY);
  }

  private convertToDriverOption(option: IHighlightOption): any {
    const driverOption: Driver.Step = {
      element: `#${option.elementId}`,
      popover: {
        className: `${option.className ?? ''} ${
          !option.title ? 'no-title' : ''
        }`,
        title: !option.title && option.description ? 'No Title' : option.title,
        description: option.description,
        position: option.position,
      },
    };
    if (typeof option.background !== 'undefined') {
      driverOption.stageBackground = option.background;
    }
    if (typeof option.popoverOffset !== 'undefined') {
      driverOption.popover.offset = option.popoverOffset;
    }
    return driverOption;
  }

  private getDriver(options?: Driver.DriverOptions): Observable<Driver> {
    const doneText$ = this.i18n.translate('done');
    const closeText$ = this.i18n.translate('close');
    const nextText$ = this.i18n.translate('next');
    const previousText$ = this.i18n.translate('previous');
    return forkJoin([doneText$, closeText$, nextText$, previousText$]).pipe(
      map((res: string[]) => {
        const d = new Driver({
          // className: '', // wrap driver.js popover
          animate: true, // Whether to animate or not
          opacity: 0.75, // Background opacity (0 means only popovers and without overlay)
          padding: 10, // Distance of element from around the edges
          allowClose: true, // Whether the click on overlay should close or not
          overlayClickNext: true, // Whether the click on overlay should move next
          doneBtnText: res[0], // Text on the final button
          closeBtnText: res[1], // Text on the close button for this step
          stageBackground: '#ffffff', // Background color for the staged behind highlighted element
          nextBtnText: res[2], // Next button text for this step
          prevBtnText: res[3], // Previous button text for this step
          showButtons: true, // Do not show control buttons in footer
          keyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
          scrollIntoViewOptions: {}, // We use `scrollIntoView()` when possible, pass here the options for it if you want any
          onHighlightStarted: (element) => {}, // Called when element is about to be highlighted
          onHighlighted: (element) => {}, // Called when element is fully highlighted
          onDeselected: (element) => {}, // Called when element has been deselected
          onReset: (element) => {}, // Called when overlay is about to be cleared
          onNext: (element) => {}, // Called when moving to next step on any step
          onPrevious: (element) => {}, // Called when moving to previous step on any step

          ...(options ?? {}),
        });
        this.drivers.push(d);
        return d;
      })
    );
  }
}

export interface IHighlightOption {
  elementId: string;
  className?: string;
  background?: string;
  bordered?: boolean;
  title?: string;
  description?: string;
  position?: string;
  popoverOffset?: number;
}
