import { cyan, green, red, yellow } from 'cli-color';
import { IncomingMessage, ServerResponse } from 'http';
import { createServer } from 'http-server';
import opener from 'opener';
import { networkInterfaces } from 'os';
import { getPortPromise } from 'portfinder';
import { createInterface } from 'readline';
import Updater from './updater';
import { getConfig } from './utils/blog-config';
import workspace from './utils/workspace';

function logger(req: IncomingMessage, _res: ServerResponse, error: Error) {
  const date = new Date().toLocaleString();
  if (error) {
    console.log(
      '[%s] "%s %s" Error (%s): "%s"',
      date,
      red(req.method),
      red(req.url),
      red((error as Error & { status: number }).status.toString()),
      red(error.message)
    );
  } else {
    console.log(
      '[%s] "%s %s" "%s"',
      date,
      cyan(req.method),
      cyan(req.url),
      req.headers['user-agent']
    );
  }
}

export default class Server {
  private updater = new Updater();
  async start() {
    const config = getConfig();
    const server = createServer({
      root: config.rootDir,
      logFn: logger
    });
    let port: number;

    try {
      port = await getPortPromise({ port: 3000 });
    } catch (e) {
      console.log(red(`server start failed: can't find a unused port.`));
      return;
    }

    console.log(green(`public dir: ${workspace.getWorkspaceDir()}`));

    server.listen(port, () => {
      this.onServerStart(port);
    });

    process.on('SIGINT', this.onServerStoped.bind(this));
    process.on('SIGTERM', this.onServerStoped.bind(this));

    if (process.platform === 'win32') {
      createInterface({
        input: process.stdin,
        output: process.stdout
      }).on('SIGINT', () => {
        process.emit('SIGINT');
      });
    }
  }

  private onServerStart(port: number) {
    const ifaces = networkInterfaces();
    opener(`http://localhost:${port}`);
    console.log(yellow(`Available on:`));
    for (const key of Object.keys(ifaces)) {
      for (const details of ifaces[key]) {
        if (details.family === 'IPv4') {
          console.log(`   http://${details.address}:${port}`);
        }
      }
    }
    this.updater.watch();
    console.log(`Hit CTRL-C to stop the server.`);
  }
  private onServerStoped() {
    console.log(red('server closed.'));
    process.exit();
  }
}
