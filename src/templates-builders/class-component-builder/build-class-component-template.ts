import { convertKebabToPascal } from '../../convert-kebab-to-pascal';

export function buildClassComponentTemplate(componentName: string): string {
  const pascalComponentName = convertKebabToPascal(componentName);
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
\t\tthis.state = {};
\t}

\tpublic render(): JSX.Element {
\t\tconst {} = this.props;
\t\tconst {} = this.state;

\t\treturn (
\t\t\t<div>${componentName}</div>
\t\t);
\t}
}
`.trimStart();
}
