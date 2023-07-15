import { kebabToPascal } from '../utils/kebab-to-pascal.js';

export function buildFunctionalComponentTemplate(componentName) {
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
