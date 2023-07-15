export function buildPackageJsonTemplate(componentName, extension) {
  return JSON.stringify(
    {
      private: true,
      main: componentName,
      typings: `${componentName}${extension}`,
    },
    null,
    2,
  )
    .concat('\n');
}
