const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { logToOutput } = require('./logToOutput');

const createFile = (filePath, fileName, template) => {
  const combinedPath = path.resolve(filePath, fileName);

  if (fs.existsSync(combinedPath)) {
    logToOutput(`${chalk.yellow(fileName)} has been rewritten!`);
  }

  fs.writeFileSync(combinedPath, template);
};

module.exports = {
  createFile,
};
