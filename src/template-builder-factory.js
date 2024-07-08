import { TypeEntity } from "./type-entity.js";
import { FunctionalComponentBuilder } from "./templates-builders/functional-component-builder/functional-component-builder.js";
import { ClassComponentBuilder } from "./templates-builders/class-component-builder/class-component-builder.js";

export class TemplateBuilderFactory {
  static create(entityName, entityType) {
    if (entityType === TypeEntity.FunctionalComponent.value) {
      return new FunctionalComponentBuilder(entityName);
    }

    if (entityType === TypeEntity.ClassComponent.value) {
      return new ClassComponentBuilder(entityName);
    }

    return null;
  }
}
