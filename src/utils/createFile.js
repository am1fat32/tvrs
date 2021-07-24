const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { logToOutput } = require('./logToOutput');

const createFile = (filePath, fileName, template) => {
  const combinedPath = path.resolve(filePath, fileName);

  if (fs.existsSync(combinedPath)) {
    const warnInfo = `${chalk.yellow(fileName)} has been rewritten!`;
    logToOutput(warnInfo);
  }

  fs.writeFileSync(combinedPath, template);
};

module.exports = {
  createFile,
};
