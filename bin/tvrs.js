#!/usr/bin/env node

const { program } = require('commander');
const { version, description } = require('../package.json');
const { createComponent } = require('../src/index');

program
  .version(version, '-v, --version')
  .description(description)
  .argument('<component-name>', 'Component name in kebab case')
  .action((componentName) => {
    createComponent(componentName);
  })
  .parse();
