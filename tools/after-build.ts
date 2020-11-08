const fs = require('fs');
const sh = require('shelljs');
const cli = require('@bndynet/cli');
const pkg = JSON.parse(fs.readFileSync('package.json') as any);

cli.startSection('inject copyright');
sh.cd('dist/admin-template-for-angular');
sh.ls('*.*').forEach((file: string) => {
  const isJS = file.endsWith('.js');
  const isCSS = file.endsWith('.css');
  if (isJS || isCSS) {
    let data = fs.readFileSync(file, 'utf8');
    let copyright = `/**!
 * ${pkg.name} v${pkg.version}
 *
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name}
 * Released under the ${pkg.license} license
 */
`;
    if (isJS) {
      copyright += `var APP_BUILD = '${new Date()}';var APP_VERSION = '${
        pkg.version
      }';`;
    }

    data = `${copyright}${data}`;
    fs.writeFileSync(file, data, (werr: any) => {
      if (werr) {
        cli.error(file);
        throw werr;
      }
    });
    cli.success(file);
  }
});
cli.endSection();

sh.cd('../');
