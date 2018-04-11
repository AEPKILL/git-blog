function classnames(
  ...args: Array<string | undefined | { [key: string]: boolean | undefined }>
) {
  const names: string[] = [];
  for (const arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        names.push(arg);
      } else {
        for (const key of Object.keys(arg)) {
          if (arg[key]) {
            names.push(key);
          }
        }
      }
    }
  }
  return names.join(' ');
}

export default classnames;
