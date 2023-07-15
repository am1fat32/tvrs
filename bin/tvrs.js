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
  .action((entityName, type) => {
    createEntity(entityName, type);
  })
  .parse();
