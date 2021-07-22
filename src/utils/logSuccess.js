const chalk = require('chalk');
const boxen = require('boxen');

const fullNameMap = {
  fc: 'Functional component',
};

const logSuccess = (componentName, type) => {
  const entityFullName = fullNameMap[type];
  const info = `${chalk.yellow(componentName)} is successfully created!`;

  // eslint-disable-next-line no-console
  console.warn(
    chalk.green(boxen(`${entityFullName} ${info}`)),
  );
};

module.exports = {
  logSuccess,
};
