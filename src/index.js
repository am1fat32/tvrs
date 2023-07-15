import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
import { createFile } from './utils/create-file.js';
import { logToOutput } from './utils/log-to-output.js';
import { buildPackageJsonTemplate } from './template-builders/build-package-json-template.js';
import { buildStylesTemplate } from './template-builders/build-styles-template.js';
import { buildFunctionalComponentTemplate } from './template-builders/build-functional-component-template.js';
import { buildClassComponentTemplate } from './template-builders/build-class-component-template.js';

const mainEntityMap = {
  fc: {
    fullName: 'Functional component',
    ext: '.tsx',
    fn: buildFunctionalComponentTemplate,
  },
  cc: {
    fullName: 'Class component',
    ext: '.tsx',
    fn: buildClassComponentTemplate,
  },
};

export function createEntity(componentName, type) {
  const destinationPath = process.cwd();
  const mainEntity = mainEntityMap[type];

  if (!mainEntity) {
    const possibleTypes = Object.keys(mainEntityMap).map((it) => chalk.green(it)).join(' | ');
    const errorInfo = `Possible types (${possibleTypes}) do not include ${chalk.yellow(type)}`;
    logToOutput(boxen(errorInfo, { borderColor: 'red' }));

    return;
  }

  const {
    fullName,
    ext: mainExtension,
    fn: buildMainTemplate,
  } = mainEntity;

  const filePath = path.resolve(destinationPath, componentName);

  if (fs.existsSync(filePath)) {
    const errorInfo = `${chalk.yellow(componentName)} directory already exists in this path`;
    logToOutput(boxen(errorInfo, { borderColor: 'red' }));

    return;
  }

  fs.mkdirSync(path.resolve(destinationPath, componentName));

  const mainTemplate = buildMainTemplate(componentName);
  createFile(filePath, `${componentName}${mainExtension}`, mainTemplate);

  const stylesTemplate = buildStylesTemplate();
  createFile(filePath, `${componentName}.pcss`, stylesTemplate);

  const jsonTemplate = buildPackageJsonTemplate(componentName, mainExtension);
  createFile(filePath, 'package.json', jsonTemplate);

  const successInfo = `${fullName} ${chalk.yellow(componentName)} is successfully created`;
  logToOutput(boxen(successInfo, { borderColor: 'green' }));
}
