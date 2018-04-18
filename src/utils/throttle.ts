// tslint:disable-next-line:ban-types
export default function throttle<T extends Function>(fn: T, time = 500): T {
  let timer: number;
  // tslint:disable-next-line:no-any
  return ((...args: any[]) => {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(fn, time, ...args);
    // tslint:disable-next-line:no-any
  }) as any;
}
