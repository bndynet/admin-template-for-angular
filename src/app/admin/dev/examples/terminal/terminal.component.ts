import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { map } from 'rxjs/operators';
import { Terminal } from 'src/libs/terminal';

@Component({
  selector: 'app-examples-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TerminalComponent implements AfterViewInit, OnDestroy {
  private terminal: Terminal;

  public serverType = 'web-socket';

  @ViewChild('terminalBox') terminalDiv: ElementRef;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initUI();
  }

  ngOnDestroy(): void {
    this.terminal.dispose();
  }

  changeServer(event: MatButtonToggleChange): void {
    this.serverType = event.value;
    this.initUI();
  }

  private initUI(): void {
    if (this.terminal) {
      this.terminal.dispose();
    }

    let server;
    if (this.serverType === 'web-socket') {
      server = 'ws://localhost:10000';
    } else if (this.serverType === 'rest-api') {
      server = (cmd: string) => {
        return this.http
          .get<string>(`http://localhost:3000?cmd=${cmd}`)
          .pipe(map((res: any) => res.text))
          .toPromise();
      };
    }
    this.terminal = new Terminal(this.terminalDiv.nativeElement, server);
  }
}
