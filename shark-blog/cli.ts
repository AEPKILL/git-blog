#!/usr/bin/env node

import { CLI, Shim } from 'clime';
import { join } from 'path';

async function exec() {
  const cli = new CLI('blog', join(__dirname, 'commands'));
  const shim = new Shim(cli);
  shim.execute(process.argv);
}

exec();
