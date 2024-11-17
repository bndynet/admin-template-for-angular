import { ITerminalOptions } from '@xterm/xterm';
import { boldText, Color, colorText } from './utils';

export interface XtermOptions extends ITerminalOptions {
  commandPrefix: string;
  welcomeMessage?: string;
  serverDisconnectedMessage?: string;
  notConnectedMessage?: string;
  goodbyeMessage?: string;
}

export const defaultXtermOptions: XtermOptions = {
  commandPrefix: '$ ',
  allowProposedApi: true,
  serverDisconnectedMessage: 'Server not connected, try later...',
  welcomeMessage: `Welcome to use this terminal, type ${boldText(
    colorText('help', Color.Yellow),
  )} for more options...`,
  notConnectedMessage: 'Not connected yet, try later',
  goodbyeMessage: 'Bye bye...',

  // below are the native options, do not put your options here
  cursorBlink: true,
  cursorStyle: 'block',
  fontSize: 16,
  fontFamily: '"Source Code Pro", "Courier New", "Courier"',
  lineHeight: 1.2,
  theme: {
    background: 'black',
  },
};
