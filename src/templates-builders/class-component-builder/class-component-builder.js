import { buildClassComponentTemplate } from "./build-class-component-template.js";
import { buildStylesTemplate } from "../build-styles-template.js";
import { buildPackageJsonTemplate } from "../build-package-json-template.js";
import { AbstractComponentBuilder } from "../abstract-component-builder.js";

export class ClassComponentBuilder extends AbstractComponentBuilder {
  constructor(entityName) {
    super("Class component");

    this._entityName = entityName;
    this._mainExtension = ".tsx";
  }

  createTemplates() {
    return [
      this._createMain(),
      this._createStyle(),
      this._createPackageJsonTemplate(),
    ];
  }

  _createMain() {
    return {
      fileName: this._entityName,
      fileExtension: this._mainExtension,
      template: buildClassComponentTemplate(this._entityName),
    };
  }

  _createStyle() {
    return {
      fileName: this._entityName,
      fileExtension: ".pcss",
      template: buildStylesTemplate(),
    };
  }

  _createPackageJsonTemplate() {
    return {
      fileName: "package",
      fileExtension: ".json",
      template: buildPackageJsonTemplate(this._entityName, this._mainExtension),
    };
  }
}
