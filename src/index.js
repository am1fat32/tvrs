const fs = require('fs');
const path = require('path');
const { createFile } = require('./utils/createFile');
const { logSuccess } = require('./utils/logSuccess');
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
    fs.mkdirSync(path.resolve(destinationPath, componentName));
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
