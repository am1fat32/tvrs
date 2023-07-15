const { kebabToPascal } = require('../utils/kebab-to-pascal');

const buildFunctionalComponentTemplate = (componentName) => {
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
};

module.exports = {
  buildFunctionalComponentTemplate,
};
