import * as cheerio from 'cheerio';
import { cyan, green, red, yellow } from 'cli-color';
import { ReadStream } from 'fs';
import { IncomingMessage, ServerRequest, ServerResponse } from 'http';
import { createServer } from 'http-server';
import opener from 'opener';
import { networkInterfaces } from 'os';
import { extname } from 'path';
import { getPortPromise } from 'portfinder';
import { createInterface } from 'readline';
import ws from 'ws';
import injectCode from './inject-code';
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
  private wsClients: ws[] = [];
  async start() {
    const config = getConfig();
    const server = createServer({
      root: config.rootDir,
      logFn: logger,
      // tslint:disable-next-line:no-any
      cache: 'no-cache' as any,
      before: [this.injectLiveReloadCode.bind(this)]
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

    const wsServer = new ws.Server({ noServer: true });

    wsServer.on('connection', wsClient => {
      this.wsClients.push(wsClient);
      wsClient.send('connected');
    });

    wsServer.on('close', wsClient => {
      this.wsClients = this.wsClients.filter(client => client !== wsClient);
    });

    // tslint:disable-next-line:no-any
    ((server as any).server as typeof server).on(
      'upgrade',
      (request, socket, head) => {
        wsServer.handleUpgrade(request, socket, head, wsClient => {
          wsServer.emit('connection', wsClient, request);
          wsClient.onclose = () => {
            wsServer.emit('close', wsClient);
          };
        });
      }
    );

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
  private injectLiveReloadCode(_req: ServerRequest, res: ServerResponse) {
    res.emit('next');
    res.on('pipe', (stream: ReadStream) => {
      let content = '';
      if (extname(stream.path.toString()) === '.html') {
        stream.unpipe(res);
        stream.on('data', (data: string) => {
          content += data;
        });
        stream.on('close', () => {
          const $ = cheerio.load(content);
          $('head').append(injectCode);
          content = $.html();
          res.setHeader('content-length', new Buffer(content).length);
          res.end(content);
        });
      }
    });
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
    this.updater.on('updated', () => {
      this.wsClients.forEach(wsClient => wsClient.send('reload'));
    });
    console.log(`Hit CTRL-C to stop the server.`);
  }
  private onServerStoped() {
    console.log(red('server closed.'));
    process.exit();
  }
}
