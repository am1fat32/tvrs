const fs = require('fs');
const path = require('path');
const { createFile } = require('./utils/createFile');
const { logSuccess } = require('./utils/logSuccess');
const { buildFunctionalComponentTemplate } = require('./templateBuilders/buildFunctionalComponentTemplate');
const { buildPackageJSONTemplate } = require('./templateBuilders/buildPackageJSONTemplate');
const { buildStylesTemplate } = require('./templateBuilders/buildStylesTemplate');

const mainEntityMap = {
  fc: {
    ext: '.tsx',
    canHaveStyles: true,
    canHavePackageJSON: true,
    fn: buildFunctionalComponentTemplate,
  },
};

function createEntity(componentName, type, isSingle) {
  const destinationPath = process.cwd();

  const {
    ext: mainExtension,
    fn: buildMainTemplate,
    canHaveStyles,
    canHavePackageJSON,
  } = mainEntityMap[type];

  if (!isSingle) {
    fs.mkdirSync(path.resolve(destinationPath, componentName));
  }

  const mainTemplate = buildMainTemplate(componentName);
  const filePath = isSingle ? destinationPath : path.resolve(destinationPath, componentName);
  createFile(filePath, `${componentName}${mainExtension}`, mainTemplate);

  if (!isSingle && canHaveStyles) {
    const stylesTemplate = buildStylesTemplate();
    createFile(filePath, `${componentName}.pcss`, stylesTemplate);
  }

  if (!isSingle && canHavePackageJSON) {
    const template = buildPackageJSONTemplate(componentName);
    createFile(filePath, `${componentName}.json`, template);
  }

  logSuccess(componentName, type);
}

module.exports = {
  createEntity,
};
