const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');
const { logToOutput } = require('./utils/logToOutput');
const { logSuccess } = require('./utils/logSuccess');
const { createFile } = require('./utils/createFile');
const { buildPackageJSONTemplate } = require('./templateBuilders/buildPackageJSONTemplate');
const { buildStylesTemplate } = require('./templateBuilders/buildStylesTemplate');
const { buildFunctionalComponentTemplate } = require('./templateBuilders/buildFunctionalComponentTemplate');
const { buildClassComponentTemplate } = require('./templateBuilders/buildClassComponentTemplate');

const mainEntityMap = {
  fc: {
    ext: '.tsx',
    hasStyles: true,
    fn: buildFunctionalComponentTemplate,
  },
  cc: {
    ext: '.tsx',
    hasStyles: true,
    fn: buildClassComponentTemplate,
  },
};

function createEntity(componentName, type, flat, skipPackage) {
  const destinationPath = process.cwd();

  const { ext: mainExtension, fn: buildMainTemplate, hasStyles } = mainEntityMap[type];

  if (!flat) {
    try {
      fs.mkdirSync(path.resolve(destinationPath, componentName));
    } catch {
      const error = `${chalk.yellow(componentName)} folder already exists in this path!`;
      logToOutput(boxen(error, { borderColor: 'red' }));
      return;
    }
  }

  const mainTemplate = buildMainTemplate(componentName);
  const filePath = flat ? destinationPath : path.resolve(destinationPath, componentName);
  createFile(filePath, `${componentName}${mainExtension}`, mainTemplate);

  if (hasStyles) {
    const stylesTemplate = buildStylesTemplate();
    createFile(filePath, `${componentName}.pcss`, stylesTemplate);
  }

  if (!skipPackage) {
    const template = buildPackageJSONTemplate(componentName, mainExtension);
    createFile(filePath, 'package.json', template);
  }

  logSuccess(componentName, type);
}

module.exports = {
  createEntity,
};
