import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import { logToOutput } from './utils/log-to-output.js';
import {
  FunctionalComponentBuilder,
} from './template-builders/functional-component-builder/functional-component-builder.js';
import {
  ClassComponentBuilder,
} from './template-builders/class-component-builder/class-component-builder.js';
import { POSSIBLE_ENTITY_TYPES } from './constants.js';

export function createEntity(entityName, entityType) {
  const builder = getBuilderByEntityType(entityName, entityType);

  if (!builder) {
    const possibleTypes = POSSIBLE_ENTITY_TYPES.map((it) => chalk.green(it)).join(' | ');
    const errorInfo = `Possible types (${possibleTypes}) do not include ${chalk.yellow(entityType)}`;
    logToOutput(boxen(errorInfo, { borderColor: 'red' }));

    return;
  }

  const destinationPath = process.cwd();
  const filePath = path.resolve(destinationPath, entityName);

  if (fs.existsSync(filePath)) {
    const errorInfo = `${chalk.yellow(entityName)} directory already exists in this path`;
    logToOutput(boxen(errorInfo, { borderColor: 'red' }));

    return;
  }

  fs.mkdirSync(path.resolve(destinationPath, entityName));

  builder.createTemplates(filePath);

  const successInfo = `${builder.getFullName()} ${chalk.yellow(entityName)} is successfully created`;
  logToOutput(boxen(successInfo, { borderColor: 'green' }));
}

function getBuilderByEntityType(entityName, entityType) {
  if (entityType === 'fc') {
    return new FunctionalComponentBuilder(entityName);
  }

  if (entityName === 'cc') {
    return new ClassComponentBuilder(entityName);
  }

  return null;
}
