const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');
const { logToOutput } = require('./utils/log-to-output');
const { createFile } = require('./utils/create-file');
const { buildPackageJSONTemplate } = require('./template-builders/build-package-json-template');
const { buildStylesTemplate } = require('./template-builders/build-styles-template');
const { buildFunctionalComponentTemplate } = require('./template-builders/build-functional-component-template');
const { buildClassComponentTemplate } = require('./template-builders/build-class-component-template');

const mainEntityMap = {
  fc: {
    fullName: 'Functional component',
    ext: '.tsx',
    hasStyles: true,
    fn: buildFunctionalComponentTemplate,
  },
  cc: {
    fullName: 'Class component',
    ext: '.tsx',
    hasStyles: true,
    fn: buildClassComponentTemplate,
  },
};

function createEntity(componentName, type, flat, skipPackage) {
  const destinationPath = process.cwd();
  const mainEntity = mainEntityMap[type];

  if (!mainEntity) {
    const possibleTypes = Object.keys(mainEntityMap).map((it) => chalk.green(it)).join(' | ');
    const errorInfo = `Possible types (${possibleTypes}) does not include ${chalk.yellow(type)}!`;
    logToOutput(boxen(errorInfo, { borderColor: 'red' }));

    return;
  }

  const {
    fullName, ext: mainExtension, fn: buildMainTemplate, hasStyles,
  } = mainEntity;

  const filePath = flat ? destinationPath : path.resolve(destinationPath, componentName);

  if (!flat) {
    if (fs.existsSync(filePath)) {
      const errorInfo = `${chalk.yellow(componentName)} folder already exists in this path!`;
      logToOutput(boxen(errorInfo, { borderColor: 'red' }));

      return;
    }

    fs.mkdirSync(path.resolve(destinationPath, componentName));
  }

  const mainTemplate = buildMainTemplate(componentName);
  createFile(filePath, `${componentName}${mainExtension}`, mainTemplate);

  if (hasStyles) {
    const stylesTemplate = buildStylesTemplate();
    createFile(filePath, `${componentName}.pcss`, stylesTemplate);
  }

  if (!skipPackage) {
    const template = buildPackageJSONTemplate(componentName, mainExtension);
    createFile(filePath, 'package.json', template);
  }

  const successInfo = `${fullName} ${chalk.yellow(componentName)} is successfully created!`;
  logToOutput(boxen(successInfo, { borderColor: 'green' }));
}

module.exports = {
  createEntity,
};
