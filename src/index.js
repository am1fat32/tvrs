import chalk from 'chalk';
import { TemplateBuilderFactory } from './template-builder-factory.js';
import { TemplatesFileManager } from './templates-file-manager.js';
import { TypeEntity } from './type-entity.js';
import { Logger } from './logger.js';

export function createEntity(entityName, entityType, entityTargetPath) {
  const templatesBuilder = TemplateBuilderFactory.create(entityName, entityType);

  if (!templatesBuilder) {
    const possibleEntityTypes = Object.values(TypeEntity).map((it) => chalk.green(it)).join(' | ');
    const errorInfo = `Possible types (${possibleEntityTypes}) do not include ${chalk.yellow(entityType)}!`;

    Logger.logError(errorInfo);
    return;
  }

  const templates = templatesBuilder.createTemplates();

  TemplatesFileManager.create(entityTargetPath, templates)
    .then(() => {
      const successInfo = `${templatesBuilder.getFullName()} ${chalk.yellow(entityName)} is successfully created!`;
      Logger.logSuccess(successInfo);
    })
    .catch((err) => {
      Logger.logError(`${err.message}`);
    });
}
