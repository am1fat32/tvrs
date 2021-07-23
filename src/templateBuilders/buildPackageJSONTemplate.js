const buildPackageJSONTemplate = (componentName, extension) => JSON.stringify(
  {
    private: true,
    main: componentName,
    typings: `${componentName}${extension}`,
  },
  null,
  2,
)
  .concat('\n');

module.exports = {
  buildPackageJSONTemplate,
};
