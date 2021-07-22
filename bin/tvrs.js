#!/usr/bin/env node

const { program } = require('commander');
const { version, description } = require('../package.json');
const { createEntity } = require('../src/index');

program
  .version(version, '-v, --version')
  .description(description)
  .argument('<name>', 'entity name in kebab case')
  .argument('[type]', 'entity type: fc | cc', 'fc')
  .option('-s, --single', 'creates entity without folder, styles and package.json')
  .action((entityName, type) => {
    const { single } = program.opts();

    createEntity(entityName, type, single);
  })
  .parse();
