const { kebabToPascal } = require('../utils/kebabToPascal');

const buildClassComponentTemplate = (componentName) => {
  const pascalComponentName = kebabToPascal(componentName);
  const propsStr = `${pascalComponentName}Props`;
  const stateStr = `${pascalComponentName}State`;

  return `
import React from 'react';

import * as s from './${componentName}.pcss';

export interface ${propsStr} {}

interface ${stateStr} {}

export class ${pascalComponentName} extends React.PureComponent<${propsStr}, ${stateStr}> {
\tpublic constructor(props: ${propsStr}) {
\t\tsuper(props);
\t}
}
`.trimStart();
};

module.exports = {
  buildClassComponentTemplate,
};
