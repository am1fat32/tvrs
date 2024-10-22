export function buildPackageJsonTemplate(
  componentName: string,
  extension: string,
): string {
  return JSON.stringify(
    {
      private: true,
      main: componentName,
      typings: `${componentName}${extension}`,
    },
    null,
    2,
  ).concat('\n');
}
