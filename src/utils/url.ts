export function join(...paths: Array<string | number>) {
  const result: string[] = [];
  for (const path of paths) {
    for (const item of path.toString().split('/')) {
      for (const temp of item.split('\\')) {
        if (temp) {
          result.push(temp);
        }
      }
    }
  }
  if (paths[0]) {
    const first = paths[0].toString();
    if (first[0] === '/' || first[0] === '\\') {
      result.unshift('');
    }
  }
  return result.join('/');
}
