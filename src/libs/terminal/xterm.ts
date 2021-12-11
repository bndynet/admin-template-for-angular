import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { HttpConnection, SocketConnection } from './connections';
import { Connection, ConnectionEvent } from './connections/connection';
import { boldText, Color, colorText } from './utils';
import { defaultXtermOptions, XtermOptions } from './xterm-options';

export default class Xterm {
  private terminal: Terminal;
  private fitAddon: FitAddon;
  private connection: Connection;
  private options: XtermOptions = defaultXtermOptions;

  // while loading command from server user input is blocked
  private typingBlocked = false;

  // will store text till Enter pressed
  private currentLine = '';

  private commandsBuffer = {
    commands: [], // will store all commands
    pointer: -1, // when we will browse history by using arrow keys up/down we will keep pointer to place in the buffer
  };

  constructor(
    htmlElement: HTMLElement,
    socketUrlOrPromise: string | ((cmd: string) => Promise<string>),
    options?: XtermOptions
  ) {
    this.options = { ...this.options, ...options };
    this.connection =
      typeof socketUrlOrPromise === 'string'
        ? new SocketConnection(socketUrlOrPromise)
        : new HttpConnection(socketUrlOrPromise);

    this.terminal = new Terminal(this.options);
    window.terminal = this.terminal;

    this.fitAddon = new FitAddon();
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.loadAddon(new WebLinksAddon());
    this.terminal.loadAddon(new Unicode11Addon());
    this.terminal.unicode.activeVersion = '11';

    this.terminal.open(htmlElement);
    // need delay to fit parent, otherwise not work
    setTimeout(() => {
      this.fitAddon.fit();
      window.onresize = () => this.fitAddon.fit();
    });

    this.initTerminal().then(() => {
      this.initListeners();
    });

    this.initPrintableKeyListener();
    this.initControlKeyListeners();
  }

  public dispose(): void {
    this.connection.dispose();
    this.terminal.dispose();
  }

  public async clear() {
    await this.printLineIntro();
    this.terminal.clear();
  }

  public async commandReset() {
    this.terminal.reset();
    this.terminal.focus();
    this.typingBlocked = true;
    await this.printFancyText(this.options.welcomeMessage, false);
    await this.printLineIntro();
  }

  private async initTerminal() {
    await this.commandReset();
  }

  private initPrintableKeyListener() {
    this.terminal.onData(async (data) => {
      if (this.typingBlocked) {
        return false;
      }

      if (
        data.length > 0 &&
        data.charCodeAt(0) >= 32 &&
        data.charCodeAt(0) < 127
      ) {
        console.log(data.charCodeAt(0));
        await this.write(data);
        this.currentLine += data;
      }
    });
  }

  private initControlKeyListeners() {
    this.terminal.onKey(async ({ key, domEvent }) => {
      if (this.typingBlocked) {
        return false;
      }

      const keyCode = domEvent.key;
      const code = key.charCodeAt(0);

      if (keyCode.startsWith('Arrow')) {
        if (keyCode === 'ArrowUp') {
          await this.browseHistory(true);
        } else if (keyCode === 'ArrowDown') {
          await this.browseHistory(false);
        }
      } else if (domEvent.ctrlKey && domEvent.key === 'c') {
        // ctrl+c
        // await this.prompt(false);
        await this.printLineIntro();
      } else if (code === 13) {
        // enter
        // await this.prompt(true);
        await this.processCurrentLine();
      } else if (code === 127) {
        // backspace
        this.backspace();
      }
    });
  }

  private initListeners() {
    this.connection.on(ConnectionEvent.Open, async (opened) => {
      console.debug('Connection:Open');
      if (!opened) {
        await this.printText(this.options.notConnectedMessage, true);
        await this.printLineIntro();
      }
    });

    this.connection.on(ConnectionEvent.Close, async (closed) => {
      console.debug('Connection:Close');
    });

    this.connection.on(ConnectionEvent.Error, async (error) => {
      console.debug('Connection:Error');
      console.debug(error);
      await this.printText(
        colorText(
          typeof error !== 'string' ? JSON.stringify(error) : error,
          Color.Red
        ),
        true
      );
      await this.printLineIntro();
    });

    this.connection.on(ConnectionEvent.Message, async (response) => {
      console.debug('Connection:Message');
      let textMessage;
      if (response.data) {
        // for websocket response
        textMessage = response.data;
      } else if (response.filedata) {
        // you can use **file-saver** lib to download file here
        // saveAs(new Blob(response.filedata), response.filename);
        textMessage = `Download as ${response.filename}`;
      } else {
        textMessage =
          typeof response !== 'string' ? JSON.stringify(response) : response;
      }

      if (response.error) {
        textMessage = response.error;
      }

      if (response.fancyTyping) {
        await this.printFancyText(
          textMessage,
          textMessage.split('\n').length > 0 ? true : false
        );
      } else {
        await this.printText(textMessage, true);
      }

      await this.printLineIntro();
    });
  }

