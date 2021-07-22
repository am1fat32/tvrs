const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');

const { kebabToPascal } = require('./utils');

function createComponent(componentName) {
  const rootPath = path.resolve(process.cwd(), componentName);

  if (fs.existsSync(rootPath)) {
    console.warn(
      chalk.red(boxen(`Folder ${chalk.yellow(componentName)} is already exists in this path!`)),
    );

    return;
  }

  createRootFolder();

  createPackageJSON();
  createStyles();
  createTSX();

  console.warn(
    chalk.green(boxen(`Component ${chalk.yellow(componentName)} was successfully created!`)),
  );

  function createRootFolder() {
    fs.mkdirSync(rootPath);
  }

  function createPackageJSON() {
    createFile('package.json', createPackageJSONContent(componentName));
  }

  function createTSX() {
    createFile(`${componentName}.tsx`, createTSXContent(componentName));
  }

  function createStyles() {
    createFile(`${componentName}.pcss`, createStylesContent());
  }

  function createFile(fileName, content) {
    fs.writeFileSync(path.resolve(rootPath, fileName), content);
  }
}

function createPackageJSONContent(componentName) {
  return JSON.stringify(
    {
      private: true,
      main: componentName,
      typings: `${componentName}.tsx`,
    },
    null,
    2,
  ).concat('\n');
}

function createStylesContent() {
  return '';
}

function createTSXContent(componentName) {
  const pascalComponentName = kebabToPascal(componentName);
  const propsStr = `${pascalComponentName}Props`;

  return `
import React from 'react';

import * as s from './${componentName}.pcss';

export interface ${propsStr} {}

export function ${pascalComponentName}(props: ${propsStr}): JSX.Element {
\tconst {} = props;

\treturn (
\t\t<div>${componentName}</div>
\t);
}
`.trimStart();
}

module.exports = {
  createComponent,
};
