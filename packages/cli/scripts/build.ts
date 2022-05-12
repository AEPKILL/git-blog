import fsExtra from 'fs-extra';
import path from 'path';

const buildDir = path.join(__dirname, '../bin');

if (fsExtra.existsSync(buildDir)) {
  fsExtra.removeSync(buildDir);

  console.log(`clean build dir: ${buildDir} `);
}
