import fs from 'fs';
import os from 'os';
import path from 'path';
import { createEntity } from '../../index.js';

jest.createMockFromModule('chalk');
jest.createMockFromModule('boxen');

const FUNCTIONAL_COMPONENT_NAME = 'test-fc';
const CLASS_COMPONENT_NAME = 'test-cc';

describe('createEntity', () => {
  it(`should create "${FUNCTIONAL_COMPONENT_NAME}" functional component`, () => {
    const tempPath = os.tmpdir();
    const uniqueTempFolder = path.join(tempPath, `temp-${Date.now()}`);

    fs.mkdirSync(uniqueTempFolder);

    const targetPath = path.join(uniqueTempFolder, FUNCTIONAL_COMPONENT_NAME);

    createEntity(FUNCTIONAL_COMPONENT_NAME, 'fc', targetPath);

    const createdEntityPath = path.join(uniqueTempFolder, FUNCTIONAL_COMPONENT_NAME);
    const fixturesPath = path.join(__dirname, '..', '..', '__fixtures__', FUNCTIONAL_COMPONENT_NAME);

    const createdFiles = fs.readdirSync(createdEntityPath);
    const fixturesFiles = fs.readdirSync(fixturesPath);

    expect(createdFiles).toHaveLength(fixturesFiles.length);

    createdFiles.forEach((file) => {
      const createdFileContent = fs.readFileSync(path.join(createdEntityPath, file), 'utf8');
      const fixtureFileContent = fs.readFileSync(path.join(fixturesPath, file), 'utf8');

      expect(createdFileContent).toEqual(fixtureFileContent);
    });
  });

  it(`should create "${CLASS_COMPONENT_NAME}" class component`, () => {
    const tempPath = os.tmpdir();
    const uniqueTempFolder = path.join(tempPath, `temp-${Date.now()}`);

    fs.mkdirSync(uniqueTempFolder);

    const targetPath = path.join(uniqueTempFolder, CLASS_COMPONENT_NAME);

    createEntity(CLASS_COMPONENT_NAME, 'cc', targetPath);

    const createdEntityPath = path.join(uniqueTempFolder, CLASS_COMPONENT_NAME);
    const fixturesPath = path.join(__dirname, '..', '..', '__fixtures__', CLASS_COMPONENT_NAME);

    const createdFiles = fs.readdirSync(createdEntityPath);
    const fixturesFiles = fs.readdirSync(fixturesPath);

    expect(createdFiles).toHaveLength(fixturesFiles.length);

    createdFiles.forEach((file) => {
      const createdFileContent = fs.readFileSync(path.join(createdEntityPath, file), 'utf8');
      const fixtureFileContent = fs.readFileSync(path.join(fixturesPath, file), 'utf8');

      expect(createdFileContent).toEqual(fixtureFileContent);
    });
  });
});
