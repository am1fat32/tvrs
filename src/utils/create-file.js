import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { logToOutput } from './log-to-output.js';

export function createFile(filePath, fileName, template) {
  const combinedPath = path.resolve(filePath, fileName);

  if (fs.existsSync(combinedPath)) {
    const warnInfo = `${chalk.yellow(fileName)} has been rewritten!`;
    logToOutput(warnInfo);
  }

  fs.writeFileSync(combinedPath, template);
}
