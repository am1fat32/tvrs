const fs = require('fs');
const path = require('path');

const createFile = (filePath, fileName, template) => {
  fs.writeFileSync(path.resolve(filePath, fileName), template);
};

module.exports = {
  createFile,
};
