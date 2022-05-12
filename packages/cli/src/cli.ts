#!/usr/bin/env node

import { CLI, Shim } from 'clime';
import { join } from 'path';

if (process.env.NODE_ENV === 'development') {
  CLI.commandModuleExtension = '.ts';
}

async function exec() {
  const cli = new CLI('blog', join(__dirname, 'commands'));
  const shim = new Shim(cli);
  shim.execute(process.argv);
}

exec();