  private async browseHistory(up = true) {
    if (this.commandsBuffer.commands.length === 0) {
      return;
    }

    if (this.commandsBuffer.pointer === -1) {
      this.commandsBuffer.pointer = this.commandsBuffer.commands.length - 1; //begin browsing from last command
    } else if (up && this.commandsBuffer.pointer > 0) {
      this.commandsBuffer.pointer--;
    } else if (
      !up &&
      this.commandsBuffer.pointer < this.commandsBuffer.commands.length - 1
    ) {
      this.commandsBuffer.pointer++;
    }
    const currentCommand = this.commandsBuffer.commands[
      this.commandsBuffer.pointer
    ];

    while (this.currentLine.length > 0) {
      await this.backspace();
    }

    this.currentLine = currentCommand;
    await this.write(currentCommand);
  }

  private async write(text) {
    return new Promise((resolve, reject) => {
      this.terminal.write(text, () => {
        return resolve(text);
      });
    });
  }

  // async prompt(process) {
  //   console.log('prompt');
  //   await this.write('\r\n');
  //   if (process) {
  //     await this.processCurrentLine();
  //   }
  //   // await this.printLineIntro();
  // }

  private async printLineIntro() {
    this.currentLine = '';
    const startText = `>>> ${colorText(
      new Date().toLocaleTimeString(),
      Color.Yellow
    )} ${boldText(this.options.commandPrefix)}`;
    await this.printText(startText, false);
    this.terminal.focus();
  }

  private async printFancyText(text, finishWithNewLine) {
    this.typingBlocked = true;
    const self = this;
    return new Promise(async (resolve) => {
      let animationFrame;
      const lines = text.split('\n');
      let lineIndex = 0;
      let charIndex = 0;
      async function printNextChar() {
        const currentLine = lines[lineIndex];
        if (currentLine.length > 0 && charIndex < currentLine.length) {
          const char = currentLine[charIndex];
          await self.write(char);
          charIndex++;
        }

        if (charIndex === currentLine.length && lines.length === 1) {
          if (finishWithNewLine) {
            await self.write('\n\r');
          }
          lineIndex++;
        } else if (
          charIndex === currentLine.length &&
          lines.length > 1 &&
          lineIndex < lines.length
        ) {
          charIndex = 0;
          lineIndex++;
          await self.write('\n\r');
        }

        if (lineIndex < lines.length) {
          animationFrame = requestAnimationFrame(printNextChar);
        } else {
          cancelAnimationFrame(animationFrame);
          self.typingBlocked = false;
          return resolve(text);
        }
      }
      const p = await printNextChar();
      return p;
    });
  }

  private async printText(text: string, finishedWithNewLine: boolean) {
    this.typingBlocked = true;
    await this.write('\r\n' + (text || '').replace('\n', '\r\n'));
    if (finishedWithNewLine) {
      await this.newLine();
    }
    this.typingBlocked = false;
  }

  private async asyncCommand(command) {
    console.log('send cmd');
    return await this.connection.sendCommand(command);
  }

  private async newLine() {
    await this.write('\r\n');
  }

  private async processCurrentLine() {
    const command = this.currentLine.trim();
    if (command !== '') {
      this.commandsBuffer.commands.push(command);
      this.commandsBuffer.pointer = -1;
    }

    if (command === '') {
      this.printLineIntro();
      return Promise.resolve();
    } else if (command === 'clear') {
      await this.clear();
    } else if (command === 'reset') {
      await this.commandReset();
    } else if (command === 'history') {
      await this.printHistory();
    } else {
      await this.asyncCommand(command);
    }
  }

  private async printHistory() {
    await this.newLine();
    const history = this.commandsBuffer.commands.reduce(
      (history, line, index, array) => {
        history += index;
        history += '\t';
        history += line.trim();
        if (index < array.length - 1) {
          history += '\r\n';
        }
        return history;
      },
      ''
    );
    await this.printFancyText(
      history,
      history.split('\n').length === 1 ? true : false
    );
    await this.printLineIntro();
  }

  private backspace() {
    if (this.currentLine.length > 0) {
      this.terminal.write('\b \b');
      this.currentLine = this.currentLine.slice(0, -1);
    }
  }
}
