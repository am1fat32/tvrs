#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');
const { createEntity } = require('../src/index');

program
  .version(version, '-v, --version')
  .description('Creates an entity in cwd')
  .argument('<name>', 'entity name in kebab case')
  .argument('[type]', 'entity type: fc | cc', 'fc')
  .option('-f, --flat', 'create entity without folder')
  .option('-sp, --skip-package', 'skip package.json')
  .action((entityName, type) => {
    const { flat, skipPackage } = program.opts();

    createEntity(
      entityName,
      type,
      flat,
      skipPackage,
    );
  })
  .parse();
