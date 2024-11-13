import { Injectable } from '@angular/core';
import { Alignment, driver, Driver, DriveStep, Side } from 'driver.js';
import { forkJoin, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { I18nService } from './i18n.service';
import { Config } from 'protractor';

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
      d.destroy();
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
        const driverOptions: DriveStep = this.convertToDriverStep(option);
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
      const finalOptions: DriveStep[] = options.map(
        this.convertToDriverStep
      );
      driver.setSteps(finalOptions);
      driver.drive();
    });
  }

  private clearTemporarySettings(): void {
    document.body.classList.remove(BORDERED_CLASS_NAME_FOR_BODY);
  }

  private convertToDriverStep(option: IHighlightOption): any {
    const driverOption: DriveStep = {
      element: `#${option.elementId}`,
      popover: {
        popoverClass: `${option.className ?? ''} ${
          !option.title ? 'no-title' : ''
        }`,
        title: !option.title && option.description ? 'No Title' : option.title,
        description: option.description,
        side: option.side,
        align: option.align,
      },
    };

    return driverOption;
  }

  private getDriver(config?: Config): Observable<Driver> {
    const doneText$ = this.i18n.translate('done');
    const closeText$ = this.i18n.translate('close');
    const nextText$ = this.i18n.translate('next');
    const previousText$ = this.i18n.translate('previous');
    return forkJoin([doneText$, closeText$, nextText$, previousText$]).pipe(
      map((res: string[]) => {
        const d = driver({
          // className: '', // wrap driver.js popover
          animate: true, // Whether to animate or not
          overlayOpacity: 0.75, // Background opacity (0 means only popovers and without overlay)
          stagePadding: 10, // Distance of element from around the edges
          allowClose: true, // Whether the click on overlay should close or not
          doneBtnText: res[0], // Text on the final button
          nextBtnText: res[2], // Next button text for this step
          prevBtnText: res[3], // Previous button text for this step
          showButtons: ['next', 'previous', 'close'], // Do not show control buttons in footer
          allowKeyboardControl: true, // Allow controlling through keyboard (escape to close, arrow keys to move)
          onHighlightStarted: (element) => {}, // Called when element is about to be highlighted
          onHighlighted: (element) => {}, // Called when element is fully highlighted
          onDeselected: (element) => {}, // Called when element has been deselected

          ...(config ?? {}),
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
  side?: Side;
  align?: Alignment;
  popoverOffset?: number;
}
