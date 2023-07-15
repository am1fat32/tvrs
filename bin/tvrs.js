#!/usr/bin/env node

import { program } from 'commander';
import { createEntity } from '../src/index.js';

program
  .version('3.0.0', '-v, --version')
  .description('Creates an entity in cwd')
  .argument('<name>', 'entity name in kebab case')
  .argument('[type]', 'entity type: fc | cc', 'fc')
  .action((entityName, type) => {
    createEntity(entityName, type);
  })
  .parse();
