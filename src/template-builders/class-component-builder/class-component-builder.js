import { buildClassComponentTemplate } from './build-class-component-template.js';
import { createFile } from '../../utils/create-file.js';
import { buildStylesTemplate } from '../build-styles-template.js';
import { buildPackageJsonTemplate } from '../build-package-json-template.js';

export class ClassComponentBuilder {
  constructor(entityName) {
    this._entityName = entityName;
    this._mainExtension = '.tsx';
    this._fullName = 'Functional component';
  }

  getFullName() {
    return this._fullName;
  }

  createTemplates(filePath) {
    this._createMain(filePath);
    this._createStyle(filePath);
    this._createPackageJsonTemplate(filePath);
  }

  _createMain(filePath) {
    const template = buildClassComponentTemplate(this._entityName);
    createFile(filePath, `${this._entityName}${this._mainExtension}`, template);
  }

  _createStyle(filePath) {
    const template = buildStylesTemplate();
    createFile(filePath, `${this._entityName}.pcss`, template);
  }

  _createPackageJsonTemplate(filePath) {
    const template = buildPackageJsonTemplate(this._entityName, this._mainExtension);
    createFile(filePath, 'package.json', template);
  }
}
