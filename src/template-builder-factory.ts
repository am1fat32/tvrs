import { AvailableEntityValue, entities } from "./entities";
import { FunctionalComponentBuilder } from "./templates-builders/functional-component-builder/functional-component-builder";
import { ClassComponentBuilder } from "./templates-builders/class-component-builder/class-component-builder";

export class TemplateBuilderFactory {
  static create(
    entityName: string,
    entityType: AvailableEntityValue,
  ): FunctionalComponentBuilder | ClassComponentBuilder {
    switch (entityType) {
      case entities.functionalComponent.value:
        return new FunctionalComponentBuilder(entityName);
      case entities.classComponent.value:
        return new ClassComponentBuilder(entityName);
    }
  }
}
