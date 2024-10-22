import { type AvailableEntityValue, entities } from './entities';
import { ClassComponentBuilder } from './templates-builders/class-component-builder/class-component-builder';
import { FunctionalComponentBuilder } from './templates-builders/functional-component-builder/functional-component-builder';

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
