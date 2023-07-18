import path from 'path';
import chalk from 'chalk';
import { TemplateBuilderFactory } from './template-builder-factory.js';
import { TemplatesFileManager } from './templates-file-manager.js';
import { TypeEntity } from './type-entity.js';
import { Logger } from './logger.js';

export function createEntity(entityName, entityType) {
  const templatesBuilder = TemplateBuilderFactory.create(entityName, entityType);

  if (!templatesBuilder) {
    const possibleEntityTypes = Object.values(TypeEntity).map((it) => chalk.green(it)).join(' | ');
    const errorInfo = `Possible types (${possibleEntityTypes}) do not include ${chalk.yellow(entityType)}`;

    Logger.logError(errorInfo);
    return;
  }

  const workingDirectory = process.cwd();
  const templatesTargetPath = path.resolve(workingDirectory, entityName);
  const templates = templatesBuilder.createTemplates();

  TemplatesFileManager.create(templatesTargetPath, templates)
    .then(() => {
      const successInfo = `${templatesBuilder.getFullName()} ${chalk.yellow(entityName)} is successfully created`;
      Logger.logSuccess(successInfo);
    })
    .catch(() => {
      const errorInfo = 'Something went wrong during files creation';
      Logger.logError(errorInfo);
    });
}
