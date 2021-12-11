export enum Color {
  Black = '\u001b[30m',
  Red = '\u001b[31m',
  Green = '\u001b[32m',
  Yellow = '\u001b[33m',
  Blue = '\u001b[34m',
  Magenta = '\u001b[35m',
  Cyan = '\u001b[36m',
  White = '\u001b[37m',
  Reset = '\u001b[0m',
}

export function colorText(text: string, color: Color): string {
  // return text;
  return `${color}${text}${Color.Reset}`;
}

export function boldText(text: string): string {
  // return text;
  return `\u001b[1m${text}\u001b[22m`;
}
