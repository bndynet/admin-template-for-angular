export function ifUndefined(arg: any, val: any): any {
  if (typeof arg === 'undefined') {
    return val;
  }
  return arg;
}
