const fs = require('fs');
const path = require('path');

const {kebabToPascal} = require('./utils');

const componentName = process.argv[2];
const rootPath = path.resolve(process.cwd(), componentName);

createComponent();

function createComponent() {
    if (!fs.existsSync(rootPath)) {
        createRootFolder();
        createPackageJSON();
        createStyles();
        createTSX();
    }
}

function createRootFolder() {
    fs.mkdirSync(rootPath)
}

function createPackageJSON() {
    const content = JSON.stringify(
        {
            private: true,
            main: componentName,
            typings: `${componentName}.tsx`,
        },
        null,
        '\t'
    );

    fs.writeFileSync(
        path.resolve(rootPath, 'package.json'), content
    )
}

function createStyles() {
    fs.writeFileSync(
        path.resolve(rootPath, `${componentName}.pcss`), ''
    )
}

function createTSX() {
    fs.writeFileSync(
        path.resolve(rootPath, `${componentName}.tsx`), createTSXContent()
    )
}

function createTSXContent() {
    const pascalName = kebabToPascal(componentName);

    return `
import React from 'react';

import * as s from './${componentName}.pcss';

export interface ${pascalName}Props {}

export function ${pascalName}(props: ${pascalName}Props): JSX.Element {
\treturn (
\t\t<div>${componentName}</div>
\t);
}
`.trim();
}
