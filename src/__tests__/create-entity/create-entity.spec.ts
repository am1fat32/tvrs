import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createEntity } from '../../index';

jest.createMockFromModule('chalk');
jest.createMockFromModule('boxen');

describe('createEntity', () => {
  describe('matches the generated files with fixture files', () => {
    test('passes for generated functional component', () => {
      const FUNCTIONAL_COMPONENT_NAME = 'test-fc';

      const uniqueTempDirPath = fs.mkdtempSync(
        path.join(os.tmpdir(), 'tvrs-test'),
      );

      const entityPath = path.join(
        uniqueTempDirPath,
        FUNCTIONAL_COMPONENT_NAME,
      );

      createEntity(FUNCTIONAL_COMPONENT_NAME, 'fc', entityPath);

      const createdFiles = fs.readdirSync(entityPath);
      const createdFilesContentList = createdFiles.map((it) =>
        readFromFile(path.join(entityPath, it)),
      );

      const fixturesPath = getFixturesPath(FUNCTIONAL_COMPONENT_NAME);
      const fixturesFiles = fs.readdirSync(fixturesPath);
      const fixturesFilesContentList = fixturesFiles.map((it) =>
        readFromFile(path.join(fixturesPath, it)),
      );

      expect(createdFiles).toHaveLength(fixturesFiles.length);
      expect(createdFiles).toEqual(expect.arrayContaining(fixturesFiles));
      expect(createdFilesContentList).toEqual(
        expect.arrayContaining(fixturesFilesContentList),
      );
    });

    test('passes for generated class component', () => {
      const CLASS_COMPONENT_NAME = 'test-cc';

      const uniqueTempDirPath = fs.mkdtempSync(
        path.join(os.tmpdir(), 'tvrs-test'),
      );

      const entityPath = path.join(uniqueTempDirPath, CLASS_COMPONENT_NAME);

      createEntity(CLASS_COMPONENT_NAME, 'cc', entityPath);

      const createdFiles = fs.readdirSync(entityPath);
      const createdFilesContentList = createdFiles.map((it) =>
        readFromFile(path.join(entityPath, it)),
      );

      const fixturesPath = getFixturesPath(CLASS_COMPONENT_NAME);
      const fixturesFiles = fs.readdirSync(fixturesPath);
      const fixturesFilesContentList = fixturesFiles.map((it) =>
        readFromFile(path.join(fixturesPath, it)),
      );

      expect(createdFiles).toHaveLength(fixturesFiles.length);
      expect(createdFiles).toEqual(expect.arrayContaining(fixturesFiles));
      expect(createdFilesContentList).toEqual(
        expect.arrayContaining(fixturesFilesContentList),
      );
    });
  });
});

function getFixturesPath(fixtureDirName: string): string {
  return path.join(__dirname, '..', '..', '__fixtures__', fixtureDirName);
}

function readFromFile(path: string): string {
  return fs.readFileSync(path, 'utf8');
}
