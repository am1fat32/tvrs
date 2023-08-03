#!/usr/bin/env node

import path from 'path';
import { program } from 'commander';
import { createEntity } from '../src/index.js';
import { getDefaultTypeEntity, getPossibleTypeEntities } from '../src/type-entity.js';

program
  .version('3.1.0', '-v, --version')
  .description('Creates an entity in cwd')
  .argument('<name>', 'entity name in kebab case')
  .argument('[type]', `entity type: ${getPossibleTypeEntities().join(' | ')}`, getDefaultTypeEntity())
  .action((entityName, type) => {
    const workingDirectory = process.cwd();
    const targetPath = path.resolve(workingDirectory, entityName);

    createEntity(entityName, type, targetPath);
  })
  .parse();
