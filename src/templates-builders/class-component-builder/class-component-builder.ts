import { buildPackageJsonTemplate } from '../build-package-json-template';
import { buildStylesTemplate } from '../build-styles-template';
import { ComponentBuilder } from '../component-builder';
import type { Template } from '../types';
import { buildClassComponentTemplate } from './build-class-component-template';

export class ClassComponentBuilder extends ComponentBuilder {
  private readonly _entityName: string;
  private readonly _mainExtension: string;

  public constructor(entityName: string) {
    super('Class component');

    this._entityName = entityName;
    this._mainExtension = '.tsx';
  }

  public createTemplates(): Template[] {
    return [
      this._createMain(),
      this._createStyle(),
      this._createPackageJsonTemplate(),
    ];
  }

  private _createMain(): Template {
    return {
      fileName: this._entityName,
      fileExtension: this._mainExtension,
      template: buildClassComponentTemplate(this._entityName),
    };
  }

  private _createStyle(): Template {
    return {
      fileName: this._entityName,
      fileExtension: '.pcss',
      template: buildStylesTemplate(),
    };
  }

  private _createPackageJsonTemplate(): Template {
    return {
      fileName: 'package',
      fileExtension: '.json',
      template: buildPackageJsonTemplate(this._entityName, this._mainExtension),
    };
  }
}
