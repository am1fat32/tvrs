#!/usr/bin/env node

import path from 'path';
import { Argument, program } from 'commander';
import { createEntity } from '../src/index.js';
import { getPossibleEntities, getPossibleEntitiesValues, TypeEntity } from '../src/type-entity.js';

program
  .version('3.1.1', '-v, --version')
  .usage('<entity-name> [type]')
  .description(getDescription())
  .argument('<entity-name>', 'any entity name in kebab case')
  .addArgument(
    new Argument('[type]', 'entity type')
      .default(TypeEntity.FunctionalComponent.value)
      .choices(getPossibleEntitiesValues()),
  )
  .action((entityName, type) => {
    const workingDirectory = process.cwd();
    const targetPath = path.resolve(workingDirectory, entityName);

    createEntity(entityName, type, targetPath);
  })
  .parse();

function getDescription() {
  return `Creates an entity in cwd.\nPossible entities: ${getPossibleEntities().map(getDescriptionRow).join('')}`;
}

function getDescriptionRow(entity) {
  return `\n  ${entity.value} (${entity.description})`;
}
