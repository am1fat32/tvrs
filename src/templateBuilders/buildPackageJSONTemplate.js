const buildPackageJSONTemplate = (componentName) => JSON.stringify(
  {
    private: true,
    main: componentName,
    typings: `${componentName}.tsx`,
  },
  null,
  2,
)
  .concat('\n');

module.exports = {
  buildPackageJSONTemplate,
};
