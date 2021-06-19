const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

createComponent();

function createComponent() {
    if (!fs.existsSync(path.join(__dirname, `./${componentName}`))) {
        createFolder();
        createPackageJSON();
        createStyles();
        createTSX();
    }
}

function createFolder() {
    fs.mkdirSync(
        path.join(__dirname, `./${componentName}`)
    )
}

function createPackageJSON() {
    const content = JSON.stringify({
        private: true,
        main: componentName,
        typings: `${componentName}.tsx`,
    }, null, '\t');

    fs.writeFileSync(
        path.join(__dirname, `./${componentName}/package.json`), content
    )
}

function createStyles() {
    fs.writeFileSync(
        path.join(__dirname, `./${componentName}/${componentName}.pcss`), ''
    )
}

function createTSX() {
    fs.writeFileSync(
        path.join(__dirname, `./${componentName}/${componentName}.tsx`), createTSXContent()
    )
}

function createTSXContent() {
    const pascalName = kebabToPascal(componentName);

    return `
import React from 'react';

import * as s from './${componentName}';

export interface ${pascalName}Props {}

export function ${pascalName}(props: ${pascalName}Props): JSX.Element {
\treturn (
\t\t<div>${componentName}</div>
\t);
}
`.trim();
}

function kebabToPascal(str) {
    return str
        .split('-')
        .map((it) => it[0].toUpperCase().concat(it.slice(1)))
        .join('');
}
