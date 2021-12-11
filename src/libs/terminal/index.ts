import Xterm from './xterm';

export class Terminal {
  private xterm: Xterm;

  constructor(
    private element: HTMLElement,
    private socketUrlOrAjaxFn: string | ((cmd: string) => Promise<string>)
  ) {
    this.xterm = new Xterm(this.element, this.socketUrlOrAjaxFn);
  }

  dispose(): void {
    this.xterm.dispose();
  }
}
