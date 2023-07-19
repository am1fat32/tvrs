import fs from 'fs';
import os from 'os';
import path from 'path';
import { createEntity } from '../../index.js';

jest.createMockFromModule('chalk');
jest.createMockFromModule('boxen');

describe('createEntity', () => {
  it('should create "test-fc" functional component', () => {
    const tempPath = os.tmpdir();
    const uniqueTempFolder = path.join(tempPath, `temp-${Date.now()}`);

    fs.mkdirSync(uniqueTempFolder);

    const targetPath = path.join(uniqueTempFolder, 'test-fc');

    createEntity('fc-test', 'fc', targetPath);
  });
});
