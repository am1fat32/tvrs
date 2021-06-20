const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const boxen = require('boxen');

const {kebabToPascal} = require('./utils');

const componentName = process.argv[2];
const rootPath = path.resolve(process.cwd(), componentName);

createComponent(rootPath);

function createComponent() {
    if (fs.existsSync(rootPath)) {
        console.warn(
            chalk.red(boxen(`Folder ${chalk.yellow(componentName)} is already exists in this path!`))
        );

        return;
    }

    createRootFolder();

    createPackageJSON();
    createStyles();
    createTSX();

    console.warn(
        chalk.green(boxen(`Component ${chalk.yellow(componentName)} was successfully created!`))
    );
}

function createRootFolder() {
    fs.mkdirSync(rootPath)
}

function createPackageJSON() {
    createFile('package.json', createPackageJSONContent())
}

function createStyles() {
    createFile(`${componentName}.pcss`, createStylesContent())
}

function createTSX() {
    createFile(`${componentName}.tsx`, createTSXContent())
}

function createFile(fileName, content) {
    fs.writeFileSync(path.resolve(rootPath, fileName), content)
}

function createPackageJSONContent() {
    return JSON.stringify(
        {
            private: true,
            main: componentName,
            typings: `${componentName}.tsx`,
        },
        null,
        2
    );
}

function createStylesContent() {
    return '';
}

function createTSXContent() {
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
