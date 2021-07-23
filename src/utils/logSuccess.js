const chalk = require('chalk');
const boxen = require('boxen');
const { logToOutput } = require('./logToOutput');

const fullNameMap = {
  fc: 'Functional component',
  cc: 'Class component',
};

const logSuccess = (componentName, type) => {
  const entityFullName = fullNameMap[type];
  const info = `${chalk.yellow(componentName)} is successfully created!`;

  logToOutput(
    boxen(`${entityFullName} ${info}`, { borderColor: 'green' }),
  );
};

module.exports = {
  logSuccess,
};
