#!/usr/bin/env node

import fs from 'fs';
import { program } from 'commander';
import { createEntity } from '../src/index.js';

const jsonData = JSON.parse(fs.readFileSync('package.json'));

program
  .version(jsonData.version, '-v, --version')
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
